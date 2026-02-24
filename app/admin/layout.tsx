import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - ZenTweaks",
  description: "ZenTweaks Admin Dashboard",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
