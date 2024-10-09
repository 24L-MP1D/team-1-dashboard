"use client";

import { SideBar } from "@/components/sidebar";
import { useRouter } from "next/navigation";
import { createContext, useState, useContext, useEffect } from "react";

const { jwtDecode } = require("jwt-decode");

const LoginContext = createContext<any>(undefined);

export default function LoginWrapper({ children }: { children: any }) {
  const router = useRouter();
  const [log, setLog] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setLog(false);
      return router.push("/login");
    } else {
      const decoded = jwtDecode(token);
      const d = new Date(0);
      d.setUTCSeconds(decoded.exp);
      if (d > new Date()) {
        setLog(true);
      } else {
        setLog(false);
        return router.push("/login");
      }
    }
  }, []);

  return (
    <LoginContext.Provider value={{ log, setLog }}>
      <div className="flex">
        {log && <SideBar />}
        {children}
      </div>
    </LoginContext.Provider>
  );
}

export function useLoginContext() {
  return useContext(LoginContext);
}
