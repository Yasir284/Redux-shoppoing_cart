import { useContext } from "react";
import ItemContext from "../context/ItemContext";
import { ADD_ITEM } from "../context/action.type";
import { motion } from "framer-motion";

import Card from "./Card";

const containerVarient = {
  hide: {
    x: "-100vw",
  },
  show: {
    x: 0,
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 80,
      mass: 0.6,
    },
  },
  exit: {
    x: "-100vw",
    transition: {
      ease: "easeOut",
    },
  },
};

function BuyPage() {
  const { dispatch, products } = useContext(ItemContext);

  return (
    <div className="text-gray-600 body-font container px-5 py-24 mx-auto">
      <motion.div
        className="flex flex-row flex-wrap justify-center items-center gap-8 -m-4 text-center"
        variants={containerVarient}
        initial="hide"
        animate="show"
        exit="exit"
      >
        {products.map((product) => (
          <Card
            key={product.id}
            img={product.smallImage}
            name={product.productName}
            price={product.productPrice}
            description={product.productDescription}
            addItem={() => {
              debugger;
              return dispatch({
                type: ADD_ITEM,
                payload: product,
              });
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default BuyPage;
