import * as React from "react";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps
} from "formik";

interface MyFormValues {
  firstName: string;
}

export default function Home() {
  const initialValues: MyFormValues = { firstName: "" };
  return <div></div>;
}
