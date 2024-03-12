// CartContext.js
import { createContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CLEAR_CART = 'CLEAR_CART';
const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
const DECREASE_QUANTITY = 'DECREASE_QUANTITY';

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItemIndex = state.items.findIndex((item) => item.productId === action.payload.productId);
      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        return { ...state, items: updatedItems };
      } else {
        // If the product doesn't exist in the cart, add it
        return { ...state, items: [...state.items, action.payload] };
      }
    }

    case REMOVE_FROM_CART: {
      const updatedItems = state.items.filter((item) => item.productId !== action.payload.productId);
      return { ...state, items: updatedItems };
    }
    case CLEAR_CART:
      return { ...state, items: [] };
    case INCREASE_QUANTITY: {
      const updatedItems = state.items.map((item) => (item.productId === action.payload.productId ? { ...item, quantity: item.quantity + 1 } : item));
      return { ...state, items: updatedItems };
    }
    case DECREASE_QUANTITY: {
      const updatedItems = state.items.map((item) => (item.productId === action.payload.productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
      return { ...state, items: updatedItems };
    }
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const storedCartState = JSON.parse(localStorage.getItem('cartState')) || { items: [] };

  const [state, dispatch] = useReducer(cartReducer, storedCartState);

  useEffect(() => {
    const saveStateToLocalStorage = () => {
      try {
        localStorage.setItem('cartState', JSON.stringify(state));
      } catch (error) {
        console.error('Error saving cart state to localStorage:', error);
      }
    };

    saveStateToLocalStorage();

    return saveStateToLocalStorage;
  }, [state]);

  const addToCart = (item) => {
    dispatch({ type: ADD_TO_CART, payload: item });
  };

  const removeFromCart = (item) => {
    dispatch({ type: REMOVE_FROM_CART, payload: item });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const increaseQuantity = (productId) => {
    dispatch({ type: INCREASE_QUANTITY, payload: { productId } });
  };

  const decreaseQuantity = (productId) => {
    dispatch({ type: DECREASE_QUANTITY, payload: { productId } });
  };

  return <CartContext.Provider value={{ state, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity }}>{children}</CartContext.Provider>;
};

export { CartProvider, CartContext };
