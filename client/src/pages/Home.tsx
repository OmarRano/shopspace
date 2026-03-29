import { useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import {
  ShoppingBag, TrendingUp, Users, Zap, ArrowRight,
  Star, Shield, Truck, Link2, BarChart2, CheckCircle, Package,
} from "lucide-react";

const dashboardPath: Record<string, string> = {
  admin: "/admin", manager: "/manager", delivery: "/delivery",
  reader: "/affiliate", developer: "/developer", buyer: "/products",
};

const features = [
  {
    icon: ShoppingBag, color: "#e8a020", bg: "rgba(232,160,32,0.1)",
    title: "For Buyers", sub: "Seamless Shopping",
    items: ["Browse curated catalog", "Smart cart management", "Secure Monnify checkout", "Real-time order tracking"],
  },
  {
    icon: Zap, color: "#3b82f6", bg: "rgba(59,130,246,0.1)",
    title: "For Managers", sub: "Complete Store Control",
    items: ["Product & inventory management", "Automated commission pricing", "Low-stock alerts", "Category organisation"],
  },
  {
    icon: Truck, color: "#10b981", bg: "rgba(16,185,129,0.1)",
    title: "For Delivery", sub: "Efficient Logistics",
    items: ["View assigned orders", "One-tap status updates", "Commission tracking", "Delivery confirmation"],
  },
  {
    icon: Shield, color: "#ef4444", bg: "rgba(239,68,68,0.1)",
    title: "For Admins", sub: "Full Platform Control",
    items: ["Sales analytics dashboard", "User & role management", "Revenue reporting", "Platform-wide settings"],
  },
  {
    icon: Link2, color: "#a855f7", bg: "rgba(168,85,247,0.1)",
    title: "For Affiliates", sub: "Earn Through Referrals",
    items: ["Generate referral links", "Track conversions live", "Commission history", "Performance metrics"],
  },
  {
    icon: BarChart2, color: "#06b6d4", bg: "rgba(6,182,212,0.1)",
    title: "For Developers", sub: "Platform Insights",
    items: ["Platform-wide analytics", "Commission distribution", "Revenue insights", "System monitoring"],
  },
];

const benefits = [
  { icon: CheckCircle, title: "Automated Commissions", desc: "Transparent profit calculation and instant distribution across all stakeholders." },
  { icon: BarChart2, title: "Real-Time Analytics", desc: "Live dashboards with sales data, inventory tracking, and performance metrics." },
  { icon: Users, title: "Multi-Role Access", desc: "Six specialised roles with granular permissions and tailored dashboards." },
  { icon: Truck, title: "GPS Delivery Tracking", desc: "Real-time order status updates for seamless last-mile delivery." },
  { icon: Shield, title: "Secure Payments", desc: "Integrated Monnify gateway with comprehensive transaction management." },
  { icon: Link2, title: "Affiliate Network", desc: "Built-in referral system with automatic commission tracking." },
];

export default function Home() {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!loading && user) navigate(dashboardPath[(user as any).role] ?? "/products");
  }, [user, loading]);

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#f8f9fc", minHeight: "100vh" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(11,22,40,0.97)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          {/* Logo */}
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#e8a020,#f5c842)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ShoppingBag size={18} color="#0b1628" />
            </div>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 20, letterSpacing: "-0.03em" }}>Sahad <span style={{ color: "#e8a020" }}>Stores</span></span>
          </a>

          {/* Nav links */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <a href="/products" style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 500, padding: "8px 14px", borderRadius: 8, textDecoration: "none", transition: "all 0.15s" }}
              onMouseOver={e => (e.currentTarget.style.color = "#fff")}
              onMouseOut={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}>
              Browse
            </a>
            <a href="/auth?mode=login" style={{
              color: "rgba(255,255,255,0.8)", fontSize: 14, fontWeight: 600,
              padding: "8px 18px", borderRadius: 8, textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.15)", transition: "all 0.15s",
            }}
              onMouseOver={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#fff"; }}
              onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}>
              Sign In
            </a>
            <a href="/auth?mode=signup" style={{
              background: "linear-gradient(135deg,#e8a020,#f5c842)", color: "#0b1628",
              fontSize: 14, fontWeight: 700, padding: "8px 20px", borderRadius: 8,
              textDecoration: "none", boxShadow: "0 4px 16px rgba(232,160,32,0.35)",
              transition: "all 0.2s",
            }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(232,160,32,0.5)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 16px rgba(232,160,32,0.35)"; }}>
              Sign Up Free
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        background: "linear-gradient(160deg, #0b1628 0%, #132040 55%, #0e1f3d 100%)",
        padding: "100px 24px 120px", textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: -80, left: "10%", width: 400, height: 400, background: "rgba(232,160,32,0.06)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, right: "5%", width: 500, height: 500, background: "rgba(59,130,246,0.05)", borderRadius: "50%", filter: "blur(100px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 760, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(232,160,32,0.12)", border: "1px solid rgba(232,160,32,0.25)", borderRadius: 99, padding: "6px 16px", marginBottom: 28 }}>
            <Star size={13} color="#e8a020" fill="#e8a020" />
            <span style={{ color: "#e8a020", fontSize: 13, fontWeight: 600 }}>Nigeria's Complete E-Commerce Platform</span>
          </div>

          <h1 style={{ color: "#fff", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.04em", marginBottom: 24 }}>
            Manage. Sell. Grow.<br />
            <span style={{ background: "linear-gradient(90deg,#e8a020,#f5c842)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>All in one platform.</span>
          </h1>

          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.65, marginBottom: 44, maxWidth: 560, margin: "0 auto 44px" }}>
            From product listings to last-mile delivery — Sahad Stores gives every role the tools they need to succeed.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/auth?mode=signup" style={{
              background: "linear-gradient(135deg,#e8a020,#f5c842)", color: "#0b1628",
              fontWeight: 800, fontSize: 16, padding: "14px 32px", borderRadius: 12,
              textDecoration: "none", display: "flex", alignItems: "center", gap: 8,
              boxShadow: "0 6px 28px rgba(232,160,32,0.45)", transition: "all 0.2s",
            }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 36px rgba(232,160,32,0.55)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 6px 28px rgba(232,160,32,0.45)"; }}>
              Get Started Free <ArrowRight size={18} />
            </a>
            <a href="/products" style={{
              color: "rgba(255,255,255,0.8)", fontWeight: 600, fontSize: 16,
              padding: "14px 28px", borderRadius: 12, textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.15)", transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: 8,
            }}
              onMouseOver={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#fff"; }}
              onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}>
              <Package size={18} /> Browse Products
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 60, flexWrap: "wrap" }}>
            {[["6", "User Roles"], ["100%", "Real-time Data"], ["₦0", "Setup Cost"]].map(([val, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <p style={{ color: "#fff", fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em" }}>{val}</p>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginTop: 2 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: "100px 24px", background: "#f8f9fc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ color: "#e8a020", fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Powerful Features</p>
            <h2 style={{ color: "#0b1628", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15 }}>Built for every role in your business</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {features.map(({ icon: Icon, color, bg, title, sub, items }) => (
              <div key={title} style={{
                background: "#fff", borderRadius: 20, padding: 28,
                border: "1px solid #eaecf0", transition: "all 0.25s",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
                onMouseOver={e => { const el = e.currentTarget; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)"; el.style.borderColor = color; }}
                onMouseOut={e => { const el = e.currentTarget; el.style.transform = ""; el.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; el.style.borderColor = "#eaecf0"; }}>
                <div style={{ width: 48, height: 48, background: bg, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <Icon size={22} color={color} />
                </div>
                <h3 style={{ color: "#0b1628", fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{title}</h3>
                <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 18 }}>{sub}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 9 }}>
                  {items.map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: 8, color: "#374151", fontSize: 14 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section style={{ padding: "100px 24px", background: "linear-gradient(160deg,#0b1628,#132040)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ color: "#e8a020", fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Why Sahad Stores</p>
            <h2 style={{ color: "#fff", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em" }}>Everything your business needs</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: 28, transition: "all 0.2s" }}
                onMouseOver={e => { e.currentTarget.style.background = "rgba(232,160,32,0.08)"; e.currentTarget.style.borderColor = "rgba(232,160,32,0.3)"; }}
                onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
                <div style={{ width: 44, height: 44, background: "rgba(232,160,32,0.12)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Icon size={20} color="#e8a020" />
                </div>
                <h3 style={{ color: "#fff", fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{title}</h3>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "80px 24px", background: "#fff", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ width: 64, height: 64, background: "linear-gradient(135deg,#e8a020,#f5c842)", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <ShoppingBag size={28} color="#0b1628" />
          </div>
          <h2 style={{ color: "#0b1628", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>Ready to get started?</h2>
          <p style={{ color: "#6b7280", fontSize: 17, lineHeight: 1.65, marginBottom: 36 }}>
            Join businesses across Nigeria using Sahad Stores to manage their operations efficiently.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/auth?mode=signup" style={{
              background: "linear-gradient(135deg,#e8a020,#f5c842)", color: "#0b1628",
              fontWeight: 800, fontSize: 16, padding: "14px 32px", borderRadius: 12,
              textDecoration: "none", boxShadow: "0 6px 24px rgba(232,160,32,0.4)",
              display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s",
            }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = ""; }}>
              Create Free Account <ArrowRight size={18} />
            </a>
            <a href="/auth?mode=login" style={{
              color: "#374151", fontWeight: 600, fontSize: 16,
              padding: "14px 28px", borderRadius: 12, textDecoration: "none",
              border: "2px solid #eaecf0", transition: "all 0.2s",
            }}
              onMouseOver={e => { e.currentTarget.style.borderColor = "#e8a020"; e.currentTarget.style.color = "#e8a020"; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = "#eaecf0"; e.currentTarget.style.color = "#374151"; }}>
              Sign In
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0b1628", padding: "28px 24px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 }}>
          <div style={{ width: 28, height: 28, background: "linear-gradient(135deg,#e8a020,#f5c842)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ShoppingBag size={13} color="#0b1628" />
          </div>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 600 }}>Sahad Stores</span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>© 2026 Sahad Stores. All rights reserved.</p>
      </footer>
    </div>
  );
}