class Orders {
    constructor() {
        this.apiUrl = 'http://localhost:6969/api/orders';

        this.shippingCosts = 10;
    }

    async getOrders() {
        const response = await fetch(this.apiUrl + '/by-user', {
            method: 'GET',
            credentials: 'include'
        });
        return await response.json();
    }

    async createOrder(order) {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(order),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();

        return responseData.id;
    }


}

export default new Orders();