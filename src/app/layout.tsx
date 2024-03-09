"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "@/css/satoshi.css";
import "@/css/style.css";
import "@/css/md.css";
import React, { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {children}
        </div>
        <ToastContainer limit={2} autoClose={2000} position="bottom-right" />
      </body>
    </html>
  );
}
