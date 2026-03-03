"use client";

import { useState, useEffect } from "react";
import AdminShell from "../AdminShell";
import type { CompanyInfo, AuditionInfo, HeroVideo } from "@/lib/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
function normalizeAudition(raw: any): AuditionInfo {
  if (raw?.introText1) return raw as AuditionInfo;
  return {
    email: raw?.online?.email || raw?.email || "moodkent@gmail.com",
    introText1: "MOOD K ENTERTAINMENT는\n아티스트의 현재보다 앞으로의 여정을 더 중요하게 생각합니다.",
    introText2: "우리는 가능성을 서두르지 않습니다.\n한 사람의 방향과 시간을 충분히 바라본 후, 신중하게 결정합니다.",
    materials: [
      "일반 사진 (정면 및 측면 각 1장)",
      "1분 이내 자기소개 영상",
      "프로필 PDF 1부 또는 연기 영상 (경력자 해당)",
      "활동 경력 사항 (경력자 해당)",
    ],
    processSteps: [
      "위 자료를 이메일로 제출",
      "이메일 제목: MOOD K AUDITION / 이름 / 출생연도",
      "서류 검토 후, 합격자에 한해 2주 이내 개별 연락드립니다.",
    ],
    privacyNote: "제출된 모든 자료는 신중히 검토되며, 오디션 심사 목적 외 사용되지 않습니다.\n심사 종료 후 안전하게 관리됩니다.",
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

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
    fetch("/api/settings/audition_info").then((r) => r.json()).then((data) => setAudition(normalizeAudition(data)));
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

        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label className="admin-label">이메일</label>
            <input className="admin-input" value={audition.email} onChange={(e) => setAudition({ ...audition, email: e.target.value })} />
          </div>
          <div className="admin-form-group admin-form-full">
            <label className="admin-label">인트로 텍스트 1 (줄바꿈 지원)</label>
            <textarea
              className="admin-input admin-textarea"
              value={audition.introText1}
              onChange={(e) => setAudition({ ...audition, introText1: e.target.value })}
              rows={2}
            />
          </div>
          <div className="admin-form-group admin-form-full">
            <label className="admin-label">인트로 텍스트 2 (줄바꿈 지원)</label>
            <textarea
              className="admin-input admin-textarea"
              value={audition.introText2}
              onChange={(e) => setAudition({ ...audition, introText2: e.target.value })}
              rows={2}
            />
          </div>
          <div className="admin-form-group admin-form-full">
            <label className="admin-label">제출 자료 (줄바꿈으로 구분)</label>
            <textarea
              className="admin-input admin-textarea"
              value={audition.materials.join("\n")}
              onChange={(e) => setAudition({ ...audition, materials: e.target.value.split("\n").filter(Boolean) })}
              rows={4}
            />
          </div>
          <div className="admin-form-group admin-form-full">
            <label className="admin-label">접수 절차 (줄바꿈으로 구분)</label>
            <textarea
              className="admin-input admin-textarea"
              value={audition.processSteps.join("\n")}
              onChange={(e) => setAudition({ ...audition, processSteps: e.target.value.split("\n").filter(Boolean) })}
              rows={3}
            />
          </div>
          <div className="admin-form-group admin-form-full">
            <label className="admin-label">개인정보 안내 (줄바꿈 지원)</label>
            <textarea
              className="admin-input admin-textarea"
              value={audition.privacyNote}
              onChange={(e) => setAudition({ ...audition, privacyNote: e.target.value })}
              rows={2}
            />
          </div>
        </div>
      </div>

      {toast && <div className="admin-toast">{toast}</div>}
    </AdminShell>
  );
}
