export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  category: string;
  section: string;
  created_at: string;
  is_featured: boolean;
  is_editor_pick: boolean;
  trending_rank: number | null;
  author_name: string | null;
}
