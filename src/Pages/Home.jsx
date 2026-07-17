import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Star, ArrowRight, Zap, Truck, Shield, Trophy } from "lucide-react";
import Hero from "../Components/Carousel";
import { DataContext } from "../context/DataContext";
import { useCart } from "../context/CartContext";

/* ─── Star rating ──────────────────────────────── */
const Stars = ({ rate }) => (
  <span style={{ display: "flex", alignItems: "center", gap: 2 }}>
    {[1,2,3,4,5].map((i) => (
      <Star
        key={i}
        size={11}
        fill={i <= Math.floor(rate) ? "#f59e0b" : "none"}
        stroke={i <= Math.floor(rate) ? "#f59e0b" : "#3a3a50"}
      />
    ))}
    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginLeft: 4 }}>{rate}</span>
  </span>
);

/* ─── Feature data ─────────────────────────────── */
const features = [
  { icon: Zap,     label: "Elite Gear",        desc: "Handpicked from top manufacturers"  },
  { icon: Truck,   label: "24–48hr Delivery",   desc: "Fast shipping across India"         },
  { icon: Shield,  label: "Secure Checkout",    desc: "Encrypted & safe transactions"      },
  { icon: Trophy,  label: "50K+ Gamers",        desc: "Trusted by the community"           },
];

/* ─── Reviews ──────────────────────────────────── */
const reviews = [
  { initials:"RS", name:"Rahul Sharma",  text:"Got my ROG laptop next day. Packaging was perfect. 10/10 service.",              product:"ASUS ROG Strix"   },
  { initials:"AG", name:"Ananya Gupta",  text:"Genuine PS5 at the best price I found anywhere. Super fast delivery.",            product:"PlayStation 5"    },
  { initials:"AV", name:"Aman Verma",    text:"Built my entire battlestation from GameCore. Quality is unmatched every time.",   product:"Full Setup"       },
];

/* ─── Brands ───────────────────────────────────── */
const brands = ["ASUS ROG", "Razer", "Logitech G", "HyperX", "NVIDIA", "Sony", "Corsair", "SteelSeries", "Samsung"];

/* ═══════════════════════════════════════════════ */
const S = {
  section: { maxWidth: 1280, margin: "0 auto", padding: "80px 24px" },
  sectionNarrow: { maxWidth: 1280, margin: "0 auto", padding: "0 24px" },
  grid4: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 20,
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 20,
  },
};

