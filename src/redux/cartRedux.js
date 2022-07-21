import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      state.quantity -= 1;
      // state.products.splice(state.products.length-1, 1)
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      state.products.filter((_, i) => i !== index);
      state.total -= action.payload.price * action.payload.quantity;
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
