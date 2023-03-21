import { useEffect } from "react";
import BuyPage from "./components/BuyPage";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { fetchData } from "./store/products.slice";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  // const [products, setProduct] = useState();

  // const fetchData = async () => {
  //   const { data } = await Axios.get(process.env.REACT_APP_API_URL, {
  //     headers: {
  //       Authorization: process.env.REACT_APP_API_KEY,
  //     },
  //   });
  //   const { photos } = data;

  //   const allProducts = photos.map((photo) => {
  //     return {
  //       id: randUuid(),
  //       smallImage: photo?.src?.medium,
  //       tinyImage: photo?.src?.small,
  //       productName: randWord().toUpperCase(),
  //       productPrice: randAmount(),
  //       productDescription: randProductDescription(),
  //       productColor: randColor(),
  //     };
  //   });
  //   setProduct(allProducts);
  // };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <ToastContainer position="bottom-right" theme="dark" autoClose={2000} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.key}>
          <Route path="/" element={<BuyPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
