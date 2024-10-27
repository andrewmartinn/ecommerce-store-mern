import SectionHeader from "../components/SectionHeader";
import useShopContext from "../hooks/useShopContext";

const Orders: React.FC = () => {
  const { products, currency } = useShopContext();

  return (
    <section className="border-t pt-10">
      <div className="text-xl sm:text-2xl">
        <SectionHeader primaryTitle="My" accentTitle="Orders" />
      </div>
      {/* orders history list */}
      <div>
        {products.slice(1, 4).map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-4 border-t py-4 text-gray-700 md:flex-row md:items-center md:justify-between"
          >
            {/* product info */}
            <div className="flex items-start gap-6 text-sm">
              <img
                src={item.image[0]}
                alt={`${item.name} image`}
                className="w-16 sm:w-20"
              />
              <div>
                <p className="font-medium sm:text-base">{item.name}</p>
                <div className="mt-2 flex items-center gap-3 text-base text-gray-700">
                  <p className="text-base">
                    {currency} {item.price}
                  </p>
                  <p className="text-base">Quantity: 1</p>
                  <p className="text-base">Size: M</p>
                </div>
                <p className="mt-2">
                  Order Date:{" "}
                  <span className="text-gray-400">
                    {new Date().toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
            {/* order status */}
            <div className="flex justify-between md:w-1/2">
              <div className="flex items-center gap-2">
                <p className="h-2 min-w-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">Product Shipped</p>
              </div>
              <button className="rounded-sm border px-4 py-2 text-sm font-medium">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Orders;
