import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import { ShoppingBag, TrendingUp, Users, Zap, ArrowRight, Star } from "lucide-react";

export default function Home() {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Redirect authenticated users to their dashboard
  if (user) {
    if (user.role === "admin") {
      navigate("/admin");
    } else if (user.role === "manager") {
      navigate("/manager");
    } else if (user.role === "delivery") {
      navigate("/delivery");
    } else if (user.role === "reader") {
      navigate("/affiliate");
    } else if (user.role === "developer") {
      navigate("/developer");
    } else {
      navigate("/products");
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-slate-900">Sahad Stores</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <a href="/auth">Sign Up</a>
            </Button>
            <Button asChild>
              <a href={getLoginUrl()}>Sign In</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            The Complete E-Commerce Platform for Modern Businesses
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Manage your store, track inventory, process orders, and grow your business with our comprehensive multi-role commerce solution.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <a href={getLoginUrl()}>Get Started</a>
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-slate-900">Powerful Features for Every Role</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Buyer Features */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <ShoppingBag className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>For Buyers</CardTitle>
                <CardDescription>Seamless Shopping Experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-600">
                <p>• Browse curated product catalog</p>
                <p>• Easy shopping cart management</p>
                <p>• Secure checkout with Stripe</p>
                <p>• Real-time order tracking</p>
                <p>• Product reviews and ratings</p>
              </CardContent>
            </Card>

            {/* Manager Features */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Zap className="w-8 h-8 text-amber-600 mb-2" />
                <CardTitle>For Managers</CardTitle>
                <CardDescription>Complete Store Control</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-600">
                <p>• Add and manage products</p>
                <p>• Real-time inventory tracking</p>
                <p>• Automated pricing with commissions</p>
                <p>• Stock alerts and adjustments</p>
                <p>• Category management</p>
              </CardContent>
            </Card>

            {/* Delivery Features */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle>For Delivery</CardTitle>
                <CardDescription>Efficient Logistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-600">
                <p>• View assigned orders</p>
                <p>• GPS tracking integration</p>
                <p>• Status updates in real-time</p>
                <p>• Automatic commission tracking</p>
                <p>• Performance analytics</p>
              </CardContent>
            </Card>

            {/* Admin Features */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Users className="w-8 h-8 text-purple-600 mb-2" />
                <CardTitle>For Admins</CardTitle>
                <CardDescription>Full Platform Control</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-600">
                <p>• Comprehensive sales dashboard</p>
                <p>• User management and roles</p>
                <p>• Revenue analytics and reports</p>
                <p>• Commission configuration</p>
                <p>• Platform-wide settings</p>
              </CardContent>
            </Card>

            {/* Affiliate Features */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Star className="w-8 h-8 text-yellow-600 mb-2" />
                <CardTitle>For Affiliates</CardTitle>
                <CardDescription>Earn Through Referrals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-600">
                <p>• Generate referral links</p>
                <p>• Track conversions</p>
                <p>• Real-time earnings dashboard</p>
                <p>• Commission history</p>
                <p>• Performance metrics</p>
              </CardContent>
            </Card>

            {/* Developer Features */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Zap className="w-8 h-8 text-indigo-600 mb-2" />
                <CardTitle>For Developers</CardTitle>
                <CardDescription>Platform Insights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-600">
                <p>• Platform-wide analytics</p>
                <p>• Commission distribution</p>
                <p>• Store performance tracking</p>
                <p>• Revenue insights</p>
                <p>• System configuration</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-slate-900">Why Choose Sahad Stores?</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Automated Commission System</h3>
                <p className="text-slate-600">Transparent profit calculation and automatic commission distribution for all stakeholders.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Real-Time Analytics</h3>
                <p className="text-slate-600">Comprehensive dashboards with live sales data, inventory tracking, and performance metrics.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Multi-Role Access Control</h3>
                <p className="text-slate-600">Six distinct user roles with granular permissions and specialized dashboards.</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">GPS Delivery Tracking</h3>
                <p className="text-slate-600">Real-time location tracking and order status updates for seamless delivery management.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Secure Payment Processing</h3>
                <p className="text-slate-600">Integrated Stripe payment gateway with comprehensive transaction management.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Affiliate Commission System</h3>
                <p className="text-slate-600">Track referrals, manage commissions, and grow your network with built-in affiliate tools.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your E-Commerce Business?</h2>
          <p className="text-lg mb-8 text-blue-100">Join thousands of businesses using Sahad Stores to manage their operations efficiently.</p>
          <Button size="lg" variant="secondary" asChild>
            <a href={getLoginUrl()}>Sign In Now</a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2026 Sahad Stores. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
