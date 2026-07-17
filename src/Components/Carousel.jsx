import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    eyebrow: "New Arrivals 2026",
    title:   "Next Level\nGaming",
    body:    "The most advanced gaming hardware — curated for peak performance.",
    cta:     "Shop Now",
    img:     "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1600&q=80",
  },
  {
    eyebrow: "Premium Peripherals",
    title:   "Own the\nArsenal",
    body:    "Professional-grade keyboards, mice and headsets trusted by esports athletes.",
    cta:     "Browse Gear",
    img:     "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80",
  },
  {
    eyebrow: "Build Your Setup",
    title:   "Power Your\nBattlestation",
    body:    "GPUs, monitors, chairs and RGB — everything to build your dream rig.",
    cta:     "Shop Setups",
    img:     "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1600&q=80",
  },
];

const Hero = () => (
  <section style={{ width: "100%", position: "relative" }}>
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop
      navigation
      pagination={{ clickable: true }}
      style={{ width: "100%", height: "clamp(400px, 65vh, 640px)" }}
    >
      {slides.map((s, i) => (
        <SwiperSlide key={i}>
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            {/* Background image */}
            <img
              src={s.img}
              alt={s.title}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            {/* Overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, rgba(8,8,15,0.95) 0%, rgba(8,8,15,0.7) 50%, rgba(8,8,15,0.2) 100%)",
              }}
            />
            {/* Bottom fade */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 120,
                background: "linear-gradient(to top, var(--bg), transparent)",
              }}
            />

            {/* Content */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "0 clamp(24px, 8%, 120px)",
                maxWidth: 680,
              }}
            >
              <p className="eyebrow" style={{ marginBottom: 16, opacity: 0.9 }}>
                {s.eyebrow}
              </p>
              <h1
                className="font-display"
                style={{
                  fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1.05,
                  whiteSpace: "pre-line",
                  letterSpacing: "-0.02em",
                  marginBottom: 20,
                }}
              >
                {s.title}
              </h1>
              <p
                style={{
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.6,
                  marginBottom: 32,
                  maxWidth: 440,
                }}
              >
                {s.body}
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <Link to="/products" className="btn btn-primary" style={{ padding: "12px 28px" }}>
                  {s.cta}
                </Link>
                <Link to="/about" className="btn btn-ghost" style={{ padding: "12px 28px" }}>
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);

export default Hero;
