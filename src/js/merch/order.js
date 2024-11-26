class Order {
    constructor(id, uuid, cart, destination, phone, status, transaction, email) {
        this.id = id;
        this.uuid = uuid;
        this.cart = cart;
        this.destination = destination;
        this.phone = phone;
        this.email = email;
        this.status = status;
        this.transaction = transaction;
    }

    static Status = {
        UNPAID: 'UNPAID',
        PENDING: 'PENDING',
        SHIPPED: 'SHIPPED',
        DELIVERED: 'DELIVERED'
    }
}

export default Order;