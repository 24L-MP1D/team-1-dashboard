import { getCategories } from "@/app/functions/category";
import { ComboboxDemo } from "@/components/collapse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";

export const Category = ({ formik }: { formik: any }) => {
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

  return (
    <div className="rounded-[12px] p-6 bg-white flex flex-col gap-2">
      <span className="text-sm font-semibold">Ерөнхий ангилал</span>
      <div className="flex gap-2">
        <ComboboxDemo options={data} change={handleChange} />
        <Button
          type="button"
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
      <span className="text-red-500 text-start">
        {formik.errors.categoryId}
      </span>
    </div>
  );
};
