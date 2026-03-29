import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useAuth } from "./_core/hooks/useAuth";
import { Loader2 } from "lucide-react";

// Public pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";

// Buyer pages
import ProductCatalog from "./pages/buyer/ProductCatalog";
import ShoppingCart from "./pages/buyer/ShoppingCart";
import Checkout from "./pages/buyer/Checkout";
import OrderHistory from "./pages/buyer/OrderHistory";
import OrderTracking from "./pages/buyer/OrderTracking";
import BuyerProfile from "./pages/buyer/BuyerProfile";
import BuyerDashboard from "./pages/buyer/BuyerDashboard";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import SalesAnalytics from "./pages/admin/SalesAnalytics";

// Manager pages
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import ProductManagement from "./pages/manager/ProductManagement";
import InventoryManagement from "./pages/manager/InventoryManagement";
import CategoryManagement from "./pages/manager/CategoryManagement";

// Delivery pages
import DeliveryDashboard from "./pages/delivery/DeliveryDashboard";
import DeliveryOrders from "./pages/delivery/DeliveryOrders";
import OrderDeliveryTracking from "./pages/delivery/OrderDeliveryTracking";

// Affiliate pages
import AffiliateDashboard from "./pages/affiliate/AffiliateDashboard";
import ReferralManagement from "./pages/affiliate/ReferralManagement";
import EarningsHistory from "./pages/affiliate/EarningsHistory";

// Developer pages
import DeveloperDashboard from "./pages/developer/DeveloperDashboard";
import PlatformAnalytics from "./pages/developer/PlatformAnalytics";

function ProtectedRoute({ component: Component, requiredRole }: any) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (!user) {
    window.location.href = '/auth';
    return null;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <NotFound />;
  }

  return <Component />;
}

function Router() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <Switch>
      {/* Public routes */}
      <Route path="/" component={Home} />
      <Route path="/auth" component={Auth} />
      <Route path="/login" component={Auth} />
      <Route path="/products" component={ProductCatalog} />
      <Route path="/product/:id" component={ProductDetail} />

      {/* Buyer routes - also accessible by reader/affiliate role */}
      {(user?.role === "buyer" || user?.role === "reader") && (
        <>
          <Route path="/buyer" component={BuyerDashboard} />
          <Route path="/cart" component={ShoppingCart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={OrderHistory} />
          <Route path="/order/:orderId/track" component={OrderTracking} />
          <Route path="/profile" component={BuyerProfile} />
        </>
      )}

      {/* Admin routes */}
      {user?.role === "admin" && (
        <>
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/admin/users" component={UserManagement} />
          <Route path="/admin/analytics" component={SalesAnalytics} />
        </>
      )}

      {/* Manager routes */}
      {user?.role === "manager" && (
        <>
          <Route path="/manager" component={ManagerDashboard} />
          <Route path="/manager/products" component={ProductManagement} />
          <Route path="/manager/inventory" component={InventoryManagement} />
          <Route path="/manager/categories" component={CategoryManagement} />
        </>
      )}

      {/* Delivery routes */}
      {user?.role === "delivery" && (
        <>
          <Route path="/delivery" component={DeliveryDashboard} />
          <Route path="/delivery/orders" component={DeliveryOrders} />
          <Route path="/delivery/order/:orderId/track" component={OrderDeliveryTracking} />
        </>
      )}

      {/* Affiliate routes */}
      {user?.role === "reader" && (
        <>
          <Route path="/affiliate" component={AffiliateDashboard} />
          <Route path="/affiliate/referrals" component={ReferralManagement} />
          <Route path="/affiliate/earnings" component={EarningsHistory} />
        </>
      )}

      {/* Developer routes */}
      {user?.role === "developer" && (
        <>
          <Route path="/developer" component={DeveloperDashboard} />
          <Route path="/developer/analytics" component={PlatformAnalytics} />
        </>
      )}

      {/* 404 */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;