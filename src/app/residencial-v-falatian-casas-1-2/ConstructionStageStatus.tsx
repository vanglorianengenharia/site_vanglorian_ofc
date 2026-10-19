import { Check, Clock3, Minus } from "lucide-react";
import styles from "./construction.module.css";

type ConstructionStageStatusProps = {
  progress: number;
};

type ConstructionStageItemProps = ConstructionStageStatusProps & {
  index: number;
  stage: string;
};

function ConstructionStageStatus({ progress }: ConstructionStageStatusProps) {
  const isCompleted = progress === 100;
  const isInProgress = progress > 0 && progress < 100;
  const Icon = isCompleted ? Check : isInProgress ? Clock3 : Minus;
  const statusClassName = isCompleted
    ? styles.completedStageStatus
    : isInProgress
      ? styles.activeStageStatus
      : styles.pendingStageStatus;
  const statusLabel = isCompleted
    ? "Etapa concluída"
    : isInProgress
      ? "Etapa em andamento"
      : "Etapa não iniciada";

  return (
    <span className={`${styles.stageStatus} ${statusClassName}`} role="img" aria-label={statusLabel}>
      <Icon aria-hidden="true" />
    </span>
  );
}

export function ConstructionStageItem({ index, progress, stage }: ConstructionStageItemProps) {
  const isCompleted = progress === 100;
  const isInProgress = progress > 0 && progress < 100;

  return (
    <li>
      <span className={`${styles.stageNumber} ${
        isCompleted
          ? styles.completedStageNumber
          : isInProgress
            ? styles.halfStageNumber
            : ""
      }`}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <h3>{stage}</h3>
        <p className={
          isCompleted
            ? styles.completedProgress
            : isInProgress
              ? styles.halfProgress
              : undefined
        }>
          {progress}% concluído
        </p>
      </div>
      <ConstructionStageStatus progress={progress} />
    </li>
  );
}
