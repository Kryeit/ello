import { getIpAddress } from "@/js/static.js";

class Orders {
    constructor() {
        this.apiUrl = getIpAddress() + '/api/orders';
        this.shippingCosts = 10;
    }

    async getOrders() {
        try {
            const response = await fetch('https://kryeit.com/api/payment/create', {
                method: 'GET',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error fetching orders:", error);
            return [];
        }
    }

    async createOrder(orderData) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            return responseData.id;
        } catch (error) {
            console.error("Error creating order:", error);
            throw error;
        }
    }

    formatOrderDate(timestamp) {
        if (!timestamp) return 'N/A';

        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    getStatusLabel(status) {
        const statusMap = {
            'UNPAID': 'Unpaid',
            'PENDING': 'Pending',
            'SHIPPED': 'Shipped',
            'DELIVERED': 'Delivered'
        };

        return statusMap[status] || status;
    }
}

export default new Orders();