const Home = () => {
  const { filteredProducts, loading } = useContext(DataContext);
  const { addToCart } = useCart();

  return (
    <main>

      {/* ── Hero ──────────────────────────────── */}
      <Hero />

      {/* ── Brands strip ──────────────────────── */}
      <div
        style={{
          overflow: "hidden",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "18px 0",
          background: "rgba(255,255,255,0.015)",
        }}
      >
        <div className="marquee-track">
          {[...brands, ...brands].map((b, i) => (
            <span
              key={i}
              className="font-display"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                color: "var(--text-muted)",
                whiteSpace: "nowrap",
              }}
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* ── Featured Products ─────────────────── */}
      <div style={S.section}>

        {/* Section header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 40,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <p className="eyebrow" style={{ marginBottom: 8 }}>Featured</p>
            <h2
              className="heading-accent"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}
            >
              Top Products
            </h2>
          </div>
          <Link
            to="/products"
            className="btn btn-ghost"
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            View All <ArrowRight size={15} />
          </Link>
        </div>

        {/* Grid */}
        {loading ? (
          <div style={S.grid4}>
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{ background: "var(--bg-card)", borderRadius: 16, overflow: "hidden", border: "1px solid var(--border)" }}>
                <div className="skeleton" style={{ height: 200 }} />
                <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                  <div className="skeleton" style={{ height: 12, width: "70%" }} />
                  <div className="skeleton" style={{ height: 10, width: "50%" }} />
                  <div className="skeleton" style={{ height: 36, borderRadius: 8 }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={S.grid4}>
            {filteredProducts.slice(0, 8).map((item) => (
              <ProductCard key={item.id} item={item} onAdd={() => addToCart(item)} />
            ))}
          </div>
        )}
      </div>

      {/* ── Why Choose Us ─────────────────────── */}
      <div
        style={{
          background: "rgba(255,255,255,0.015)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={S.section}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p className="eyebrow" style={{ marginBottom: 8 }}>Why GameCore</p>
            <h2 className="heading-accent" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>
              Built for Gamers
            </h2>
          </div>
          <div style={S.grid4}>
            {features.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="card"
                style={{ padding: 32, textAlign: "center" }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "var(--accent-dim)",
                    border: "1px solid var(--accent-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    color: "var(--accent)",
                  }}
                >
                  <Icon size={22} />
                </div>
                <p
                  className="font-display"
                  style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: "0.04em" }}
                >
                  {label}
                </p>
                <p style={{ fontSize: "0.8rem", color: "var(--text-sub)", lineHeight: 1.5 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Reviews ───────────────────────────── */}
      <div style={S.section}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="eyebrow" style={{ marginBottom: 8 }}>Testimonials</p>
          <h2 className="heading-accent" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>
            Player Reviews
          </h2>
        </div>
        <div style={S.grid3}>
          {reviews.map(({ initials, name, text, product }) => (
            <div key={name} className="card" style={{ padding: 28 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "var(--accent-dim)",
                    border: "1px solid var(--accent-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    color: "var(--accent)",
                    flexShrink: 0,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {initials}
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "0.9rem" }}>{name}</p>
                  <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{product}</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} size={13} fill="#f59e0b" stroke="#f59e0b" />
                ))}
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--text-sub)", lineHeight: 1.6 }}>
                "{text}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Newsletter ────────────────────────── */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          background: "rgba(255,255,255,0.015)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
          <p className="eyebrow" style={{ marginBottom: 12 }}>Stay Updated</p>
          <h2 className="heading" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", marginBottom: 12 }}>
            Level Up Your Inbox
          </h2>
          <p style={{ color: "var(--text-sub)", marginBottom: 32, fontSize: "0.9rem" }}>
            Exclusive deals, early access & gaming news.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{
              display: "flex",
              gap: 10,
              maxWidth: 420,
              margin: "0 auto",
              flexWrap: "wrap",
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                minWidth: 200,
                borderRadius: 10,
                padding: "10px 16px",
                fontSize: "0.875rem",
              }}
            />
            <button type="submit" className="btn btn-primary" style={{ flexShrink: 0 }}>
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* ── Footer ────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          background: "rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "48px 24px",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 40,
          }}
        >
          <div style={{ maxWidth: 260 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <Zap size={16} style={{ color: "var(--accent)" }} />
              <span
                className="font-display"
                style={{ fontSize: "0.95rem", fontWeight: 900, letterSpacing: "0.12em", color: "#fff" }}
              >
                GAMECORE
              </span>
            </div>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
              India's most trusted gaming store. Built by gamers, for gamers.
            </p>
          </div>
          <div style={{ display: "flex", gap: 60, flexWrap: "wrap" }}>
            {[
              { title: "Shop",    items: [["All Products","/products"],["Consoles","/products"],["Accessories","/products"]] },
              { title: "Company", items: [["About Us","/about"],["Contact","/contact"]] },
            ].map(({ title, items }) => (
              <div key={title}>
                <p
                  className="font-display"
                  style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 16 }}
                >
                  {title}
                </p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {items.map(([label, to]) => (
                    <li key={label}>
                      <Link
                        to={to}
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--text-sub)",
                          transition: ".2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-sub)")}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid var(--border)",
            textAlign: "center",
            padding: "16px 24px",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
          }}
        >
          © {new Date().getFullYear()} GameCore. All rights reserved.
        </div>
      </footer>
    </main>
  );
};

/* ─── Reusable Product Card ────────────────────── */
const ProductCard = ({ item, onAdd }) => (
  <div className="product-card">
    <div className="img-box" style={{ height: 200 }}>
      <img
        src={item.image}
        alt={item.title}
        style={{
          maxHeight: 160,
          maxWidth: "100%",
          objectFit: "contain",
          transition: "transform .4s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
    </div>
    <div style={{ padding: "20px" }}>
      <span className="tag" style={{ marginBottom: 10, display: "inline-flex" }}>
        {item.category}
      </span>
      <p
        style={{
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "var(--text)",
          lineHeight: 1.4,
          marginBottom: 10,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          minHeight: "2.5rem",
        }}
      >
        {item.title}
      </p>
      <Stars rate={item.rating.rate} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14, marginBottom: 14 }}>
        <span
          className="font-display"
          style={{ fontSize: "1.1rem", fontWeight: 900, color: "var(--accent)" }}
        >
          ₹{item.price.toLocaleString("en-IN")}
        </span>
      </div>
      <button
        onClick={onAdd}
        className="btn btn-primary"
        style={{ width: "100%", padding: "10px" }}
      >
        <ShoppingCart size={14} />
        Add to Cart
      </button>
    </div>
  </div>
);

export default Home;