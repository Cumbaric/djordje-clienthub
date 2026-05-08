import { toSlug } from "@/lib/slug";
import styles from "./StatusBadge.module.css";

export default function StatusBadge({ status }) {
  const slug = toSlug(status);

  return (
    <span className={styles.badge} data-status={slug}>
      {status}
    </span>
  );
}
