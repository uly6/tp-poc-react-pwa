import PouchDB from 'pouchdb';
import PouchFindPlugin from 'pouchdb-find';
import * as shortid from 'shortid';
import {
  getGeolocationFromImage,
  getGeoloacationFromDevice,
} from '../utils/geolocation';

shortid.characters(
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@',
);

// enable queries
// https://pouchdb.com/guides/mango-queries.html
PouchDB.plugin(PouchFindPlugin);

PouchDB.on('destroyed', function (dbName) {
  // called whenever a db is destroyed.
  console.log('==>> POUCHEDB destroyed', dbName);
});

const SYNC_METADATA = 'sync-metadata';
const ORDERS = 'orders';
const TASKS = 'tasks';
const IMAGES = 'images';
const VIDEOS = 'videos';

export const DEFAULT_SYNC_METADATA = {
  _id: 'default',
  downloadDisabled: false,
  downloadedAt: '',
  uploadDisabled: true,
  uploadedAt: '',
  deleteDisabled: true,
  deletedAt: '',
};

// ####################################
// DATABASES
// ####################################

let syncMetadataStore;
let ordersStore;
let imagesStore;
let videosStore;
let tasksStore;

async function getSyncMetadataStore(forceNew = false) {
  if (!syncMetadataStore || forceNew) {
    syncMetadataStore = new PouchDB(SYNC_METADATA);
  }
  return syncMetadataStore;
}

async function getOrdersStore(forceNew = false) {
  if (!ordersStore || forceNew) {
    ordersStore = new PouchDB(ORDERS);

    await ordersStore.createIndex({
      index: { fields: ['createdAt'] },
    });
  }
  return ordersStore;
}

async function getTasksStore(forceNew = false) {
  if (!tasksStore || forceNew) {
    tasksStore = new PouchDB(TASKS);

    await tasksStore.createIndex({
      index: { fields: ['createdAt', 'orderId'] },
    });
  }
  return tasksStore;
}

async function getImagesStore(forceNew = false) {
  if (!imagesStore || forceNew) {
    imagesStore = new PouchDB(IMAGES);

    await imagesStore.createIndex({
      index: { fields: ['createdAt', 'orderId'] },
    });
  }
  return imagesStore;
}

async function getVideosStore(forceNew = false) {
  if (!videosStore || forceNew) {
    videosStore = new PouchDB(VIDEOS);

    await videosStore.createIndex({
      index: { fields: ['createdAt', 'orderId'] },
    });
  }
  return videosStore;
}

export async function cleanDatabases() {
  const metadataResult = await cleanDatabase(getSyncMetadataStore);
  const orderResult = await cleanDatabase(getOrdersStore);
  const taskResult = await cleanDatabase(getTasksStore);
  const imagesResult = await cleanDatabase(getImagesStore);
  const videosResult = await cleanDatabase(getVideosStore);

  return {
    metadata: metadataResult.ok,
    orders: orderResult.ok,
    tasks: taskResult.ok,
    images: imagesResult.ok,
    video: videosResult.ok,
  };
}

async function cleanDatabase(getStoreFn) {
  // delete the store
  const store = await getStoreFn();
  const result = await store.destroy();
  if (result.ok) {
    // re-create
    await getStoreFn(true);
  }
  return result;
}

// ####################################
// SYNC LOCAL DATA TO SERVER
// ####################################

export const syncToRemote = async () => {
  // tasks
  await syncStoreToRemote(TASKS, getTasksStore);

  // images
  await syncStoreToRemote(IMAGES, getImagesStore);

  // videos
  await syncStoreToRemote(VIDEOS, getVideosStore);

  return Promise.resolve();
};

const syncStoreToRemote = async (remoteName, getLocalStoreFn) => {
  const remoteDB = new PouchDB(
    `https://tp-poc-pouchdb-server.herokuapp.com/${remoteName}`,
  );
  console.log(await remoteDB.info());

  const localStore = await getLocalStoreFn();

  return new Promise((resolve, reject) => {
    localStore.replicate
      .to(remoteDB)
      .on('complete', () => {
        console.log(remoteName, 'SYNC COMPLETED');
        resolve();
      })
      .on('error', (err) => {
        console.log(remoteName, 'SYNC ERROR');
        console.error(err);
        reject(err);
      });
  });
};

// ####################################
// SYNC METADATA STORE
// ####################################

export async function getSyncMetadata() {
  try {
    const db = await getSyncMetadataStore();
    return await db.get('default');
  } catch (err) {
    if (err && err.name === 'not_found') {
      return DEFAULT_SYNC_METADATA;
    }
  }
}

export async function updateSyncMetadata(data) {
  const db = await getSyncMetadataStore();
  const previous = await getSyncMetadata();
  const doc =
    previous && previous._rev
      ? { ...data, _rev: previous._rev }
      : data;
  // update
  await db.put(doc);
  // return updated version
  return await db.get('default');
}

