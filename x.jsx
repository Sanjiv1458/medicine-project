import { useCallback } from 'react';
import useCart from '../../hooks/useCart';

const Cart = () => {
  const cartContext = useCart();
  const { state, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartContext;

  const handleRemoveFromCart = useCallback(
    (item) => {
      removeFromCart(item);
    },
    [removeFromCart]
  );

  const handleIncreaseQuantity = useCallback(
    (item) => {
      increaseQuantity(item.productId);
    },
    [increaseQuantity]
  );

  const handleDecreaseQuantity = useCallback(
    (item) => {
      decreaseQuantity(item.productId);
    },
    [decreaseQuantity]
  );

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="mx-auto rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6 flex flex-col items-start space-y-2">
        <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">Cart</h3>
        <p className="text-sm text-muted-foreground">Your items</p>
      </div>

      {state.items.length > 0 && (
        <div className="p-0">
          <div className="border-t border-b border-gray-200 dark:border-gray-800">
            {state.items.map((item, index) => (
              <div
                key={index} // Use a unique identifier as the key, such as item.id if available
                className="grid grid-cols-3 items-center py-4 last:pb-4">
                {/* Thumbnail and product details */}
                <div className="mx-auto flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={item.productImg}
                      alt="Thumbnail"
                      width="80"
                      height="80"
                      className="rounded-lg object-cover"
                      style={{ aspectRatio: '80 / 80', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <h3 className="font-medium leading-none">{item.name}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                        onClick={() => handleRemoveFromCart(item)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quantity controls */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                      onClick={() => handleDecreaseQuantity(item)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4">
                        <path d="M5 12h14"></path>
                      </svg>
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                      onClick={() => handleIncreaseQuantity(item)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4">
                        <path d="M5 12h14"></path>
                        <path d="M12 5v14"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Item price */}
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">${item.price.toFixed(2)}</h4>
                </div>
              </div>
            ))}
          </div>

          {/* Cart summary */}
          <div className="p-6 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
            <div className="grid gap-1 md:ml-auto text-sm shrink-0">
              <p className="flex items-center gap-1">
                Subtotal <span className="ml-auto">${calculateSubtotal(state.items).toFixed(2)}</span>
              </p>
              <p className="flex items-center gap-1">
                Shipping <span className="ml-auto">$5.00</span>
              </p>
              <p className="flex items-center gap-1 font-medium">
                Total <span className="ml-auto">${calculateTotal(state.items).toFixed(2)}</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                onClick={handleClearCart}>
                Clear Cart
              </button>
              <button
                className={`inline-flex items-center px-4 py-2 ml-4 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-primary-light focus:ring-4 focus:outline-none focus:ring-primary-light dark:bg-gray-700 dark:hover:bg-primary-dark bg-primary text-primary-foreground hover:bg-primary/90 h-11 md:order-3`}
                onClick={() => console.log('Proceed to checkout')}>
                Proceed to checkout
                <svg
                  className="w-4 h-4 ml-2 text-white dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

// Helper functions
const calculateSubtotal = (items) => items.reduce((total, item) => total + item.price * item.quantity, 0);

const calculateTotal = (items) => calculateSubtotal(items) + 5.0;
