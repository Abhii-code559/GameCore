import { useContext, useState } from "react";
import { ShoppingCart, Star, Search, SlidersHorizontal } from "lucide-react";
import { DataContext } from "../context/DataContext";
import { useCart } from "../context/CartContext";

/* ─── Stars ────────────────────────────────────── */
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

/* ─── Sort options ─────────────────────────────── */
const SORT = [
  { v: "default",  l: "Featured"         },
  { v: "low-high", l: "Price: Low → High" },
  { v: "high-low", l: "Price: High → Low" },
  { v: "rating",   l: "Top Rated"         },
];

/* ═══════════════════════════════════════════════ */
const Product = () => {
  const {
    filteredProducts, loading, error,
    search, setSearch,
    category, setCategory,
    categories,
  } = useContext(DataContext);

  const { addToCart } = useCart();
  const [sort,     setSort]     = useState("default");
  const [added,    setAdded]    = useState([]);

  const sorted = (() => {
    const l = [...filteredProducts];
    if (sort === "low-high")  return l.sort((a,b) => a.price - b.price);
    if (sort === "high-low")  return l.sort((a,b) => b.price - a.price);
    if (sort === "rating")    return l.sort((a,b) => b.rating.rate - a.rating.rate);
    return l;
  })();

  const handleAdd = (item) => {
    addToCart(item);
    setAdded((p) => [...p, item.id]);
    setTimeout(() => setAdded((p) => p.filter((x) => x !== item.id)), 1400);
  };

  /* Loading */
  if (loading) return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
        {[...Array(12)].map((_, i) => (
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
    </div>
  );

  /* Error */
  if (error) return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, textAlign: "center", padding: "0 24px" }}>
      <p style={{ fontSize: "2rem" }}>⚠️</p>
      <h2 className="heading" style={{ fontSize: "1.4rem" }}>Failed to Load</h2>
      <p style={{ color: "var(--text-sub)", fontSize: "0.875rem" }}>{error}</p>
    </div>
  );

  return (
    <main style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 24px" }}>

      {/* Page header */}
      <div style={{ marginBottom: 40 }}>
        <p className="eyebrow" style={{ marginBottom: 8 }}>The Arsenal</p>
        <h1 className="heading-accent" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
          Gaming Store
        </h1>
      </div>

      {/* Search + Sort */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search
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
            style={{ paddingLeft: 36, paddingRight: 16, paddingTop: 10, paddingBottom: 10, borderRadius: 10, fontSize: "0.875rem" }}
          />
        </div>
        <div style={{ position: "relative", flexShrink: 0 }}>
          <SlidersHorizontal
            size={13}
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
              pointerEvents: "none",
            }}
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{
              paddingLeft: 34,
              paddingRight: 36,
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 10,
              fontSize: "0.875rem",
              appearance: "none",
              cursor: "pointer",
              minWidth: 180,
            }}
          >
            {SORT.map((o) => (
              <option key={o.v} value={o.v} style={{ background: "#0d0d1a" }}>
                {o.l}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`pill ${category === cat ? "active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Count */}
      <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: 24 }}>
        {sorted.length} product{sorted.length !== 1 ? "s" : ""}
        {search ? ` for "${search}"` : ""}
      </p>

      {/* Empty state */}
      {sorted.length === 0 && (
        <div
          style={{
            minHeight: "40vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            textAlign: "center",
          }}
        >
          <p className="float" style={{ fontSize: "3.5rem" }}>🎮</p>
          <h2 className="heading" style={{ fontSize: "1.4rem" }}>No Products Found</h2>
          <p style={{ color: "var(--text-sub)", fontSize: "0.875rem" }}>
            Try different keywords or clear your filters.
          </p>
          <button
            onClick={() => { setSearch(""); setCategory("All"); }}
            className="btn btn-primary"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Products grid */}
      {sorted.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 20,
          }}
        >
          {sorted.map((item) => {
            const isAdded = added.includes(item.id);
            return (
              <div key={item.id} className="product-card">
                {/* Image */}
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

                {/* Info */}
                <div style={{ padding: 20 }}>
                  <span className="tag" style={{ display: "inline-flex", marginBottom: 10 }}>
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
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "14px 0" }}>
                    <span
                      className="font-display"
                      style={{ fontSize: "1.1rem", fontWeight: 900, color: "var(--accent)" }}
                    >
                      ₹{item.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <button
                    onClick={() => handleAdd(item)}
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      padding: "10px",
                      background: isAdded
                        ? "rgba(0,212,255,0.15)"
                        : "var(--accent)",
                      color: isAdded ? "var(--accent)" : "#000",
                      border: isAdded ? "1px solid var(--accent-border)" : "none",
                      transition: ".25s",
                    }}
                  >
                    <ShoppingCart size={13} />
                    {isAdded ? "Added ✓" : "Add to Cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default Product;