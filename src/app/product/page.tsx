"use client";

import { Calendar } from "@/components/Calendar";
import { ComboboxDemo } from "@/components/collapse";
import { DataTableDemo } from "@/components/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@radix-ui/react-popover";
import { max } from "date-fns";
import { CalendarDays, DollarSign, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";

function Page() {
  return (
    <div className="flex-1">
      <Product />
    </div>
  );
}

const Product = () => {
  const [query, setQuery] = useState({});

  return (
    <div className="p-6 justify-start flex flex-col gap-4">
      <a
        className="flex items-center bg-[#121316] text-white rounded-[8px] py-3 px-4 max-w-[280px] justify-center"
        href="product/addNew"
      >
        <Plus /> <span>Бүтээгдэхүүн нэмэх</span>
      </a>
      <div className="mt-2 flex justify-between">
        <div className="flex gap-[13px]">
          <Popover>
            <PopoverTrigger className="flex items-center gap-2 rounded-lg border border-[#ECEDF0] p-2">
              <DollarSign />
              <span>Үнэ</span>
            </PopoverTrigger>
            <PopoverContent className="bg-white rounded-[12px] p-4 border border-[#ECEDF0] shadow-lg z-50">
              <div className="flex flex-col gap-2 ">
                <div className="flex gap-2 items-center">
                  <span>Min: </span>
                  <Input
                    type="number"
                    onChange={(e) =>
                      setQuery({ ...query, min: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <span>Max: </span>
                  <Input
                    type="number"
                    onChange={(e) =>
                      setQuery({ ...query, max: Number(e.target.value) })
                    }
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger className="flex items-center gap-2 rounded-lg border border-[#ECEDF0] p-2">
              <span>Date Filter: </span>
              <CalendarDays />
              -
              <CalendarDays />
            </PopoverTrigger>
            <PopoverContent className="p-4 bg-white border border-[#ECEDF0] rounded-lg shadow-lg z-50 max-w-[500px] w-full">
              <Calendar
                className=""
                onFilter={(e) => {
                  e.from &&
                    e.to &&
                    setQuery({ ...query, startDate: e.from, endDate: e.to });
                }}
              />
            </PopoverContent>
          </Popover>
          <Button
            onClick={() => {
              setQuery({});
            }}
          >
            Clear Filter
          </Button>
        </div>
        <div className="flex relative items-center">
          <Input
            type="text"
            className="pl-10"
            placeholder="Search..."
            onChange={(e) => setQuery({ ...query, name: e.target.value })}
          />
          <Search
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
            size={20}
          />
        </div>
      </div>
      <DataTableDemo query={query} />
    </div>
  );
};

export default Page;
