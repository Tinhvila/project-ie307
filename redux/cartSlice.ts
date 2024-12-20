import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartItem } from '../types/cartItem.type';
import { FETCH_USER_API } from '../api/fetchIp';

const apiBaseUrl = FETCH_USER_API;

type CartState = {
  items: CartItem[];
  loading: boolean;
  error: string | null;
};

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiBaseUrl}/${id}`);
      return response.data.cart;
    } catch (error) {
      return rejectWithValue('Không thể tải giỏ hàng');
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ id, item }: { id: string; item: CartItem }, { rejectWithValue }) => {
    try {
      const userResponse = await axios.get(`${apiBaseUrl}/${id}`);
      const currentCart = userResponse.data.cart;

      const existingItemIndex = currentCart.findIndex(
        (cartItem: CartItem) => cartItem.id === item.id
      );

      let updatedCart;
      if (existingItemIndex > -1) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng
        updatedCart = currentCart.map((cartItem: CartItem, index: number) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm mới
        updatedCart = [...currentCart, item];
      }

      const response = await axios.patch(`${apiBaseUrl}/${id}`, {
        cart: updatedCart,
      });

      return response.data.cart;
    } catch (error) {
      return rejectWithValue('Không thể thêm sản phẩm vào giỏ hàng');
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (
    { id, itemId }: { id: string; itemId: string },
    { rejectWithValue }
  ) => {
    try {
      const userResponse = await axios.get(`${apiBaseUrl}/${id}`);
      const currentCart = userResponse.data.cart;

      const updatedCart = currentCart.filter(
        (item: CartItem) => item.id !== itemId
      );

      const response = await axios.patch(`${apiBaseUrl}/${id}`, {
        cart: updatedCart,
      });
      return response.data.cart;
    } catch (error) {
      return rejectWithValue('Không thể xóa sản phẩm khỏi giỏ hàng');
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async (
    { id, itemId, quantity }: { id: string; itemId: string; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const userResponse = await axios.get(`${apiBaseUrl}/${id}`);
      const currentCart = userResponse.data.cart;

      const updatedCart = currentCart.map((item: CartItem) =>
        item.id === itemId ? { ...item, quantity } : item
      );

      const response = await axios.patch(`${apiBaseUrl}/${id}`, {
        cart: updatedCart,
      });
      return response.data.cart;
    } catch (error) {
      return rejectWithValue('Không thể cập nhật số lượng sản phẩm');
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${apiBaseUrl}/${id}`, {
        cart: [],
      });
      return response.data.cart;
    } catch (error) {
      return rejectWithValue('Không thể xóa giỏ hàng');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Clear Cart
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
