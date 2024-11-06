import { useEffect, useState } from "react";
import { IProduct } from "../types";
import axios from "axios";
import toast from "react-hot-toast";
import useAuthContext from "../hooks/useAuthContext";

const ProductsList: React.FC = () => {
  const { token } = useAuthContext();
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [error, setError] = useState(false);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/product/list`,
      );

      if (response.data.success) {
        setAllProducts(response.data.products);
        setError(false);
      } else {
        toast.error(response.data.message);
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/product/remove`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            id: productId,
          },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAllProducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  if (error && allProducts) {
    return (
      <section className="flex min-h-screen w-full items-center justify-center">
        <p className="text-2xl font-medium">Error Fetching Products</p>
      </section>
    );
  }

  if (allProducts.length === 0) {
    return (
      <section className="flex min-h-screen w-full items-center justify-center">
        <p className="text-2xl font-medium">No Products to Show</p>
      </section>
    );
  }

  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold">All Products</h1>
      <div className="flex flex-col gap-2">
        {/* products data table header */}
        <div className="hidden grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center border bg-gray-100 px-2 py-1 text-sm md:grid">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Actions</b>
        </div>
        {/* products table data */}
        {allProducts &&
          allProducts.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-[1fr_3fr_1fr] items-center gap-2 border px-2 py-1 text-sm md:grid-cols-[1fr_3fr_1fr_1fr_1fr]"
            >
              {item.image && (
                <img src={item.image[0]} alt={item.name} className="w-12" />
              )}
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className="mx-auto">
                <button
                  onClick={() => deleteProduct(item._id)}
                  className="rounded-full bg-red-400 px-3 py-1 text-white"
                >
                  Delete
                </button>
              </p>
            </div>
          ))}
      </div>
    </section>
  );
};

export default ProductsList;
