// src/app/ClientLayout.tsx
"use client";

import RouteProtection from "./components/RouteProtection";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RouteProtection>{children}</RouteProtection>;
}