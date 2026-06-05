import type { ReactNode } from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { clsx } from "clsx";
import styles from "./Banner.module.css";
import type { BannerVariant } from "../types";

const ICONS: Record<BannerVariant, ReactNode> = {
  success: <CheckCircle size={48} />,
  error: <XCircle size={48} />,
  info: <Clock size={48} />,
};

export function Banner({
  title,
  message,
  variant = "info",
}: {
  title: string;
  message: string;
  variant?: BannerVariant;
}) {
  return (
    <div className={clsx(styles.banner, styles[variant])}>
      <span className={styles.icon}>{ICONS[variant]}</span>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
