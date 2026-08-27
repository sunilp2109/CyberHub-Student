"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import styles from "./page.module.css";

export default function AddCompetitionPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    activityName: "",    // 1. Name of the Activity
    level: "",           // 2. Level of Competition
    compType: "",        // 3. Type of Competition
    participationType: "Individual", // 4. Type of Participation
    date: "",            // 5. Date(s) of Competition
    compName: "",        // 6. Name of Competition
    organizer: "",       // 7. Organizer
    venue: "",           // 8. Venue
    position: "",        // 9. Position
    prizeMoney: "",      // 10. Prize Money (Number)
    currency: "INR",     // 10. Prize Money (Currency)
    recognition: "",     // 11. Other Recognition
  });
  
  const [certFile, setCertFile] = useState<File | null>(null); // 12. Certificate
  const [saving, setSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => { setSaving(false); router.push("/competitions"); }, 1200);
  };

  const COMP_LEVELS = ["College", "Inter-College", "State", "National", "International"];
  const COMP_TYPES = ["Hackathon", "Capture The Flag (CTF)", "Coding Competition", "Paper Presentation", "Ideathon", "Designathon", "Other"];
  const CURRENCIES = ["INR", "USD", "EUR", "GBP", "Other"];
  const POSITIONS = ["Winner", "1st Runner Up", "2nd Runner Up", "Top 10", "Top 50", "Finalist", "Participant", "Other"];

  return (
    <DashboardLayout>
      {/* ── Top Bar ── */}
      <div className={styles.topBar}>
        <h1 className={styles.pageTitle}>Competitions & Participation</h1>
        <div className={styles.topRight}>
          <button className={styles.iconBtn} aria-label="Notifications">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
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
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
              </span>
              Add New Participation
            </div>
            <p className={styles.formSubtitle}>Log your hackathons, CTFs, coding competitions, etc.</p>
          </div>

          {/* Row 1: Activity Name (Full) */}
          <div className={styles.fieldWrap}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="activityName">
                Name of the Activity / Project Built <span className={styles.req}>*</span>
              </label>
              <input id="activityName" name="activityName" className={styles.input} type="text"
                placeholder="e.g., Cyber Security Threat Intel Platform"
                value={form.activityName} onChange={handleChange} required />
            </div>
          </div>

          {/* Row 2: Level + Type */}
          <div className={styles.fieldWrap}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="level">
                  Level of Competition <span className={styles.req}>*</span>
                </label>
                <select id="level" name="level" className={styles.input}
                  value={form.level} onChange={handleChange} required>
                  <option value="">Select Level</option>
                  {COMP_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="compType">
                  Type of Competition <span className={styles.req}>*</span>
                </label>
                <select id="compType" name="compType" className={styles.input}
                  value={form.compType} onChange={handleChange} required>
                  <option value="">Select Type</option>
                  {COMP_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Row 3: Competition Name + Organizer */}
          <div className={styles.fieldWrap}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="compName">
                  Name of Competition <span className={styles.req}>*</span>
                </label>
                <input id="compName" name="compName" className={styles.input} type="text"
                  placeholder="e.g., Smart India Hackathon 2024"
                  value={form.compName} onChange={handleChange} required />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="organizer">
                  Organizer <span className={styles.req}>*</span>
                </label>
                <input id="organizer" name="organizer" className={styles.input} type="text"
                  placeholder="e.g., MoE's Innovation Cell"
                  value={form.organizer} onChange={handleChange} required />
              </div>
            </div>
          </div>

          {/* Row 4: Participation Type + Date */}
          <div className={styles.fieldWrap}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Type of Participation <span className={styles.req}>*</span></label>
                <div className={styles.radioGroup}>
                  {["Individual", "Team"].map((pt) => (
                    <label key={pt} className={`${styles.radioLabel} ${form.participationType === pt ? styles.radioActive : ""}`}>
                      <input type="radio" name="participationType" value={pt}
                        checked={form.participationType === pt} onChange={handleChange}
                        className={styles.radioInput} />
                      {pt}
                    </label>
                  ))}
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="date">
                  Date(s) of Competition <span className={styles.req}>*</span>
                </label>
                <input id="date" name="date" className={`${styles.input} ${styles.inputDate}`} type="text"
                  placeholder="e.g., 12-14 Aug 2024"
                  value={form.date} onChange={handleChange} required />
              </div>
            </div>
          </div>

          {/* Row 5: Venue + Position */}
          <div className={styles.fieldWrap}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="venue">Venue <span className={styles.req}>*</span></label>
                <input id="venue" name="venue" className={styles.input} type="text"
                  placeholder="e.g., Online, New Delhi"
                  value={form.venue} onChange={handleChange} required />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="position">Position <span className={styles.req}>*</span></label>
                <select id="position" name="position" className={styles.input}
                  value={form.position} onChange={handleChange} required>
                  <option value="">Select Position</option>
                  {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Row 6: Prize Money (Amount + Currency) */}
          <div className={styles.fieldWrap}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="prizeMoney">Prize Money</label>
                <div className={styles.amountWrap}>
                  <span className={styles.currencySymbol}>
                    {{ INR: "₹", USD: "$", EUR: "€", GBP: "£" }[form.currency] ?? form.currency}
                  </span>
                  <input id="prizeMoney" name="prizeMoney" className={`${styles.input} ${styles.inputAmount}`}
                    type="number" min="0" placeholder="e.g., 50000"
                    value={form.prizeMoney} onChange={handleChange} />
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="currency">Currency</label>
                <select id="currency" name="currency" className={styles.input}
                  value={form.currency} onChange={handleChange}>
                  {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Row 7: Other Recognition */}
          <div className={styles.fieldWrap}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="recognition">Other Recognition</label>
              <textarea id="recognition" name="recognition" className={styles.textarea} rows={2}
                placeholder="e.g., Featured in newspaper, invited for finals, special mention..."
                value={form.recognition} onChange={handleChange} />
            </div>
          </div>

          {/* Footer */}
          <div className={styles.formFooter}>
            <button type="button" id="btn-cancel" className={styles.cancelBtn}
              onClick={() => router.push("/competitions")}>Cancel</button>
            <button type="submit" id="btn-save" className={styles.saveBtn} disabled={saving}>
              {saving ? <span className={styles.spinner} /> : "Save Record"}
            </button>
          </div>
        </form>

        {/* ── Right: File Upload ── */}
        <div className={styles.rightCol}>
          <div className={styles.uploadCard}>
            <p className={styles.uploadCardTitle}>Certificate & Photograph</p>
            <div className={styles.dropZone} onClick={() => fileRef.current?.click()}>
              <input ref={fileRef} type="file" accept=".pdf,.png,.jpg,.jpeg"
                className={styles.fileInput}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setCertFile(f);
                }} />
              {certFile ? (
                <div className={styles.filePreview}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#29B5D5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <polyline points="9 15 12 18 15 15"></polyline>
                    <line x1="12" y1="12" x2="12" y2="18"></line>
                  </svg>
                  <span className={styles.fileName}>{certFile.name}</span>
                  <span className={styles.fileSize}>{(certFile.size / 1024).toFixed(0)} KB</span>
                </div>
              ) : (
                <>
                  <div className={styles.uploadIconWrap}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#29B5D5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 16 12 12 8 16"></polyline>
                      <line x1="12" y1="12" x2="12" y2="21"></line>
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                    </svg>
                  </div>
                  <p className={styles.uploadLabel}>Upload Certificate/Photo</p>
                  <p className={styles.uploadHint}>PDF, PNG, or JPG</p>
                </>
              )}
            </div>
            <button type="button" className={styles.browseBtn} onClick={() => fileRef.current?.click()}>
              Browse Files
            </button>
          </div>
          
          <div className={styles.statsCard}>
            <p className={styles.statsLabel}>Total Participations</p>
            <div className={styles.statsNum}>
              <span className={styles.statsCount}>3</span>
              <span className={styles.statsSub}>Competitions</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
