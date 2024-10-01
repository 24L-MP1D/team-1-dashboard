import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const ProductInfoInput = ({ formik }: { formik: any }) => {
  return (
    <div className="flex flex-col gap-4 rounded-[12px] p-6 bg-white">
      <div>
        <span className="text-sm font-semibold mb-2">Бүтээгдэхүүний нэр</span>
        <Input
          id="productName"
          value={formik.values.productName}
          onChange={formik.handleChange}
          placeholder="Нэр"
        />
        {
          <span className="text-red-500 text-start">
            {formik.errors.productName}
          </span>
        }
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
        <span className="text-red-500 text-start">
          {formik.errors.description}
        </span>
      </div>
      <div>
        <span className="text-sm font-semibold mb-2">Барааны код</span>
        <Input
          id="productCode"
          value={formik.values.productCode}
          onChange={formik.handleChange}
          placeholder="#12345678"
        />
        <span className="text-red-500 text-start">
          {formik.errors.productCode}
        </span>
      </div>
    </div>
  );
};
