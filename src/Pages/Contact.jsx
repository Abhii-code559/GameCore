import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";

/* ── Real destination email (used only for form submission – NOT shown publicly) ── */
const RECIPIENT_EMAIL = "subjectscience559@gmail.com";

/* ── Public contact info shown on the page ── */
const info = [
  { Icon: Mail,  title: "Email",   val: "support@gamecore.in",   sub: "Reply within 2 hours",  href: `mailto:${RECIPIENT_EMAIL}` },
  { Icon: Phone, title: "Phone",   val: "+91 77820 67717",        sub: "Mon–Sat, 9AM–9PM",      href: "tel:+917782067717"         },
  { Icon: MapPin,title: "Address", val: "Gumla, Jharkhand",       sub: "India – 835207",        href: null                        },
  { Icon: Clock, title: "Hours",   val: "9AM – 9PM IST",          sub: "Monday to Saturday",    href: null                        },
];

const faqs = [
  { q: "How long does delivery take?", a: "Most orders arrive within 24–48 hours across major cities." },
  { q: "Are all products genuine?", a: "Yes — sourced directly from authorized distributors with full warranty." },
  { q: "What is your return policy?", a: "7-day hassle-free returns. No questions asked." },
  { q: "Is EMI available?", a: "Yes, on orders above ₹3,000 via Razorpay on major cards." },
];

const INIT = { name: "", email: "", subject: "", message: "" };

