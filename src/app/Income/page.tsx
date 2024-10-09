"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Download, CalendarDays } from "lucide-react";
import { Calendar } from "@/components/Calendar";
import DownloadModal from "@/components/DownloadModal";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import { backcode } from "../functions/login";

interface IIncome {
  _id: string;
  userId: string;
  amountPaid: number;
  deliveryDate: Date;
}

const Income = () => {
  const [incomeData, setIncomeData] = useState<IIncome[]>([]);
  const [filteredData, setFilteredData] = useState<IIncome[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [activeButton, setActiveButton] = useState("");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers: HeadersInit = {
          "Content-Type": "application/json",
          ...(token ? { authtoken: token } : {})
        };

        const response = await fetch(`${backcode}/income`, {
          method: "GET",
          headers
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: IIncome[] = await response.json();
        const formattedData = data.map((item) => ({
          ...item,
          deliveryDate: new Date(item.deliveryDate)
        }));

        setIncomeData(formattedData);
        setFilteredData(formattedData);
        calculateTotalIncome(formattedData);
      } catch (error) {
        console.error("Failed to fetch income data:", error);
      }
    };

    fetchIncomeData();
  }, []);

  const calculateTotalIncome = (data: IIncome[]) => {
    const total = data.reduce((sum, income) => sum + income.amountPaid, 0);
    setTotalIncome(total);
  };

  const filterData = (days: number, buttonLabel: string) => {
    const today = new Date();
    const fromDate = new Date(today);
    fromDate.setDate(today.getDate() - days);
    const toDate = today;

    const filtered = incomeData.filter(
      (income) =>
        income.deliveryDate >= fromDate && income.deliveryDate <= toDate
    );

    setFilteredData(filtered);
    calculateTotalIncome(filtered);
    setDateRange({ from: fromDate, to: toDate });
    setActiveButton(buttonLabel);
  };

  const handleDateRangeFilter = (range: {
    from: Date | undefined;
    to: Date | undefined;
  }) => {
    setDateRange(range);

    const filtered = incomeData.filter((income) => {
      if (range.from && range.to) {
        return (
          income.deliveryDate >= range.from && income.deliveryDate <= range.to
        );
      }
      return false;
    });

    setFilteredData(filtered);
    calculateTotalIncome(filtered);
    setActiveButton("");
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map((data) => ({
        "Захиалгын ID": data._id,
        Захиалагч: data.userId,
        Төлбөр: data.amountPaid,
        Огноо: data.deliveryDate.toLocaleDateString()
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Income Data");
    XLSX.writeFile(workbook, "income_data.xlsx");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Income Data", 10, 10);

    filteredData.forEach((data, index) => {
      doc.text(
        `${index + 1}. ID: ${data._id}, User: ${data.userId}, Amount: ${
          data.amountPaid
        }₮, Date: ${data.deliveryDate.toLocaleDateString()}`,
        10,
        20 + index * 10
      );
    });

    doc.save("income_data.pdf");
  };

  return (
    <div className="w-[51.28%] mx-auto bg-custom-gray pt-4">
      <div className="rounded-xl border border-[#ECEDF0] p-4 bg-white">
        <div className="flex justify-between items-center">
          <p className="font-bold">Орлого</p>
          <div className="!bg-custom-gray flex items-center border border-1 p-2 rounded-lg">
            <button
              className="flex items-center gap-2"
              onClick={() => setIsModalOpen(true)}
            >
              <Download className="w-[20px] h-[20px]" />
              Хуулга татах
            </button>
          </div>
        </div>
        <div className="h-[1px] bg-[#ECEDF0] my-2"></div>
        <div className="flex justify-between items-center">
          <p className="text-lg">{totalIncome}₮</p>
          <div className="flex space-x-2">
            {["Өчигдөр", "7 хоног", "1 сар", "3 сар"].map((label, index) => (
              <button
                key={label}
                className={`rounded-lg border border-[#ECEDF0] p-2 ${
                  activeButton === label ? "bg-[#18BA51] text-white" : ""
                }`}
                onClick={() => filterData([1, 7, 30, 90][index], label)}
              >
                {label === "Last 3 Months" ? "3 сар" : label}
              </button>
            ))}
            <Popover>
              <PopoverTrigger className="flex items-center rounded-lg border border-[#ECEDF0] p-2">
                <CalendarDays />
                <p className="ml-2">
                  {dateRange.from
                    ? dateRange.from.toLocaleDateString()
                    : new Date().toLocaleDateString()}
                </p>
                <p className="px-2 font-bold"> - </p>
                <CalendarDays />
                <p className="ml-2">
                  {dateRange.to
                    ? dateRange.to.toLocaleDateString()
                    : new Date().toLocaleDateString()}
                </p>
              </PopoverTrigger>
              <PopoverContent className="p-0 bg-white border border-[#ECEDF0] rounded-lg shadow-lg">
                <Calendar onFilter={handleDateRangeFilter} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <DownloadModal
          onClose={() => setIsModalOpen(false)}
          onDownloadExcel={downloadExcel}
          onDownloadPDF={downloadPDF}
        />
      )}

      <div className="rounded-xl border border-[#ECEDF0] my-4 p-4 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Захиалгын ID дугаар</TableHead>
              <TableHead>Захиалагч</TableHead>
              <TableHead>Төлбөр</TableHead>
              <TableHead>Огноо</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((data) => (
              <TableRow key={data._id}>
                <TableCell>{data._id}</TableCell>
                <TableCell>{data.userId}</TableCell>
                <TableCell>{data.amountPaid}₮</TableCell>
                <TableCell>{data.deliveryDate.toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Income;
