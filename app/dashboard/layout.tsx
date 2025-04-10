"use client"

import React from 'react';
import DashboardLayout from "@/components/layout/waspang-dashboard-layout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}