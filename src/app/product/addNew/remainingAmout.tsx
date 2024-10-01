import { Input } from "@/components/ui/input";
import { size } from "./page";

export const RemainingAmount = ({ formik }: { formik: any }) => {
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
        {<span className="text-red-500 text-start">{formik.errors.price}</span>}
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
