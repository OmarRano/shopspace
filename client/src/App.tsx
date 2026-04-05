import { Switch, Route } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect } from "react";

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

// ── Protected Route wrapper ────────────────────────────────────────────────
function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/auth");
      return;
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      navigate("/auth");
    }
  }, [user, loading, allowedRoles, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-slate-600">Loading…</div>
      </div>
    );
  }
  if (!user) return null;
  if (allowedRoles && !allowedRoles.includes(user.role)) return null;
  return <>{children}</>;
}

export default function App() {
  return (
    <Switch>
      {/* Public */}
      <Route path="/" component={Home} />
      <Route path="/auth" component={Auth} />
      <Route path="/products/:id" component={ProductDetail} />

      {/* Buyer & Affiliate (public catalog) */}
      <Route path="/products">
        <ProductCatalog />
      </Route>

      {/* Buyer protected */}
      <Route path="/buyer">
        <ProtectedRoute allowedRoles={["buyer", "reader"]}>
          <BuyerDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/cart">
        <ProtectedRoute allowedRoles={["buyer", "reader"]}>
          <Cart />
        </ProtectedRoute>
      </Route>
      <Route path="/checkout">
        <ProtectedRoute allowedRoles={["buyer", "reader"]}>
          <Checkout />
        </ProtectedRoute>
      </Route>
      <Route path="/orders">
        <ProtectedRoute allowedRoles={["buyer", "reader"]}>
          <OrderHistory />
        </ProtectedRoute>
      </Route>
      <Route path="/orders/:id">
        <ProtectedRoute allowedRoles={["buyer", "reader"]}>
          <OrderTracking />
        </ProtectedRoute>
      </Route>
      <Route path="/profile">
        <ProtectedRoute allowedRoles={["buyer", "reader"]}>
          <BuyerProfile />
        </ProtectedRoute>
      </Route>

      {/* Admin */}
      <Route path="/admin">
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/analytics">
        <ProtectedRoute allowedRoles={["admin"]}>
          <SalesAnalytics />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/users">
        <ProtectedRoute allowedRoles={["admin"]}>
          <UserManagement />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/affiliates">
        <ProtectedRoute allowedRoles={["admin"]}>
          <AffiliateManagement />
        </ProtectedRoute>
      </Route>

      {/* Manager */}
      <Route path="/manager">
        <ProtectedRoute allowedRoles={["manager"]}>
          <ManagerDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/manager/products">
        <ProtectedRoute allowedRoles={["manager"]}>
          <ProductManagement />
        </ProtectedRoute>
      </Route>
      <Route path="/manager/categories">
        <ProtectedRoute allowedRoles={["manager"]}>
          <CategoryManagement />
        </ProtectedRoute>
      </Route>
      <Route path="/manager/inventory">
        <ProtectedRoute allowedRoles={["manager"]}>
          <InventoryManagement />
        </ProtectedRoute>
      </Route>

      {/* Delivery */}
      <Route path="/delivery">
        <ProtectedRoute allowedRoles={["delivery"]}>
          <DeliveryDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/delivery/orders">
        <ProtectedRoute allowedRoles={["delivery"]}>
          <DeliveryOrders />
        </ProtectedRoute>
      </Route>
      <Route path="/delivery/orders/:id">
        <ProtectedRoute allowedRoles={["delivery"]}>
          <OrderDeliveryTracking />
        </ProtectedRoute>
      </Route>

      {/* Affiliate */}
      <Route path="/affiliate">
        <ProtectedRoute allowedRoles={["reader"]}>
          <AffiliateDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/affiliate/earnings">
        <ProtectedRoute allowedRoles={["reader"]}>
          <EarningsHistory />
        </ProtectedRoute>
      </Route>
      <Route path="/affiliate/referrals">
        <ProtectedRoute allowedRoles={["reader"]}>
          <ReferralManagement />
        </ProtectedRoute>
      </Route>

      {/* Developer */}
      <Route path="/developer">
        <ProtectedRoute allowedRoles={["developer"]}>
          <DeveloperDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/developer/analytics">
        <ProtectedRoute allowedRoles={["developer"]}>
          <PlatformAnalytics />
        </ProtectedRoute>
      </Route>

      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}