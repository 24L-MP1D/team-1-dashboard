"use client";

import * as yup from "yup";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { uplaodImage } from "../../functions/ImageCloud";
import { createProduct } from "@/app/functions/product";
import { ProductInfoInput } from "./productInfoInput";
import { ImageInput } from "./imageInput";
import { Sale } from "./sale";
import { RemainingAmount } from "./remainingAmout";
import { Category } from "./category";
import { Coupon } from "./coupon";
import { Link, MoveLeft } from "lucide-react";

export interface size {
  Name: string;
  qty: number;
}

export interface FormValues {
  productName: string;
  description: string;
  productCode: string;
  images: [];
  price: number;
  sizes: size[];
  categoryId: string;
  sale: number;
  productImageFiles: [];
  coupon: string;
}

export default function Page() {
  const initialValues: FormValues = {
    productName: "",
    description: "",
    productCode: "",
    images: [],
    productImageFiles: [],
    price: 0,
    sizes: [
      { Name: "Free", qty: 0 },
      { Name: "S", qty: 0 },
      { Name: "M", qty: 0 },
      { Name: "L", qty: 0 },
      { Name: "XL", qty: 0 },
      { Name: "2XL", qty: 0 },
      { Name: "3XL", qty: 0 }
    ],
    categoryId: "",
    sale: 0,
    coupon: ""
  };

  const validationSchema = yup.object({
    productName: yup.string().required("name required"),
    description: yup.string().required("description required"),
    productCode: yup.string().required("product code required"),
    productImageFiles: yup.array().min(1),
    price: yup.number().min(100),
    categoryId: yup.string().required("category required")
  });

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues,
    onSubmit: async () => {
      setLoading(true);

      // Log initial values
      console.log("Initial values:", formik.values);

      // Ensure all image uploads are completed
      const urls = await uplaodImage(formik.values.productImageFiles);

      // Update Formik state with the new URLs
      await formik.setFieldValue("images", urls);

      // Check if coupon is empty and set to null
      if (formik.values.coupon === "") {
        await formik.setFieldValue("coupon", null);
      }

      // Get the updated images after setting the new value
      const updatedImages = formik.values.images; // This might still show old value
      console.log("Updated images before createProduct:", updatedImages);

      // Create the product with updated Formik values
      await createProduct({
        ...formik.values,
        images: urls // Directly use the new URLs here
      });

      setLoading(false);
    }
  });

  console.log(formik.values);

  if (loading) {
    return <span>Loading</span>;
  }

  return (
    <div className="flex-1">
      <div className=" bg-white p-2">
        <a className="flex gap-4 items-center p-4" href="/product">
          <MoveLeft size={25} />
          <span>Бүтээгдэхүүн нэмэх</span>
        </a>
      </div>
      <form
        className="grid grid-cols-2 gap-6 m-8"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col gap-6">
          <ProductInfoInput formik={formik} />
          <ImageInput formik={formik} />
          <Category formik={formik} />
        </div>
        <div className="flex flex-col gap-6">
          <Sale formik={formik} />
          <Coupon formik={formik} />
          <RemainingAmount formik={formik} />

          <div className="flex flex-row-reverse gap-2">
            <Button type="submit" className="bg-green-600 text-white">
              Submit
            </Button>
            <Button type="reset" onClick={formik.handleReset}>
              Clear
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
