"use client";
import * as React from "react";
import { useRouter } from "next/navigation";

interface MyFormValues {
  firstName: string;
}

export default function Home() {
  const initialValues: MyFormValues = { firstName: "" };
  const router = useRouter();
  router.push("./dashboard");
}
