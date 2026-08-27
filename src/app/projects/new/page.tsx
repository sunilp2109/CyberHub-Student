"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import styles from "./page.module.css";

export default function AddProjectPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",           // 1. Name of Project
    fundingAgency: "",  // 2. Funding Agency
    amount: "",         // 3. Amount
    currency: "INR",   // 4. Currency
    type: "",           // project type
    status: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => { setSaving(false); router.push("/projects"); }, 1200);
  };

  const CURRENCIES = ["INR", "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "SGD", "Other"];

  const PROJECT_TYPES = [
    { value: "funded_student", label: "Funded Student Project" },
    { value: "innovation",     label: "Innovation Project" },
    { value: "startup",        label: "Startup Project" },
    { value: "research",       label: "Research Project" },
    { value: "other",          label: "Other" },
  ];

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
            <input className={styles.searchInput} type="text" placeholder="Search projects..." readOnly />
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

      {/* ── Body ── */}
      <div className={styles.body}>
        {/* ── Left: Form ── */}
        <form className={styles.formCard} onSubmit={handleSave} noValidate>
          <div className={styles.formHeader}>
            <div className={styles.formHeadTitle}>
              <span className={styles.plusIcon}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="16"/>
                  <line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
              </span>
              Add New Project & Funding
            </div>
            <p className={styles.formSubtitle}>
              Log a funded student, innovation, startup, or research project.
            </p>
          </div>

          {/* 1. Name of Project — full */}
          <div className={styles.fieldWrap}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">
                Name of Project <span className={styles.req}>*</span>
              </label>
              <input id="name" name="name" className={styles.input} type="text"
                placeholder="e.g., AI-Powered Threat Intelligence Dashboard"
                value={form.name} onChange={handleChange} required />
            </div>
          </div>

          {/* 2. Funding Agency + Project Type */}
          <div className={styles.fieldWrap}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="fundingAgency">
                  Funding Agency <span className={styles.req}>*</span>
                </label>
                <input id="fundingAgency" name="fundingAgency" className={styles.input}
                  type="text" placeholder="e.g., DST, AICTE, StartupIndia"
                  value={form.fundingAgency} onChange={handleChange} required />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="type">
                  Project Type
                </label>
                <select id="type" name="type" className={styles.input}
                  value={form.type} onChange={handleChange}>
                  <option value="">Select Type</option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 3. Amount + 4. Currency */}
          <div className={styles.fieldWrap}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="amount">
                  Amount <span className={styles.req}>*</span>
                </label>
                <div className={styles.amountWrap}>
                  <span className={styles.currencySymbol}>
                    {{ INR: "₹", USD: "$", EUR: "€", GBP: "£" }[form.currency] ?? form.currency}
                  </span>
                  <input id="amount" name="amount" className={`${styles.input} ${styles.inputAmount}`}
                    type="number" min="0" placeholder="e.g., 150000"
                    value={form.amount} onChange={handleChange} required />
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="currency">
                  Currency <span className={styles.req}>*</span>
                </label>
                <select id="currency" name="currency" className={styles.input}
                  value={form.currency} onChange={handleChange} required>
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className={styles.fieldWrap}>
            <div className={styles.field}>
              <label className={styles.label}>Project Status</label>
              <div className={styles.radioGroup}>
                {[
                  { value: "active",    label: "Active" },
                  { value: "completed", label: "Completed" },
                  { value: "upcoming",  label: "Upcoming" },
                ].map(({ value, label }) => (
                  <label key={value}
                    className={`${styles.radioLabel} ${form.status === value ? styles.radioActive : ""}`}>
                    <input type="radio" name="status" value={value}
                      checked={form.status === value} onChange={handleChange}
                      className={styles.radioInput} />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className={styles.fieldWrap}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="description">
                Project Description / Objectives
              </label>
              <textarea id="description" name="description" className={styles.textarea} rows={4}
                placeholder="Describe the project goals, methodology, and expected outcomes..."
                value={form.description} onChange={handleChange} />
            </div>
          </div>

          {/* Footer */}
          <div className={styles.formFooter}>
            <button type="button" id="btn-cancel" className={styles.cancelBtn}
              onClick={() => router.push("/projects")}>
              Cancel
            </button>
            <button type="submit" id="btn-save" className={styles.saveBtn} disabled={saving}>
              {saving ? (
                <span className={styles.spinner} />
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                    <polyline points="17 21 17 13 7 13 7 21"/>
                    <polyline points="7 3 7 8 15 8"/>
                  </svg>
                  Save Record
                </>
              )}
            </button>
          </div>
        </form>

        {/* ── Right: Info + Stats ── */}
        <div className={styles.rightCol}>
          {/* Project types guide */}
          <div className={styles.guideCard}>
            <p className={styles.guideTitle}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#29B5D5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              Project Types
            </p>
            {[
              { color: "#EFF6FF", tc: "#2563EB", label: "Funded Student", desc: "DST, AICTE, institution funded" },
              { color: "#FFF7ED", tc: "#C2410C", label: "Innovation",     desc: "Smart India Hackathon, idea labs" },
              { color: "#F5F3FF", tc: "#7C3AED", label: "Startup",        desc: "StartupIndia, DPIIT registered" },
              { color: "#F0FDF4", tc: "#15803D", label: "Research",       desc: "Faculty / sponsored R&D project" },
            ].map((item) => (
              <div key={item.label} className={styles.guideItem}>
                <span className={styles.guideChip} style={{ background: item.color, color: item.tc }}>
                  {item.label}
                </span>
                <span className={styles.guideDesc}>{item.desc}</span>
              </div>
            ))}
          </div>

          {/* Stats card */}
          <div className={styles.statsCard}>
            <p className={styles.statsLabel}>Total Projects</p>
            <div className={styles.statsNum}>
              <span className={styles.statsCount}>3</span>
              <span className={styles.statsSub}>Projects</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statRowLabel}>Active</span>
              <span className={styles.statRowVal}>2</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statRowLabel}>Total INR</span>
              <span className={styles.statRowVal}>₹2,25,000</span>
            </div>
            <div className={styles.statsTrend}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#29B5D5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
              </svg>
              +1 project this year
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
