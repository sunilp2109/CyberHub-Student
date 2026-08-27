"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import styles from "./page.module.css";

export default function AddCertificatePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    courseName: "",
    institution: "",
    bodyOffering: "",
    dateEarned: "",
    credentialId: "",
    notes: "",
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) return alert("File must be under 5MB");
    setUploadedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      router.push("/certificates");
    }, 1200);
  };

  return (
    <DashboardLayout>
      {/* ── Top Bar ── */}
      <div className={styles.topBar}>
        <h1 className={styles.pageTitle}>Certifications</h1>
        <div className={styles.topRight}>
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input className={styles.searchInput} type="text" placeholder="Search certifications..." readOnly />
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
          {/* Form header */}
          <div className={styles.formHeader}>
            <div className={styles.formHeadTitle}>
              <span className={styles.plusIcon}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="16"/>
                  <line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
              </span>
              Add New Certification
            </div>
            <p className={styles.formSubtitle}>
              Log a new professional credential to your academic record.
            </p>
          </div>

          {/* ── Fields ── */}
          {/* Course name — full width */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="courseName">
              Name of Course / Certification <span className={styles.req}>*</span>
            </label>
            <input
              id="courseName"
              name="courseName"
              className={styles.input}
              type="text"
              placeholder="e.g., CompTIA Security+"
              value={form.courseName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Row: Institution + Body */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="institution">
                Industry / Institution <span className={styles.req}>*</span>
              </label>
              <input
                id="institution"
                name="institution"
                className={styles.input}
                type="text"
                placeholder="e.g., CompTIA"
                value={form.institution}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="bodyOffering">
                Body Offering Certificate
              </label>
              <input
                id="bodyOffering"
                name="bodyOffering"
                className={styles.input}
                type="text"
                placeholder="e.g., Pearson VUE"
                value={form.bodyOffering}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row: Date + Credential ID */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="dateEarned">
                Duration / Date Earned
              </label>
              <input
                id="dateEarned"
                name="dateEarned"
                className={`${styles.input} ${styles.inputDate}`}
                type="date"
                value={form.dateEarned}
                onChange={handleChange}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="credentialId">
                Credential ID (Optional)
              </label>
              <input
                id="credentialId"
                name="credentialId"
                className={styles.input}
                type="text"
                placeholder="e.g., COMP0010203040"
                value={form.credentialId}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Notes — full width */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="notes">
              Special Recognition / Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              className={styles.textarea}
              placeholder="Add any honors, scores, or specific skills acquired..."
              value={form.notes}
              onChange={handleChange}
              rows={4}
            />
          </div>

          {/* ── Footer actions ── */}
          <div className={styles.formFooter}>
            <button
              type="button"
              id="btn-cancel"
              className={styles.cancelBtn}
              onClick={() => router.push("/certificates")}
            >
              Cancel
            </button>
            <button
              type="submit"
              id="btn-save"
              className={styles.saveBtn}
              disabled={saving}
            >
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

        {/* ── Right: Evidence + Stats ── */}
        <div className={styles.rightCol}>
          {/* Upload card */}
          <div className={styles.uploadCard}>
            <p className={styles.uploadCardTitle}>Certificate Evidence</p>
            <div
              className={`${styles.dropZone} ${dragging ? styles.dropActive : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              aria-label="Upload certificate file"
              onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                className={styles.fileInput}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
              />
              {uploadedFile ? (
                <div className={styles.filePreview}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#29B5D5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <polyline points="9 15 12 18 15 15"/>
                    <line x1="12" y1="12" x2="12" y2="18"/>
                  </svg>
                  <span className={styles.fileName}>{uploadedFile.name}</span>
                  <span className={styles.fileSize}>
                    {(uploadedFile.size / 1024).toFixed(0)} KB
                  </span>
                </div>
              ) : (
                <>
                  <div className={styles.uploadIconWrap}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#29B5D5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
            <button
              type="button"
              id="btn-browse"
              className={styles.browseBtn}
              onClick={() => fileInputRef.current?.click()}
            >
              Browse Files
            </button>
          </div>

          {/* Stats card */}
          <div className={styles.statsCard}>
            <p className={styles.statsLabel}>Total Verified</p>
            <div className={styles.statsNum}>
              <span className={styles.statsCount}>4</span>
              <span className={styles.statsSub}>Credentials</span>
            </div>
            <div className={styles.statsTrend}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#29B5D5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
              </svg>
              +1 this semester
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
