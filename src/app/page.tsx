import { createPublicClient } from "@/lib/supabase";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

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
      auditionInfo={auditionInfoRow?.value as never}
      heroVideo={heroVideoRow?.value as never}
    />
  );
}
