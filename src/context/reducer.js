import { ADD_ITEM, REMOVE_ITEM, BUY_ITEM } from "./action.type";

import { toast } from "react-toastify";

const ItemReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      console.log("state : ", state);
      let itemRepeated = state.filter((item) => {
        return item?.id === action?.payload?.id;
      });
      if (itemRepeated.length > 0) {
        toast("Item is already added", { type: "warning" });
        return state;
      } else {
        toast("Item added to cart", { type: "success" });
        return [...state, action.payload];
      }
    }

    case REMOVE_ITEM: {
      return state.filter((item) => item.id !== action.payload);
    }

    case BUY_ITEM: {
      state = [];
      toast("Payment sucessfull", { type: "success" });
      return state;
    }

    default:
      return state;
  }
};

export default ItemReducer;