const Contact = () => {
  const [form,    setForm]    = useState(INIT);
  const [sending, setSending] = useState(false);
  const [status,  setStatus]  = useState(null); // "sent" | "error" | null
  const [errors,  setErrors]  = useState({});
  const [faqOpen, setFaqOpen] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    // Clear field error on change
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  /* ── Validation ─────────────────────────────── */
  const validate = () => {
    const errs = {};
    if (!form.name.trim())    errs.name    = "Name is required";
    if (!form.email.trim())   errs.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  /* ── Submit — sends real email via FormSubmit (free, no signup) ── */
  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSending(true);
    setStatus(null);

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name:    form.name,
          email:   form.email,
          subject: form.subject || "GameCore Contact Form",
          message: form.message,
          _captcha: "false",
          _template: "box",
        }),
      });

      if (res.ok) {
        setStatus("sent");
        setForm(INIT);
        setErrors({});
      } else {
        setStatus("error");
      }
    } catch (_) {
      setStatus("error");
    } finally {
      setSending(false);
    }
  };


  return (
    <main>

      {/* ── Hero ──────────────────────────────── */}
      <section
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "96px 24px 80px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>Get in Touch</p>
          <h1 className="heading-accent" style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", marginBottom: 18 }}>
            Contact Us
          </h1>
          <p style={{ color: "var(--text-sub)", fontSize: "1rem", lineHeight: 1.7 }}>
            Questions, orders, or just want to talk gaming?
            We're here and we respond fast.
          </p>
        </div>
      </section>

      {/* ── Info cards ────────────────────────── */}
      <div style={{ borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.015)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {info.map(({ Icon, title, val, sub, href }) => {
              const Tag = href ? "a" : "div";
              return (
                <Tag
                  key={title}
                  href={href || undefined}
                  className="card"
                  style={{
                    padding: 24,
                    cursor: href ? "pointer" : "default",
                    textDecoration: "none",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "var(--accent-dim)",
                      border: "1px solid var(--accent-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent)",
                      marginBottom: 14,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <p
                    className="font-display"
                    style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 6 }}
                  >
                    {title}
                  </p>
                  <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>
                    {val}
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{sub}</p>
                </Tag>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Form + FAQ ────────────────────────── */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "80px 24px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
          alignItems: "start",
        }}
      >

        {/* Form */}
        <div>
          <p className="eyebrow" style={{ marginBottom: 10 }}>Send a Message</p>
          <h2 className="heading-accent" style={{ fontSize: "clamp(1.6rem, 3vw, 2.1rem)", marginBottom: 32 }}>
            Drop Us a Line
          </h2>

          {status === "sent" ? (
            <div className="card" style={{ padding: 48, textAlign: "center" }}>
              <CheckCircle size={48} style={{ color: "var(--accent)", margin: "0 auto 16px" }} />
              <p className="font-display" style={{ fontSize: "1rem", fontWeight: 800, marginBottom: 8, letterSpacing: "0.05em" }}>
                Message Sent!
              </p>
              <p style={{ color: "var(--text-sub)", fontSize: "0.875rem", marginBottom: 20 }}>
                We've received your message and will reply to <strong style={{ color: "var(--text)" }}>{RECIPIENT_EMAIL}</strong> within 2 hours.
              </p>
              <button
                className="btn btn-ghost"
                style={{ padding: "9px 20px", fontSize: "0.8rem" }}
                onClick={() => setStatus(null)}
              >
                Send Another
              </button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              className="card"
              style={{ padding: 32, display: "flex", flexDirection: "column", gap: 18 }}
            >
              {/* Network error banner */}
              {status === "error" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px 16px",
                    borderRadius: 10,
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.25)",
                    fontSize: "0.8rem",
                    color: "#f87171",
                  }}
                >
                  <AlertCircle size={15} />
                  Failed to send. Please try again or email us directly at {RECIPIENT_EMAIL}.
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Field label="Name *" error={errors.name}>
                  <input
                    name="name" type="text" placeholder="Your name"
                    value={form.name} onChange={onChange}
                    style={{
                      borderRadius: 10, padding: "10px 14px", fontSize: "0.875rem",
                      borderColor: errors.name ? "rgba(239,68,68,0.5)" : undefined,
                    }}
                  />
                </Field>
                <Field label="Email *" error={errors.email}>
                  <input
                    name="email" type="email" placeholder="you@email.com"
                    value={form.email} onChange={onChange}
                    style={{
                      borderRadius: 10, padding: "10px 14px", fontSize: "0.875rem",
                      borderColor: errors.email ? "rgba(239,68,68,0.5)" : undefined,
                    }}
                  />
                </Field>
              </div>
              <Field label="Subject">
                <input
                  name="subject" type="text" placeholder="What's this about?"
                  value={form.subject} onChange={onChange}
                  style={{ borderRadius: 10, padding: "10px 14px", fontSize: "0.875rem" }}
                />
              </Field>
              <Field label="Message *" error={errors.message}>
                <textarea
                  name="message" rows={5} placeholder="Tell us how we can help..."
                  value={form.message} onChange={onChange}
                  style={{
                    borderRadius: 10, padding: "10px 14px", fontSize: "0.875rem", resize: "none",
                    borderColor: errors.message ? "rgba(239,68,68,0.5)" : undefined,
                  }}
                />
              </Field>
              <button
                type="submit"
                disabled={sending}
                className="btn btn-primary"
                style={{ padding: "12px", fontSize: "0.875rem", opacity: sending ? 0.8 : 1 }}
              >
                {sending ? (
                  <>
                    <span
                      style={{
                        width: 14, height: 14,
                        border: "2px solid #000",
                        borderTopColor: "transparent",
                        borderRadius: "50%",
                        display: "inline-block",
                        animation: "spin .7s linear infinite",
                      }}
                    />
                    Sending...
                  </>
                ) : (
                  <><Send size={14} /> Send Message</>
                )}
              </button>
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            </form>
          )}
        </div>


        {/* FAQ */}
        <div>
          <p className="eyebrow" style={{ marginBottom: 10 }}>Common Questions</p>
          <h2 className="heading-accent" style={{ fontSize: "clamp(1.6rem, 3vw, 2.1rem)", marginBottom: 32 }}>
            FAQ
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {faqs.map((f, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: 0,
                  overflow: "hidden",
                  borderColor: faqOpen === i ? "var(--accent-border)" : "var(--border)",
                }}
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "18px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                    color: "var(--text)",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    textAlign: "left",
                  }}
                >
                  {f.q}
                  <span
                    style={{
                      fontSize: "1.2rem",
                      lineHeight: 1,
                      color: "var(--accent)",
                      transform: faqOpen === i ? "rotate(45deg)" : "rotate(0deg)",
                      transition: ".25s",
                      flexShrink: 0,
                    }}
                  >
                    +
                  </span>
                </button>
                {faqOpen === i && (
                  <div
                    style={{
                      padding: "0 20px 18px",
                      fontSize: "0.85rem",
                      color: "var(--text-sub)",
                      lineHeight: 1.65,
                      borderTop: "1px solid var(--border)",
                      paddingTop: 14,
                    }}
                  >
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Socials */}
          <div style={{ marginTop: 36 }}>
            <p
              className="font-display"
              style={{ fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 14 }}
            >
              Find us on
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Discord", "Twitter", "Instagram", "YouTube"].map((s) => (
                <a
                  key={s}
                  href="#"
                  style={{
                    fontSize: "0.8rem",
                    padding: "7px 14px",
                    borderRadius: 8,
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    color: "var(--text-sub)",
                    transition: ".2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent-border)";
                    e.currentTarget.style.color = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--text-sub)";
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <style>{`@media(max-width:768px){.contact-grid{grid-template-columns:1fr!important;}}`}</style>
      </div>
    </main>
  );
};

/* ─── Form field wrapper ──────────────────────── */
const Field = ({ label, error, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-sub)" }}>{label}</label>
    {children}
    {error && (
      <p style={{ fontSize: "0.72rem", color: "#f87171", marginTop: 2 }}>
        {error}
      </p>
    )}
  </div>
);

export default Contact;

