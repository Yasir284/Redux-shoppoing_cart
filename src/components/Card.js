import { motion } from "framer-motion";

const btnVarient = {
  initial: {
    scale: 1,
    backgroundColor: "#fff",
    border: "2px solid transparent",
    color: "#0f172a",
  },
  whileHover: {
    scale: 1.2,
    backgroundColor: "#0f172a",
    border: "2px solid #fff",
    color: "#fff",
    transition: {
      scale: { type: "spring", stiffness: 900 },
    },
  },
  whileTap: {
    scale: 0.6,
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
    transition: {
      type: "spring",
      stiffness: 700,
    },
  },
};

function Card({ img, name, price, addItem, description }) {
  return (
    <motion.div
      className="bg-slate-900 rounded-md shadow-xl shadow-[#111111] lg:w-1/4 md:w-1/2 p-4 w-full"
      {...containerVarient}
    >
      <div className="block relative h-48 rounded overflow-hidden">
        <img
          alt="ecommerce"
          className="object-cover object-center w-full h-full block"
          src={img}
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
        Buy now
      </motion.button>
    </motion.div>
  );
}

export default Card;
