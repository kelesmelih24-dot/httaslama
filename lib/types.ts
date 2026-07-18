export type Service = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  detail: string | null;
  tolerance_note: string | null;
  order_index: number;
  created_at: string;
};

export type Reference = {
  id: string;
  name: string;
  logo_url: string;
  order_index: number;
  created_at: string;
};

export type QuoteStatus = "yeni" | "iletisimde" | "tamamlandi" | "iptal";

export type Quote = {
  id: string;
  full_name: string;
  company_name: string | null;
  phone: string;
  email: string | null;
  service_type: string | null;
  material: string | null;
  quantity: number | null;
  delivery_date: string | null;
  file_url: string | null;
  description: string;
  status: QuoteStatus;
  created_at: string;
};

export type PreorderStatus = "yeni" | "onaylandi" | "uretimde" | "tamamlandi" | "iptal";

export type Preorder = {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  category: string;
  part_detail: string | null;
  material: string | null;
  quantity: number | null;
  preferred_date: string | null;
  status: PreorderStatus;
  created_at: string;
};

export type Comment = {
  id: string;
  name: string;
  message: string;
  rating: number;
  approved: boolean;
  created_at: string;
};

export type SiteSettings = {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hero_title: string;
  hero_subtitle: string;
  about_text: string;
};

export type GalleryCategory = "atolye" | "makine" | "tamamlanan" | "oncesi-sonrasi";

export type GalleryItem = {
  id: string;
  title: string;
  category: GalleryCategory;
  image_url: string;
  before_image_url: string | null;
  order_index: number;
  created_at: string;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  order_index: number;
  created_at: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
};

export type AboutSettings = {
  story: string;
  years_experience: number;
  mission: string;
  vision: string;
  quality_policy: string;
  safety_policy: string;
};

export type HoursSettings = {
  hafta_ici_cumartesi: string;
  pazar: string;
};
