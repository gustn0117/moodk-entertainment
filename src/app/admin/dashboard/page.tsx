"use client";

import { useState, useEffect } from "react";
import AdminShell from "../AdminShell";

export default function Dashboard() {
  const [stats, setStats] = useState({ artists: 0, notices: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/artists").then((r) => r.json()),
      fetch("/api/notices").then((r) => r.json()),
    ]).then(([artists, notices]) => {
      setStats({
        artists: Array.isArray(artists) ? artists.length : 0,
        notices: Array.isArray(notices) ? notices.length : 0,
      });
    });
  }, []);

  return (
    <AdminShell>
      <h1 className="admin-page-title">Dashboard</h1>

      <div className="admin-stats">
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.artists}</div>
          <div className="admin-stat-label">Artists</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.notices}</div>
          <div className="admin-stat-label">Notices</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">3</div>
          <div className="admin-stat-label">Settings</div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">Quick Access</div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a href="/admin/artists" className="admin-btn admin-btn-secondary">
            아티스트 관리
          </a>
          <a href="/admin/notices" className="admin-btn admin-btn-secondary">
            공지사항 관리
          </a>
          <a href="/admin/settings" className="admin-btn admin-btn-secondary">
            사이트 설정
          </a>
        </div>
      </div>
    </AdminShell>
  );
}
