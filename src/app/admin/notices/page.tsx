"use client";

import { useState, useEffect } from "react";
import AdminShell from "../AdminShell";
import type { NoticeRow } from "@/lib/types";

export default function NoticesPage() {
  const [notices, setNotices] = useState<NoticeRow[]>([]);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState({ title: "", date: "", content: "" });
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState("");

  const showToastMsg = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const load = () => {
    fetch("/api/notices")
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setNotices(d));
  };

  useEffect(load, []);

  const today = () => {
    const d = new Date();
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/notices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ title: "", date: "", content: "" });
      setShowAdd(false);
      load();
      showToastMsg("공지사항이 추가되었습니다");
    }
  };

  const startEdit = (notice: NoticeRow) => {
    setEditing(notice.id);
    setForm({ title: notice.title, date: notice.date, content: notice.content });
  };

  const handleUpdate = async () => {
    if (editing === null) return;
    await fetch(`/api/notices/${editing}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setEditing(null);
    setForm({ title: "", date: "", content: "" });
    load();
    showToastMsg("공지사항이 수정되었습니다");
  };

  const handleDelete = async (id: number) => {
    if (!confirm("이 공지사항을 삭제하시겠습니까?")) return;
    await fetch(`/api/notices/${id}`, { method: "DELETE" });
    load();
    showToastMsg("공지사항이 삭제되었습니다");
  };

  return (
    <AdminShell>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Notice</h1>
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => {
            setShowAdd(!showAdd);
            setEditing(null);
            setForm({ title: "", date: today(), content: "" });
          }}
        >
          {showAdd ? "취소" : "+ 공지 추가"}
        </button>
      </div>

      {(showAdd || editing !== null) && (
        <form
          onSubmit={(e) => { e.preventDefault(); editing !== null ? handleUpdate() : handleAdd(e); }}
          className="admin-card"
          style={{ marginBottom: "24px" }}
        >
          <div className="admin-form-grid">
            <div className="admin-form-group admin-form-full">
              <label className="admin-label">제목</label>
              <input
                className="admin-input"
                placeholder="공지사항 제목"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">날짜</label>
              <input
                className="admin-input"
                placeholder="2026.02.26"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">&nbsp;</label>
              <button type="submit" className="admin-btn admin-btn-primary">
                {editing !== null ? "수정" : "추가"}
              </button>
              {editing !== null && (
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  style={{ marginLeft: "8px" }}
                  onClick={() => { setEditing(null); setForm({ title: "", date: "", content: "" }); }}
                >
                  취소
                </button>
              )}
            </div>
            <div className="admin-form-group admin-form-full">
              <label className="admin-label">내용</label>
              <textarea
                className="admin-input admin-textarea"
                placeholder="공지사항 내용"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
            </div>
          </div>
        </form>
      )}

      <div>
        {notices.map((notice) => (
          <div key={notice.id} className="admin-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "12px", color: "var(--color-text-muted)", marginBottom: "6px" }}>
                {notice.date}
              </div>
              <div style={{ fontSize: "15px", color: "var(--color-text-primary)", marginBottom: "8px" }}>
                {notice.title}
              </div>
              {notice.content && (
                <div style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                  {notice.content}
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: "8px", flexShrink: 0, marginLeft: "16px" }}>
              <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => startEdit(notice)}>
                편집
              </button>
              <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(notice.id)}>
                삭제
              </button>
            </div>
          </div>
        ))}
        {notices.length === 0 && (
          <div className="admin-card" style={{ textAlign: "center", color: "var(--color-text-muted)" }}>
            등록된 공지사항이 없습니다.
          </div>
        )}
      </div>

      {toast && <div className="admin-toast">{toast}</div>}
    </AdminShell>
  );
}
