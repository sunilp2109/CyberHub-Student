"use client";

import React, { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import styles from "./page.module.css";

/* ── Types ── */
type PubType    = "research_paper" | "conference_paper" | "presentation";
type PubLevel   = "college" | "national" | "international";
type IndexedBy  = "Scopus" | "Web of Science" | "UGC" | "Others";

interface Publication {
  id: string;
  title: string;
  type: PubType;
  level: PubLevel;
  venueName: string;
  date: string;
  indexedBy: IndexedBy[];
  link: string;
  hasCert: boolean;
}

/* ── Sample data ── */
const PUBLICATIONS: Publication[] = [
  {
    id: "1",
    title: "Federated Learning for Intrusion Detection in IoT Networks",
    type: "research_paper",
    level: "international",
    venueName: "IEEE Transactions on Information Forensics",
    date: "Mar 2024",
    indexedBy: ["Scopus", "Web of Science"],
    link: "https://doi.org/10.1109/example",
    hasCert: true,
  },
  {
    id: "2",
    title: "Zero-Trust Architecture in Cloud Computing Environments",
    type: "conference_paper",
    level: "national",
    venueName: "National Cyber Security Symposium 2024",
    date: "Jan 2024",
    indexedBy: ["UGC"],
    link: "https://example.com/paper2",
    hasCert: true,
  },
  {
    id: "3",
    title: "Blockchain-Based Certificate Verification System",
    type: "presentation",
    level: "college",
    venueName: "Annual Tech Fest — CSE Department",
    date: "Nov 2023",
    indexedBy: ["Others"],
    link: "",
    hasCert: false,
  },
];

/* ── Label helpers ── */
const TYPE_LABELS: Record<PubType, string> = {
  research_paper: "Research Paper",
  conference_paper: "Conference Paper",
  presentation: "Presentation",
};

/* ── Badges ── */
function LevelBadge({ level }: { level: PubLevel }) {
  const cls =
    level === "international"
      ? styles.badgeInternational
      : level === "national"
      ? styles.badgeNational
      : styles.badgeCollege;
  const label =
    level === "international" ? "International"
      : level === "national" ? "National"
      : "College";
  return <span className={`${styles.levelBadge} ${cls}`}>{label}</span>;
}

function IndexTag({ tag }: { tag: IndexedBy }) {
  const cls =
    tag === "Scopus" ? styles.tagScopus
    : tag === "Web of Science" ? styles.tagWos
    : tag === "UGC" ? styles.tagUgc
    : styles.tagOthers;
  return <span className={`${styles.indexTag} ${cls}`}>{tag}</span>;
}

/* ── Publication Card ── */
function PubCard({ pub }: { pub: Publication }) {
  return (
    <div className={styles.card}>
      {/* Type chip + level badge */}
      <div className={styles.cardTop}>
        <span className={styles.typeChip}>{TYPE_LABELS[pub.type]}</span>
        <LevelBadge level={pub.level} />
      </div>

      {/* Title */}
      <h3 className={styles.cardTitle}>{pub.title}</h3>

      {/* Venue */}
      <div className={styles.metaItem}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
        {pub.venueName}
      </div>

      {/* Date */}
      <div className={styles.metaItem}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        {pub.date}
      </div>

      {/* Indexed by */}
      <div className={styles.indexRow}>
        {pub.indexedBy.map((tag) => (
          <IndexTag key={tag} tag={tag} />
        ))}
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        {pub.link && (
          <a href={pub.link} target="_blank" rel="noopener noreferrer"
            id={`btn-view-${pub.id}`} className={styles.viewBtn}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            View Paper
          </a>
        )}
        {pub.hasCert && (
          <button id={`btn-cert-${pub.id}`} className={styles.actionBtn}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Certificate
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Page ── */
export default function PublicationsPage() {
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState<string>("all");

  const filtered = PUBLICATIONS.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.venueName.toLowerCase().includes(search.toLowerCase());
    const matchLevel = filterLevel === "all" || p.level === filterLevel;
    return matchSearch && matchLevel;
  });

  return (
    <DashboardLayout>
      {/* ── Top Bar ── */}
      <div className={styles.topBar}>
        <h1 className={styles.pageTitle}>Publications</h1>
        <div className={styles.topRight}>
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input id="pub-search" className={styles.searchInput} type="text"
              placeholder="Search publications..." value={search}
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
        {/* Section header */}
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Research Papers / Publications / Presentations</h2>
            <p className={styles.sectionSub}>Academic contributions and scholarly work.</p>
          </div>
          <div className={styles.sectionActions}>
            <Link href="/publications/new" id="btn-add-pub" className={styles.addBtn}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add New
            </Link>
          </div>
        </div>

        {/* Level filter tabs */}
        <div className={styles.filterTabs}>
          {["all", "international", "national", "college"].map((lvl) => (
            <button
              key={lvl}
              className={`${styles.filterTab} ${filterLevel === lvl ? styles.filterTabActive : ""}`}
              onClick={() => setFilterLevel(lvl)}
            >
              {lvl === "all" ? "All" : lvl.charAt(0).toUpperCase() + lvl.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map((pub) => (
              <PubCard key={pub.id} pub={pub} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            <p>No publications match your search.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
