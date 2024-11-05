import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password required"),
});

export const addProductFormSchema = z
  .object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Product description is required"),
    price: z.number().positive("Product price must be a positive number"),
    category: z.enum(["Men", "Women", "Kids"], {
      message: "Category is required",
    }),
    subCategory: z.enum(["Topwear", "Bottomwear", "Winterwear"], {
      message: "Subcategory is required",
    }),
    sizes: z
      .array(z.enum(["S", "M", "L", "XL", "XXL"]))
      .min(1, "Select atleast one size for the product"),
    bestseller: z.boolean(),
    image1: z
      .instanceof(File)
      .nullable()
      .optional()
      .refine((file) => !file || file?.type.startsWith("image/"), {
        message: "Image 1 must be a valid image file",
      }),
    image2: z
      .instanceof(File)
      .nullable()
      .optional()
      .refine((file) => !file || file?.type.startsWith("image/"), {
        message: "Image 2 must be a valid image file",
      }),
    image3: z
      .instanceof(File)
      .nullable()
      .optional()
      .refine((file) => !file || file?.type.startsWith("image/"), {
        message: "Image 3 must be a valid image file",
      }),
    image4: z
      .instanceof(File)
      .nullable()
      .optional()
      .refine((file) => !file || file?.type.startsWith("image/"), {
        message: "Image 4 must be a valid image file",
      }),
  })
  .refine(
    (data) => {
      return data.image1 || data.image2 || data.image3 || data.image4;
    },
    {
      message: "Upload atleast one image",
      path: ["image1"],
    },
  );

export type ILoginForm = z.infer<typeof loginFormSchema>;
export type IAddProductFormSchema = z.infer<typeof addProductFormSchema>;
