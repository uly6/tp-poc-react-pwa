import PouchDB from 'pouchdb';

const dbs = {};

const SYNC_METADATA = 'sync-metadata';
const ORDERS = 'orders';

export const DEFAULT_SYNC_METADATA = {
  _id: 'default',
  downloadDisabled: false,
  downloadedAt: '',
  uploadDisabled: true,
  uploadedAt: '',
  deleteDisabled: true,
  deletedAt: '',
};

function getDB(dbname = ORDERS) {
  if (!dbs[dbname]) {
    dbs[dbname] = new PouchDB(dbname);
  }
  return dbs[dbname];
}

// ####################################
// SYNC METADATA
// ####################################

export async function getSyncMetadata() {
  try {
    return await getDB(SYNC_METADATA).get('default');
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
  await getDB(SYNC_METADATA).put(doc);

  // return updated version
  return await getDB(SYNC_METADATA).get('default');
}

// ####################################
// ORDERS
// ####################################

export async function getOrders() {
  const result = await getDB(ORDERS).allDocs({ include_docs: true });
  return result.rows.map((row) => row.doc);
}

export async function getOrderById(id) {
  return await getDB(ORDERS).get(id, {
    attachments: true,
    binary: true,
  });
}

export async function addOrder(order) {
  let doc;
  // pouch ex[ect a _id field
  if (order.id) {
    doc = { ...order, _id: order.id };
  }
  // save
  const result = await getDB(ORDERS).put(doc);
  // return the most recebt version
  return getOrderById(result.id);
}

export async function updateOrder(order) {
  // load the latest rev
  const { _rev } = await getDB(ORDERS).get(order._id);
  // update
  const result = await getDB(ORDERS).put({ ...order, _rev });
  // return the most recent version
  return getOrderById(result.id);
}

export async function deleteOrder(order) {
  // load latest rev
  const doc = await getDB(ORDERS).get(order._id);
  // remove
  return getDB(ORDERS).remove(doc);
}

export async function deleteAllOrders() {
  // delete the store
  const result = await getDB(ORDERS).destroy();
  if (result.ok) {
    dbs[ORDERS] = null;
  }
  return result;
}

// ####################################
// PICTURES
// ####################################

export async function attachImageToOrder(id, file) {
  const { name, type } = file;
  // load the latest rev
  const { _rev } = await getDB(ORDERS).get(id);
  // attache the file
  const result = await getDB(ORDERS).putAttachment(
    id,
    name,
    _rev,
    file,
    type,
  );
  // return the most recent version
  return getOrderById(result.id);
}
