import { Input } from "@/components/ui/input";

export const Sale = ({ formik }: { formik: any }) => {
  return (
    <div className="rounded-[12px] p-6 bg-white flex flex-col gap-2">
      <span className="text-sm font-semibold">Хямдрал</span>
      <Input
        type="number"
        id="sale"
        placeholder="Хямдрал"
        onChange={formik.handleChange}
        max={100}
      />
    </div>
  );
};
