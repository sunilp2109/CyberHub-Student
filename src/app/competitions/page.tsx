"use client";

import React, { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import styles from "./page.module.css";

/* ── Types ── */
type CompLevel = "College" | "Inter-College" | "State" | "National" | "International";
type ParticipationType = "Individual" | "Team";

interface Competition {
  id: string;
  activityName: string;
  level: CompLevel;
  compType: string;
  participationType: ParticipationType;
  date: string;
  compName: string;
  organizer: string;
  venue: string;
  position: string;
  prizeMoney: number;
  currency: string;
  recognition: string;
  hasCert: boolean;
}

/* ── Sample data ── */
const COMPETITIONS: Competition[] = [
  {
    id: "1",
    activityName: "Cyber Security Hackathon",
    level: "National",
    compType: "Hackathon",
    participationType: "Team",
    date: "Aug 2024",
    compName: "Smart India Hackathon 2024",
    organizer: "MoE's Innovation Cell",
    venue: "New Delhi",
    position: "1st Runner Up",
    prizeMoney: 50000,
    currency: "INR",
    recognition: "Featured in national press",
    hasCert: true,
  },
  {
    id: "2",
    activityName: "Web Exploitation CTF",
    level: "International",
    compType: "CTF",
    participationType: "Individual",
    date: "May 2024",
    compName: "DEF CON Qualifiers",
    organizer: "DEF CON",
    venue: "Online",
    position: "Top 50",
    prizeMoney: 0,
    currency: "USD",
    recognition: "Invited for finals",
    hasCert: true,
  },
  {
    id: "3",
    activityName: "Coding Challenge",
    level: "Inter-College",
    compType: "Coding Competition",
    participationType: "Individual",
    date: "Feb 2024",
    compName: "CodeFest 2024",
    organizer: "Tech Society",
    venue: "Main Campus",
    position: "Winner",
    prizeMoney: 10000,
    currency: "INR",
    recognition: "Trophy awarded",
    hasCert: false,
  },
];

/* ── Helpers ── */
const LEVEL_COLORS: Record<CompLevel, { bg: string; color: string; border: string }> = {
  "College":       { bg: "#F5F3FF", color: "#7C3AED", border: "#DDD6FE" },
  "Inter-College": { bg: "#FEF2F2", color: "#DC2626", border: "#FECACA" },
  "State":         { bg: "#FFF7ED", color: "#C2410C", border: "#FED7AA" },
  "National":      { bg: "#F0FDF4", color: "#16A34A", border: "#BBF7D0" },
  "International": { bg: "#EFF6FF", color: "#2563EB", border: "#BFDBFE" },
};

function formatAmount(amount: number, currency: string): string {
  if (!amount) return "-";
  const symbols: Record<string, string> = { INR: "₹", USD: "$", EUR: "€", GBP: "£" };
  const sym = symbols[currency] ?? currency + " ";
  return `${sym}${amount.toLocaleString()}`;
}

/* ── Card Component ── */
function CompCard({ comp }: { comp: Competition }) {
  const levelStyle = LEVEL_COLORS[comp.level];
  return (
    <div className={styles.card}>
      {/* Top: Level Badge + Participation Type */}
      <div className={styles.cardTop}>
        <span className={styles.levelBadge} style={{ background: levelStyle.bg, color: levelStyle.color, borderColor: levelStyle.border }}>
          {comp.level}
        </span>
        <span className={styles.partType}>
          {comp.participationType === "Team" ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          )}
          {comp.participationType}
        </span>
      </div>

      {/* Title */}
      <h3 className={styles.cardTitle}>{comp.activityName}</h3>
      <p className={styles.compName}>{comp.compName}</p>

      {/* Type Chip */}
      <div className={styles.chipRow}>
        <span className={styles.typeChip}>{comp.compType}</span>
      </div>

      <div className={styles.divider} />

      {/* Meta Grid */}
      <div className={styles.metaGrid}>
        <div className={styles.metaItem}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          {comp.date}
        </div>
        <div className={styles.metaItem}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          {comp.venue}
        </div>
        <div className={styles.metaItemFull}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          {comp.organizer}
        </div>
      </div>

      {/* Result Row */}
      <div className={styles.resultRow}>
        <div className={styles.resultCol}>
          <span className={styles.resultLabel}>Position</span>
          <span className={styles.resultValue}>{comp.position || "Participant"}</span>
        </div>
        <div className={styles.resultColRight}>
          <span className={styles.resultLabel}>Prize Money</span>
          <span className={styles.resultPrize}>{formatAmount(comp.prizeMoney, comp.currency)}</span>
        </div>
      </div>
      
      {/* Recognition/Cert */}
      <div className={styles.footerRow}>
         <div className={styles.recognitionText}>
            {comp.recognition && (
                <>
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#29B5D5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                 {comp.recognition}
                </>
            )}
         </div>
         {comp.hasCert && (
             <button className={styles.certBtn} title="View Certificate">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
             </button>
         )}
      </div>
    </div>
  );
}

