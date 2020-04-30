// web fetch
const REST_API_URL = process.env.REACT_APP_REST_API_ENDPOINT;

export async function fetchOrders() {
    const response = await fetch(
        `${REST_API_URL}/orders`,
    );
    return response.json();
}

export async function fetchOrderById(id) {
    const response = await fetch(
        `${REST_API_URL}/orders/${id}`,
    );
    return response.json();
}

export async function fetchTasksByOrderId(orderId) {
    const response = await fetch(
        `${REST_API_URL}/tasks/${orderId}`,
    );
    return response.json();
}
