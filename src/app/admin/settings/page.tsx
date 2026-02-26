"use client";

import { useState, useEffect } from "react";
import AdminShell from "../AdminShell";
import type { CompanyInfo, AuditionInfo, HeroVideo } from "@/lib/types";

export default function SettingsPage() {
  const [company, setCompany] = useState<CompanyInfo | null>(null);
  const [audition, setAudition] = useState<AuditionInfo | null>(null);
  const [hero, setHero] = useState<HeroVideo | null>(null);
  const [toast, setToast] = useState("");
  const [saving, setSaving] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  useEffect(() => {
    fetch("/api/settings/company_info").then((r) => r.json()).then(setCompany);
    fetch("/api/settings/audition_info").then((r) => r.json()).then(setAudition);
    fetch("/api/settings/hero_video").then((r) => r.json()).then(setHero);
  }, []);

  const saveSection = async (key: string, data: unknown) => {
    setSaving(key);
    await fetch(`/api/settings/${key}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving("");
    showToast("저장되었습니다");
  };

  if (!company || !audition || !hero) {
    return <AdminShell><p>로딩 중...</p></AdminShell>;
  }

  return (
    <AdminShell>
      <h1 className="admin-page-title">Settings</h1>

      {/* Hero Video */}
      <div className="admin-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div className="admin-card-header" style={{ marginBottom: 0 }}>Hero Video</div>
          <button
            className="admin-btn admin-btn-primary admin-btn-sm"
            onClick={() => saveSection("hero_video", hero)}
            disabled={saving === "hero_video"}
          >
            {saving === "hero_video" ? "저장 중..." : "저장"}
          </button>
        </div>
        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label className="admin-label">타입</label>
            <select
              className="admin-input"
              value={hero.type}
              onChange={(e) => setHero({ ...hero, type: e.target.value as "youtube" | "local" })}
            >
              <option value="youtube">YouTube</option>
              <option value="local">로컬 비디오</option>
            </select>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">URL</label>
            <input
              className="admin-input"
              placeholder={hero.type === "youtube" ? "https://www.youtube.com/embed/..." : "/videos/hero.mp4"}
              value={hero.url}
              onChange={(e) => setHero({ ...hero, url: e.target.value })}
            />
          </div>
        </div>
        <p style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "4px" }}>
          비워두면 그라데이션 배경이 표시됩니다. YouTube는 embed URL을 사용하세요.
        </p>
      </div>

      {/* Company Info */}
      <div className="admin-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div className="admin-card-header" style={{ marginBottom: 0 }}>Company Info</div>
          <button
            className="admin-btn admin-btn-primary admin-btn-sm"
            onClick={() => saveSection("company_info", company)}
            disabled={saving === "company_info"}
          >
            {saving === "company_info" ? "저장 중..." : "저장"}
          </button>
        </div>
        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label className="admin-label">회사명 (영문)</label>
            <input className="admin-input" value={company.name} onChange={(e) => setCompany({ ...company, name: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">회사명 (한글)</label>
            <input className="admin-input" value={company.nameKo} onChange={(e) => setCompany({ ...company, nameKo: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">대표</label>
            <input className="admin-input" value={company.ceo} onChange={(e) => setCompany({ ...company, ceo: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">전화번호</label>
            <input className="admin-input" value={company.phone} onChange={(e) => setCompany({ ...company, phone: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">이메일</label>
            <input className="admin-input" value={company.email} onChange={(e) => setCompany({ ...company, email: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">사업자번호</label>
            <input className="admin-input" value={company.businessNumber} onChange={(e) => setCompany({ ...company, businessNumber: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">주소</label>
            <input className="admin-input" value={company.address} onChange={(e) => setCompany({ ...company, address: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">상세 주소</label>
            <input className="admin-input" value={company.addressDetail} onChange={(e) => setCompany({ ...company, addressDetail: e.target.value })} />
          </div>
          <div className="admin-form-group admin-form-full">
            <label className="admin-label">회사 소개</label>
            <textarea
              className="admin-input admin-textarea"
              value={company.description}
              onChange={(e) => setCompany({ ...company, description: e.target.value })}
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Audition Info */}
      <div className="admin-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div className="admin-card-header" style={{ marginBottom: 0 }}>Audition Info</div>
          <button
            className="admin-btn admin-btn-primary admin-btn-sm"
            onClick={() => saveSection("audition_info", audition)}
            disabled={saving === "audition_info"}
          >
            {saving === "audition_info" ? "저장 중..." : "저장"}
          </button>
        </div>

        <h4 style={{ fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "12px" }}>온라인 오디션</h4>
        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label className="admin-label">제목</label>
            <input className="admin-input" value={audition.online.title} onChange={(e) => setAudition({ ...audition, online: { ...audition.online, title: e.target.value } })} />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">이메일</label>
            <input className="admin-input" value={audition.online.email} onChange={(e) => setAudition({ ...audition, online: { ...audition.online, email: e.target.value } })} />
          </div>
          <div className="admin-form-group admin-form-full">
            <label className="admin-label">설명</label>
            <textarea className="admin-input admin-textarea" value={audition.online.description} onChange={(e) => setAudition({ ...audition, online: { ...audition.online, description: e.target.value } })} />
          </div>
          <div className="admin-form-group admin-form-full">
            <label className="admin-label">제출 요건 (줄바꿈으로 구분)</label>
            <textarea
              className="admin-input admin-textarea"
              value={audition.online.requirements.join("\n")}
              onChange={(e) => setAudition({ ...audition, online: { ...audition.online, requirements: e.target.value.split("\n").filter(Boolean) } })}
            />
          </div>
        </div>

        <h4 style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: "24px 0 12px" }}>오프라인 오디션</h4>
        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label className="admin-label">제목</label>
            <input className="admin-input" value={audition.offline.title} onChange={(e) => setAudition({ ...audition, offline: { ...audition.offline, title: e.target.value } })} />
          </div>
          <div className="admin-form-group admin-form-full">
            <label className="admin-label">설명</label>
            <textarea className="admin-input admin-textarea" value={audition.offline.description} onChange={(e) => setAudition({ ...audition, offline: { ...audition.offline, description: e.target.value } })} />
          </div>
          <div className="admin-form-group admin-form-full">
            <label className="admin-label">안내 메시지</label>
            <input className="admin-input" value={audition.offline.note} onChange={(e) => setAudition({ ...audition, offline: { ...audition.offline, note: e.target.value } })} />
          </div>
        </div>
      </div>

      {toast && <div className="admin-toast">{toast}</div>}
    </AdminShell>
  );
}
