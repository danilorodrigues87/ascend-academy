//#region src/utils/format.ts
function formatMinutes(minutes) {
	const h = Math.floor(minutes / 60);
	const m = minutes % 60;
	if (h === 0) return `${m}min`;
	if (m === 0) return `${h}h`;
	return `${h}h ${m}min`;
}
function formatDate(iso, opts = {
	day: "2-digit",
	month: "short",
	year: "numeric"
}) {
	return new Date(iso).toLocaleDateString("pt-BR", opts);
}
function relativeTime(iso) {
	const diff = Date.now() - new Date(iso).getTime();
	const min = Math.floor(diff / 6e4);
	if (min < 1) return "agora";
	if (min < 60) return `há ${min}min`;
	const hr = Math.floor(min / 60);
	if (hr < 24) return `há ${hr}h`;
	return `há ${Math.floor(hr / 24)}d`;
}
function initials(name) {
	return name.split(" ").filter(Boolean).slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}
//#endregion
export { relativeTime as i, formatMinutes as n, initials as r, formatDate as t };
