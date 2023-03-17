import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart.slice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const containerVarient = {
  initial: {
    x: "100vw",
  },
  animate: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      mass: 0.6,
    },
  },
  exit: {
    x: "100vw",
    transition: {
      ease: "easeOut",
    },
  },
};

const btnVarient = {
  initial: {
    scale: 1,
    backgroundColor: "#a78bfa",
    color: "#111827",
    border: "2px solid transparent",
  },
  whileHover: {
    scale: [1, 1.1],
    backgroundColor: "#111827",
    color: "#a78bfa",
    border: "2px solid #a78bfa",
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      scale: { duration: 0.5, repeat: Infinity, repeatType: "mirror" },
    },
  },
};

function Cart() {
  const cartItem = useSelector((state) => state.cart.itemsList);
  const dispatch = useDispatch();

  const totalPrice = () => {
    return Math.round(
      cartItem
        .map((item) => item.totalPrice)
        .reduce((prev, next) => prev + next, 0)
    );
  };

  const addItem = (id) => {
    try {
      dispatch(cartActions.addItem({ id }));
      toast("Item added to cart", { type: "success" });
    } catch {
      toast("Failed to add item in the cart", { type: "error" });
    }
  };

  const removeItem = (id) => {
    dispatch(cartActions.removeItem({ id }));
  };

  return (
    <motion.div
      {...containerVarient}
      className="mx-auto mt-10 rounded-md max-w-3xl p-6 sm:p-10 bg-gray-900 text-gray-100 shadow-lg
    shadow-[#111111]"
    >
      <h2 className="text-xl font-semibold">Your cart</h2>
      <ul className="flex flex-col divide-y h-[50vh] divide-gray-700 overflow-y-scroll px-6 customScrollbar">
        {cartItem.length > 0 ? (
          cartItem?.map((item) => {
            return (
              <motion.li
                key={item.id}
                layoutId={item.id}
                layout="position"
                className="flex flex-col py-6 sm:flex-row sm:justify-between"
              >
                <div className="flex w-full space-x-2 sm:space-x-4">
                  {/* Product Image */}
                  <img
                    className="flex-shrink-0 object-cover w-20 h-20 border-transparent rounded outline-none sm:w-32 sm:h-32 bg-gray-500"
                    src={item.tinyImage}
                    alt="img"
                  />

                  <div className="flex flex-col justify-between w-full pb-4">
                    {/* Product info */}
                    <div className="flex justify-between w-full pb-2 space-x-2">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {item.productColor}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">
                          ₹ {Math.round(item.totalPrice)}
                        </p>
                        <p className="text-sm line-through text-gray-600">
                          ₹{" "}
                          {Math.round(
                            item.totalPrice + (item.price * 25) / 100
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Add and remove item button */}
                    <div className="flex text-sm flex-row gap-4">
                      <button onClick={() => removeItem(item.id)}>
                        <FaMinus />
                      </button>
                      <div className="rounded-sm w-10 text-center font-semibold bg-white text-slate-900">
                        {item.quantity}
                      </div>
                      <button onClick={() => addItem(item.id)}>
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.li>
            );
          })
        ) : (
          <p className="my-20 text-base text-center text-gray-400">
            No item in the cart
          </p>
        )}
      </ul>
      <div className="space-y-1 text-right">
        <p>
          Total amount : <span className="font-semibold">₹ {totalPrice()}</span>
        </p>
        <p className="text-sm text-gray-400">
          Not including taxes and shipping costs
        </p>
      </div>
      <div className="flex justify-end items-center gap-6 space-x-4">
        <Link to="/">
          <FaArrowLeft
            type="button"
            className="text-2xl text-violet-400 hover:text-white hover:scale-125 transition-all ease-in-out duration-300"
          />
        </Link>
        {cartItem.length > 0 ? (
          <motion.button
            {...btnVarient}
            className="px-6 py-2 rounded-md bg-violet-400 text-gray-900 border-violet-400"
          >
            <span>Buy Products</span>
          </motion.button>
        ) : (
          <button className="px-6 py-2 rounded-md bg-gray-400 text-gray-600">
            Buy Products
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default Cart;
