"use client";

import { useEffect, useState } from "react";

export default function OfflineBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    if (!navigator.onLine) setTimeout(() => setIsVisible(true), 100);
    else setIsVisible(false);
  }, []);

  return (
    <div
      className={`${isVisible ? "translate-y-0" : "-translate-y-[150%]"}
        fixed w-[90%] max-w-lg top-1 left-1/2 transform -translate-x-1/2 z-50 duration-300 transition-all bg-red-600 text-white text-center py-4 rounded-xl shadow-lg`}
    >
      <p className="text-sm md:text-base">
        You are currently offline. Some features may not be available.
      </p>
    </div>
  );
}
