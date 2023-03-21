import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  randWord,
  randAmount,
  randUuid,
  randProductDescription,
  randColor,
} from "@ngneat/falso";
import { toast } from "react-toastify";

export const fetchData = createAsyncThunk("product/data", async () => {
  const { data } = await axios.get(process.env.REACT_APP_API_URL, {
    headers: {
      Authorization: process.env.REACT_APP_API_KEY,
    },
  });
  return data.photos;
});

const productSlice = createSlice({
  name: "product",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      return action.payload.map((photo) => {
        return {
          id: randUuid(),
          smallImage: photo?.src?.medium,
          tinyImage: photo?.src?.small,
          productName: randWord().toUpperCase(),
          productPrice: randAmount(),
          productDescription: randProductDescription(),
          productColor: randColor(),
        };
      });
    });

    builder.addCase(fetchData.rejected, () => {
      toast("Failed to fetch the data", { type: "error" });
    });
  },
});

export default productSlice;
