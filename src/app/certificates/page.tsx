"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import styles from "./page.module.css";
import Link from "next/link";

/* ── Types ── */
type CertStatus = "verified" | "pending" | "expired";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issued: string;
  credentialId: string;
  status: CertStatus;
  accentColor: string;
  iconBg: string;
  icon: React.ReactNode;
}

/* ── Icon helpers ── */
function AwsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
      <path d="M12 7v10M8 7v10M16 7v10"/>
    </svg>
  );
}
function AnalyticsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}

/* ── Sample data ── */
const CERTS: Certificate[] = [
  {
    id: "1",
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services (AWS)",
    issued: "Oct 2023",
    credentialId: "AWS-SA-84930",
    status: "verified",
    accentColor: "#2D9E6B",
    iconBg: "#F1F5F9",
    icon: <AwsIcon />,
  },
  {
    id: "2",
    title: "Google Data Analytics Professional",
    issuer: "Coursera / Google",
    issued: "May 2023",
    credentialId: "GDA-772910",
    status: "verified",
    accentColor: "#3B82F6",
    iconBg: "#EFF6FF",
    icon: <AnalyticsIcon />,
  },
  {
    id: "3",
    title: "CompTIA Security+ (SY0-601)",
    issuer: "CompTIA",
    issued: "Pending Review",
    credentialId: "--",
    status: "pending",
    accentColor: "#94A3B8",
    iconBg: "#F8FAFC",
    icon: <ShieldIcon />,
  },
];

/* ── Status Badge ── */
function StatusBadge({ status }: { status: CertStatus }) {
  if (status === "verified") {
    return (
      <span className={`${styles.badge} ${styles.badgeVerified}`}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Verified
      </span>
    );
  }
  if (status === "pending") {
    return (
      <span className={`${styles.badge} ${styles.badgePending}`}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        Pending
      </span>
    );
  }
  return (
    <span className={`${styles.badge} ${styles.badgeExpired}`}>Expired</span>
  );
}

/* ── Certificate Card ── */
function CertCard({ cert }: { cert: Certificate }) {
  return (
    <div className={styles.card}>
      {/* Colored top strip */}
      <div className={styles.cardStrip} style={{ background: cert.accentColor }} />

      {/* Card body */}
      <div className={styles.cardBody}>
        {/* Icon + Badge row */}
        <div className={styles.cardTop}>
          <div className={styles.iconWrap} style={{ background: cert.iconBg }}>
            {cert.icon}
          </div>
          <StatusBadge status={cert.status} />
        </div>

        {/* Title */}
        <h3 className={styles.certTitle}>{cert.title}</h3>

        {/* Issuer */}
        <p
          className={styles.certIssuer}
          style={{
            color: cert.status === "pending" ? "#94A3B8"
              : cert.accentColor === "#3B82F6" ? "#3B82F6"
              : cert.accentColor === "#2D9E6B" ? "#64748B"
              : "#94A3B8",
          }}
        >
          {cert.issuer}
        </p>

        {/* Meta */}
        <div className={styles.metaList}>
          <div className={styles.metaRow}>
            <span className={styles.metaIcon}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </span>
            <span className={styles.metaLabel}>Issued</span>
            <span className={`${styles.metaValue} ${cert.status === "pending" ? styles.metaPending : ""}`}>
              {cert.issued}
            </span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaIcon}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
              </svg>
            </span>
            <span className={styles.metaLabel}>Credential ID</span>
            <span className={styles.metaValue}>{cert.credentialId}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Page ── */
export default function CertificatesPage() {
  const [search, setSearch] = useState("");

  const filtered = CERTS.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.issuer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      {/* ── Top Header Bar ── */}
      <div className={styles.topBar}>
        <h1 className={styles.pageTitle}>Certifications</h1>
        <div className={styles.topRight}>
          {/* Search */}
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              id="cert-search"
              className={styles.searchInput}
              type="text"
              placeholder="Search certifications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* Bell */}
          <button className={styles.iconBtn} aria-label="Notifications" id="btn-notifications">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span className={styles.notifDot} />
          </button>
          {/* Settings */}
          <button className={styles.iconBtn} aria-label="Settings" id="btn-settings">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className={styles.content}>
        {/* Section header */}
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Your Certifications</h2>
            <p className={styles.sectionSub}>
              Verified academic and professional credentials.
            </p>
          </div>
          <div className={styles.sectionActions}>
            <Link href="/certificates/new" id="btn-add-cert" className={styles.addBtn}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add New
            </Link>
            <button id="btn-filter" className={styles.filterBtn} aria-label="Filter">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="16" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="12" y2="18"/>
              </svg>
            </button>
            <button id="btn-sort" className={styles.filterBtn} aria-label="Sort">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Cards grid */}
        {filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map((cert) => (
              <CertCard key={cert.id} cert={cert} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <p>No certifications match your search.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
