"use client";

import { useState, useEffect } from "react";
import {
  artists,
  notices,
  companyInfo,
  auditionInfo,
  heroVideo,
} from "@/data/siteData";

const NAV_ITEMS = [
  { id: "home", label: "HOME" },
  { id: "artists", label: "ARTISTS" },
  { id: "notice", label: "NOTICE" },
  { id: "audition", label: "AUDITION" },
  { id: "contact", label: "CONTACT" },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openNotice, setOpenNotice] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: id === "home" ? 0 : y, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Navigation */}
      <nav className={`nav-fixed ${scrolled ? "nav-scrolled" : ""}`}>
        <div
          className="section-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "72px",
          }}
        >
          <button
            onClick={() => scrollTo("home")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-text-primary)",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "3px",
            }}
          >
            MOOD K
          </button>

          {/* Desktop nav */}
          <div
            style={{
              display: "flex",
              gap: "36px",
              alignItems: "center",
            }}
            className="desktop-nav"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--color-text-secondary)",
                  fontSize: "12px",
                  letterSpacing: "2px",
                  fontWeight: 400,
                  transition: "color 0.3s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = "var(--color-accent)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = "var(--color-text-secondary)")
                }
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="mobile-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "none",
              flexDirection: "column",
              gap: "5px",
              padding: "8px",
            }}
          >
            <span
              style={{
                width: "20px",
                height: "1px",
                background: "var(--color-text-secondary)",
                display: "block",
              }}
            />
            <span
              style={{
                width: "20px",
                height: "1px",
                background: "var(--color-text-secondary)",
                display: "block",
              }}
            />
            <span
              style={{
                width: "20px",
                height: "1px",
                background: "var(--color-text-secondary)",
                display: "block",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              background: "none",
              border: "none",
              color: "var(--color-text-secondary)",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="hero-section">
        {heroVideo.url ? (
          heroVideo.type === "youtube" ? (
            <iframe
              className="hero-video"
              src={`${heroVideo.url}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ border: "none", pointerEvents: "none" }}
            />
          ) : (
            <video
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
              src={heroVideo.url}
            />
          )
        ) : (
          <div
            className="hero-video"
            style={{
              background:
                "linear-gradient(135deg, #1a1410 0%, #2a2118 30%, #3a2e22 60%, #1a1410 100%)",
            }}
          />
        )}
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-title">MOOD K</h1>
          <h2
            className="hero-title"
            style={{ fontSize: "clamp(16px, 2.5vw, 28px)", fontWeight: 200 }}
          >
            ENTERTAINMENT
          </h2>
          <p className="hero-subtitle">{companyInfo.description}</p>
        </div>
        <div className="scroll-indicator">
          <svg
            width="20"
            height="30"
            viewBox="0 0 20 30"
            fill="none"
            stroke="var(--color-text-muted)"
            strokeWidth="1.5"
          >
            <rect x="1" y="1" width="18" height="28" rx="9" />
            <line x1="10" y1="6" x2="10" y2="12">
              <animate
                attributeName="opacity"
                values="1;0;1"
                dur="2s"
                repeatCount="indefinite"
              />
            </line>
          </svg>
        </div>
      </section>

      {/* Artists Section */}
      <section
        id="artists"
        style={{ padding: "120px 0", background: "var(--color-bg-primary)" }}
      >
        <div className="section-container">
          <h2 className="section-title">Artists</h2>

          {artists.map((artist) => (
            <div key={artist.id}>
              {/* Artist Name */}
              <div style={{ marginBottom: "48px" }}>
                <div className="artist-name-en">{artist.nameEn}</div>
                <div className="artist-name-ko">{artist.nameKo}</div>
              </div>

              {/* Profile Grid */}
              <div className="artist-profile-grid">
                {/* Main Photo */}
                <div>
                  <div
                    className="artist-main-photo img-placeholder"
                    style={{ borderRadius: "4px" }}
                  >
                    PROFILE PHOTO
                  </div>
                </div>

                {/* Info */}
                <div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "24px",
                      marginBottom: "36px",
                    }}
                  >
                    <div>
                      <div className="artist-info-label">Birth</div>
                      <div className="artist-info-value">
                        {artist.birthDate}
                      </div>
                    </div>
                    <div>
                      <div className="artist-info-label">Height</div>
                      <div className="artist-info-value">{artist.height}</div>
                    </div>
                    <div>
                      <div className="artist-info-label">Weight</div>
                      <div className="artist-info-value">{artist.weight}</div>
                    </div>
                    <div>
                      <div className="artist-info-label">Specialty</div>
                      <div className="artist-info-value">
                        {artist.specialty}
                      </div>
                    </div>
                  </div>

                  {/* Filmography */}
                  <div>
                    <h3
                      style={{
                        fontSize: "12px",
                        letterSpacing: "3px",
                        color: "var(--color-accent)",
                        fontWeight: 500,
                        marginBottom: "8px",
                      }}
                    >
                      FILMOGRAPHY
                    </h3>
                    <table className="filmography-table">
                      <thead>
                        <tr>
                          <th style={{ width: "60px" }}>Year</th>
                          <th style={{ width: "80px" }}>Type</th>
                          <th>Title</th>
                          <th style={{ width: "120px" }}>Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {artist.filmography.map((item, idx) => (
                          <tr key={idx}>
                            <td>{item.year}</td>
                            <td>{item.category}</td>
                            <td style={{ color: "var(--color-text-primary)" }}>
                              {item.title}
                            </td>
                            <td>{item.role}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Photo Gallery */}
              <div className="artist-photo-grid">
                {artist.photos.map((_, idx) => (
                  <div
                    key={idx}
                    className="artist-photo-thumb img-placeholder"
                  >
                    PHOTO {idx + 1}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* Notice Section */}
      <section
        id="notice"
        style={{ padding: "120px 0", background: "var(--color-bg-secondary)" }}
      >
        <div className="section-container">
          <h2 className="section-title">Notice</h2>

          <div>
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="notice-item"
                onClick={() =>
                  setOpenNotice(openNotice === notice.id ? null : notice.id)
                }
              >
                <div className="notice-date">{notice.date}</div>
                <div className="notice-title-text">{notice.title}</div>
                <div
                  className={`notice-content ${openNotice === notice.id ? "open" : ""}`}
                >
                  <div className="notice-content-inner">{notice.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Audition Section */}
      <section
        id="audition"
        style={{ padding: "120px 0", background: "var(--color-bg-primary)" }}
      >
        <div className="section-container">
          <h2 className="section-title">Audition</h2>

          <div className="audition-grid">
            {/* Online */}
            <div className="audition-card">
              <h3 className="audition-card-title">
                {auditionInfo.online.title}
              </h3>
              <p className="audition-card-desc">
                {auditionInfo.online.description}
              </p>
              <div
                style={{
                  marginTop: "20px",
                  fontSize: "14px",
                  color: "var(--color-accent)",
                }}
              >
                ✉ {auditionInfo.online.email}
              </div>
              <ul className="audition-req-list">
                {auditionInfo.online.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>

            {/* Offline */}
            <div className="audition-card">
              <h3 className="audition-card-title">
                {auditionInfo.offline.title}
              </h3>
              <p className="audition-card-desc">
                {auditionInfo.offline.description}
              </p>
              <p
                style={{
                  marginTop: "20px",
                  fontSize: "13px",
                  color: "var(--color-accent)",
                }}
              >
                {auditionInfo.offline.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Contact Section */}
      <section
        id="contact"
        style={{ padding: "120px 0", background: "var(--color-bg-secondary)" }}
      >
        <div className="section-container">
          <h2 className="section-title">Contact</h2>

          <div className="contact-grid">
            <div>
              <div className="contact-info-item">
                <div className="contact-info-label">Company</div>
                <div className="contact-info-value">
                  {companyInfo.nameKo}
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-label">Address</div>
                <div className="contact-info-value">{companyInfo.address}</div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--color-text-muted)",
                    marginTop: "2px",
                  }}
                >
                  {companyInfo.addressDetail}
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-label">Phone</div>
                <div className="contact-info-value">{companyInfo.phone}</div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-label">Email</div>
                <div className="contact-info-value">{companyInfo.email}</div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-label">Business No.</div>
                <div className="contact-info-value">
                  {companyInfo.businessNumber}
                </div>
              </div>
            </div>

            <div className="contact-map-placeholder">
              지도 영역 (추후 Google Maps 삽입)
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="section-container">
          <p className="footer-text">
            © 2026 {companyInfo.name}. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Responsive styles */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-hamburger {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-hamburger {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
