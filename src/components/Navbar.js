import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ItemContext from "../context/ItemContext";

const navVarient = {
  hide: {
    y: ["-100vh"],
  },
  show: {
    y: 0,
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 80,
      mass: 0.4,
      when: "beforeChildren",
      staggerChildren: 0.4,
    },
  },
};

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
  const { active, setActive } = useContext(ItemContext);

  const listItems = [
    {
      id: 1,
      name: "HOME",
      link: "/",
      handleClick: (link) => {
        setActive(link);
      },
    },
    {
      id: 2,
      name: "CART",
      link: "/cart",
      handleClick: (link) => {
        setActive(link);
      },
    },
  ];

  return (
    <motion.nav
      className="sticky top-0 z-50 py-6 px-20 flex flex-row justify-between items-center text-white dark:bg-slate-900"
      variants={navVarient}
      initial="hide"
      animate="show"
    >
      <motion.h1 className="font-extrabold text-2xl" variants={childVarient}>
        Shopping App
      </motion.h1>

      <ul className="font-bold hover: flex flex-row justify-center items-center gap-6">
        {listItems.map((item) => {
          return (
            <Link
              to={item.link}
              key={item.id}
              onClick={() => item.handleClick(item.link)}
            >
              <li
                className={`py-2 border-solid border-b-2 transition-all ease-in-out duration-300 cursor-pointer
              ${
                active === item.link
                  ? "text-white border-white"
                  : "text-gray-500 border-transparent"
              }`}
              >
                {item.name}
              </li>
            </Link>
          );
        })}
      </ul>
    </motion.nav>
  );
}

export default Navbar;
