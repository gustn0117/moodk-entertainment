import { NextRequest, NextResponse } from "next/server";
import { createAdminClient, getStorageUrl } from "@/lib/supabase";
import { verifyAuth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File;
  const artistId = formData.get("artistId") as string;
  const type = formData.get("type") as string;

  if (!file || !artistId) {
    return NextResponse.json({ error: "Missing file or artistId" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const ext = file.name.split(".").pop() || "jpg";

  let path: string;
  if (type === "profile") {
    path = `${artistId}/profile.${ext}`;
  } else {
    const uuid = crypto.randomUUID();
    path = `${artistId}/photos/${uuid}.${ext}`;
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await supabase.storage.from("artists").upload(path, buffer, {
    contentType: file.type,
    upsert: type === "profile",
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const url = getStorageUrl(path);
  return NextResponse.json({ url });
}

export async function DELETE(request: NextRequest) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { path } = await request.json();
  const supabase = createAdminClient();

  const { error } = await supabase.storage.from("artists").remove([path]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
