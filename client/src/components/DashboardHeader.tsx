import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocation } from "wouter";
import { LogOut, User, Home, ShoppingBag, LayoutDashboard, Package, ShoppingCart, ClipboardList, Link2, BarChart2, Users, Truck, Tag, Warehouse } from "lucide-react";
import { toast } from "sonner";

interface DashboardHeaderProps { title: string; subtitle?: string; }

const roleNav: Record<string, { label: string; path: string; icon: any }[]> = {
  buyer: [
    { label: "Dashboard", path: "/buyer", icon: LayoutDashboard },
    { label: "Browse Products", path: "/products", icon: Package },
    { label: "My Cart", path: "/cart", icon: ShoppingCart },
    { label: "My Orders", path: "/orders", icon: ClipboardList },
    { label: "Profile", path: "/profile", icon: User },
  ],
  admin: [
    { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { label: "Users", path: "/admin/users", icon: Users },
    { label: "Analytics", path: "/admin/analytics", icon: BarChart2 },
  ],
  manager: [
    { label: "Dashboard", path: "/manager", icon: LayoutDashboard },
    { label: "Products", path: "/manager/products", icon: Package },
    { label: "Inventory", path: "/manager/inventory", icon: Warehouse },
    { label: "Categories", path: "/manager/categories", icon: Tag },
  ],
  delivery: [
    { label: "Dashboard", path: "/delivery", icon: LayoutDashboard },
    { label: "My Orders", path: "/delivery/orders", icon: Truck },
  ],
  reader: [
    { label: "Dashboard", path: "/affiliate", icon: LayoutDashboard },
    { label: "Referrals", path: "/affiliate/referrals", icon: Link2 },
    { label: "Earnings", path: "/affiliate/earnings", icon: BarChart2 },
  ],
  developer: [
    { label: "Dashboard", path: "/developer", icon: LayoutDashboard },
    { label: "Analytics", path: "/developer/analytics", icon: BarChart2 },
  ],
};

const roleBadge: Record<string, string> = {
  admin: "bg-red-100 text-red-800",
  manager: "bg-blue-100 text-blue-800",
  delivery: "bg-amber-100 text-amber-800",
  reader: "bg-purple-100 text-purple-800",
  developer: "bg-green-100 text-green-800",
  buyer: "bg-slate-100 text-slate-700",
};

const roleLabel: Record<string, string> = {
  admin: "Admin", manager: "Manager", delivery: "Delivery",
  reader: "Affiliate", developer: "Developer", buyer: "Buyer",
};

export default function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const { user } = useAuth();
  const [location, navigate] = useLocation();

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => { toast.success("Logged out"); setTimeout(() => navigate("/"), 400); },
    onError: () => toast.error("Failed to logout"),
  });

  const navItems = roleNav[(user as any)?.role ?? "buyer"] ?? [];

  return (
    <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">{title}</h1>
              {subtitle && <p className="text-xs text-slate-500 leading-tight">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm font-medium text-slate-700">{(user as any)?.name || "User"}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleBadge[(user as any)?.role ?? "buyer"]}`}>
                {roleLabel[(user as any)?.role ?? "buyer"]}
              </span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 hover:opacity-90 text-white font-bold text-sm">
                  {((user as any)?.name?.charAt(0) ?? "U").toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="flex flex-col">
                  <span className="text-sm font-semibold">{(user as any)?.name || "User"}</span>
                  <span className="text-xs text-slate-500 font-normal">{(user as any)?.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/")} className="gap-2 cursor-pointer">
                  <Home className="w-4 h-4" /> Home
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => logoutMutation.mutate()}
                  disabled={logoutMutation.isPending}
                  className="gap-2 cursor-pointer text-red-600 hover:bg-red-50 focus:text-red-600">
                  <LogOut className="w-4 h-4" />
                  {logoutMutation.isPending ? "Logging out..." : "Log Out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Nav links */}
        {navItems.length > 0 && (
          <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
            {navItems.map(({ label, path, icon: Icon }) => {
              const active = location === path;
              return (
                <button key={path} onClick={() => navigate(path)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${active ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}>
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}