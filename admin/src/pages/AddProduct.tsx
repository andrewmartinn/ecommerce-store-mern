import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { assets } from "../assets/admin-assets/data";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addProductFormSchema,
  IAddProductFormSchema,
} from "../utils/validator";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";
import toast from "react-hot-toast";

const AddProduct: React.FC = () => {
  const { token } = useAuthContext();
  const {
    register,
    control,
    reset,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<IAddProductFormSchema>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: undefined,
      subCategory: undefined,
      sizes: [],
      bestseller: false,
      image1: null,
      image2: null,
      image3: null,
      image4: null,
    },
    resolver: zodResolver(addProductFormSchema),
  });

  const sizesFormValues = useWatch({ control, name: "sizes" });

  const handleSizeToggle = (size: IAddProductFormSchema["sizes"][0]) => {
    // get the current sizes from the form state
    const currentSizes = sizesFormValues || [];

    // filter size if exists or add new size
    const newSizes = currentSizes.includes(size)
      ? currentSizes.filter((s: string) => s !== size)
      : [...currentSizes, size];

    // set to form state
    setValue("sizes", newSizes);

    // clear validation error if a size is selected
    if (newSizes.length > 0) {
      clearErrors("sizes");
    }
  };

  const handleFormSubmit: SubmitHandler<IAddProductFormSchema> = async (
    values,
  ) => {
    try {
      // prepare form data to send images on same request
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price.toString());
      formData.append("category", values.category);
      formData.append("subCategory", values.subCategory);
      formData.append("sizes", JSON.stringify(values.sizes));
      formData.append("bestseller", values.bestseller.toString());

      if (values.image1) formData.append("image1", values.image1);
      if (values.image2) formData.append("image2", values.image2);
      if (values.image3) formData.append("image3", values.image3);
      if (values.image4) formData.append("image4", values.image4);

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/product/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        reset();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <h1 className="text-2xl font-bold">Add Product</h1>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="mt-4 flex w-full flex-col items-start gap-3"
      >
        {/* product images */}
        <div>
          <p className="mb-2">Upload Images</p>
          <div className="flex gap-2">
            {Array.from({ length: 4 }, (_, idx) => (
              <Controller
                key={idx}
                name={`image${idx + 1}` as keyof IAddProductFormSchema}
                control={control}
                render={({ field: { ref, name, onBlur, onChange, value } }) => (
                  <label
                    htmlFor={`image${idx + 1}` as keyof IAddProductFormSchema}
                    className="cursor-pointer"
                  >
                    <input
                      id={`image${idx + 1}` as keyof IAddProductFormSchema}
                      type="file"
                      hidden
                      name={name}
                      ref={ref}
                      onBlur={onBlur}
                      onChange={(e) => {
                        const files = e.target.files;
                        onChange(files ? files[0] : null);
                      }}
                    />
                    <img
                      src={
                        value
                          ? URL.createObjectURL(value as File)
                          : assets.upload_area
                      }
                      alt="upload area image"
                      className="w-20"
                    />
                  </label>
                )}
              />
            ))}
          </div>
          {errors.image1 && (
            <p className="text-sm text-red-500">{errors.image1.message}</p>
          )}
        </div>
        {/* product name */}
        <div className="w-full">
          <p className="mb-2">Product Name</p>
          <input
            type="text"
            className="w-full max-w-[500px] px-3 py-1"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        {/* product description */}
        <div className="w-full">
          <p className="mb-2">Product Description</p>
          <textarea
            className="h-32 w-full max-w-[500px] resize-none px-3"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>
        {/* product category, subcategory, price  */}
        <div className="flex w-full flex-col gap-3">
          <div>
            <p className="mb-2">Product Category</p>
            <select
              className="w-full max-w-[500px] px-3 py-1"
              {...register("category")}
            >
              <option value="">Select category</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>
          <div>
            <p className="mb-2">Product Subcategory</p>
            <select
              className="w-full max-w-[500px] px-3 py-1"
              {...register("subCategory")}
            >
              <option value="">Select Subcategory</option>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
            {errors.subCategory && (
              <p className="text-sm text-red-500">
                {errors.subCategory.message}
              </p>
            )}
          </div>
          <div>
            <p className="mb-2">Product Price</p>
            <input
              type="number"
              className="w-full max-w-[500px] px-3 py-1"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>
        </div>
        {/* product sizes */}
        <div>
          <p className="mb-2">Product Sizes</p>
          <div className="flex items-center gap-3">
            {["S", "M", "L", "XL", "XXL"].map((size, idx) => (
              <div
                key={idx}
                className={`cursor-pointer border bg-slate-200 px-3 py-1 ${sizesFormValues?.includes(size as IAddProductFormSchema["sizes"][0]) ? "bg-pink-200" : ""}`}
                onClick={() =>
                  handleSizeToggle(size as IAddProductFormSchema["sizes"][0])
                }
              >
                {size}
              </div>
            ))}
          </div>
          {errors.sizes && (
            <p className="text-sm text-red-400">{errors.sizes.message}</p>
          )}
        </div>
        <div className="my-3 flex items-center gap-3">
          <input type="checkbox" id="bestseller" {...register("bestseller")} />
          <label htmlFor="bestseller" className="cursor-pointer">
            Add to bestseller
          </label>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black py-2 uppercase text-white hover:opacity-80 disabled:opacity-60 sm:max-w-[500px]"
        >
          {isSubmitting ? "Submitting" : "Add Product"}
        </button>
      </form>
    </section>
  );
};

export default AddProduct;
