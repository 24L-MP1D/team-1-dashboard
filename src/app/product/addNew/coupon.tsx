import { Input } from "@/components/ui/input";

export const Coupon = (formik: any) => {
  return (
    <div className="rounded-[12px] p-6 bg-white flex flex-col gap-2">
      <span className="text-sm font-semibold">Coupon</span>
      <Input id="coupon" onChange={formik.handleChange} placeholder="Coupon" />
    </div>
  );
};