/* ── Page ── */
export default function CompetitionsPage() {
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");

  const filtered = COMPETITIONS.filter((c) => {
    const matchSearch =
      c.activityName.toLowerCase().includes(search.toLowerCase()) ||
      c.compName.toLowerCase().includes(search.toLowerCase());
    const matchLevel = filterLevel === "all" || c.level === filterLevel;
    return matchSearch && matchLevel;
  });

  return (
    <DashboardLayout>
      {/* ── Top Bar ── */}
      <div className={styles.topBar}>
        <h1 className={styles.pageTitle}>Competitions & Participation</h1>
        <div className={styles.topRight}>
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input className={styles.searchInput} type="text"
              placeholder="Search competitions..." value={search}
              onChange={(e) => setSearch(e.target.value)} />
          </div>
          <button className={styles.iconBtn} aria-label="Notifications">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span className={styles.notifDot} />
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div className={styles.content}>
        {/* Section header */}
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Competitions & Participation</h2>
            <p className={styles.sectionSub}>Hackathons, CTFs, coding competitions, paper presentations, etc.</p>
          </div>
          <div className={styles.sectionActions}>
            <Link href="/competitions/new" className={styles.addBtn}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add New
            </Link>
          </div>
        </div>

        {/* Filter tabs */}
        <div className={styles.filterTabs}>
          {["all", "College", "Inter-College", "State", "National", "International"].map((lvl) => (
            <button key={lvl}
              className={`${styles.filterTab} ${filterLevel === lvl ? styles.filterTabActive : ""}`}
              onClick={() => setFilterLevel(lvl)}>
              {lvl === "all" ? "All Levels" : lvl}
            </button>
          ))}
        </div>
        
        {/* Stats strip */}
        <div className={styles.statsStrip}>
          <div className={styles.statPill}>
            <span className={styles.statPillNum}>{COMPETITIONS.length}</span>
            <span className={styles.statPillLabel}>Participations</span>
          </div>
          <div className={styles.statPill}>
            <span className={styles.statPillNum}>
              {COMPETITIONS.filter(c => ["Winner", "1st Runner Up", "Top 50"].includes(c.position)).length}
            </span>
            <span className={styles.statPillLabel}>Podium Finishes</span>
          </div>
          <div className={styles.statPill}>
            <span className={styles.statPillNum}>
              ₹{(COMPETITIONS.filter(c => c.currency === "INR").reduce((s, c) => s + c.prizeMoney, 0)).toLocaleString()}
            </span>
            <span className={styles.statPillLabel}>Prize Won (INR)</span>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map((comp) => (
              <CompCard key={comp.id} comp={comp} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 15l8.38-4.19a2 2 0 0 0 0-3.62L12 3 3.62 7.19a2 2 0 0 0 0 3.62L12 15z"></path>
              <polyline points="2.5 13 12 18 21.5 13"></polyline>
              <polyline points="2.5 18 12 23 21.5 18"></polyline>
            </svg>
            <p>No competitions match your search.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
