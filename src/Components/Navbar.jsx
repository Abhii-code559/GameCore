import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Menu, X, Zap } from "lucide-react";
import { FiSearch } from "react-icons/fi";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useCart } from "../context/CartContext";
import { DataContext } from "../context/DataContext";

const links = [
  { to: "/",         label: "Home"     },
  { to: "/products", label: "Products" },
  { to: "/about",    label: "About"    },
  { to: "/contact",  label: "Contact"  },
];

const Navbar = ({ location }) => {
  const { totalItems } = useCart();
  const { search, setSearch } = useContext(DataContext);
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(8,8,15,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", height: 64, gap: 32 }}>

          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <Zap size={18} style={{ color: "var(--accent)" }} />
            <span
              className="font-display"
              style={{
                fontSize: "1.1rem",
                fontWeight: 900,
                letterSpacing: "0.12em",
                color: "#fff",
              }}
            >
              GAMECORE
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 4, flex: 1 }} className="hidden-mobile">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                style={({ isActive }) => ({
                  padding: "6px 14px",
                  borderRadius: 8,
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: isActive ? "var(--accent)" : "var(--text-sub)",
                  background: isActive ? "var(--accent-dim)" : "transparent",
                  transition: ".2s",
                })}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.classList.contains("active-link"))
                    e.currentTarget.style.color = "var(--text)";
                }}
                onMouseLeave={(e) => {
                  if (!e.currentTarget.getAttribute("aria-current"))
                    e.currentTarget.style.color = "var(--text-sub)";
                }}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Search */}
          <div
            style={{
              position: "relative",
              width: 280,
              flexShrink: 0,
            }}
            className="hidden-mobile"
          >
            <FiSearch
              size={14}
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                paddingLeft: 36,
                paddingRight: 16,
                paddingTop: 8,
                paddingBottom: 8,
                borderRadius: 10,
                fontSize: "0.85rem",
              }}
            />
          </div>

          {/* Right Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: "auto", flexShrink: 0 }}>
            {/* Location (desktop) */}
            {location && (
              <div
                className="hidden-mobile"
                style={{ textAlign: "right", lineHeight: 1.2 }}
              >
                <p style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginBottom: 1 }}>
                  Deliver to
                </p>
                <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text)" }}>
                  {location.city}
                </p>
              </div>
            )}

            {/* Auth */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="btn btn-ghost" style={{ padding: "7px 16px", fontSize: "0.8rem" }}>
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            {/* Cart */}
            <Link
              to="/cart"
              style={{ position: "relative", display: "flex", alignItems: "center" }}
            >
              <ShoppingCart
                size={22}
                style={{ color: "var(--text-sub)", transition: ".2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-sub)")}
              />
              {totalItems > 0 && (
                <span
                  className="badge-pop"
                  style={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    background: "var(--accent)",
                    color: "#000",
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    fontSize: "0.6rem",
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="show-mobile"
              onClick={() => setOpen((o) => !o)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-sub)",
                display: "none",
              }}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${open ? "open" : "closed"}`}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "16px 24px 20px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {/* Mobile search */}
          <div style={{ position: "relative", marginBottom: 8 }}>
            <FiSearch
              size={14}
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
              }}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: 36, paddingRight: 16, paddingTop: 10, paddingBottom: 10, borderRadius: 10, fontSize: "0.85rem" }}
            />
          </div>

          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                padding: "10px 14px",
                borderRadius: 8,
                fontSize: "0.875rem",
                fontWeight: 500,
                color: isActive ? "var(--accent)" : "var(--text-sub)",
                background: isActive ? "var(--accent-dim)" : "transparent",
              })}
            >
              {label}
            </NavLink>
          ))}

          <div style={{ marginTop: 8 }}>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="btn btn-primary" style={{ width: "100%", padding: "10px" }}>
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>

      {/* Responsive helpers */}
      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;