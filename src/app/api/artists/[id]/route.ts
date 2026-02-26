import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, createAdminClient } from "@/lib/supabase";
import { verifyAuth } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createPublicClient();

  const { data: artist, error } = await supabase
    .from("artists")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { data: filmography } = await supabase
    .from("filmography")
    .select("*")
    .eq("artist_id", id)
    .order("sort_order", { ascending: true });

  return NextResponse.json({ ...artist, filmography: filmography || [] });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const supabase = createAdminClient();

  const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() };
  const fields = ["name_ko", "name_en", "birth_date", "height", "weight", "specialty", "profile_image", "photos", "sort_order"];
  for (const f of fields) {
    if (body[f] !== undefined) updateData[f] = body[f];
  }

  const { data, error } = await supabase
    .from("artists")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const supabase = createAdminClient();

  const { data: files } = await supabase.storage.from("artists").list(id);
  if (files && files.length > 0) {
    await supabase.storage.from("artists").remove(files.map((f) => `${id}/${f.name}`));
  }

  const { error } = await supabase.from("artists").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
