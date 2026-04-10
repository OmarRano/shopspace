import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/sonner";

// Public pages
import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";
import ProductDetail from "@/pages/ProductDetail";

// Buyer
import ProductCatalog from "@/pages/buyer/ProductCatalog";
import BuyerDashboard from "@/pages/buyer/BuyerDashboard";
import Cart from "@/pages/buyer/Cart";
import Checkout from "@/pages/buyer/Checkout";
import OrderHistory from "@/pages/buyer/OrderHistory";
import OrderTracking from "@/pages/buyer/OrderTracking";
import BuyerProfile from "@/pages/buyer/BuyerProfile";

// Admin
import AdminDashboard from "@/pages/admin/AdminDashboard";
import SalesAnalytics from "@/pages/admin/SalesAnalytics";
import UserManagement from "@/pages/admin/UserManagement";
import AffiliateManagement from "@/pages/admin/AffiliateManagement";

// Manager
import ManagerDashboard from "@/pages/manager/ManagerDashboard";
import ProductManagement from "@/pages/manager/ProductManagement";
import CategoryManagement from "@/pages/manager/CategoryManagement";
import InventoryManagement from "@/pages/manager/InventoryManagement";

// Delivery
import DeliveryDashboard from "@/pages/delivery/DeliveryDashboard";
import DeliveryOrders from "@/pages/delivery/DeliveryOrders";
import OrderDeliveryTracking from "@/pages/delivery/OrderDeliveryTracking";

// Affiliate
import AffiliateDashboard from "@/pages/affiliate/AffiliateDashboard";
import EarningsHistory from "@/pages/affiliate/EarningsHistory";
import ReferralManagement from "@/pages/affiliate/ReferralManagement";

// Developer
import DeveloperDashboard from "@/pages/developer/DeveloperDashboard";
import PlatformAnalytics from "@/pages/developer/PlatformAnalytics";

const DEMO_NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Buyer", path: "/buyer" },
  { label: "Admin", path: "/admin" },
  { label: "Affiliate", path: "/affiliate" },
  { label: "Manager", path: "/manager" },
  { label: "Delivery", path: "/delivery" },
  { label: "Developer", path: "/developer" },
];

type SubLinkKey = keyof typeof DEMO_SUB_LINKS;

const DEMO_SUB_LINKS = {
  buyer: [
    { label: "Cart", path: "/cart" },
    { label: "Orders", path: "/orders" },
    { label: "Checkout", path: "/checkout" },
    { label: "Profile", path: "/profile" },
  ],
  admin: [
    { label: "Users", path: "/admin/users" },
    { label: "Analytics", path: "/admin/analytics" },
    { label: "Affiliates", path: "/admin/affiliates" },
  ],
  manager: [
    { label: "Products", path: "/manager/products" },
    { label: "Inventory", path: "/manager/inventory" },
    { label: "Categories", path: "/manager/categories" },
  ],
  delivery: [
    { label: "Orders", path: "/delivery/orders" },
  ],
  affiliate: [
    { label: "Referrals", path: "/affiliate/referrals" },
    { label: "Earnings", path: "/affiliate/earnings" },
  ],
  developer: [
    { label: "Analytics", path: "/developer/analytics" },
  ],
};

function DemoNavigator() {
  const [location, navigate] = useLocation();
  const section = location.split("/")[1] || "home";
  const subLinks = DEMO_SUB_LINKS[section as SubLinkKey] ?? [];

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-xl shadow-xl">
      <div className="container mx-auto flex flex-col gap-3 px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm font-semibold text-slate-700">Demo Navigator</div>
          <div className="text-xs text-slate-500 truncate">Current path: {location}</div>
        </div>

        <div className="flex flex-wrap gap-2">
          {DEMO_NAV_ITEMS.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`rounded-full border px-3 py-2 text-sm font-medium transition ${location === item.path ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {subLinks.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Sub-pages</span>
            {subLinks.map((link: { label: string; path: string }) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="pb-28">
        <Switch>
          {/* Public */}
          <Route path="/" component={Home} />
          <Route path="/auth" component={Auth} />
          <Route path="/products/:id" component={ProductDetail} />

          {/* Buyer & Affiliate (public catalog) */}
          <Route path="/products">
            <ProductCatalog />
          </Route>

          {/* Buyer */}
          <Route path="/buyer" component={BuyerDashboard} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={OrderHistory} />
          <Route path="/orders/:id" component={OrderTracking} />
          <Route path="/profile" component={BuyerProfile} />

          {/* Admin */}
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/admin/analytics" component={SalesAnalytics} />
          <Route path="/admin/users" component={UserManagement} />
          <Route path="/admin/affiliates" component={AffiliateManagement} />

          {/* Manager */}
          <Route path="/manager" component={ManagerDashboard} />
          <Route path="/manager/products" component={ProductManagement} />
          <Route path="/manager/categories" component={CategoryManagement} />
          <Route path="/manager/inventory" component={InventoryManagement} />

          {/* Delivery */}
          <Route path="/delivery" component={DeliveryDashboard} />
          <Route path="/delivery/orders" component={DeliveryOrders} />
          <Route path="/delivery/orders/:id" component={OrderDeliveryTracking} />

          {/* Affiliate */}
          <Route path="/affiliate" component={AffiliateDashboard} />
          <Route path="/affiliate/earnings" component={EarningsHistory} />
          <Route path="/affiliate/referrals" component={ReferralManagement} />

          {/* Developer */}
          <Route path="/developer" component={DeveloperDashboard} />
          <Route path="/developer/analytics" component={PlatformAnalytics} />

          {/* 404 */}
          <Route component={NotFound} />
        </Switch>
      </div>
      <DemoNavigator />
    </>
  );
}
