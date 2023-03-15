import React, { useReducer, useEffect, useState } from "react";

import ItemContext from "./context/ItemContext";
import ItemReducer from "./context/reducer";
import BuyPage from "./components/BuyPage";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
import { Switch, Route, useLocation } from "react-router-dom";
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
  const [cartItem, dispatch] = useReducer(ItemReducer, []);
  // const localUrl = "https://myjson.dit.upm.es/api/bins/ee5y";
  const apiKey = "563492ad6f917000010000014d95bc45a7a140b38883a96905e6de6c";
  const url = "https://api.pexels.com/v1/search?query=shoes&per_page=21&page=1";

  const [products, setProduct] = useState([]);
  const [active, setActive] = useState(location.pathname);

  const fetchData = async () => {
    debugger;
    const { data } = await Axios.get(url, {
      headers: {
        Authorization: apiKey,
      },
    });
    const { photos } = data;

    const allProducts = photos.map((photo) => {
      return {
        smallImage: photo?.src?.medium,
        tinyImage: photo?.src?.small,
        productName: randWord().toUpperCase(),
        productPrice: randAmount(),
        id: randUuid(),
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
      <ItemContext.Provider
        value={{ cartItem, dispatch, products, active, setActive }}
      >
        <Navbar />
        <ToastContainer position="top-left" theme="dark" autoClose={2000} />
        <AnimatePresence mode="wait">
          <Switch location={location} key={location.key}>
            <Route exact path="/">
              <BuyPage />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
          </Switch>
        </AnimatePresence>
      </ItemContext.Provider>
    </>
  );
}

export default App;
