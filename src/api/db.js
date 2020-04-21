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

let syncMetadataStore;
let ordersStore;
let imagesStore;
let videosStore;
let tasksStore;

function getSyncMetadataStore() {
  if (!syncMetadataStore) {
    syncMetadataStore = new PouchDB(SYNC_METADATA);
  }
  return syncMetadataStore;
}

function getOrdersStore() {
  if (!ordersStore) {
    ordersStore = new PouchDB(ORDERS);

    ordersStore.createIndex({
      index: { fields: ['createdAt'] },
    });
  }
  return ordersStore;
}

function getTasksStore() {
  if (!tasksStore) {
    tasksStore = new PouchDB(TASKS);

    tasksStore.createIndex({
      index: { fields: ['createdAt', 'orderId'] },
    });
  }
  return tasksStore;
}

function getImagesStore() {
  if (!imagesStore) {
    imagesStore = new PouchDB(IMAGES);

    imagesStore.createIndex({
      index: { fields: ['createdAt', 'orderId'] },
    });
  }
  return imagesStore;
}

function getVideosStore() {
  if (!videosStore) {
    videosStore = new PouchDB(VIDEOS);

    videosStore.createIndex({
      index: { fields: ['createdAt', 'orderId'] },
    });
  }
  return videosStore;
}

// ####################################
// SYNC METADATA STORE
// ####################################

export async function getSyncMetadata() {
  try {
    return await getSyncMetadataStore().get('default');
  } catch (err) {
    if (err && err.name === 'not_found') {
      return DEFAULT_SYNC_METADATA;
    }
  }
}

export async function updateSyncMetadata(data) {
  const previous = await getSyncMetadata();
  const doc =
    previous && previous._rev
      ? { ...data, _rev: previous._rev }
      : data;

  // update
  await getSyncMetadataStore().put(doc);

  // return updated version
  return await getSyncMetadataStore().get('default');
}

export async function cleanDatabases() {
  // delete the order store
  let result = await getOrdersStore().destroy();
  if (result.ok) {
    ordersStore = null;
  }

  // delete the tasks store
  result = await getTasksStore().destroy();
  if (result.ok) {
    tasksStore = null;
  }

  // delete the images store
  result = await getImagesStore().destroy();
  if (result.ok) {
    imagesStore = null;
  }

  // delete the videos store
  result = await getVideosStore().destroy();
  if (result.ok) {
    videosStore = null;
  }

  return result;
}

// ####################################
// ORDERS STORE
// ####################################

export async function getOrders() {
  const result = await getOrdersStore().find({
    selector: {
      createdAt: { $gte: null },
    },
    sort: ['createdAt'],
  });
  return result.docs;
}

export async function getOrderById(id) {
  return await getOrdersStore().get(id);
}

export async function addOrder(order) {
  let doc;
  // pouch ex[ect a _id field
  if (order.id) {
    doc = { ...order, _id: order.id };
  }
  // save
  const result = await getOrdersStore().put(doc);
  // return the most recebt version
  return getOrderById(result.id);
}

// ####################################
// IMAGES STORE
// ####################################

export async function getImagesByOrderId(orderId) {
  // find does not return the attachments
  const response = await getImagesStore().find({
    selector: {
      orderId,
      createdAt: { $gte: null },
    },
    sort: ['createdAt'],
  });

  // collect all ids
  const ids = response.docs.map((doc) => doc._id);

  const result = await getImagesStore().allDocs({
    keys: ids,
    include_docs: true,
    attachments: true,
    binary: true,
  });

  return result.rows.map((row) => row.doc);
}

export async function getImageById(id) {
  return await getImagesStore().get(id, {
    attachments: true,
    binary: true,
  });
}

export async function addImage(orderId, imageFile) {
  const { name, type } = imageFile;

  try {
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
    const result = await getImagesStore().put(doc);

    // return saved image
    return getImageById(result.id);
  } catch (err) {
    console.error(err);
  }
}

export async function deleteImage(image) {
  // load latest rev
  const doc = await getImagesStore().get(image._id);
  // remove
  return getImagesStore().remove(doc);
}

// ####################################
// VIDEOS STORE
// ####################################

export async function getVideosByOrderId(orderId) {
  // find does not return the attachments
  const response = await getVideosStore().find({
    selector: {
      orderId,
      createdAt: { $gte: null },
    },
    sort: ['createdAt'],
  });

  // collect all ids
  const ids = response.docs.map((doc) => doc._id);

  const result = await getVideosStore().allDocs({
    keys: ids,
    include_docs: true,
    attachments: true,
    binary: true,
  });

  return result.rows.map((row) => row.doc);
}

export async function getVideoById(id) {
  return await getVideosStore().get(id, {
    attachments: true,
    binary: true,
  });
}

export async function addVideo(orderId, imageFile) {
  const { name, type } = imageFile;

  try {
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
    const result = await getVideosStore().put(doc);

    // return saved image
    return getVideoById(result.id);
  } catch (err) {
    console.error(err);
  }
}

export async function deleteVideo(video) {
  // load latest rev
  const doc = await getVideosStore().get(video._id);
  // remove
  return getVideosStore().remove(doc);
}

// ####################################
// TASKS STORE
// ####################################

export async function getTasksByOrderId(orderId) {
  const response = await getTasksStore().find({
    selector: {
      orderId,
      createdAt: { $gte: null },
    },
    sort: ['createdAt'],
  });

  // collect all ids
  const ids = response.docs.map((doc) => doc._id);

  const result = await getTasksStore().allDocs({
    keys: ids,
    include_docs: true,
  });

  return result.rows.map((row) => row.doc);
}

export async function getTaskById(id) {
  return await getTasksStore().get(id);
}

export async function addTask(task) {
  try {
    // save
    const result = await getTasksStore().put({
      ...task,
      _id: shortid.generate(),
      createdAt: new Date().toISOString(),
      completed: false,
    });

    // return saved doc
    return getTaskById(result.id);
  } catch (err) {
    console.error(err);
  }
}

export async function updateTask(task) {
  try {
    // get task
    const { _rev } = await getTaskById(task._id);
    // save
    const result = await getTasksStore().put({
      ...task,
      _rev,
    });

    // return saved doc
    return getTaskById(result.id);
  } catch (err) {
    console.error(err);
  }
}

export async function deleteTask(task) {
  // load latest rev
  const doc = await getTasksStore().get(task._id);
  // remove
  return getTasksStore().remove(doc);
}
