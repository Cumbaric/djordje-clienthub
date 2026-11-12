// Internal-linking map between services and projects (slugs are the EN service slugs
// from src/data/services.js and the project slugs from src/data/projects.js).

// Service page -> related projects (shown as "Related projects" on the service page).
export const SERVICE_PROJECTS = {
  "html-css-js": ["iron-pulse", "pnr-scout"],
  "react-nextjs": ["djordje-clienthub", "ben-akiba-dashboard", "lumera-wellness"],
  "seo-optimization": ["wellness-concept", "olivera-popovic-edu", "mirko-topalovic-tips"],
  "wordpress-website-development": ["musical-duo-studio", "lektura-i-prevod", "wellness-concept"],
  "ecommerce-store": ["boommil", "lumera-wellness", "lektura-i-prevod"],
  "website-maintenance": ["wellness-concept", "musical-duo-studio", "olivera-popovic-edu"],
};

// Project page -> the one service its CTA points to.
export const PROJECT_SERVICE = {
  "musical-duo-studio": "wordpress-website-development",
  "wellness-concept": "seo-optimization",
  "lektura-i-prevod": "wordpress-website-development",
  "olivera-popovic-edu": "seo-optimization",
  "boommil": "ecommerce-store",
  "mirko-topalovic-tips": "seo-optimization",
  "djordje-clienthub": "react-nextjs",
  "ben-akiba-dashboard": "react-nextjs",
  "iron-pulse": "html-css-js",
  "luma-dental": "react-nextjs",
  "lumera-wellness": "react-nextjs",
  "pnr-scout": "html-css-js",
};
