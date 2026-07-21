import { n as delay, r as http, t as USE_API } from "./http-Bt_p2tgp.js";
import { o as mockNotifications, r as mockCertificates } from "./data-gIza-OcL.js";
//#region src/services/notificationsService.ts
var notificationsService = {
	async list() {
		await delay(250);
		return structuredClone(mockNotifications);
	},
	async markAllRead() {
		await delay(150);
		mockNotifications.forEach((n) => n.read = true);
	}
};
var certificatesService = { async list() {
	if (USE_API) return http.get("/certificates");
	await delay(300);
	return structuredClone(mockCertificates);
} };
//#endregion
export { notificationsService as n, certificatesService as t };
