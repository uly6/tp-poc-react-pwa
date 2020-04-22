// web fetch
import {serverUrl} from '../utils/constants';

export async function fetchOrders() {
    const response = await fetch(
        `${serverUrl}/orders`,
    );
    return response.json();
}

export async function fetchOrderById(id) {
    const response = await fetch(
        `${serverUrl}/orders/${id}`,
    );
    return response.json();
}

export async function fetchTasksByOrderId(orderId) {
    const response = await fetch(
        `${serverUrl}/tasks/${orderId}`,
    );
    return response.json();
}
