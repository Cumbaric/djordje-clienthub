// Site-wide feature switches for the PUBLIC site (the private dashboard is not affected).
//
// BLOG_ENABLED = false  ->  "Blog" is removed from the header, mobile menu and footer, left out of
//                           sitemap.xml, and the blog pages are noindex. The routes and the
//                           dashboard blog editor stay untouched, so turning this back to `true`
//                           (once there are real articles) restores everything.
export const BLOG_ENABLED = false;

/** Keeps a nav link unless it points at the blog while the blog is switched off. */
export function isNavLinkVisible(link) {
  return BLOG_ENABLED || !/\/blog(\/|$)/.test(link.href);
}
