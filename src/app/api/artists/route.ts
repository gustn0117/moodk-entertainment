import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, createAdminClient } from "@/lib/supabase";
import { verifyAuth } from "@/lib/auth";

export async function GET() {
  const supabase = createPublicClient();

  const { data: artists, error } = await supabase
    .from("artists")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: filmography } = await supabase
    .from("filmography")
    .select("*")
    .order("sort_order", { ascending: true });

  const result = (artists || []).map((artist) => ({
    ...artist,
    filmography: (filmography || []).filter((f) => f.artist_id === artist.id),
  }));

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("artists")
    .insert({
      id: body.id,
      name_ko: body.name_ko,
      name_en: body.name_en,
      birth_date: body.birth_date || "",
      height: body.height || "",
      weight: body.weight || "",
      specialty: body.specialty || "",
      profile_image: body.profile_image || "",
      photos: body.photos || [],
      sort_order: body.sort_order ?? 0,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
