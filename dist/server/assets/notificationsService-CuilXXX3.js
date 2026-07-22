import { n as delay, r as http, t as USE_API } from "./http-B1eFK7Op.js";
import { o as mockNotifications, r as mockCertificates } from "./data-ebpVXPb2.js";
//#region src/services/notificationsService.ts
var notificationsService = {
	async list() {
		if (USE_API) return http.get("/notifications");
		await delay(250);
		return structuredClone(mockNotifications);
	},
	async markAllRead() {
		if (USE_API) {
			await http.post("/notifications/mark-all-read", {});
			return;
		}
		await delay(150);
		mockNotifications.forEach((n) => n.read = true);
	},
	async markRead(id) {
		if (USE_API) {
			await http.post(`/notifications/${encodeURIComponent(id)}/read`, {});
			return;
		}
		await delay(100);
		const n = mockNotifications.find((x) => x.id === id);
		if (n) n.read = true;
	}
};
var certificatesService = { async list() {
	if (USE_API) return http.get("/certificates");
	await delay(300);
	return structuredClone(mockCertificates);
} };
//#endregion
export { notificationsService as n, certificatesService as t };
