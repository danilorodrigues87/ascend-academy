import { useSyncExternalStore } from "react";
import type { Notification } from "@/types";

export type NotificationPrefs = {
  /** Master: se false, nenhuma notificação aparece no portal. */
  enabled: boolean;
  /** Aulas / cursos liberados. */
  lessons: boolean;
  /** IA pedagógica. */
  ai: boolean;
  /** Certificados. */
  certificates: boolean;
};

const STORAGE_KEY = "ead.notifPrefs";
const EVENT = "ead-notif-prefs";

const DEFAULTS: NotificationPrefs = {
  enabled: true,
  lessons: true,
  ai: true,
  certificates: true,
};

function read(): NotificationPrefs {
  if (typeof window === "undefined") return { ...DEFAULTS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULTS };
    const parsed = JSON.parse(raw) as Partial<NotificationPrefs>;
    return {
      enabled: parsed.enabled !== false,
      lessons: parsed.lessons !== false,
      ai: parsed.ai !== false,
      certificates: parsed.certificates !== false,
    };
  } catch {
    return { ...DEFAULTS };
  }
}

let cache = read();

function emit() {
  cache = read();
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(EVENT));
  }
}

export function getNotificationPrefs(): NotificationPrefs {
  return { ...cache };
}

export function setNotificationPrefs(next: NotificationPrefs): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  emit();
}

export function patchNotificationPrefs(partial: Partial<NotificationPrefs>): NotificationPrefs {
  const next = { ...getNotificationPrefs(), ...partial };
  setNotificationPrefs(next);
  return next;
}

export function isNotificationTypeAllowed(
  type: Notification["type"],
  prefs: NotificationPrefs = getNotificationPrefs(),
): boolean {
  if (!prefs.enabled) return false;
  if (type === "lesson" || type === "course") return prefs.lessons;
  if (type === "ai") return prefs.ai;
  if (type === "certificate") return prefs.certificates;
  // conquistas / system: seguem o master
  return true;
}

export function filterNotificationsByPrefs(
  list: Notification[],
  prefs: NotificationPrefs = getNotificationPrefs(),
): Notification[] {
  return list.filter((n) => isNotificationTypeAllowed(n.type, prefs));
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === null) onStoreChange();
  };
  window.addEventListener(EVENT, onStoreChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  return cache;
}

function getServerSnapshot(): NotificationPrefs {
  return DEFAULTS;
}

/** Preferências reativas (localStorage). */
export function useNotificationPrefs(): [NotificationPrefs, (p: Partial<NotificationPrefs>) => void] {
  const prefs = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return [prefs, patchNotificationPrefs];
}
