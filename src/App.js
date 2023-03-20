import { useEffect, useState } from "react";
import BuyPage from "./components/BuyPage";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Switch, Route, useLocation } from "react-router-dom";
import Axios from "axios";

import {
  randWord,
  randAmount,
  randUuid,
  randProductDescription,
  randColor,
} from "@ngneat/falso";

import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();
  const [products, setProduct] = useState();

  const fetchData = async () => {
    const { data } = await Axios.get(process.env.REACT_APP_API_URL, {
      headers: {
        Authorization: process.env.REACT_APP_API_KEY,
      },
    });
    const { photos } = data;

    const allProducts = photos.map((photo) => {
      return {
        id: randUuid(),
        smallImage: photo?.src?.medium,
        tinyImage: photo?.src?.small,
        productName: randWord().toUpperCase(),
        productPrice: randAmount(),
        productDescription: randProductDescription(),
        productColor: randColor(),
      };
    });
    setProduct(allProducts);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <ToastContainer position="bottom-right" theme="dark" autoClose={2000} />
      <AnimatePresence mode="wait">
        <Switch location={location} key={location.pathname}>
          <Route exact path="/">
            <BuyPage products={products} />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
        </Switch>
      </AnimatePresence>
    </>
  );
}

export default App;
