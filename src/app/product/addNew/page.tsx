"use client";

import * as yup from "yup";
import { useFormik, FormikErrors, Formik } from "formik";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Plus, X } from "lucide-react";
import { ComboboxDemo } from "@/components/collapse";
import { getCategories } from "@/app/functions/category";

interface size {
  name: string;
  amount: number;
}

interface FormValues {
  name: string;
  description: string;
  productCode: string;
  productImages: [];
  price: number;
  sizes: size[];
  categoryId: string;
}

export default function Page() {
  const initialValues: FormValues = {
    name: "",
    description: "",
    productCode: "",
    productImages: [],
    price: 0,
    sizes: [
      { name: "Free", amount: 0 },
      { name: "S", amount: 0 },
      { name: "M", amount: 0 },
      { name: "L", amount: 0 },
      { name: "XL", amount: 0 },
      { name: "2XL", amount: 0 },
      { name: "3XL", amount: 0 }
    ],
    categoryId: ""
  };

  const formik = useFormik({
    initialValues,
    onSubmit: () => {}
  });
  return (
    <form className="grid grid-cols-2 gap-6 m-8" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-6">
        <ProductInfoInput formik={formik} />
        <ImageInput formik={formik} />
        <RemainingAmount formik={formik} />
      </div>
      <div>
        <Category formik={formik} />
      </div>
    </form>
  );
}

const ProductInfoInput = ({ formik }: { formik: any }) => {
  return (
    <div className="flex flex-col gap-4 rounded-[12px] p-6 bg-white">
      <div>
        <span className="text-sm font-semibold mb-2">Бүтээгдэхүүний нэр</span>
        <Input
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="Нэр"
        />
      </div>
      <div>
        <span className="text-sm font-semibold mb-2">Нэмэлт мэдээлэл</span>
        <Textarea
          id="description"
          value={formik.values.description}
          rows={2}
          className="resize-none"
          onChange={formik.handleChange}
          placeholder="Гол онцлог, давуу тал, техникийн үзүүлэлтүүдийг онцолсон дэлгэрэнгүй, сонирхолтой тайлбар."
        />
      </div>
      <div>
        <span className="text-sm font-semibold mb-2">Барааны код</span>
        <Input
          id="productCode"
          value={formik.values.productCode}
          onChange={formik.handleChange}
          placeholder="#12345678"
        />
      </div>
    </div>
  );
};

const ImageInput = ({ formik }: { formik: any }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          setImages((prevImages) => {
            const updatedImages = [...prevImages, ...newImages];
            formik.setFieldValue("productImages", updatedImages); // Update Formik state
            return updatedImages;
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const deleteImage = (img: string) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((image) => image !== img);
      formik.setFieldValue("productImages", updatedImages); // Update Formik state
      return updatedImages;
    });
  };

  return (
    <div className="rounded-[12px] p-6 bg-white">
      <span className="font-semibold text-sm">Бүтээгдэхүүний зураг</span>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
      <div className="flex gap-2 flex-wrap mt-4">
        {images.map((image, index) => (
          <div
            className="w-[125px] border-[1px] border-[#D6D8DB] border-dashed rounded-[16px] relative group"
            key={index}
          >
            <img
              className="object-cover w-full h-full"
              src={image} // Use the Base64 image string
              alt={`Uploaded ${index}`}
            />
            <button
              className="rounded-full w-5 h-5 -right-2.5 -top-2.5 bg-slate-600 text-white absolute group-hover:block hidden"
              onClick={() => deleteImage(image)}
            >
              <X size={13} className="m-auto" />
            </button>
          </div>
        ))}
        <button
          className="size-[125px] border-[1px] border-[#D6D8DB] border-dashed rounded-[16px] flex items-center justify-center"
          onClick={handleClick}
          type="button"
        >
          <div className="rounded-full bg-[#ECEDF0]">
            <Plus size={26} strokeWidth={1.5} />
          </div>
        </button>
      </div>
    </div>
  );
};

const RemainingAmount = ({ formik }: { formik: any }) => {
  return (
    <div className="rounded-[12px] p-6 bg-white flex flex-col gap-8">
      <div>
        <span className="mb-2">Үндсэн үнэ</span>
        <Input
          placeholder="Үндсэн үнэ"
          type="number"
          id="price"
          value={formik.values.price}
          onChange={formik.handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span>Үлдэгдэл тоо ширхэг</span>
        <div className="grid grid-cols-3 gap-4">
          {formik.values.sizes.map(({ name, amount }: size, index: number) => (
            <div key={`amountInput_${index}`}>
              <span className="text-sm">{name}:</span>
              <Input
                type="number"
                id={`sizes[${index}]` + ".amount"}
                value={amount}
                onChange={formik.handleChange}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Category = ({ formik }: { formik: any }) => {
  const [data, setdata] = useState([]);
  const [value, setValue] = useState("");
  const getData = async () => {
    setdata(await getCategories());
  };
  const handleChange = (newValue: string) => {
    setValue(newValue);
    formik.setFieldValue("categoryId", newValue);
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(formik.values);

  return (
    <div className="rounded-[12px] p-6 bg-white flex flex-col gap-2">
      <span className="text-sm font-semibold">Ерөнхий ангилал</span>
      <div className="flex gap-2">
        <ComboboxDemo options={data} change={handleChange} />
        <Button
          onClick={() => {
            setValue("");
          }}
        >
          <Edit />
        </Button>
      </div>

      <Input
        id="categoryId"
        value={value || formik.values.categoryId}
        onChange={formik.handleChange}
        disabled={value != ""}
      />
    </div>
  );
};
