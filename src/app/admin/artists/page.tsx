"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "../AdminShell";
import type { ArtistRow } from "@/lib/types";

export default function ArtistsPage() {
  const [artists, setArtists] = useState<(ArtistRow & { filmography: unknown[] })[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ id: "", name_ko: "", name_en: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const load = () => {
    fetch("/api/artists")
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setArtists(d));
  };

  useEffect(load, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/artists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        sort_order: artists.length,
      }),
    });
    if (res.ok) {
      setForm({ id: "", name_ko: "", name_en: "" });
      setShowAdd(false);
      load();
    }
    setLoading(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" 아티스트를 삭제하시겠습니까?`)) return;
    await fetch(`/api/artists/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <AdminShell>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Artists</h1>
        <button className="admin-btn admin-btn-primary" onClick={() => setShowAdd(!showAdd)}>
          {showAdd ? "취소" : "+ 아티스트 추가"}
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="admin-card" style={{ marginBottom: "24px" }}>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label className="admin-label">ID (영문, 하이픈)</label>
              <input
                className="admin-input"
                placeholder="hong-gil-dong"
                value={form.id}
                onChange={(e) => setForm({ ...form, id: e.target.value })}
                required
                pattern="[a-z0-9\-]+"
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">한글 이름</label>
              <input
                className="admin-input"
                placeholder="홍길동"
                value={form.name_ko}
                onChange={(e) => setForm({ ...form, name_ko: e.target.value })}
                required
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">영문 이름</label>
              <input
                className="admin-input"
                placeholder="HONG GIL DONG"
                value={form.name_en}
                onChange={(e) => setForm({ ...form, name_en: e.target.value.toUpperCase() })}
                required
              />
            </div>
            <div className="admin-form-group" style={{ display: "flex", alignItems: "flex-end" }}>
              <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
                {loading ? "추가 중..." : "추가"}
              </button>
            </div>
          </div>
        </form>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>영문</th>
            <th>필모그래피</th>
            <th style={{ width: "140px" }}>관리</th>
          </tr>
        </thead>
        <tbody>
          {artists.map((a) => (
            <tr key={a.id}>
              <td style={{ color: "var(--color-text-primary)" }}>{a.name_ko}</td>
              <td>{a.name_en}</td>
              <td>{a.filmography?.length || 0}건</td>
              <td>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    className="admin-btn admin-btn-secondary admin-btn-sm"
                    onClick={() => router.push(`/admin/artists/${a.id}`)}
                  >
                    편집
                  </button>
                  <button
                    className="admin-btn admin-btn-danger admin-btn-sm"
                    onClick={() => handleDelete(a.id, a.name_ko)}
                  >
                    삭제
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {artists.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", color: "var(--color-text-muted)", padding: "40px" }}>
                등록된 아티스트가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </AdminShell>
  );
}
