const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

// جلب جميع المقالات من API
export async function getAllPosts() {
  try {
    const res = await fetch(`${API_URL}/posts`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("خطأ في جلب المقالات:", res.status);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data.posts) ? data.posts : [];
  } catch (error) {
    console.error("خطأ في جلب المقالات:", error);
    return [];
  }
}

// جلب مقالة واحدة عن طريق الـ slug
export async function getPostBySlug(slug) {
  try {
    const res = await fetch(`${API_URL}/posts`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    const posts = Array.isArray(data.posts) ? data.posts : [];
    return posts.find((post) => post.slug === slug) || null;
  } catch (error) {
    console.error("خطأ في جلب المقالة:", error);
    return null;
  }
}

// جلب المقالات حسب التصنيف
export async function getPostsByCategory(category) {
  try {
    const posts = await getAllPosts();
    return posts.filter((post) => post.category === category);
  } catch (error) {
    console.error("خطأ في جلب المقالات حسب التصنيف:", error);
    return [];
  }
}

// جلب جميع التصنيفات
export async function getAllCategories() {
  try {
    const posts = await getAllPosts();
    return [...new Set(posts.map((post) => post.category).filter(Boolean))];
  } catch (error) {
    console.error("خطأ في جلب التصنيفات:", error);
    return [];
  }
}
