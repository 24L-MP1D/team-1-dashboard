import { ComboboxDemo } from "@/components/collapse";
import { DataTableDemo } from "@/components/table";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

function Page() {
  return (
    <div className="">
      <Product />
    </div>
  );
}

const Product = () => {
  return (
    <div className="p-6 justify-start flex flex-col gap-4">
      <button className="flex items-center bg-[#121316] text-white rounded-[8px] py-3 px-4 max-w-[280px] justify-center">
        <Plus /> <span>Бүтээгдэхүүн нэмэх</span>
      </button>
      <div className="mt-2 flex justify-between">
        <div className="flex gap-[13px]">
          <ComboboxDemo />
          <ComboboxDemo />
          <ComboboxDemo />
        </div>
        <div className="flex relative">
          <Input type="text" className="pl-10" placeholder="Search..." />
          <Search
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
            size={20}
          />
        </div>
      </div>
      <DataTableDemo />
    </div>
  );
};

export default Page;
