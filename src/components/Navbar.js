import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineShopping, AiOutlineHome } from "react-icons/ai";

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
            className={`text-white pb-1 border-solid border-b-2 transition-all ease-in-out duration-300 cursor-pointer
              ${active === "/" ? "border-white" : "border-transparent"}`}
          >
            <AiOutlineHome size="1.8rem" />
          </div>
        </Link>
        <Link to="/cart">
          <div
            className={`text-white pb-1 border-solid border-b-2 transition-all ease-in-out duration-300 cursor-pointer
              ${active === "/cart" ? "border-white" : "border-transparent"}`}
          >
            <AiOutlineShopping size="1.8rem" />
            {totalItems > 0 && (
              <div className="absolute -top-2 -right-4 w-5 h-5 rounded-full bg-white text-slate-900 flex justify-center items-center text- text-xm">
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
