"use client";

import { Menu, Clipboard, Tag, Speaker, User, Settings } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface Panel {
  label: string;
  id: string;
  Icon: any;
}

const sidebar: Panel[] = [
  {
    label: "Хяналтын самбар",
    id: "/dashboard", // Ensure leading slash
    Icon: Menu
  },
  {
    label: "Захиалга",
    id: "/order", // Ensure leading slash
    Icon: Clipboard
  },
  {
    label: "Орлого",
    id: "/income", // Ensure leading slash
    Icon: Tag
  },
  {
    label: "Бүтээгдэхүүн",
    id: "/product", // Ensure leading slash
    Icon: Speaker
  },
  {
    label: "Хэрэглэгч",
    id: "/user", // Ensure leading slash
    Icon: User
  },
  {
    label: "Тохиргоо",
    id: "/settings", // Ensure leading slash
    Icon: Settings
  }
];

export const SideBar = () => {
  const pathName = usePathname();
  const router = useRouter();
  console.log(pathName);
  return (
    <div className="flex flex-col gap-4 max-w-[222px] bg-white w-full min-h-[100vh] h-full pt-6">
      {sidebar.map(({ label, id, Icon }: Panel) => (
        <div
          className={`flex px-4 py-1 gap-4 text-[#121316] py-[22px] items-center ${
            pathName.includes(id) && `bg-slate-200`
          }`}
          onClick={() => {
            router.push(id);
          }}
        >
          <Icon />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};
