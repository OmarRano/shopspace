import { useMemo } from "react";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

type DemoUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  createdAt?: string;
  isAffiliate?: boolean;
};

const DEMO_USERS: Record<string, DemoUser> = {
  admin: {
    id: "admin-demo",
    name: "Amina Oladipo",
    email: "admin@demo.sahadstores.com",
    role: "admin",
    phone: "+234 812 345 6789",
    createdAt: "2024-01-15",
    isAffiliate: false,
  },
  manager: {
    id: "manager-demo",
    name: "Daniel Chukwu",
    email: "manager@demo.sahadstores.com",
    role: "manager",
    phone: "+234 809 123 4567",
    createdAt: "2024-02-10",
    isAffiliate: false,
  },
  delivery: {
    id: "delivery-demo",
    name: "Precious Eze",
    email: "delivery@demo.sahadstores.com",
    role: "delivery",
    phone: "+234 901 234 5678",
    createdAt: "2024-03-05",
    isAffiliate: false,
  },
  reader: {
    id: "affiliate-demo",
    name: "Femi Adeyemi",
    email: "affiliate@demo.sahadstores.com",
    role: "reader",
    phone: "+234 803 456 7890",
    createdAt: "2024-04-02",
    isAffiliate: true,
  },
  developer: {
    id: "developer-demo",
    name: "Ngozi Okafor",
    email: "developer@demo.sahadstores.com",
    role: "developer",
    phone: "+234 807 654 3210",
    createdAt: "2024-05-20",
    isAffiliate: false,
  },
  buyer: {
    id: "buyer-demo",
    name: "Peter Nwosu",
    email: "buyer@demo.sahadstores.com",
    role: "buyer",
    phone: "+234 805 123 4567",
    createdAt: "2024-06-01",
    isAffiliate: false,
  },
};

const getDemoRole = (pathname: string) => {
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/manager")) return "manager";
  if (pathname.startsWith("/delivery")) return "delivery";
  if (pathname.startsWith("/affiliate")) return "reader";
  if (pathname.startsWith("/developer")) return "developer";
  if (
    pathname.startsWith("/buyer") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/orders") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/profile")
  ) {
    return "buyer";
  }
  return null;
};

export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false, redirectPath = "/auth" } = options ?? {};
  const pathname = typeof window === "undefined" ? "/" : window.location.pathname;
  const role = getDemoRole(pathname);
  const user = role ? DEMO_USERS[role] : null;

  const state = useMemo(
    () => ({
      user,
      loading: false,
      error: null,
      isAuthenticated: Boolean(user),
    }),
    [user]
  );

  return {
    ...state,
    refresh: async () => state,
    logout: async () => {
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    },
  };
}
