import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import Card from "./Card";

const containerVarient = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

function BuyPage() {
  const products = useSelector((store) => store.product);
  return (
    <div className="text-gray-600 body-font container py-12 mx-auto">
      <motion.div
        className="flex flex-row flex-wrap justify-center items-center gap-8 text-center"
        {...containerVarient}
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
