"use client"

import React from 'react';
import WasPangDashboardLayout from "@/components/layout/waspang-dashboard-layout";

export function WasPangLayout({ children }: { children: React.ReactNode }) {
  return (
    <WasPangDashboardLayout navItems={[
      {
        title: "Dashboard",
        href: "/waspang",
        icon: "dashboard",
      },
      {
        title: "Proyek",
        href: "/waspang/project",
        icon: "project",
      },
      {
        title: "Milestone",
        href: "/waspang/milestones",
        icon: "milestone",
      },
      {
        title: "Laporan Harian",
        href: "/waspang/reports",
        icon: "report",
      },
      {
        title: "Dokumentasi",
        href: "/waspang/documentation",
        icon: "document",
      }
    ]}>
      {children}
    </WasPangDashboardLayout>
  );
}

export default WasPangLayout;