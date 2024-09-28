"use client";

import * as React from "react";
import * as yup from "yup";
import { useFormik, FormikErrors } from "formik";
import Link from "next/link";
import { login } from "../functions/login";

import { useRouter } from "next/navigation";

interface FormValues {
  email: string;
  password: string;
}

export default function Home() {
  const router = useRouter();

  const initialValues: FormValues = { email: "", password: "" };
  const validationSchema = yup.object({
    email: yup.string().email("wrong email").required("email is required"),
    password: yup.string().required("No password provided.")
  });

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const res = await login(values.email, values.password);
      if (res) {
        router.push("/");
      }
    },
    validationSchema
  });
  return (
    <div className="">
      <form
        className="max-w-[440px] w-full m-auto mt-[14px] flex flex-col items-center rounded-l border-[1px] border-[#ECEDF0] p-10 gap-6"
        onSubmit={formik.handleSubmit}
      >
        <span className="text-2xl font-semibold text-center">Нэвтрэх</span>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <input
              className="rounded-full border-[1px] border-[#E4E4E7] py-1 px-3"
              placeholder="Имэйл хаяг"
              value={formik.values.email}
              onChange={formik.handleChange}
              id="email"
            />
            {
              <span className="text-red-500 text-start">
                {formik.errors.email}
              </span>
            }
          </div>
          <div className="flex flex-col gap-1">
            <input
              className="rounded-full border-[1px] border-[#E4E4E7] py-1 px-3"
              placeholder="Нууц үг"
              value={formik.values.password}
              onChange={formik.handleChange}
              id="password"
            />
            {
              <span className="text-red-500 text-start">
                {formik.errors.password}
              </span>
            }
          </div>

          <button
            className="rounded-full bg-[#2563EB] py-2 px-4 text-white"
            type="submit"
          >
            Нэвтрэх
          </button>
          <Link href={"#"} className="text-[#71717A] m-auto">
            Нууц үг мартсан
          </Link>
        </div>
      </form>
    </div>
  );
}
