import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ShoppingBag, Mail, Lock, User, Phone,
  Eye, EyeOff, CheckCircle2, Shield, Truck,
  Settings, Code2, UserCheck, Info, AlertCircle,
} from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

// ─── Types ────────────────────────────────────────────────────────────────────
type AuthMode = "buyer-login" | "buyer-signup" | "staff-login";

// ─── Staff quick-login cards ──────────────────────────────────────────────────
const STAFF_CARDS = [
  {
    role: "Admin",
    email: "admin@sahadstores.com",
    password: "Admin@123456",
    description: "Full platform control — users, analytics, affiliates",
    icon: Shield,
    color: "border-red-200 bg-red-50 hover:border-red-400",
    badge: "bg-red-100 text-red-700",
  },
  {
    role: "Manager",
    email: "manager@sahadstores.com",
    password: "Manager@123456",
    description: "Products, inventory, categories & orders",
    icon: Settings,
    color: "border-blue-200 bg-blue-50 hover:border-blue-400",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    role: "Delivery",
    email: "delivery@sahadstores.com",
    password: "Delivery@123456",
    description: "Assigned orders, status updates & tracking",
    icon: Truck,
    color: "border-green-200 bg-green-50 hover:border-green-400",
    badge: "bg-green-100 text-green-700",
  },
  {
    role: "Developer",
    email: "developer@sahadstores.com",
    password: "Developer@123456",
    description: "Platform analytics & system statistics",
    icon: Code2,
    color: "border-purple-200 bg-purple-50 hover:border-purple-400",
    badge: "bg-purple-100 text-purple-700",
  },
] as const;

