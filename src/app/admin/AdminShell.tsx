"use client";

import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin/dashboard", label: "대시보드", icon: "◈" },
  { href: "/admin/artists", label: "아티스트", icon: "◇" },
  { href: "/admin/notices", label: "공지사항", icon: "▷" },
  { href: "/admin/settings", label: "사이트 설정", icon: "⚙" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin");
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">MOOD K</div>
        <nav style={{ padding: "8px 0" }}>
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`admin-sidebar-link ${pathname.startsWith(item.href) ? "active" : ""}`}
            >
              <span style={{ opacity: 0.5, fontSize: "11px" }}>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <a href="/" className="admin-sidebar-link" target="_blank">
            <span style={{ opacity: 0.5, fontSize: "11px" }}>↗</span>
            사이트 보기
          </a>
          <button
            onClick={handleLogout}
            className="admin-sidebar-link"
            style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", font: "inherit" }}
          >
            <span style={{ opacity: 0.5, fontSize: "11px" }}>⏻</span>
            로그아웃
          </button>
        </div>
      </aside>
      <main className="admin-content">{children}</main>
    </div>
  );
}
