"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import styles from "./page.module.css";

export default function AddPatentPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "",
    office: "",
    jurisdiction: "",
    filingDate: "",
    patentNumber: "",
    inventors: "",
    abstract: "",
    status: "",
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => { setSaving(false); router.push("/patents"); }, 1200);
  };

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
            <input className={styles.searchInput} type="text" placeholder="Search patents..." readOnly />
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
              Add New Patent Record
            </div>
            <p className={styles.formSubtitle}>
              Log an intellectual property filing to your academic record.
            </p>
          </div>

          {/* Patent title — full */}
          <div className={styles.fieldWrap}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="title">
                Patent Title <span className={styles.req}>*</span>
              </label>
              <input id="title" name="title" className={styles.input} type="text"
                placeholder="e.g., Distributed Ledger Identity Framework"
                value={form.title} onChange={handleChange} required />
            </div>
          </div>

          {/* Patent Office + Jurisdiction */}
          <div className={styles.fieldWrap}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="office">
                  Patent Office <span className={styles.req}>*</span>
                </label>
                <select id="office" name="office" className={styles.input}
                  value={form.office} onChange={handleChange} required>
                  <option value="">Select Office</option>
                  <option>USPTO (United States)</option>
                  <option>EPO (European Patent Office)</option>
                  <option>JPO (Japan)</option>
                  <option>IPO (India)</option>
                  <option>CNIPA (China)</option>
                  <option>WIPO (International)</option>
                  <option>Other</option>
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="status">
                  Current Status <span className={styles.req}>*</span>
                </label>
                <select id="status" name="status" className={styles.input}
                  value={form.status} onChange={handleChange} required>
                  <option value="">Select Status</option>
                  <option>Filed</option>
                  <option>Under Examination</option>
                  <option>Published</option>
                  <option>Granted</option>
                  <option>Abandoned</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filing date + Patent/App number */}
          <div className={styles.fieldWrap}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="filingDate">
                  Filing Date <span className={styles.req}>*</span>
                </label>
                <input id="filingDate" name="filingDate"
                  className={`${styles.input} ${styles.inputDate}`}
                  type="date" value={form.filingDate} onChange={handleChange} required />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="patentNumber">
                  Patent / Application Number
                </label>
                <input id="patentNumber" name="patentNumber" className={styles.input}
                  type="text" placeholder="e.g., US-11785012-B2"
                  value={form.patentNumber} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Inventors — full */}
          <div className={styles.fieldWrap}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="inventors">
                Inventors / Co-Inventors
              </label>
              <input id="inventors" name="inventors" className={styles.input}
                type="text" placeholder="e.g., John Doe, Jane Smith"
                value={form.inventors} onChange={handleChange} />
            </div>
          </div>

          {/* Abstract — full */}
          <div className={styles.fieldWrap}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="abstract">
                Brief Abstract / Description
              </label>
              <textarea id="abstract" name="abstract" className={styles.textarea} rows={4}
                placeholder="Describe the invention, its novelty, and technical scope..."
                value={form.abstract} onChange={handleChange} />
            </div>
          </div>

          {/* Footer */}
          <div className={styles.formFooter}>
            <button type="button" id="btn-cancel" className={styles.cancelBtn}
              onClick={() => router.push("/patents")}>
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

        {/* ── Right: Upload + Stats ── */}
        <div className={styles.rightCol}>
          {/* Document upload */}
          <div className={styles.uploadCard}>
            <p className={styles.uploadCardTitle}>Patent Document</p>
            <div className={styles.dropZone} onClick={() => fileRef.current?.click()}>
              <input ref={fileRef} type="file" accept=".pdf,.png,.jpg"
                className={styles.fileInput}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f && f.size <= 5 * 1024 * 1024) setUploadedFile(f);
                }} />
              {uploadedFile ? (
                <div className={styles.filePreview}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#29B5D5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                  <span className={styles.fileName}>{uploadedFile.name}</span>
                  <span className={styles.fileSize}>{(uploadedFile.size / 1024).toFixed(0)} KB</span>
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
                  <p className={styles.uploadLabel}>Upload Patent Doc</p>
                  <p className={styles.uploadHint}>PDF, PNG, or JPG (Max 5MB)</p>
                </>
              )}
            </div>
            <button type="button" className={styles.browseBtn} onClick={() => fileRef.current?.click()}>
              Browse Files
            </button>
          </div>

          {/* Quick guide */}
          <div className={styles.guideCard}>
            <p className={styles.guideTitle}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#29B5D5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              Status Guide
            </p>
            <div className={styles.guideItem}>
              <span className={`${styles.guideDot} ${styles.dotFiled}`} />
              <div>
                <p className={styles.guideLabel}>Filed</p>
                <p className={styles.guideDesc}>Application submitted, pending examination</p>
              </div>
            </div>
            <div className={styles.guideItem}>
              <span className={`${styles.guideDot} ${styles.dotExam}`} />
              <div>
                <p className={styles.guideLabel}>Under Examination</p>
                <p className={styles.guideDesc}>Being reviewed by the patent office</p>
              </div>
            </div>
            <div className={styles.guideItem}>
              <span className={`${styles.guideDot} ${styles.dotGranted}`} />
              <div>
                <p className={styles.guideLabel}>Granted</p>
                <p className={styles.guideDesc}>Patent rights officially awarded</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className={styles.statsCard}>
            <p className={styles.statsLabel}>Total Patents</p>
            <div className={styles.statsNum}>
              <span className={styles.statsCount}>3</span>
              <span className={styles.statsSub}>Records</span>
            </div>
            <div className={styles.statsTrend}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#29B5D5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
              </svg>
              1 granted this year
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
