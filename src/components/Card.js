import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { cartActions } from "../store/cart.slice";

const btnVarient = {
  initial: {
    scale: 1,
    backgroundColor: "#fff",
    border: "2px solid transparent",
    color: "#0f172a",
  },
  whileHover: {
    scale: 1.1,
    backgroundColor: "#0f172a",
    border: "2px solid #fff",
    color: "#fff",
    transition: {
      scale: { type: "spring", stiffness: 900 },
    },
  },
  whileTap: {
    scale: 0.9,
    transition: {
      type: "spring",
      stiffness: 200,
    },
  },
};

const containerVarient = {
  initial: {
    scale: 1,
  },
  whileHover: {
    scale: 1.1,
  },
};

function Card({
  id,
  smallImage,
  name,
  price,
  description,
  tinyImage,
  productColor,
}) {
  const dispatch = useDispatch();
  const addItem = () => {
    try {
      dispatch(
        cartActions.addItem({ id, name, price, tinyImage, productColor })
      );
      toast("Item added to cart", { type: "success" });
    } catch {
      toast("Failed to add item in the cart", { type: "error" });
    }
  };

  return (
    <motion.div
      className="bg-slate-900 rounded-md shadow-xl shadow-[#111111] p-4 w-80"
      {...containerVarient}
    >
      <div className="block relative h-48 rounded overflow-hidden">
        <img
          alt="ecommerce"
          className="object-cover object-center w-full h-full block"
          src={smallImage}
        />
      </div>
      <div className="text-gray-300 flex flex-row justify-between items-center my-6">
        <h3 className="text-sm tracking-widest title-font">{name}</h3>
        <p>₹ {Math.round(price)}</p>
      </div>
      <p className="text-gray-400 text-sm text-left h-20 mb-4">{description}</p>
      <motion.button
        className="px-8 py-3 rounded-3xl text-slate-900 font-bold bg-white"
        onClick={addItem}
        {...btnVarient}
      >
        Add to cart
      </motion.button>
    </motion.div>
  );
}

export default Card;
