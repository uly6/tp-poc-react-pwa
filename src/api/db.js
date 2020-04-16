import PouchDB from 'pouchdb';
import PouchFindPlugin from 'pouchdb-find';
import shortid from 'shortid';

// enable queries
// https://pouchdb.com/guides/mango-queries.html
PouchDB.plugin(PouchFindPlugin);

const SYNC_METADATA = 'sync-metadata';
const ORDERS = 'orders';
const IMAGES = 'images';

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

function getSyncMetadataStore() {
  if (!syncMetadataStore) {
    syncMetadataStore = new PouchDB(SYNC_METADATA);
  }
  return syncMetadataStore;
}

function getOrdersStore() {
  if (!ordersStore) {
    ordersStore = new PouchDB(ORDERS);
  }
  return ordersStore;
}

function getImagesStore() {
  if (!imagesStore) {
    imagesStore = new PouchDB(IMAGES);

    imagesStore.createIndex({
      index: { fields: ['orderId'] },
    });
  }
  return imagesStore;
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

// ####################################
// ORDERS STORE
// ####################################

export async function getOrders() {
  const result = await getOrdersStore().allDocs({
    include_docs: true,
  });
  return result.rows.map((row) => row.doc);
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

export async function updateOrder(order) {
  // load the latest rev
  const { _rev } = await getOrdersStore().get(order._id);
  // update
  const result = await getOrdersStore().put({ ...order, _rev });
  // return the most recent version
  return getOrderById(result.id);
}

export async function deleteOrder(order) {
  // load latest rev
  const doc = await getOrdersStore.get(order._id);
  // remove
  return getOrdersStore().remove(doc);
}

export async function deleteAllOrders() {
  // delete the store
  const result = await getOrdersStore().destroy();
  if (result.ok) {
    ordersStore = null;
  }
  return result;
}

export async function attachImageToOrder(id, file) {
  const { name, type } = file;
  // load the latest rev
  const { _rev } = await getOrdersStore().get(id);
  // attache the file
  const result = await getOrdersStore().putAttachment(
    id,
    name,
    _rev,
    file,
    type,
  );
  // return the most recent version
  return getOrderById(result.id);
}

// ####################################
// IMAGES STORE
// ####################################

export async function getImages() {
  const result = await getImagesStore().allDocs({
    include_docs: true,
  });
  return result.rows.map((row) => row.doc);
}

export async function getImagesByOrderId(orderId) {
  // find does not return the attachments
  const response = await getImagesStore().find({
    selector: {
      orderId,
    },
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
    // inline attachment
    const doc = {
      _id: shortid(),
      orderId,
      name,
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
