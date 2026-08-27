"use client";

import React, { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import styles from "./page.module.css";

/* ── Types ── */
type ProjectType   = "funded_student" | "innovation" | "startup" | "research";
type ProjectStatus = "active" | "completed" | "upcoming";

interface Project {
  id: string;
  name: string;
  fundingAgency: string;
  amount: number;
  currency: string;
  type: ProjectType;
  status: ProjectStatus;
  description: string;
}

/* ── Sample data ── */
const PROJECTS: Project[] = [
  {
    id: "1",
    name: "AI-Powered Threat Intelligence Dashboard",
    fundingAgency: "DST — Dept. of Science & Technology",
    amount: 150000,
    currency: "INR",
    type: "research",
    status: "active",
    description: "Building an ML-driven real-time cyber threat aggregation and visualization system.",
  },
  {
    id: "2",
    name: "Blockchain-Based Academic Credential Platform",
    fundingAgency: "AICTE Innovation Cell",
    amount: 75000,
    currency: "INR",
    type: "innovation",
    status: "completed",
    description: "Decentralised credential verification system for universities using Ethereum smart contracts.",
  },
  {
    id: "3",
    name: "SecurePass — Zero-Knowledge Auth SaaS",
    fundingAgency: "StartupIndia Seed Fund",
    amount: 5000,
    currency: "USD",
    type: "startup",
    status: "active",
    description: "Privacy-first passwordless authentication startup leveraging ZK-proofs.",
  },
];

/* ── Helpers ── */
const TYPE_LABELS: Record<ProjectType, string> = {
  funded_student: "Funded Student",
  innovation: "Innovation",
  startup: "Startup",
  research: "Research",
};

const TYPE_COLORS: Record<ProjectType, { bg: string; color: string }> = {
  funded_student: { bg: "#EFF6FF", color: "#2563EB" },
  innovation:     { bg: "#FFF7ED", color: "#C2410C" },
  startup:        { bg: "#F5F3FF", color: "#7C3AED" },
  research:       { bg: "#F0FDF4", color: "#15803D" },
};

function formatAmount(amount: number, currency: string): string {
  const symbols: Record<string, string> = { INR: "₹", USD: "$", EUR: "€", GBP: "£" };
  const sym = symbols[currency] ?? currency + " ";
  return `${sym}${amount.toLocaleString()}`;
}

/* ── Status Badge ── */
function StatusBadge({ status }: { status: ProjectStatus }) {
  if (status === "active")
    return (
      <span className={`${styles.statusBadge} ${styles.statusActive}`}>
        <span className={styles.pulseDot} />Active
      </span>
    );
  if (status === "completed")
    return <span className={`${styles.statusBadge} ${styles.statusCompleted}`}>Completed</span>;
  return <span className={`${styles.statusBadge} ${styles.statusUpcoming}`}>Upcoming</span>;
}

/* ── Project Card ── */
function ProjectCard({ project }: { project: Project }) {
  const typeStyle = TYPE_COLORS[project.type];
  return (
    <div className={styles.card}>
      {/* Type chip + status */}
      <div className={styles.cardTop}>
        <span className={styles.typeChip}
          style={{ background: typeStyle.bg, color: typeStyle.color }}>
          {TYPE_LABELS[project.type]}
        </span>
        <StatusBadge status={project.status} />
      </div>

      {/* Project name */}
      <h3 className={styles.cardTitle}>{project.name}</h3>

      {/* Description */}
      <p className={styles.cardDesc}>{project.description}</p>

      {/* Divider */}
      <div className={styles.divider} />

      {/* Funding Agency */}
      <div className={styles.metaItem}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="22" x2="21" y2="22"/>
          <rect x="2" y="8" width="20" height="14"/>
          <path d="M12 2L2 8h20L12 2z"/>
        </svg>
        {project.fundingAgency}
      </div>

      {/* Amount */}
      <div className={styles.amountRow}>
        <span className={styles.amountLabel}>Funding Amount</span>
        <span className={styles.amountValue}>
          {formatAmount(project.amount, project.currency)}
          <span className={styles.currencyTag}>{project.currency}</span>
        </span>
      </div>
    </div>
  );
}

/* ── Page ── */
export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filtered = PROJECTS.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.fundingAgency.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || p.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <DashboardLayout>
      {/* ── Top Bar ── */}
      <div className={styles.topBar}>
        <h1 className={styles.pageTitle}>Projects & Funding</h1>
        <div className={styles.topRight}>
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input id="project-search" className={styles.searchInput} type="text"
              placeholder="Search projects..." value={search}
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
            <h2 className={styles.sectionTitle}>Projects & Funding</h2>
            <p className={styles.sectionSub}>Funded student projects, innovation projects, startup projects, and more.</p>
          </div>
          <div className={styles.sectionActions}>
            <Link href="/projects/new" id="btn-add-project" className={styles.addBtn}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add New
            </Link>
          </div>
        </div>

        {/* Filter tabs */}
        <div className={styles.filterTabs}>
          {[
            { key: "all", label: "All" },
            { key: "funded_student", label: "Funded Student" },
            { key: "innovation", label: "Innovation" },
            { key: "startup", label: "Startup" },
            { key: "research", label: "Research" },
          ].map(({ key, label }) => (
            <button key={key}
              className={`${styles.filterTab} ${filterType === key ? styles.filterTabActive : ""}`}
              onClick={() => setFilterType(key)}>
              {label}
            </button>
          ))}
        </div>

        {/* Stats strip */}
        <div className={styles.statsStrip}>
          <div className={styles.statPill}>
            <span className={styles.statPillNum}>{PROJECTS.length}</span>
            <span className={styles.statPillLabel}>Total Projects</span>
          </div>
          <div className={styles.statPill}>
            <span className={styles.statPillNum}>
              {PROJECTS.filter(p => p.status === "active").length}
            </span>
            <span className={styles.statPillLabel}>Active</span>
          </div>
          <div className={styles.statPill}>
            <span className={styles.statPillNum}>
              ₹{(PROJECTS.filter(p => p.currency === "INR").reduce((s, p) => s + p.amount, 0)).toLocaleString()}
            </span>
            <span className={styles.statPillLabel}>Total INR Funding</span>
          </div>
          <div className={styles.statPill}>
            <span className={styles.statPillNum}>
              ${(PROJECTS.filter(p => p.currency === "USD").reduce((s, p) => s + p.amount, 0)).toLocaleString()}
            </span>
            <span className={styles.statPillLabel}>Total USD Funding</span>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2"/>
              <polyline points="2 17 12 22 22 17"/>
              <polyline points="2 12 12 17 22 12"/>
            </svg>
            <p>No projects match your search.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
