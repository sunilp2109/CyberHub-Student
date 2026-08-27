"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import styles from "./page.module.css";

export default function AddPublicationPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "",
    level: "",           // College / National / International
    venueType: "",       // Journal / Conference / Symposium
    venueName: "",
    date: "",
    indexedBy: [] as string[],
    link: "",
  });
  const [certFile, setCertFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const toggleIndexed = (val: string) => {
    setForm((p) => ({
      ...p,
      indexedBy: p.indexedBy.includes(val)
        ? p.indexedBy.filter((v) => v !== val)
        : [...p.indexedBy, val],
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => { setSaving(false); router.push("/publications"); }, 1200);
  };

  const INDEXED_OPTIONS = ["Scopus", "Web of Science", "UGC", "Others"];

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
            <input className={styles.searchInput} type="text" placeholder="Search publications..." readOnly />
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
              Add Research / Publication / Presentation
            </div>
            <p className={styles.formSubtitle}>
              Log a paper, article, or academic presentation to your record.
            </p>
          </div>

          {/* 1. Title of Paper — full */}
          <div className={styles.fieldWrap}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="title">
                Title of Paper <span className={styles.req}>*</span>
              </label>
              <input id="title" name="title" className={styles.input} type="text"
                placeholder="e.g., Federated Learning for Intrusion Detection in IoT"
                value={form.title} onChange={handleChange} required />
            </div>
          </div>

          {/* 2. Level + Venue Type */}
          <div className={styles.fieldWrap}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="level">
                  Level of Presentation / Publication <span className={styles.req}>*</span>
                </label>
                <div className={styles.radioGroup}>
                  {["College", "National", "International"].map((lvl) => (
                    <label key={lvl} className={`${styles.radioLabel} ${form.level === lvl ? styles.radioActive : ""}`}>
                      <input type="radio" name="level" value={lvl}
                        checked={form.level === lvl}
                        onChange={handleChange} className={styles.radioInput} />
                      {lvl}
                    </label>
                  ))}
                </div>
              </div>

              {/* 3. Journal / Conference / Symposium dropdown */}
              <div className={styles.field}>
                <label className={styles.label} htmlFor="venueType">
                  Journal / Conference / Symposium <span className={styles.req}>*</span>
                </label>
                <select id="venueType" name="venueType" className={styles.input}
                  value={form.venueType} onChange={handleChange} required>
                  <option value="">Select Type</option>
                  <option>Journal</option>
                  <option>Conference</option>
                  <option>Symposium</option>
                  <option>Workshop</option>
                  <option>Seminar</option>
                  <option>Book Chapter</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* 4. Name of Journal/Conference/Symposium — full */}
          <div className={styles.fieldWrap}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="venueName">
                Name of Journal / Conference / Symposium <span className={styles.req}>*</span>
              </label>
              <input id="venueName" name="venueName" className={styles.input} type="text"
                placeholder="e.g., IEEE Transactions on Information Forensics"
                value={form.venueName} onChange={handleChange} required />
            </div>
          </div>

          {/* 5. Date + 6. Indexed By */}
          <div className={styles.fieldWrap}>
            <div className={styles.row}>
              {/* 5. Date of Presentation/Publication */}
              <div className={styles.field}>
                <label className={styles.label} htmlFor="date">
                  Date of Presentation / Publication <span className={styles.req}>*</span>
                </label>
                <input id="date" name="date"
                  className={`${styles.input} ${styles.inputDate}`}
                  type="date" value={form.date} onChange={handleChange} required />
              </div>

              {/* 6. Indexed By — multi-select chips */}
              <div className={styles.field}>
                <label className={styles.label}>
                  Indexed By
                </label>
                <div className={styles.checkGroup}>
                  {INDEXED_OPTIONS.map((opt) => (
                    <label key={opt}
                      className={`${styles.checkLabel} ${form.indexedBy.includes(opt) ? styles.checkActive : ""}`}>
                      <input type="checkbox" className={styles.checkInput}
                        checked={form.indexedBy.includes(opt)}
                        onChange={() => toggleIndexed(opt)} />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 7. Online Publication Link — full */}
          <div className={styles.fieldWrap}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="link">
                Online Publication Link
              </label>
              <div className={styles.urlWrap}>
                <svg className={styles.urlIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
                <input id="link" name="link" className={`${styles.input} ${styles.inputUrl}`}
                  type="url" placeholder="https://doi.org/10.xxxx/xxxxx"
                  value={form.link} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className={styles.formFooter}>
            <button type="button" id="btn-cancel" className={styles.cancelBtn}
              onClick={() => router.push("/publications")}>
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

        {/* ── Right: Certificate Upload + Stats ── */}
        <div className={styles.rightCol}>
          {/* 8. Certificate — File Upload */}
          <div className={styles.uploadCard}>
            <p className={styles.uploadCardTitle}>Certificate / Proof</p>
            <div className={styles.dropZone} onClick={() => fileRef.current?.click()}>
              <input ref={fileRef} type="file" accept=".pdf,.png,.jpg,.jpeg"
                className={styles.fileInput}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f && f.size <= 5 * 1024 * 1024) setCertFile(f);
                }} />
              {certFile ? (
                <div className={styles.filePreview}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#29B5D5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <polyline points="9 15 12 18 15 15"/>
                    <line x1="12" y1="12" x2="12" y2="18"/>
                  </svg>
                  <span className={styles.fileName}>{certFile.name}</span>
                  <span className={styles.fileSize}>{(certFile.size / 1024).toFixed(0)} KB</span>
                </div>
              ) : (
                <>
                  <div className={styles.uploadIconWrap}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#29B5D5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 16 12 12 8 16"/>
                      <line x1="12" y1="12" x2="12" y2="21"/>
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
                    </svg>
                  </div>
                  <p className={styles.uploadLabel}>Upload Certificate</p>
                  <p className={styles.uploadHint}>PDF, PNG, or JPG (Max 5MB)</p>
                </>
              )}
            </div>
            <button type="button" className={styles.browseBtn} onClick={() => fileRef.current?.click()}>
              Browse Files
            </button>
          </div>

          {/* Indexing info card */}
          <div className={styles.infoCard}>
            <p className={styles.infoTitle}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#29B5D5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              Indexing Guide
            </p>
            {[
              { tag: "Scopus", color: "#92400E", bg: "#FEF3C7", desc: "Elsevier abstract & citation DB" },
              { tag: "Web of Science", color: "#1E40AF", bg: "#DBEAFE", desc: "Clarivate citation index" },
              { tag: "UGC", color: "#065F46", bg: "#D1FAE5", desc: "University Grants Commission listed" },
              { tag: "Others", color: "#374151", bg: "#F3F4F6", desc: "Other peer-reviewed indexes" },
            ].map((item) => (
              <div key={item.tag} className={styles.infoItem}>
                <span className={styles.infoTag} style={{ background: item.bg, color: item.color }}>{item.tag}</span>
                <span className={styles.infoDesc}>{item.desc}</span>
              </div>
            ))}
          </div>

          {/* Stats card */}
          <div className={styles.statsCard}>
            <p className={styles.statsLabel}>Total Publications</p>
            <div className={styles.statsNum}>
              <span className={styles.statsCount}>3</span>
              <span className={styles.statsSub}>Records</span>
            </div>
            <div className={styles.statsTrend}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#29B5D5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
              </svg>
              2 international this year
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
