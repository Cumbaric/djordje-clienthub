// Test stub for next/navigation (the sidebar only needs the current path and a router).
export function usePathname() {
  return "/dashboard/email";
}
export function useRouter() {
  return { push() {}, replace() {}, refresh() {} };
}
