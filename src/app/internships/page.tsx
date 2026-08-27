"use client";

import React, { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import styles from "./page.module.css";

/* ── Types ── */
type InternStatus = "completed" | "ongoing" | "upcoming";

interface Internship {
  id: string;
  role: string;
  company: string;
  location: string;
  locationType: "Hybrid" | "Remote (Online)" | "On-site";
  startDate: string;
  endDate: string;
  type: string;
  stipend: string;
  durationMonths: number;
  status: InternStatus;
  docLabel: string;
  docHref: string;
}

/* ── Sample data ── */
const INTERNSHIPS: Internship[] = [
  {
    id: "1",
    role: "Cyber Security Analyst Intern",
    company: "TechGuard Solutions",
    location: "San Francisco, CA",
    locationType: "Hybrid",
    startDate: "Jun 01, 2023",
    endDate: "Aug 31, 2023",
    type: "Technical",
    stipend: "$2,500/mo",
    durationMonths: 3,
    status: "completed",
    docLabel: "View Certificate",
    docHref: "#",
  },
  {
    id: "2",
    role: "Network Infrastructure Intern",
    company: "GlobalNet Corp",
    location: "Remote",
    locationType: "Remote (Online)",
    startDate: "Jan 15, 2024",
    endDate: "Jul 15, 2024",
    type: "Technical",
    stipend: "$1,200/mo",
    durationMonths: 6,
    status: "ongoing",
    docLabel: "View Offer Letter",
    docHref: "#",
  },
  {
    id: "3",
    role: "Penetration Testing Intern",
    company: "SecureEdge Inc.",
    location: "Bangalore, IN",
    locationType: "On-site",
    startDate: "Sep 01, 2024",
    endDate: "Nov 30, 2024",
    type: "Technical",
    stipend: "$900/mo",
    durationMonths: 3,
    status: "upcoming",
    docLabel: "View Offer Letter",
    docHref: "#",
  },
];

/* ── Status Badge ── */
function StatusBadge({ status }: { status: InternStatus }) {
  if (status === "completed")
    return <span className={`${styles.badge} ${styles.badgeCompleted}`}>Completed</span>;
  if (status === "ongoing")
    return (
      <span className={`${styles.badge} ${styles.badgeOngoing}`}>
        <span className={styles.ongoingDot} />Ongoing
      </span>
    );
  return <span className={`${styles.badge} ${styles.badgeUpcoming}`}>Upcoming</span>;
}

/* ── Internship Card (vertical) ── */
function InternCard({ intern }: { intern: Internship }) {
  return (
    <div className={styles.card}>
      {/* Status + Type */}
      <div className={styles.cardTop}>
        <StatusBadge status={intern.status} />
        <span className={styles.typeTag}>{intern.type}</span>
      </div>

      {/* Role */}
      <h3 className={styles.cardTitle}>{intern.role}</h3>

      {/* Company */}
      <div className={styles.metaItem}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2"/>
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        </svg>
        {intern.company}
      </div>

      {/* Location */}
      <div className={styles.metaItem}>
        {intern.locationType === "Remote (Online)" ? (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
        )}
        {intern.locationType === "Remote (Online)"
          ? "Remote (Online)"
          : `${intern.location} (${intern.locationType})`}
      </div>

      <div className={styles.divider} />

      {/* Dates */}
      <div className={styles.datesRow}>
        <div className={styles.dateField}>
          <span className={styles.dateLabel}>Start Date</span>
          <span className={styles.dateValue}>{intern.startDate}</span>
        </div>
        <div className={styles.dateField}>
          <span className={styles.dateLabel}>End Date</span>
          <span className={styles.dateValue}>{intern.endDate}</span>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsRow}>
        <div className={styles.statBlock}>
          <span className={styles.statLabel}>Duration</span>
          <span className={styles.statValue}>{intern.durationMonths} Months</span>
        </div>
        <div className={styles.statBlock}>
          <span className={styles.statLabel}>Stipend</span>
          <span className={styles.statValue}>{intern.stipend}</span>
        </div>
      </div>

      {/* Doc link */}
      <a href={intern.docHref} className={styles.docLink}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
        {intern.docLabel}
      </a>
    </div>
  );
}

/* ── Page ── */
export default function InternshipsPage() {
  const [search, setSearch] = useState("");

  const filtered = INTERNSHIPS.filter(
    (i) =>
      i.role.toLowerCase().includes(search.toLowerCase()) ||
      i.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <h1 className={styles.pageTitle}>Internships</h1>
        <div className={styles.topRight}>
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input id="intern-search" className={styles.searchInput} type="text"
              placeholder="Search internships..." value={search}
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

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Your Internships</h2>
            <p className={styles.sectionSub}>Track your professional experience and industry exposure.</p>
          </div>
          <div className={styles.sectionActions}>
            <Link href="/internships/new" id="btn-add-intern" className={styles.addBtn}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add New
            </Link>
            <button id="btn-filter-intern" className={styles.filterBtn} aria-label="Filter">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="16" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="12" y2="18"/>
              </svg>
            </button>
            <button id="btn-sort-intern" className={styles.filterBtn} aria-label="Sort">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map((intern) => (
              <InternCard key={intern.id} intern={intern} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
            </svg>
            <p>No internships match your search.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
