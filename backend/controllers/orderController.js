import Order from '../models/order';

// Controller to create a new order
export const createOrder = async (req, res) => {
  try {
    const { items, user, paymentStatus } = req.body;
    const order = new Order({ items, user, paymentStatus });
    await order.save();
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Controller to get orders by user ID
export const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ user: userId });
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Controller to update order payment status
export const updateOrderPaymentStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { paymentStatus } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { paymentStatus }, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ message: 'Order payment status updated successfully', order: updatedOrder });
  } catch (error) {
    console.error('Error updating order payment status:', error);
    res.status(500).json({ error: 'Failed to update order payment status' });
  }
};

// Controller to delete order
export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
};
