// web fetch

export async function fetchOrders() {
  const response = await fetch(
    'https://tp-poc-api.herokuapp.com/api/orders',
  );
  return response.json();
}

export async function fetchOrderById(id) {
  const response = await fetch(
    `https://tp-poc-api.herokuapp.com/api/orders/${id}`,
  );
  return response.json();
}
