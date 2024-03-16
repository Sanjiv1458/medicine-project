import Cart from '../models/cart';

// Controller to create a new cart
export const createCart = async (req, res) => {
  try {
    const { items, user } = req.body;
    const cart = new Cart({ items, user });
    await cart.save();
    res.status(201).json({ message: 'Cart created successfully', cart });
  } catch (error) {
    console.error('Error creating cart:', error);
    res.status(500).json({ error: 'Failed to create cart' });
  }
};

// Controller to get cart by user ID
export const getCartByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.status(200).json({ cart });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

// Controller to update cart items
export const updateCartItems = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updates = req.body;
    const updatedCart = await Cart.findOneAndUpdate({ user: userId }, updates, { new: true });
    if (!updatedCart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.status(200).json({ message: 'Cart updated successfully', cart: updatedCart });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Failed to update cart' });
  }
};

// Controller to delete cart
export const deleteCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedCart = await Cart.findOneAndDelete({ user: userId });
    if (!deletedCart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (error) {
    console.error('Error deleting cart:', error);
    res.status(500).json({ error: 'Failed to delete cart' });
  }
};