// ####################################
// ORDERS STORE
// ####################################

export async function getOrders() {
  const db = await getOrdersStore();
  const result = await db.find({
    selector: {
      createdAt: { $gte: null },
    },
    sort: ['createdAt'],
  });
  return result.docs;
}

export async function getOrderById(id) {
  const db = await getOrdersStore();
  return await db.get(id);
}

export async function addOrder(order) {
  const db = await getOrdersStore();
  // save
  const result = await db.put(order);
  // return the most recebt version
  return getOrderById(result.id);
}

// ####################################
// TASKS STORE
// ####################################

export async function getTasksByOrderId(orderId) {
  const db = await getTasksStore();
  const response = await db.find({
    selector: {
      orderId,
      createdAt: { $gte: null },
    },
    sort: ['createdAt'],
  });
  // collect all ids
  const ids = response.docs.map((doc) => doc._id);
  // get by ids
  const result = await db.allDocs({
    keys: ids,
    include_docs: true,
  });
  return result.rows.map((row) => row.doc);
}

export async function getTaskById(id) {
  const db = await getTasksStore();
  return await db.get(id);
}

export async function addTask(task) {
  const db = await getTasksStore();
  // save
  const result = await db.put({
    ...task,
    _id: shortid.generate(),
    createdAt: new Date().toISOString(),
    completed: false,
  });
  // return saved doc
  return getTaskById(result.id);
}

export async function updateTask(task) {
  const db = await getTasksStore();
  // get task
  const { _rev } = await getTaskById(task._id);
  // save
  const result = await db.put({
    ...task,
    _rev,
  });
  // return saved doc
  return getTaskById(result.id);
}

export async function deleteTask(task) {
  const db = await getTasksStore();
  // load latest rev
  const doc = await db.get(task._id);
  // remove
  return db.remove(doc);
}

// ####################################
// IMAGES STORE
// ####################################

export async function getImagesByOrderId(orderId) {
  const db = await getImagesStore();
  // find does not return the attachments
  const response = await db.find({
    selector: {
      orderId,
      createdAt: { $gte: null },
    },
    sort: ['createdAt'],
  });
  // collect all ids
  const ids = response.docs.map((doc) => doc._id);
  // get by ids
  const result = await db.allDocs({
    keys: ids,
    include_docs: true,
    attachments: true,
    binary: true,
  });
  return result.rows.map((row) => row.doc);
}

export async function getImageById(id) {
  const db = await getImagesStore();
  return await db.get(id, {
    attachments: true,
    binary: true,
  });
}

export async function addImage(orderId, imageFile) {
  const db = await getImagesStore();
  const { name, type } = imageFile;
  // try to retrieve location from EXIF tags
  let location = await getGeolocationFromImage(imageFile);
  // ask current location from device
  if (!location) {
    location = await getGeoloacationFromDevice();
  }
  // inline attachment
  const doc = {
    _id: shortid.generate(),
    orderId,
    name,
    location,
    createdAt: new Date().toISOString(),
    _attachments: {
      file: {
        content_type: type,
        data: imageFile,
      },
    },
  };
  // save
  const result = await db.put(doc);
  // return saved image
  return getImageById(result.id);
}

export async function deleteImage(image) {
  const db = await getImagesStore();
  // load latest rev
  const doc = await db.get(image._id);
  // remove
  return db.remove(doc);
}

// ####################################
// VIDEOS STORE
// ####################################

export async function getVideosByOrderId(orderId) {
  const db = await getVideosStore();
  // find does not return the attachments
  const response = await db.find({
    selector: {
      orderId,
      createdAt: { $gte: null },
    },
    sort: ['createdAt'],
  });
  // collect all ids
  const ids = response.docs.map((doc) => doc._id);
  // get by ids
  const result = await db.allDocs({
    keys: ids,
    include_docs: true,
    attachments: true,
    binary: true,
  });
  return result.rows.map((row) => row.doc);
}

export async function getVideoById(id) {
  const db = await getVideosStore();
  return await db.get(id, {
    attachments: true,
    binary: true,
  });
}

export async function addVideo(orderId, imageFile) {
  const db = await getVideosStore();
  const { name, type } = imageFile;
  // inline attachment
  const doc = {
    _id: shortid.generate(),
    orderId,
    name,
    createdAt: new Date().toISOString(),
    _attachments: {
      file: {
        content_type: type,
        data: imageFile,
      },
    },
  };
  // save
  const result = await db.put(doc);
  // return saved image
  return getVideoById(result.id);
}

export async function deleteVideo(video) {
  const db = await getVideosStore();
  // load latest rev
  const doc = await db.get(video._id);
  // remove
  return db.remove(doc);
}
