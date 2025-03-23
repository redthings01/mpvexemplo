// src/app/components/RouteProtection.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingSpinner from "./LoadingSpinner";
import { useEffect } from "react";

const protectedRoutes = ["/add-bag", "/admin"]; // Add more routes as needed

export default function RouteProtection({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const currentRoute = usePathname();
  const router = useRouter();
  const isProtectedRoute = protectedRoutes.includes(currentRoute);

  useEffect(() => {
    if (status === "unauthenticated" && isProtectedRoute) {
      router.push("/api/auth/signin");
    } else if (status === "authenticated" && session.user.role !== "admin" && isProtectedRoute) {
      router.push("/"); // Redirect non-admin users to the home page
    }
  }, [status, session, isProtectedRoute, router]);

  // Show loading spinner while session is being checked
  if (status === "loading") {
    return <LoadingSpinner />;
  }

  // If the route is protected and the user is not authenticated or not an admin, return null
  if (isProtectedRoute && (!session || session.user.role !== "admin")) {
    return null;
  }

  return <>{children}</>;
}