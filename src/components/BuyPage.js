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

function BuyPage({ products }) {
  return (
    <div className="text-gray-600 body-font container py-12 mx-auto">
      <motion.div
        className="flex flex-row flex-wrap justify-center items-center gap-8 text-center"
        variants={containerVarient}
        initial="hide"
        animate="show"
        exit="exit"
      >
        {products?.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            smallImage={product.smallImage}
            tinyImage={product.tinyImage}
            name={product.productName}
            price={product.productPrice}
            productColor={product.productColor}
            description={product.productDescription}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default BuyPage;
