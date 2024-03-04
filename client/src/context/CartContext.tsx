import React, {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "CLEAR_CART" }
  | { type: "DECREASE_QUANTITY"; payload: string }
  | { type: "INCREASE_QUANTITY"; payload: string };

interface CartContextType {
  state: CartState;
  dispatch: Dispatch<CartAction>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.product.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex].quantity += 1;
        return { cartItems: updatedCartItems };
      } else {
        return {
          cartItems: [
            ...state.cartItems,
            { product: action.payload, quantity: 1 },
          ],
        };
      }

    case "REMOVE_FROM_CART":
      const updatedCartItems = state.cartItems.filter(
        (item) => item.product.id !== action.payload
      );
      return { cartItems: updatedCartItems };

    case "CLEAR_CART":
      return { cartItems: [] };

    case "DECREASE_QUANTITY":
      const decreasedItemIndex = state.cartItems.findIndex(
        (item) => item.product.id === action.payload
      );

      if (decreasedItemIndex !== -1) {
        const updatedCartItems = [...state.cartItems];
        if (updatedCartItems[decreasedItemIndex].quantity > 1) {
          updatedCartItems[decreasedItemIndex].quantity -= 1;
        } else {
          updatedCartItems.splice(decreasedItemIndex, 1);
        }

        return { cartItems: updatedCartItems };
      } else {
        return state;
      }

    case "INCREASE_QUANTITY":
      const increasedItemIndex = state.cartItems.findIndex(
        (item) => item.product.id === action.payload
      );

      if (increasedItemIndex !== -1) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[increasedItemIndex].quantity += 1;

        return { cartItems: updatedCartItems };
      } else {
        return state;
      }

    default:
      return state;
  }
};

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const storedCart = localStorage.getItem("cart");
  const initialCart = storedCart ? JSON.parse(storedCart) : { cartItems: [] };

  const [state, dispatch] = useReducer(cartReducer, initialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart hook must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
