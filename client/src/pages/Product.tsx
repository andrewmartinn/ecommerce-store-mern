import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProduct } from "../types";
import useShopContext from "../hooks/useShopContext";
import { assets } from "../assets/ui-assets/data";
import RelatedProducts from "../components/RelatedProducts";

const Product: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products, currency } = useShopContext();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [productData, setProductData] = useState<IProduct | undefined>(
    undefined,
  );

  const fetchProductData = useCallback(async () => {
    const currentProduct = products.find((item) => item._id === productId);
    setSelectedImage(currentProduct?.image[0] || "");
    setProductData(currentProduct || undefined);
    console.log(currentProduct);
  }, [productId, products]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  return (
    <section>
      {productData ? (
        <div className="border-t p-10">
          <div className="flex flex-col gap-12 sm:flex-row sm:gap-12">
            {/* product images section */}
            <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
              {/* product preview images */}
              <div className="product-preview-scroll flex w-full justify-between overflow-x-auto sm:w-[18.7%] sm:flex-col sm:justify-normal sm:overflow-y-scroll">
                {productData.image.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${productData.name} image ${idx + 1}`}
                    className="w-[24%] flex-shrink-0 cursor-pointer sm:mb-3 sm:w-full"
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
              {/* selected product image */}
              <div className="w-full sm:w-[80%]">
                <img
                  src={selectedImage}
                  alt={`${productData.name} image`}
                  className="h-auto w-full"
                />
              </div>
            </div>
            {/* product info section */}
            <div className="flex-1">
              <h1 className="mt-2 text-2xl font-medium">{productData.name}</h1>
              {/* product rating */}
              <div className="mt-2 flex items-center gap-1">
                {Array.from({ length: 4 }, (_, idx) => (
                  <img
                    key={idx}
                    src={assets.star_icon}
                    alt="rating star icon"
                    className="w-3.5"
                  />
                ))}
                <img
                  src={assets.star_dull_icon}
                  alt="rating star icon"
                  className="w-3.5"
                />
                <p className="pl-2">(122)</p>
              </div>
              <p className="mt-5 text-2xl font-medium">
                {currency} {productData.price}
              </p>
              <p className="mt-5 text-gray-500 md:w-4/5">
                {productData.description}
              </p>
              {/* product size select */}
              <div className="my-8 flex flex-col gap-4">
                <p>Select Size</p>
                <div className="flex items-center gap-2">
                  {productData.sizes.map((item, idx) => (
                    <button
                      key={idx}
                      className={`border bg-gray-100 px-4 py-2 ${selectedSize === item ? "border-orange-500" : ""}`}
                      onClick={() => setSelectedSize(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <button className="bg-black px-8 py-3 text-sm uppercase text-white active:bg-gray-700">
                Add To Cart
              </button>
              <hr className="mt-8 sm:w-4/5" />
              <div className="mt-5 flex flex-col gap-1 text-sm text-gray-500">
                <p>100% Original Product</p>
                <p>Cash on delivery is available on this product</p>
                <p>Easy return and exchange policy within 7 days</p>
              </div>
            </div>
          </div>
          {/* product info and review section */}
          <div className="mt-20">
            <div className="flex">
              <b className="border px-5 py-3 text-sm">Description</b>
              <p className="border px-5 py-3 text-sm">Reviews (122)</p>
            </div>
            <div className="flex flex-col gap-4 border p-6 text-sm text-gray-500">
              <p>
                This premium product is crafted from high-quality materials,
                ensuring durability and comfort. Designed with attention to
                detail, it features a stylish finish that complements any
                outfit. Whether for casual or formal occasions, this item stands
                out with its unique blend of functionality and aesthetics,
                making it a must-have addition to your wardrobe.
              </p>
              <p>
                Our brand is committed to sustainability and ethical production.
                We source materials responsibly and work closely with artisans
                to support local communities. Experience the perfect combination
                of quality and style with every purchase, knowing you’re making
                a positive impact.
              </p>
            </div>
          </div>
          {/* related products */}
          <RelatedProducts
            category={productData.category}
            subCategory={productData.subCategory}
          />
        </div>
      ) : (
        <div className="flex min-h-[50dvh] items-center justify-center border-t p-10">
          <p className="text-center text-2xl font-medium">Product not found</p>
        </div>
      )}
    </section>
  );
};

export default Product;
