"use client";

import React, { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import styles from "./page.module.css";

/* ── Types ── */
type PatentStatus = "granted" | "under_examination" | "filed";

interface Patent {
  id: string;
  title: string;
  office: string;
  jurisdiction: string;
  filingDate: string;
  numberPrefix: string;   // "#" or "App:"
  patentNumber: string;
  status: PatentStatus;
  hasPdf: boolean;
  canUpdate: boolean;
}

/* ── Sample data ── */
const PATENTS: Patent[] = [
  {
    id: "1",
    title: "Distributed Ledger Identity Framework",
    office: "USPTO",
    jurisdiction: "United States",
    filingDate: "Oct 12, 2023",
    numberPrefix: "#",
    patentNumber: "US-11785012-B2",
    status: "granted",
    hasPdf: true,
    canUpdate: false,
  },
  {
    id: "2",
    title: "Neural Network Intrusion Detection Method",
    office: "EPO",
    jurisdiction: "European Patent Office",
    filingDate: "Feb 05, 2024",
    numberPrefix: "App:",
    patentNumber: "EP23156789.1",
    status: "under_examination",
    hasPdf: false,
    canUpdate: false,
  },
  {
    id: "3",
    title: "Zero-Trust Network Topology Mapper",
    office: "JPO",
    jurisdiction: "Japan",
    filingDate: "May 20, 2024",
    numberPrefix: "#",
    patentNumber: "JP2024-183201",
    status: "filed",
    hasPdf: false,
    canUpdate: true,
  },
];

/* ── Status Badge ── */
function StatusBadge({ status }: { status: PatentStatus }) {
  if (status === "granted")
    return (
      <span className={`${styles.badge} ${styles.badgeGranted}`}>
        <span className={styles.dot} />
        Granted
      </span>
    );
  if (status === "under_examination")
    return (
      <span className={`${styles.badge} ${styles.badgeExamination}`}>
        <span className={styles.dot} />
        Under Examination
      </span>
    );
  return (
    <span className={`${styles.badge} ${styles.badgeFiled}`}>
      <span className={styles.dot} />
      Filed
    </span>
  );
}

/* ── Patent Card ── */
function PatentCard({ patent }: { patent: Patent }) {
  return (
    <div className={styles.card}>
      {/* Title row + badge */}
      <div className={styles.cardHead}>
        <h3 className={styles.cardTitle}>{patent.title}</h3>
        <StatusBadge status={patent.status} />
      </div>

      {/* Office + date */}
      <div className={styles.metaRow}>
        <span className={styles.metaItem}>
          {/* Building / government icon */}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="22" x2="21" y2="22"/>
            <rect x="2" y="8" width="20" height="14"/>
            <path d="M12 2L2 8h20L12 2z"/>
            <rect x="9" y="14" width="6" height="8"/>
          </svg>
          {patent.office} ({patent.jurisdiction})
        </span>
        <span className={styles.metaItem}>
          {/* Calendar icon */}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          {patent.filingDate}
        </span>
      </div>

      {/* Patent / App number */}
      <div className={styles.patentNum}>
        <span className={styles.numPrefix}>{patent.numberPrefix}</span>
        <span className={styles.numValue}>{patent.patentNumber}</span>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button id={`btn-view-${patent.id}`} className={styles.viewBtn}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          View Details
        </button>

        {patent.hasPdf && (
          <button id={`btn-pdf-${patent.id}`} className={styles.actionBtn}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            PDF
          </button>
        )}

        {patent.canUpdate && (
          <button id={`btn-update-${patent.id}`} className={styles.actionBtn}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Update
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Page ── */
export default function PatentsPage() {
  const [search, setSearch] = useState("");

  const filtered = PATENTS.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.office.toLowerCase().includes(search.toLowerCase()) ||
      p.patentNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      {/* ── Top Bar ── */}
      <div className={styles.topBar}>
        <h1 className={styles.pageTitle}>Patents</h1>
        <div className={styles.topRight}>
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input id="patent-search" className={styles.searchInput} type="text"
              placeholder="Search patents..." value={search}
              onChange={(e) => setSearch(e.target.value)} />
          </div>
          <button className={styles.iconBtn} aria-label="Notifications">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span className={styles.notifDot} />
          </button>
          <button className={styles.iconBtn} aria-label="Settings">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div className={styles.content}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Your Patent Records</h2>
            <p className={styles.sectionSub}>Intellectual property filings and granted patents.</p>
          </div>
          <div className={styles.sectionActions}>
            <Link href="/patents/new" id="btn-add-patent" className={styles.addBtn}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add New
            </Link>
            <button className={styles.filterBtn} aria-label="Filter">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="16" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="12" y2="18"/>
              </svg>
            </button>
            <button className={styles.filterBtn} aria-label="Sort">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map((patent) => (
              <PatentCard key={patent.id} patent={patent} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p>No patents match your search.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
