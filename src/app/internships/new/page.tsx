"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import styles from "./page.module.css";

export default function AddInternshipPage() {
  const router = useRouter();
  const offerRef = useRef<HTMLInputElement>(null);
  const certRef  = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    role: "",
    company: "",
    location: "",
    locationType: "",
    startDate: "",
    endDate: "",
    type: "",
    stipend: "",
    notes: "",
  });

  const [offerFile, setOfferFile] = useState<File | null>(null);
  const [certFile,  setCertFile]  = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => { setSaving(false); router.push("/internships"); }, 1200);
  };

  return (
    <DashboardLayout>
      {/* ── Top Bar ── */}
      <div className={styles.topBar}>
        <h1 className={styles.pageTitle}>Internships</h1>
        <div className={styles.topRight}>
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input className={styles.searchInput} type="text" placeholder="Search internships..." readOnly />
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
              Add New Internship
            </div>
            <p className={styles.formSubtitle}>
              Log a professional experience to your academic record.
            </p>
          </div>

          {/* Role — full */}
          <div className={styles.fieldWrap}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="role">
                Internship Role / Title <span className={styles.req}>*</span>
              </label>
              <input id="role" name="role" className={styles.input} type="text"
                placeholder="e.g., Cyber Security Analyst Intern"
                value={form.role} onChange={handleChange} required />
            </div>
          </div>

          {/* Company + Location type */}
          <div className={styles.fieldWrap}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="company">
                  Company / Organisation <span className={styles.req}>*</span>
                </label>
                <input id="company" name="company" className={styles.input} type="text"
                  placeholder="e.g., TechGuard Solutions"
                  value={form.company} onChange={handleChange} required />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="locationType">
                  Work Mode <span className={styles.req}>*</span>
                </label>
                <select id="locationType" name="locationType" className={styles.input}
                  value={form.locationType} onChange={handleChange} required>
                  <option value="">Select Mode</option>
                  <option>On-site</option>
                  <option>Remote (Online)</option>
                  <option>Hybrid</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location + Type */}
          <div className={styles.fieldWrap}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="location">
                  Location (City / Country)
                </label>
                <input id="location" name="location" className={styles.input} type="text"
                  placeholder="e.g., San Francisco, CA"
                  value={form.location} onChange={handleChange} />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="type">
                  Internship Type
                </label>
                <select id="type" name="type" className={styles.input}
                  value={form.type} onChange={handleChange}>
                  <option value="">Select Type</option>
                  <option>Technical</option>
                  <option>Non-Technical</option>
                  <option>Research</option>
                  <option>Management</option>
                </select>
              </div>
            </div>
          </div>

          {/* Start + End Date */}
          <div className={styles.fieldWrap}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="startDate">
                  Start Date <span className={styles.req}>*</span>
                </label>
                <input id="startDate" name="startDate" className={`${styles.input} ${styles.inputDate}`}
                  type="date" value={form.startDate} onChange={handleChange} required />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="endDate">
                  End Date
                </label>
                <input id="endDate" name="endDate" className={`${styles.input} ${styles.inputDate}`}
                  type="date" value={form.endDate} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Stipend — half */}
          <div className={styles.fieldWrap}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="stipend">
                  Stipend / Compensation
                </label>
                <input id="stipend" name="stipend" className={styles.input} type="text"
                  placeholder="e.g., $2,500/mo or Unpaid"
                  value={form.stipend} onChange={handleChange} />
              </div>
              <div className={styles.field} />
            </div>
          </div>

          {/* Notes */}
          <div className={styles.fieldWrap}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="notes">
                Key Responsibilities / Notes
              </label>
              <textarea id="notes" name="notes" className={styles.textarea} rows={4}
                placeholder="Describe your role, projects handled, or skills gained..."
                value={form.notes} onChange={handleChange} />
            </div>
          </div>

          {/* Footer */}
          <div className={styles.formFooter}>
            <button type="button" id="btn-cancel" className={styles.cancelBtn}
              onClick={() => router.push("/internships")}>
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

        {/* ── Right: Uploads + Stats ── */}
        <div className={styles.rightCol}>

          {/* Offer Letter upload */}
          <div className={styles.uploadCard}>
            <p className={styles.uploadCardTitle}>Offer Letter</p>
            <div className={styles.dropZone} onClick={() => offerRef.current?.click()}>
              <input ref={offerRef} type="file" accept=".pdf,.png,.jpg"
                className={styles.fileInput}
                onChange={(e) => { const f = e.target.files?.[0]; if (f) setOfferFile(f); }} />
              {offerFile ? (
                <div className={styles.filePreview}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#29B5D5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                  <span className={styles.fileName}>{offerFile.name}</span>
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
                  <p className={styles.uploadLabel}>Upload Offer Letter</p>
                  <p className={styles.uploadHint}>PDF, PNG, or JPG (Max 5MB)</p>
                </>
              )}
            </div>
            <button type="button" className={styles.browseBtn} onClick={() => offerRef.current?.click()}>
              Browse Files
            </button>
          </div>

          {/* Completion Certificate upload */}
          <div className={styles.uploadCard}>
            <p className={styles.uploadCardTitle}>Completion Certificate</p>
            <div className={styles.dropZone} onClick={() => certRef.current?.click()}>
              <input ref={certRef} type="file" accept=".pdf,.png,.jpg"
                className={styles.fileInput}
                onChange={(e) => { const f = e.target.files?.[0]; if (f) setCertFile(f); }} />
              {certFile ? (
                <div className={styles.filePreview}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                  <span className={styles.fileName}>{certFile.name}</span>
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
            <button type="button" className={styles.browseBtn} onClick={() => certRef.current?.click()}>
              Browse Files
            </button>
          </div>

          {/* Stats card */}
          <div className={styles.statsCard}>
            <p className={styles.statsLabel}>Total Internships</p>
            <div className={styles.statsNum}>
              <span className={styles.statsCount}>3</span>
              <span className={styles.statsSub}>Experiences</span>
            </div>
            <div className={styles.statsTrend}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#29B5D5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
              </svg>
              1 ongoing this year
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
