import { Link } from "react-router-dom";
import { ShoppingBag, Plus, Minus, Trash2, ArrowLeft, Tag } from "lucide-react";
import { useCart } from "../context/CartContext";

/* ═══════════════════════════════════════════════ */
const Cart = () => {
  const {
    cart, increaseQuantity, decreaseQuantity,
    removeFromCart, clearCart, totalPrice,
  } = useCart();

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
  const gst        = Math.round(totalPrice * 0.18);
  const grandTotal = totalPrice + gst;

  /* ── Empty ──────────────────────────────────── */
  if (cart.length === 0) return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        textAlign: "center",
        padding: "0 24px",
      }}
    >
      <p className="float" style={{ fontSize: "3.5rem" }}>🛒</p>
      <h1 className="heading" style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)" }}>
        Your Cart is Empty
      </h1>
      <p style={{ color: "var(--text-sub)", fontSize: "0.875rem", maxWidth: 280 }}>
        Add some legendary gaming gear to start your order.
      </p>
      <Link to="/products" className="btn btn-primary" style={{ padding: "12px 28px" }}>
        <ShoppingBag size={15} /> Browse Store
      </Link>
      <Link
        to="/"
        style={{
          fontSize: "0.8rem",
          color: "var(--text-muted)",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
      >
        <ArrowLeft size={13} /> Back to Home
      </Link>
    </div>
  );

  /* ── Cart ───────────────────────────────────── */
  return (
    <main style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 24px" }}>

      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <p className="eyebrow" style={{ marginBottom: 8 }}>Your Order</p>
        <h1 className="heading-accent" style={{ fontSize: "clamp(2rem, 5vw, 2.8rem)" }}>
          Shopping Cart
        </h1>
        <p style={{ color: "var(--text-sub)", fontSize: "0.875rem", marginTop: 6 }}>
          {totalItems} item{totalItems !== 1 ? "s" : ""}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr min(380px, 100%)",
          gap: 24,
          alignItems: "start",
        }}
      >
        {/* ── Items ─────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                flexWrap: "wrap",
              }}
            >
              {/* Image */}
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 12,
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: 80, height: 80, objectFit: "contain" }}
                />
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 120 }}>
                <span className="tag" style={{ display: "inline-flex", marginBottom: 8 }}>
                  {item.category}
                </span>
                <p style={{ fontWeight: 600, fontSize: "0.9rem", lineHeight: 1.4, marginBottom: 6 }}>
                  {item.title}
                </p>
                <p
                  className="font-display"
                  style={{ fontSize: "1rem", fontWeight: 900, color: "var(--accent)" }}
                >
                  ₹{item.price.toLocaleString("en-IN")}
                </p>
              </div>

              {/* Quantity */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                <button
                  className="btn-icon"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  <Minus size={12} />
                </button>
                <span
                  className="font-display"
                  style={{ width: 28, textAlign: "center", fontWeight: 900, fontSize: "0.95rem" }}
                >
                  {item.quantity}
                </span>
                <button
                  className="btn-icon"
                  onClick={() => increaseQuantity(item.id)}
                  style={{ borderColor: "var(--accent-border)", color: "var(--accent)" }}
                >
                  <Plus size={12} />
                </button>
              </div>

              {/* Subtotal + Remove */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 8,
                  flexShrink: 0,
                  minWidth: 90,
                }}
              >
                <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: "0.75rem",
                    transition: ".2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  <Trash2 size={12} /> Remove
                </button>
              </div>
            </div>
          ))}

          {/* Clear all */}
          <button
            onClick={clearCart}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: "0.8rem",
              marginTop: 4,
              transition: ".2s",
              width: "fit-content",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            <Trash2 size={13} /> Clear all items
          </button>
        </div>

        {/* ── Summary ───────────────────────────── */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: 28,
            position: "sticky",
            top: 80,
          }}
        >
          <h2
            className="font-display"
            style={{ fontSize: "0.9rem", fontWeight: 800, letterSpacing: "0.08em", marginBottom: 24, color: "var(--text)" }}
          >
            ORDER SUMMARY
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: "0.875rem" }}>
            <Row label={`Items (${totalItems})`}    value={`₹${totalPrice.toLocaleString("en-IN")}`} />
            <Row label="Shipping"                    value="FREE"       highlight />
            <Row label="GST (18%)"                   value={`₹${gst.toLocaleString("en-IN")}`}       />
          </div>

          {/* Promo */}
          <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
            <div style={{ position: "relative", flex: 1 }}>
              <Tag
                size={12}
                style={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                  pointerEvents: "none",
                }}
              />
              <input
                type="text"
                placeholder="Promo code"
                style={{
                  paddingLeft: 30,
                  paddingRight: 12,
                  paddingTop: 9,
                  paddingBottom: 9,
                  borderRadius: 8,
                  fontSize: "0.8rem",
                }}
              />
            </div>
            <button
              className="btn btn-ghost"
              style={{ padding: "9px 14px", fontSize: "0.8rem", flexShrink: 0 }}
            >
              Apply
            </button>
          </div>

          {/* Divider */}
          <div className="divider" style={{ margin: "20px 0" }} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>Total</span>
            <span
              className="font-display"
              style={{ fontSize: "1.2rem", fontWeight: 900, color: "var(--accent)" }}
            >
              ₹{grandTotal.toLocaleString("en-IN")}
            </span>
          </div>

          <button
            className="btn btn-primary"
            style={{ width: "100%", padding: "13px", fontSize: "0.875rem" }}
          >
            Proceed to Checkout
          </button>

          <Link
            to="/products"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              marginTop: 14,
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              transition: ".2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            <ArrowLeft size={13} /> Continue Shopping
          </Link>

          {/* Trust */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
              marginTop: 20,
              paddingTop: 16,
              borderTop: "1px solid var(--border)",
              fontSize: "0.72rem",
              color: "var(--text-muted)",
            }}
          >
            <span>🔒 Secure</span>
            <span>🚚 Free Ship</span>
            <span>✅ Genuine</span>
          </div>
        </div>
      </div>

      {/* Responsive cart grid */}
      <style>{`
        @media (max-width: 768px) {
          main > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
};

/* ─── Summary row ──────────────────────────────── */
const Row = ({ label, value, highlight }) => (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <span style={{ color: "var(--text-sub)" }}>{label}</span>
    <span style={{ fontWeight: 600, color: highlight ? "var(--accent)" : "var(--text)" }}>
      {value}
    </span>
  </div>
);

export default Cart;