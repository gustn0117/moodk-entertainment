"use client";

import { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "../../AdminShell";
import type { ArtistRow, FilmographyRow } from "@/lib/types";

export default function ArtistEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  const [artist, setArtist] = useState<ArtistRow | null>(null);
  const [filmography, setFilmography] = useState<FilmographyRow[]>([]);
  const [toast, setToast] = useState("");
  const [saving, setSaving] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const load = async () => {
    const res = await fetch(`/api/artists/${id}`);
    if (!res.ok) return router.push("/admin/artists");
    const data = await res.json();
    const { filmography: filmo, ...rest } = data;
    setArtist(rest);
    setFilmography(filmo || []);
  };

  useEffect(() => { load(); }, [id]);

  const saveArtist = async () => {
    if (!artist) return;
    setSaving(true);
    await fetch(`/api/artists/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(artist),
    });
    setSaving(false);
    showToast("저장되었습니다");
  };

  const uploadImage = async (file: File, type: "profile" | "photo") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("artistId", id);
    formData.append("type", type);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (!res.ok) return null;
    const { url } = await res.json();
    return url as string;
  };

  const handleProfileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !artist) return;
    const url = await uploadImage(file, "profile");
    if (url) {
      const updated = { ...artist, profile_image: url };
      setArtist(updated);
      await fetch(`/api/artists/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile_image: url }),
      });
      showToast("프로필 사진이 업로드되었습니다");
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !artist) return;
    for (const file of Array.from(files)) {
      const url = await uploadImage(file, "photo");
      if (url) {
        const newPhotos = [...(artist.photos || []), url];
        setArtist({ ...artist, photos: newPhotos });
        await fetch(`/api/artists/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ photos: newPhotos }),
        });
      }
    }
    showToast("사진이 업로드되었습니다");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removePhoto = async (index: number) => {
    if (!artist) return;
    const newPhotos = artist.photos.filter((_, i) => i !== index);
    setArtist({ ...artist, photos: newPhotos });
    await fetch(`/api/artists/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ photos: newPhotos }),
    });
    showToast("사진이 삭제되었습니다");
  };

  // Filmography CRUD
  const [newFilmo, setNewFilmo] = useState({ year: "", category: "", title: "", role: "" });

  const addFilmo = async () => {
    if (!newFilmo.year || !newFilmo.title) return;
    const res = await fetch("/api/filmography", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newFilmo, artist_id: id, sort_order: filmography.length }),
    });
    if (res.ok) {
      const data = await res.json();
      setFilmography([...filmography, data]);
      setNewFilmo({ year: "", category: "", title: "", role: "" });
      showToast("필모그래피가 추가되었습니다");
    }
  };

  const deleteFilmo = async (filmoId: number) => {
    await fetch(`/api/filmography/${filmoId}`, { method: "DELETE" });
    setFilmography(filmography.filter((f) => f.id !== filmoId));
    showToast("필모그래피가 삭제되었습니다");
  };

  if (!artist) return <AdminShell><p>로딩 중...</p></AdminShell>;

  const update = (key: keyof ArtistRow, value: string) => {
    setArtist({ ...artist, [key]: value });
  };

  return (
    <AdminShell>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>
          {artist.name_ko} 편집
        </h1>
        <div style={{ display: "flex", gap: "8px" }}>
          <button className="admin-btn admin-btn-secondary" onClick={() => router.push("/admin/artists")}>
            목록으로
          </button>
          <button className="admin-btn admin-btn-primary" onClick={saveArtist} disabled={saving}>
            {saving ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>

      {/* Profile Image */}
      <div className="admin-card">
        <div className="admin-card-header">Profile Image</div>
        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
          <div style={{ width: "150px", aspectRatio: "3/4", borderRadius: "6px", overflow: "hidden", background: "var(--color-bg-card)", border: "1px solid var(--color-border)", flexShrink: 0 }}>
            {artist.profile_image ? (
              <img src={artist.profile_image} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-text-muted)", fontSize: "12px" }}>
                NO IMAGE
              </div>
            )}
          </div>
          <div>
            <input ref={profileInputRef} type="file" accept="image/*" onChange={handleProfileUpload} style={{ display: "none" }} />
            <button className="admin-btn admin-btn-secondary" onClick={() => profileInputRef.current?.click()}>
              사진 업로드
            </button>
            <p style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "8px" }}>
              JPG, PNG, WebP / 최대 5MB
            </p>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="admin-card">
        <div className="admin-card-header">Basic Info</div>
        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label className="admin-label">한글 이름</label>
            <input className="admin-input" value={artist.name_ko} onChange={(e) => update("name_ko", e.target.value)} />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">영문 이름</label>
            <input className="admin-input" value={artist.name_en} onChange={(e) => update("name_en", e.target.value.toUpperCase())} />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">생년월일</label>
            <input className="admin-input" placeholder="2001.06.19" value={artist.birth_date} onChange={(e) => update("birth_date", e.target.value)} />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">키</label>
            <input className="admin-input" placeholder="180cm" value={artist.height} onChange={(e) => update("height", e.target.value)} />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">몸무게</label>
            <input className="admin-input" placeholder="67kg" value={artist.weight} onChange={(e) => update("weight", e.target.value)} />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">특기</label>
            <input className="admin-input" placeholder="연기, 운동" value={artist.specialty} onChange={(e) => update("specialty", e.target.value)} />
          </div>
        </div>
      </div>

      {/* Filmography */}
      <div className="admin-card">
        <div className="admin-card-header">Filmography</div>

        {filmography.length > 0 && (
          <table className="admin-table" style={{ marginBottom: "20px" }}>
            <thead>
              <tr>
                <th>연도</th>
                <th>구분</th>
                <th>작품</th>
                <th>역할</th>
                <th style={{ width: "60px" }}></th>
              </tr>
            </thead>
            <tbody>
              {filmography.map((f) => (
                <tr key={f.id}>
                  <td>{f.year}</td>
                  <td>{f.category}</td>
                  <td style={{ color: "var(--color-text-primary)" }}>{f.title}</td>
                  <td>{f.role}</td>
                  <td>
                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => deleteFilmo(f.id)}>
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="admin-form-grid" style={{ alignItems: "flex-end" }}>
          <div className="admin-form-group">
            <label className="admin-label">연도</label>
            <input className="admin-input" placeholder="2026" value={newFilmo.year} onChange={(e) => setNewFilmo({ ...newFilmo, year: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">구분</label>
            <input className="admin-input" placeholder="드라마, 영화, 광고..." value={newFilmo.category} onChange={(e) => setNewFilmo({ ...newFilmo, category: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">작품명</label>
            <input className="admin-input" placeholder="작품 제목" value={newFilmo.title} onChange={(e) => setNewFilmo({ ...newFilmo, title: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">역할</label>
            <input className="admin-input" placeholder="주연 (역할명)" value={newFilmo.role} onChange={(e) => setNewFilmo({ ...newFilmo, role: e.target.value })} />
          </div>
        </div>
        <button className="admin-btn admin-btn-secondary" onClick={addFilmo} style={{ marginTop: "8px" }}>
          + 필모그래피 추가
        </button>
      </div>

      {/* Photos */}
      <div className="admin-card">
        <div className="admin-card-header">Gallery Photos</div>

        <div className="admin-photo-grid">
          {(artist.photos || []).map((url, idx) => (
            <div key={idx} className="admin-photo-item">
              <img src={url} alt={`photo ${idx + 1}`} />
              <button className="admin-photo-remove" onClick={() => removePhoto(idx)}>
                ✕
              </button>
            </div>
          ))}
          <label className="admin-photo-add" onClick={() => fileInputRef.current?.click()}>
            + 사진 추가
          </label>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handlePhotoUpload} style={{ display: "none" }} />
      </div>

      {toast && <div className="admin-toast">{toast}</div>}
    </AdminShell>
  );
}
