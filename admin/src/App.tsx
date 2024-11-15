import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import useAuthContext from "./hooks/useAuthContext";
import Loading from "./components/Loading";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("./components/Login"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const ProductsList = lazy(() => import("./pages/ProductsList"));
const Orders = lazy(() => import("./pages/Orders"));

const App: React.FC = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <div className="min-h-screen font-outfit">
      {!isAuthenticated ? (
        <Suspense fallback={<Loading />}>
          <Login />
        </Suspense>
      ) : (
        <>
          <Navbar />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="ml-[max(5vw 25px)] mx-auto my-8 w-[70%] text-base text-gray-600">
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<AddProduct />} />
                  <Route path="/add" element={<AddProduct />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/products" element={<ProductsList />} />
                </Routes>
              </Suspense>
            </div>
          </div>
          <Toaster position="top-right" />
        </>
      )}
    </div>
  );
};

export default App;
