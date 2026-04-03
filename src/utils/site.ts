/** Normalized base URL: '' for root, '/prefix' for subpath (no trailing slash). */
export const siteBase =
  (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "";
