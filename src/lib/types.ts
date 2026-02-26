export interface ArtistRow {
  id: string;
  name_ko: string;
  name_en: string;
  birth_date: string;
  height: string;
  weight: string;
  specialty: string;
  profile_image: string;
  photos: string[];
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface FilmographyRow {
  id: number;
  artist_id: string;
  year: string;
  category: string;
  title: string;
  role: string;
  sort_order: number;
  created_at: string;
}

export interface NoticeRow {
  id: number;
  title: string;
  date: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface SiteSettingRow {
  key: string;
  value: Record<string, unknown>;
  updated_at: string;
}

export interface CompanyInfo {
  name: string;
  nameKo: string;
  ceo: string;
  address: string;
  addressDetail: string;
  phone: string;
  email: string;
  businessNumber: string;
  description: string;
}

export interface AuditionInfo {
  online: {
    title: string;
    description: string;
    email: string;
    requirements: string[];
  };
  offline: {
    title: string;
    description: string;
    note: string;
  };
}

export interface HeroVideo {
  type: "youtube" | "local";
  url: string;
  fallbackText: string;
}
