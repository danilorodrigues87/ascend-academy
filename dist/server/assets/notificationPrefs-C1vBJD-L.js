import { useSyncExternalStore } from "react";
//#region src/utils/notificationPrefs.ts
var STORAGE_KEY = "ead.notifPrefs";
var EVENT = "ead-notif-prefs";
var DEFAULTS = {
	enabled: true,
	lessons: true,
	ai: true,
	certificates: true
};
function read() {
	if (typeof window === "undefined") return { ...DEFAULTS };
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return { ...DEFAULTS };
		const parsed = JSON.parse(raw);
		return {
			enabled: parsed.enabled !== false,
			lessons: parsed.lessons !== false,
			ai: parsed.ai !== false,
			certificates: parsed.certificates !== false
		};
	} catch {
		return { ...DEFAULTS };
	}
}
var cache = read();
function emit() {
	cache = read();
	if (typeof window !== "undefined") window.dispatchEvent(new Event(EVENT));
}
function getNotificationPrefs() {
	return { ...cache };
}
function setNotificationPrefs(next) {
	if (typeof window === "undefined") return;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
	emit();
}
function patchNotificationPrefs(partial) {
	const next = {
		...getNotificationPrefs(),
		...partial
	};
	setNotificationPrefs(next);
	return next;
}
function isNotificationTypeAllowed(type, prefs = getNotificationPrefs()) {
	if (!prefs.enabled) return false;
	if (type === "lesson" || type === "course") return prefs.lessons;
	if (type === "ai") return prefs.ai;
	if (type === "certificate") return prefs.certificates;
	return true;
}
function filterNotificationsByPrefs(list, prefs = getNotificationPrefs()) {
	return list.filter((n) => isNotificationTypeAllowed(n.type, prefs));
}
function subscribe(onStoreChange) {
	if (typeof window === "undefined") return () => {};
	const onStorage = (e) => {
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
function getServerSnapshot() {
	return DEFAULTS;
}
/** Preferências reativas (localStorage). */
function useNotificationPrefs() {
	return [useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot), patchNotificationPrefs];
}
//#endregion
export { useNotificationPrefs as n, filterNotificationsByPrefs as t };
