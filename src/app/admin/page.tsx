"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("비밀번호가 올바르지 않습니다.");
    }
    setLoading(false);
  };

  return (
    <div className="admin-login">
      <form onSubmit={handleLogin} className="admin-login-card">
        <div className="admin-login-title">MOOD K</div>
        <div className="admin-login-subtitle">ADMIN</div>

        <div className="admin-form-group">
          <input
            type="password"
            className="admin-input"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
        </div>

        {error && (
          <p style={{ color: "#c47070", fontSize: "13px", marginBottom: "16px" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          className="admin-btn admin-btn-primary"
          style={{ width: "100%" }}
          disabled={loading}
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
}
