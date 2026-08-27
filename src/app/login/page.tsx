"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

/* ── Inline CyberHub Logo SVG ── */
function CyberHubLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Hexagon background */}
      <polygon
        points="50,4 93,27 93,73 50,96 7,73 7,27"
        fill="#0D1F3C"
      />
      {/* Network nodes */}
      <circle cx="50" cy="18" r="4" fill="#29B5D5" />
      <circle cx="78" cy="34" r="4" fill="#29B5D5" />
      <circle cx="78" cy="66" r="4" fill="#29B5D5" />
      <circle cx="50" cy="82" r="4" fill="#29B5D5" />
      <circle cx="22" cy="66" r="4" fill="#29B5D5" />
      <circle cx="22" cy="34" r="4" fill="#29B5D5" />
      <circle cx="50" cy="50" r="4" fill="#29B5D5" />
      {/* Network lines — forming a C shape */}
      <line x1="50" y1="18" x2="78" y2="34" stroke="#29B5D5" strokeWidth="1.5" />
      <line x1="78" y1="34" x2="78" y2="66" stroke="#29B5D5" strokeWidth="1.5" />
      <line x1="78" y1="66" x2="50" y2="82" stroke="#29B5D5" strokeWidth="1.5" />
      <line x1="50" y1="18" x2="22" y2="34" stroke="#29B5D5" strokeWidth="1.5" />
      <line x1="22" y1="34" x2="22" y2="66" stroke="#29B5D5" strokeWidth="1.5" />
      <line x1="22" y1="66" x2="50" y2="82" stroke="#29B5D5" strokeWidth="1.5" />
      <line x1="50" y1="18" x2="50" y2="50" stroke="#29B5D5" strokeWidth="1.5" />
      <line x1="50" y1="50" x2="22" y2="34" stroke="#29B5D5" strokeWidth="1.5" />
      <line x1="50" y1="50" x2="22" y2="66" stroke="#29B5D5" strokeWidth="1.5" />
      <line x1="50" y1="50" x2="78" y2="34" stroke="#29B5D5" strokeWidth="1.5" />
      <line x1="50" y1="50" x2="50" y2="82" stroke="#29B5D5" strokeWidth="1.5" />
    </svg>
  );
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [regNum, setRegNum] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className={styles.page}>
      {/* Grid background pattern */}
      <div className={styles.grid} aria-hidden="true" />

      {/* Logo pill at top */}
      <div className={styles.logoPill}>
        <CyberHubLogo size={36} />
      </div>

      {/* Brand heading */}
      <h1 className={styles.brandTitle}>
        <span className={styles.brandCyber}>CYBER</span>
        <span className={styles.brandHub}>HUB</span>
      </h1>
      <p className={styles.brandSub}>Student Achievement Portal</p>

      {/* Login Card */}
      <div className={styles.card}>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>

          {/* Register Number */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="regNum">
              Register Number
            </label>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}>
                {/* ID card icon */}
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2"/>
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                  <circle cx="9" cy="13" r="1.5"/>
                  <path d="M13 13h4M13 17h4M9 17h.01"/>
                </svg>
              </span>
              <input
                id="regNum"
                type="text"
                className={styles.input}
                placeholder="e.g. 21CS001"
                value={regNum}
                onChange={(e) => setRegNum(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <Link href="#" className={styles.forgotLink}>Forgot?</Link>
            </div>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}>
                {/* Lock icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={styles.input}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="1" y1="1" x2="23" y2="23"/>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            id="btn-sign-in"
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? (
              <span className={styles.spinner} />
            ) : (
              "Sign In to Portal"
            )}
          </button>
        </form>

        <p className={styles.designedBy}>Designed by Sunil</p>
      </div>
    </div>
  );
}
