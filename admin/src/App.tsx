import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AddProduct from "./pages/AddProduct";
import Orders from "./pages/Orders";
import ProductsList from "./pages/ProductsList";
import Login from "./components/Login";
import useAuthContext from "./hooks/useAuthContext";
import Loading from "./components/Loading";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen font-outfit">
      {!isAuthenticated ? (
        <Login />
      ) : (
        <>
          <Navbar />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="ml-[max(5vw 25px)] mx-auto my-8 w-[70%] text-base text-gray-600">
              <Routes>
                <Route path="/add" element={<AddProduct />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/products" element={<ProductsList />} />
              </Routes>
            </div>
          </div>
          <Toaster position="top-right" />
        </>
      )}
    </div>
  );
};

export default App;
