import { createPublicClient } from "@/lib/supabase";
import HomeClient from "./HomeClient";
import type { AuditionInfo, HeroVideo } from "@/lib/types";

export const dynamic = "force-dynamic";

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

function normalizeHeroVideo(raw: any): HeroVideo {
  if (raw?.url) return raw as HeroVideo;
  return {
    type: "youtube",
    url: "https://youtu.be/C9trFvo-azY",
    fallbackText: "MOOD K ENTERTAINMENT",
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export default async function Home() {
  const supabase = createPublicClient();

  const [
    { data: artists },
    { data: filmography },
    { data: notices },
    { data: companyInfoRow },
    { data: auditionInfoRow },
    { data: heroVideoRow },
  ] = await Promise.all([
    supabase.from("artists").select("*").order("sort_order", { ascending: true }),
    supabase.from("filmography").select("*").order("sort_order", { ascending: true }),
    supabase.from("notices").select("*").order("id", { ascending: false }),
    supabase.from("site_settings").select("value").eq("key", "company_info").single(),
    supabase.from("site_settings").select("value").eq("key", "audition_info").single(),
    supabase.from("site_settings").select("value").eq("key", "hero_video").single(),
  ]);

  const artistsWithFilmo = (artists || []).map((artist) => ({
    ...artist,
    filmography: (filmography || []).filter((f) => f.artist_id === artist.id),
  }));

  return (
    <HomeClient
      artists={artistsWithFilmo}
      notices={notices || []}
      companyInfo={companyInfoRow?.value as never}
      auditionInfo={normalizeAudition(auditionInfoRow?.value)}
      heroVideo={normalizeHeroVideo(heroVideoRow?.value)}
    />
  );
}
