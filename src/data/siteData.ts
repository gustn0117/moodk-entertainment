// =============================================
// MOOD K ENTERTAINMENT - 사이트 데이터
// 이 파일을 수정하여 사이트 콘텐츠를 관리하세요
// =============================================

export interface Artist {
  id: string;
  nameKo: string;
  nameEn: string;
  birthDate: string;
  height: string;
  weight: string;
  specialty: string;
  profileImage: string;
  photos: string[];
  filmography: {
    year: string;
    category: string;
    title: string;
    role: string;
  }[];
}

export interface Notice {
  id: number;
  title: string;
  date: string;
  content: string;
}

// =============================================
// 아티스트 데이터
// =============================================
export const artists: Artist[] = [
  {
    id: "yeo-do-jun",
    nameKo: "여도준",
    nameEn: "YEO DO JUN",
    birthDate: "2001.06.19",
    height: "180cm",
    weight: "67kg",
    specialty: "연기, 운동",
    profileImage: "/artists/yeo-do-jun/profile.jpg",
    photos: [
      "/artists/yeo-do-jun/photo1.jpg",
      "/artists/yeo-do-jun/photo2.jpg",
      "/artists/yeo-do-jun/photo3.jpg",
      "/artists/yeo-do-jun/photo4.jpg",
    ],
    filmography: [
      {
        year: "2025",
        category: "드라마",
        title: "웹드라마 '청춘의 기록'",
        role: "주연 (이준혁 역)",
      },
      {
        year: "2024",
        category: "영화",
        title: "단편영화 '그해 여름'",
        role: "주연 (민수 역)",
      },
      {
        year: "2024",
        category: "광고",
        title: "스포츠 브랜드 CF",
        role: "모델",
      },
    ],
  },
];

// =============================================
// 공지사항 데이터
// =============================================
export const notices: Notice[] = [
  {
    id: 1,
    title: "MOOD K ENTERTAINMENT 공식 홈페이지 오픈",
    date: "2026.02.26",
    content:
      "안녕하세요, 무드케이엔터테인먼트 공식 홈페이지가 오픈되었습니다. 많은 관심 부탁드립니다.",
  },
  {
    id: 2,
    title: "배우 여도준 프로필 공개",
    date: "2026.02.26",
    content: "소속 배우 여도준의 공식 프로필이 공개되었습니다.",
  },
  {
    id: 3,
    title: "2026 상반기 오디션 안내",
    date: "2026.02.20",
    content:
      "2026년 상반기 공개 오디션을 진행합니다. 자세한 내용은 오디션 섹션을 확인해주세요.",
  },
];

// =============================================
// 회사 정보
// =============================================
export const companyInfo = {
  name: "MOOD K ENTERTAINMENT",
  nameKo: "무드케이엔터테인먼트",
  ceo: "대표",
  address: "서울특별시 강남구",
  addressDetail: "(상세 주소 추후 업데이트)",
  phone: "010-0000-0000",
  email: "moodkent@gmail.com",
  businessNumber: "000-00-00000",
  description:
    "MOOD K ENTERTAINMENT는 배우의 가능성을 발굴하고, 진정성 있는 연기로 감동을 전하는 매니지먼트 회사입니다. 한 사람 한 사람의 개성과 이야기를 존중하며, 함께 성장하는 파트너가 되겠습니다.",
};

// =============================================
// 오디션 정보
// =============================================
export const auditionInfo = {
  online: {
    title: "온라인 오디션",
    description:
      "이메일로 프로필과 자기소개 영상을 보내주세요. 서류 심사 후 개별 연락드립니다.",
    email: "moodkent@gmail.com",
    requirements: [
      "이름 / 나이 / 연락처",
      "정면·측면 사진 각 1장",
      "1분 이내 자기소개 영상",
      "연기 경력 (있을 경우)",
    ],
  },
  offline: {
    title: "오프라인 오디션",
    description:
      "정기 오디션은 분기별로 진행되며, 일정은 공지사항을 통해 안내됩니다.",
    note: "※ 별도의 오디션 비용은 받지 않습니다.",
  },
};

// =============================================
// 히어로 영상 URL (YouTube embed 또는 로컬 영상 경로)
// =============================================
export const heroVideo = {
  // YouTube embed URL 사용 시:
  type: "youtube" as const,
  url: "",
  // 로컬 영상 사용 시 type을 "local"로 변경하고 url에 파일 경로 입력
  // type: "local" as const,
  // url: "/videos/hero.mp4",
  fallbackText:
    "MOOD K ENTERTAINMENT",
};
