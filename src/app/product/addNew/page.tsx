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

export interface size {
  name: string;
  amount: number;
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
      { name: "Free", amount: 0 },
      { name: "S", amount: 0 },
      { name: "M", amount: 0 },
      { name: "L", amount: 0 },
      { name: "XL", amount: 0 },
      { name: "2XL", amount: 0 },
      { name: "3XL", amount: 0 },
    ],
    categoryId: "",
    sale: 0,
    coupon: "",
  };

  const validationSchema = yup.object({
    productName: yup.string().required("name required"),
    description: yup.string().required("description required"),
    productCode: yup.string().required("product code required"),
    productImageFiles: yup.array().min(1),
    price: yup.number().min(100),
    categoryId: yup.string().required("category required"),
  });

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues,
    onSubmit: async () => {
      setLoading(true);
      console.log(formik.values);
      const urls = await uplaodImage(formik.values.productImageFiles);
      await formik.setFieldValue("images", urls);
      if (formik.values.coupon == "") {
        await formik.setFieldValue("coupon", null);
      }
      await createProduct(formik.values);

      setLoading(false);
    },
    validationSchema,
  });

  console.log(formik.values);

  if (loading) {
    return <span>Loading</span>;
  }

  return (
    <form className="grid grid-cols-2 gap-6 m-8" onSubmit={formik.handleSubmit}>
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
          <Button type="reset">Clear</Button>
        </div>
      </div>
    </form>
  );
}
