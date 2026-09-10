import { Check, Hourglass } from "lucide-react";

import styles from "./ProjectStatusFlag.module.css";

type ProjectStatusFlagProps = {
  status: "construction" | "completed";
  premiumAccent?: boolean;
  goldBody?: boolean;
};

const labels: Record<ProjectStatusFlagProps["status"], string> = {
  construction: "EM CONSTRUÇÃO",
  completed: "OBRA CONCLUÍDA",
};

export function ProjectStatusFlag({
  status,
  premiumAccent = false,
  goldBody = false,
}: ProjectStatusFlagProps) {
  return (
    <span
      className={`${styles.flag} ${premiumAccent ? styles.premiumAccent : ""} ${goldBody ? styles.goldBody : ""}`}
      aria-label={`Status do empreendimento: ${labels[status]}`}
    >
      {status === "completed" ? (
        <Check className={styles.check} aria-hidden="true" />
      ) : goldBody ? (
        <Hourglass className={styles.hourglass} aria-hidden="true" />
      ) : (
        <span className={styles.dot} aria-hidden="true" />
      )}
      <span className={styles.label}>{labels[status]}</span>
    </span>
  );
}
