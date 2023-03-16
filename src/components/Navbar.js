import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const childVarient = {
  hide: {
    x: ["-100vh"],
  },
  show: {
    x: 0,
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 120,
    },
  },
};

function Navbar() {
  const location = useLocation();
  const totalItems = useSelector((state) => state.cart.totalQuantity);

  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  return (
    <nav className="sticky top-0 right-0 z-20 py-6 px-20 flex flex-row justify-between items-center text-white bg-slate-900">
      <motion.h1 className="font-extrabold text-2xl" {...childVarient}>
        Shopping App
      </motion.h1>

      <div className="relative font-bold hover: flex flex-row justify-center items-center gap-6">
        <Link to="/">
          <div
            className={`text-white py-2 border-solid border-b-2 transition-all ease-in-out duration-300 cursor-pointer
              ${active === "/" ? "border-white" : "border-transparent"}`}
          >
            <p>HOME</p>
          </div>
        </Link>
        <Link to="/cart">
          <div
            className={`text-white py-2 border-solid border-b-2 transition-all ease-in-out duration-300 cursor-pointer
              ${active === "/cart" ? "border-white" : "border-transparent"}`}
          >
            <p>CART</p>
            {totalItems > 0 && (
              <div className="absolute -top-0 -right-6 w-5 h-5 rounded-full bg-white bg-opacity-90 text-slate-900 flex justify-center items-center text- text-xm">
                {totalItems}
              </div>
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
