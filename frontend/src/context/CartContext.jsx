// CartContext.js
import { createContext, useReducer, useEffect } from 'react';
// import cartApi from '../api/cartApi';

const CartContext = createContext();

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CLEAR_CART = 'CLEAR_CART';

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, items: [...state.items, action.payload] };
    case REMOVE_FROM_CART: {
      const updatedItems = state.items.filter((item) => item.id !== action.payload.id);
      return { ...state, items: updatedItems };
    }
    case CLEAR_CART:
      return { ...state, items: [] };
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

  return <CartContext.Provider value={{ state, addToCart, removeFromCart, clearCart }}>{children}</CartContext.Provider>;
};

export { CartProvider, CartContext };
