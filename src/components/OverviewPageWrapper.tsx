"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OverviewPageWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authtoken");

    if (!token) {
      router.replace("/login");
    } else {
      setIsChecking(false); // allow rendering
    }
  }, [router]);

  if (isChecking) return null; // render nothing while checking

  return <>{children}</>; // render overview content only if token exists
}