// ─── Role → redirect map ──────────────────────────────────────────────────────
function getRoleRedirect(role: string): string {
  switch (role) {
    case "admin": return "/admin";
    case "manager": return "/manager";
    case "delivery": return "/delivery";
    case "reader": return "/affiliate";
    case "developer": return "/developer";
    default: return "/products";
  }
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Auth() {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();
  const [mode, setMode] = useState<AuthMode>("buyer-login");

  // Buyer login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const [showLoginPw, setShowLoginPw] = useState(false);

  // Buyer signup
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPw, setSignupPw] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [showSignupPw, setShowSignupPw] = useState(false);

  // Staff login
  const [staffEmail, setStaffEmail] = useState("");
  const [staffPw, setStaffPw] = useState("");
  const [showStaffPw, setShowStaffPw] = useState(false);

  // ─── tRPC mutations ─────────────────────────────────────────────────────────
  const loginBuyer = trpc.auth.loginBuyer.useMutation({
    onSuccess: (d) => { toast.success(d.message ?? "Welcome back!"); setTimeout(() => navigate(getRoleRedirect(d.role)), 600); },
    onError: (e) => toast.error(e.message || "Login failed"),
  });

  const signupBuyer = trpc.auth.signupBuyer.useMutation({
    onSuccess: (d) => { toast.success(d.message ?? "Account created!"); setTimeout(() => navigate("/products"), 600); },
    onError: (e) => toast.error(e.message || "Signup failed"),
  });

  const loginStaff = trpc.auth.loginStaff.useMutation({
    onSuccess: (d) => { toast.success(`Logged in as ${d.role}`); setTimeout(() => navigate(getRoleRedirect(d.role)), 600); },
    onError: (e) => toast.error(e.message || "Login failed"),
  });

  // ─── Redirect if already logged in ──────────────────────────────────────────
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (user) { navigate(getRoleRedirect((user as any).role)); return null; }

  // ─── Handlers ────────────────────────────────────────────────────────────────
  const handleBuyerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPw) return toast.error("Fill in all fields");
    loginBuyer.mutate({ email: loginEmail, password: loginPw });
  };

  const handleBuyerSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPw || !signupConfirm) return toast.error("Fill in all required fields");
    if (signupPw !== signupConfirm) return toast.error("Passwords do not match");
    signupBuyer.mutate({ name: signupName, email: signupEmail, phone: signupPhone || undefined, password: signupPw, confirmPassword: signupConfirm });
  };

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffEmail || !staffPw) return toast.error("Enter email and password");
    loginStaff.mutate({ email: staffEmail, password: staffPw });
  };

  const handleQuickLogin = (email: string, password: string) => {
    setStaffEmail(email);
    setStaffPw(password);
    loginStaff.mutate({ email, password });
  };

  const isBuyer = mode === "buyer-login" || mode === "buyer-signup";
  const pwsMatch = signupConfirm && signupConfirm === signupPw;
  const pwsMismatch = signupConfirm && signupConfirm !== signupPw;

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/40">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900">Sahad Stores</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Tab switcher */}
        <div className="flex justify-center mb-8">
          <div className="bg-white border border-slate-200 rounded-xl p-1 flex gap-1 shadow-sm">
            <button
              onClick={() => setMode("buyer-login")}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${isBuyer ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
            >
              Shop Account
            </button>
            <button
              onClick={() => setMode("staff-login")}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${mode === "staff-login" ? "bg-slate-800 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
            >
              Staff Portal
            </button>
          </div>
        </div>

        {/* ── BUYER PANEL ── */}
        {isBuyer && (
          <div className="max-w-md mx-auto">
            <Card className="border-0 shadow-xl shadow-slate-200/60">
              {mode === "buyer-login" ? (
                <>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl">Welcome back</CardTitle>
                    <CardDescription>Sign in to your shopping account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleBuyerLogin} className="space-y-4">
                      <div className="space-y-1.5">
                        <Label>Email address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                          <Input type="email" placeholder="you@example.com" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="pl-10 h-11" autoFocus required />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label>Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                          <Input type={showLoginPw ? "text" : "password"} placeholder="Your password" value={loginPw} onChange={e => setLoginPw(e.target.value)} className="pl-10 pr-10 h-11" required />
                          <button type="button" onClick={() => setShowLoginPw(!showLoginPw)} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600">
                            {showLoginPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <Button type="submit" className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white" disabled={loginBuyer.isPending}>
                        {loginBuyer.isPending ? "Signing in…" : "Sign In"}
                      </Button>
                    </form>
                    <p className="mt-6 text-center text-sm text-slate-500">
                      Don't have an account?{" "}
                      <button onClick={() => setMode("buyer-signup")} className="text-emerald-600 font-medium hover:underline">Create one</button>
                    </p>
                  </CardContent>
                </>
              ) : (
                <>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl">Create account</CardTitle>
                    <CardDescription>Join Sahad Stores and start shopping</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleBuyerSignup} className="space-y-4">
                      <div className="space-y-1.5">
                        <Label>Full name <span className="text-red-500">*</span></Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                          <Input placeholder="Aisha Muhammad" value={signupName} onChange={e => setSignupName(e.target.value)} className="pl-10 h-11" autoFocus required />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label>Email address <span className="text-red-500">*</span></Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                          <Input type="email" placeholder="you@example.com" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} className="pl-10 h-11" required />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label>Phone <span className="text-slate-400 text-xs">(optional)</span></Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                          <Input type="tel" placeholder="+234 800 000 0000" value={signupPhone} onChange={e => setSignupPhone(e.target.value)} className="pl-10 h-11" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label>Password <span className="text-red-500">*</span></Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                          <Input type={showSignupPw ? "text" : "password"} placeholder="Min 8 chars, 1 uppercase, 1 number" value={signupPw} onChange={e => setSignupPw(e.target.value)} className="pl-10 pr-10 h-11" required />
                          <button type="button" onClick={() => setShowSignupPw(!showSignupPw)} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600">
                            {showSignupPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label>Confirm password <span className="text-red-500">*</span></Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                          <Input type="password" placeholder="Repeat your password" value={signupConfirm} onChange={e => setSignupConfirm(e.target.value)} className={`pl-10 h-11 ${pwsMismatch ? "border-red-400" : ""}`} required />
                          {pwsMatch && <CheckCircle2 className="absolute right-3 top-3 w-4 h-4 text-emerald-500" />}
                        </div>
                        {pwsMismatch && <p className="text-xs text-red-500">Passwords don't match</p>}
                      </div>
                      <Button type="submit" className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white" disabled={signupBuyer.isPending}>
                        {signupBuyer.isPending ? "Creating account…" : "Create Account"}
                      </Button>
                    </form>
                    <p className="mt-6 text-center text-sm text-slate-500">
                      Already have an account?{" "}
                      <button onClick={() => setMode("buyer-login")} className="text-emerald-600 font-medium hover:underline">Sign in</button>
                    </p>
                  </CardContent>
                </>
              )}
            </Card>
          </div>
        )}

        {/* ── STAFF PANEL ── */}
        {mode === "staff-login" && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
            {/* Email/password form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl shadow-slate-200/60">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-slate-600" />Staff Login
                  </CardTitle>
                  <CardDescription>Admin · Manager · Delivery · Developer</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleStaffLogin} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label>Email address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <Input type="email" placeholder="admin@sahadstores.com" value={staffEmail} onChange={e => setStaffEmail(e.target.value)} className="pl-10 h-11" autoFocus />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <Input type={showStaffPw ? "text" : "password"} placeholder="Your password" value={staffPw} onChange={e => setStaffPw(e.target.value)} className="pl-10 pr-10 h-11" />
                        <button type="button" onClick={() => setShowStaffPw(!showStaffPw)} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600">
                          {showStaffPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-11 bg-slate-800 hover:bg-slate-900 text-white" disabled={loginStaff.isPending}>
                      {loginStaff.isPending ? "Signing in…" : "Sign In"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Quick-login cards */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-4 h-4 text-slate-400" />
                <p className="text-sm text-slate-500 font-medium">Click a card for instant login</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STAFF_CARDS.map(c => {
                  const Icon = c.icon;
                  return (
                    <button
                      key={c.role}
                      onClick={() => handleQuickLogin(c.email, c.password)}
                      disabled={loginStaff.isPending}
                      className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 ${c.color}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.badge}`}>{c.role}</span>
                        <Icon className="w-4 h-4 opacity-40" />
                      </div>
                      <p className="text-xs text-slate-500 mb-3">{c.description}</p>
                      <div className="space-y-0.5">
                        <p className="font-mono text-xs text-slate-600 truncate">{c.email}</p>
                        <p className="font-mono text-xs text-slate-500">{c.password}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 flex gap-2 text-sm">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-amber-800">
                  Staff accounts are seeded automatically when the server starts. Each role has distinct permissions — explore each dashboard freely.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
