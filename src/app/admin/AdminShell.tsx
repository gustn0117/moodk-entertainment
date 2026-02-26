"use client";

import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin/dashboard", label: "대시보드" },
  { href: "/admin/artists", label: "아티스트" },
  { href: "/admin/notices", label: "공지사항" },
  { href: "/admin/settings", label: "사이트 설정" },
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
        <div className="admin-sidebar-brand">MOOD K ADMIN</div>
        {NAV.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`admin-sidebar-link ${pathname.startsWith(item.href) ? "active" : ""}`}
          >
            {item.label}
          </a>
        ))}
        <div className="admin-sidebar-bottom">
          <a href="/" className="admin-sidebar-link" target="_blank">
            사이트 보기 ↗
          </a>
          <button
            onClick={handleLogout}
            className="admin-sidebar-link"
            style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", font: "inherit" }}
          >
            로그아웃
          </button>
        </div>
      </aside>
      <main className="admin-content">{children}</main>
    </div>
  );
}
