"use client";

import React, { useState, useRef } from "react";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import styles from "./page.module.css";

const YEARS_OF_STUDY = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"];

/* ── Avatar initials ── */
function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export default function ProfilePage() {
  const avatarRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: "Sunil Prasad",
    email: "sunil2109@cyberhub.edu",
    registerNumber: "21CS1004",
    yearOfStudy: "3rd Year",
    department: "Computer Science & Engineering",
    batch: "2021 – 2025",
    phone: "+91 98765 43210",
  });

  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setAvatarSrc(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <DashboardLayout>
      {/* ── Top Bar ── */}
      <div className={styles.topBar}>
        <h1 className={styles.pageTitle}>My Profile</h1>
        <div className={styles.topRight}>
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
        <div className={styles.layout}>

          {/* ─── LEFT: Profile card ─── */}
          <div className={styles.profileCard}>
            {/* Avatar */}
            <div className={styles.avatarWrap}>
              {avatarSrc ? (
                <img src={avatarSrc} alt="Profile photo" className={styles.avatarImg} />
              ) : (
                <div className={styles.avatarInitials}>
                  {getInitials(form.name)}
                </div>
              )}
              <button type="button" className={styles.avatarEditBtn}
                onClick={() => avatarRef.current?.click()}
                title="Change photo">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              <input ref={avatarRef} type="file" accept="image/*"
                className={styles.hiddenInput} onChange={handleAvatarChange} />
            </div>

            <h2 className={styles.profileName}>{form.name}</h2>
            <p className={styles.profileReg}>{form.registerNumber}</p>

            <div className={styles.profileBadge}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              Student
            </div>

            <div className={styles.profileDivider} />

            {/* Quick info */}
            <div className={styles.quickInfo}>
              <div className={styles.quickItem}>
                <span className={styles.quickLabel}>Department</span>
                <span className={styles.quickValue}>{form.department}</span>
              </div>
              <div className={styles.quickItem}>
                <span className={styles.quickLabel}>Batch</span>
                <span className={styles.quickValue}>{form.batch}</span>
              </div>
              <div className={styles.quickItem}>
                <span className={styles.quickLabel}>Year of Study</span>
                <span className={styles.quickValue}>{form.yearOfStudy}</span>
              </div>
            </div>

            <div className={styles.profileDivider} />

            {/* Activity stats */}
            <div className={styles.activityRow}>
              <div className={styles.activityStat}>
                <span className={styles.activityNum}>12</span>
                <span className={styles.activityLabel}>Certificates</span>
              </div>
              <div className={styles.activityStat}>
                <span className={styles.activityNum}>3</span>
                <span className={styles.activityLabel}>Internships</span>
              </div>
              <div className={styles.activityStat}>
                <span className={styles.activityNum}>5</span>
                <span className={styles.activityLabel}>Projects</span>
              </div>
            </div>
          </div>

          {/* ─── RIGHT: Edit form ─── */}
          <div className={styles.formSection}>
            {/* Section header */}
            <div className={styles.formSectionHead}>
              <div>
                <h3 className={styles.formSectionTitle}>Personal Information</h3>
                <p className={styles.formSectionSub}>Basic details about the student.</p>
              </div>
              {!editing ? (
                <button id="btn-edit-profile" type="button" className={styles.editBtn}
                  onClick={() => setEditing(true)}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Edit Profile
                </button>
              ) : null}
            </div>

            {/* Success toast */}
            {saved && (
              <div className={styles.toast}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Profile updated successfully!
              </div>
            )}

            <form onSubmit={handleSave} noValidate>
              <div className={styles.formCard}>
                <div className={styles.formGrid}>

                  {/* 1. Name */}
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="name">
                      Name <span className={styles.req}>*</span>
                    </label>
                    <div className={styles.inputWrap}>
                      <svg className={styles.inputIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      <input id="name" name="name"
                        className={`${styles.input} ${!editing ? styles.inputReadonly : ""}`}
                        type="text" value={form.name} onChange={handleChange}
                        readOnly={!editing} required />
                    </div>
                  </div>

                  {/* 2. Email Address */}
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="email">
                      Email Address <span className={styles.req}>*</span>
                    </label>
                    <div className={styles.inputWrap}>
                      <svg className={styles.inputIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                      <input id="email" name="email"
                        className={`${styles.input} ${!editing ? styles.inputReadonly : ""}`}
                        type="email" value={form.email} onChange={handleChange}
                        readOnly={!editing} required />
                    </div>
                  </div>

                  {/* 3. Register Number */}
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="registerNumber">
                      Register Number <span className={styles.req}>*</span>
                    </label>
                    <div className={styles.inputWrap}>
                      <svg className={styles.inputIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2"/>
                        <line x1="8" y1="21" x2="16" y2="21"/>
                        <line x1="12" y1="17" x2="12" y2="21"/>
                      </svg>
                      <input id="registerNumber" name="registerNumber"
                        className={`${styles.input} ${styles.inputMono} ${!editing ? styles.inputReadonly : ""}`}
                        type="text" value={form.registerNumber} onChange={handleChange}
                        readOnly={!editing} required />
                    </div>
                  </div>

                  {/* 4. Year of Study */}
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="yearOfStudy">
                      Year of Study <span className={styles.req}>*</span>
                    </label>
                    <div className={styles.inputWrap}>
                      <svg className={styles.inputIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                      </svg>
                      {editing ? (
                        <select id="yearOfStudy" name="yearOfStudy"
                          className={styles.input}
                          value={form.yearOfStudy} onChange={handleChange}>
                          {YEARS_OF_STUDY.map((y) => (
                            <option key={y} value={y}>{y}</option>
                          ))}
                        </select>
                      ) : (
                        <input id="yearOfStudy" name="yearOfStudy"
                          className={`${styles.input} ${styles.inputReadonly}`}
                          type="text" value={form.yearOfStudy} readOnly />
                      )}
                    </div>
                  </div>

                  {/* 5. Department (extra context) */}
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="department">
                      Department
                    </label>
                    <div className={styles.inputWrap}>
                      <svg className={styles.inputIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="22" x2="21" y2="22"/>
                        <rect x="2" y="8" width="20" height="14"/>
                        <path d="M12 2L2 8h20L12 2z"/>
                      </svg>
                      <input id="department" name="department"
                        className={`${styles.input} ${!editing ? styles.inputReadonly : ""}`}
                        type="text" value={form.department} onChange={handleChange}
                        readOnly={!editing} />
                    </div>
                  </div>

                  {/* 6. Phone */}
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="phone">
                      Phone Number
                    </label>
                    <div className={styles.inputWrap}>
                      <svg className={styles.inputIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.6 1.29h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                      <input id="phone" name="phone"
                        className={`${styles.input} ${!editing ? styles.inputReadonly : ""}`}
                        type="tel" value={form.phone} onChange={handleChange}
                        readOnly={!editing} placeholder="+91 XXXXX XXXXX" />
                    </div>
                  </div>

                </div>
              </div>

              {/* Action buttons */}
              {editing && (
                <div className={styles.actionRow}>
                  <button type="button" className={styles.cancelBtn}
                    onClick={() => setEditing(false)}>
                    Cancel
                  </button>
                  <button id="btn-save-profile" type="submit" className={styles.saveBtn}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                      <polyline points="17 21 17 13 7 13 7 21"/>
                      <polyline points="7 3 7 8 15 8"/>
                    </svg>
                    Save Changes
                  </button>
                </div>
              )}
            </form>

            {/* Account section */}
            <div className={styles.accountCard}>
              <h4 className={styles.accountTitle}>Account</h4>
              <div className={styles.accountRow}>
                <div className={styles.accountInfo}>
                  <span className={styles.accountLabel}>Account Status</span>
                  <span className={styles.accountValue}>
                    <span className={styles.activeDot} />Active Student
                  </span>
                </div>
              </div>
              <div className={styles.accountRow}>
                <div className={styles.accountInfo}>
                  <span className={styles.accountLabel}>Batch</span>
                  <span className={styles.accountValue}>{form.batch}</span>
                </div>
              </div>
              <div className={styles.accountRow}>
                <div className={styles.accountInfo}>
                  <span className={styles.accountLabel}>Portal Access</span>
                  <span className={styles.accountValue}>
                    <span className={styles.accessTag}>Student</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
