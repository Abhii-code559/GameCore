import { Zap, Target, Award, Globe, Users } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { val: "50K+",  label: "Gamers Served"  },
  { val: "200+",  label: "Products"       },
  { val: "48h",   label: "Avg Delivery"   },
  { val: "99%",   label: "Satisfaction"   },
];

const values = [
  { Icon: Target, title: "Precision",  desc: "Every product tested by gamers, for gamers."      },
  { Icon: Zap,    title: "Speed",      desc: "From order confirmed to your door — fast."         },
  { Icon: Globe,  title: "Community",  desc: "A trusted network of 50,000+ players nationwide."  },
  { Icon: Award,  title: "Quality",    desc: "Genuine, warrantied, manufacturer-sourced gear."   },
];

const team = [
  { initials: "AM", name: "Arjun Mehta",  role: "Founder & CEO",      bio: "Ex-esports athlete who turned a dorm-room idea into India's top gaming store."             },
  { initials: "PS", name: "Priya Singh",  role: "Head of Products",   bio: "10 years in hardware procurement — every product we stock has her seal of approval."        },
  { initials: "RN", name: "Rohit Nair",   role: "Lead Engineer",      bio: "Built the entire platform solo. Full-stack engineer and die-hard PC gamer."                  },
];

const S = {
  page:    { maxWidth: 1280, margin: "0 auto" },
  section: { maxWidth: 1280, margin: "0 auto", padding: "80px 24px" },
  grid4:   { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 },
  grid3:   { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 },
};

const About = () => (
  <main>

    {/* ── Hero ──────────────────────────────────── */}
    <section
      style={{
        borderBottom: "1px solid var(--border)",
        padding: "96px 24px 80px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <p className="eyebrow" style={{ marginBottom: 16 }}>Our Story</p>
        <h1 className="heading-accent" style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", marginBottom: 20 }}>
          About GameCore
        </h1>
        <p style={{ color: "var(--text-sub)", fontSize: "1.05rem", lineHeight: 1.7 }}>
          We started as gamers fed up with overpriced, counterfeit gear.
          Today GameCore is India's most trusted gaming destination — built by players, for players.
        </p>
      </div>
    </section>

    {/* ── Stats ─────────────────────────────────── */}
    <div style={{ borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.015)" }}>
      <div style={S.section}>
        <div style={S.grid4}>
          {stats.map(({ val, label }) => (
            <div
              key={label}
              className="card"
              style={{ padding: "36px 24px", textAlign: "center" }}
            >
              <p
                className="font-display"
                style={{ fontSize: "2.2rem", fontWeight: 900, color: "var(--accent)", lineHeight: 1 }}
              >
                {val}
              </p>
              <p style={{ fontSize: "0.85rem", color: "var(--text-sub)", marginTop: 8 }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* ── Story ─────────────────────────────────── */}
    <div style={{ ...S.section, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
      <div>
        <p className="eyebrow" style={{ marginBottom: 12 }}>How We Started</p>
        <h2 className="heading-accent" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", marginBottom: 24 }}>
          From Passion to Platform
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, color: "var(--text-sub)", fontSize: "0.9rem", lineHeight: 1.75 }}>
          <p>
            GameCore was founded in 2022 by a team of esports athletes and hardware engineers.
            We were frustrated by inflated prices, fake products, and poor service in the Indian gaming market.
          </p>
          <p>
            So we built something better — sourcing directly from authorized distributors,
            offering the best prices, fastest shipping, and genuine warranty support.
          </p>
          <p>
            Today, we serve 50,000+ gamers across India with 200+ products from ASUS ROG,
            Razer, Logitech, HyperX, NVIDIA, Sony, and more.
          </p>
        </div>
      </div>

      <div
        className="card"
        style={{ padding: 32 }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}
        >
          {[
            ["🎮","Consoles"],["💻","Gaming PCs"],
            ["🖱️","Peripherals"],["🎧","Audio"],
            ["🖥️","Monitors"],["⚡","Accessories"],
          ].map(([icon, label]) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 16px",
                borderRadius: 10,
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>{icon}</span>
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-sub)" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>

    {/* ── Values ────────────────────────────────── */}
    <div style={{ borderTop: "1px solid var(--border)", background: "rgba(255,255,255,0.015)" }}>
      <div style={S.section}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="eyebrow" style={{ marginBottom: 10 }}>What Drives Us</p>
          <h2 className="heading-accent" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>
            Core Values
          </h2>
        </div>
        <div style={S.grid4}>
          {values.map(({ Icon, title, desc }) => (
            <div key={title} className="card" style={{ padding: 28 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "var(--accent-dim)",
                  border: "1px solid var(--accent-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent)",
                  marginBottom: 16,
                }}
              >
                <Icon size={20} />
              </div>
              <p
                className="font-display"
                style={{ fontSize: "0.8rem", fontWeight: 800, letterSpacing: "0.06em", color: "var(--text)", marginBottom: 8 }}
              >
                {title.toUpperCase()}
              </p>
              <p style={{ fontSize: "0.83rem", color: "var(--text-sub)", lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* ── Team ──────────────────────────────────── */}
    <div style={S.section}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <p className="eyebrow" style={{ marginBottom: 10 }}>The People</p>
        <h2 className="heading-accent" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>
          Meet the Team
        </h2>
      </div>
      <div style={{ ...S.grid3, maxWidth: 900, margin: "0 auto" }}>
        {team.map(({ initials, name, role, bio }) => (
          <div key={name} className="card" style={{ padding: 28, textAlign: "center" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "var(--accent-dim)",
                border: "1px solid var(--accent-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                fontSize: "1rem",
                fontWeight: 800,
                color: "var(--accent)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {initials}
            </div>
            <p style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 4 }}>{name}</p>
            <p className="eyebrow" style={{ fontSize: "0.62rem", marginBottom: 14 }}>{role}</p>
            <p style={{ fontSize: "0.83rem", color: "var(--text-sub)", lineHeight: 1.6 }}>{bio}</p>
          </div>
        ))}
      </div>
    </div>

    {/* ── CTA ───────────────────────────────────── */}
    <div
      style={{
        borderTop: "1px solid var(--border)",
        background: "rgba(255,255,255,0.015)",
        textAlign: "center",
        padding: "80px 24px",
      }}
    >
      <h2 className="heading" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", marginBottom: 12 }}>
        Ready to Gear Up?
      </h2>
      <p style={{ color: "var(--text-sub)", marginBottom: 32, fontSize: "0.9rem" }}>
        Join 50,000+ gamers who trust GameCore.
      </p>
      <Link to="/products" className="btn btn-primary" style={{ padding: "13px 32px" }}>
        Shop the Collection
      </Link>
    </div>
  </main>
);

export default About;
