import { n as delay, r as http, t as USE_API } from "./http-s7fgt_qd.mjs";
import { o as mockNotifications, r as mockCertificates } from "./data-gIza-OcL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notificationsService-W8l6LgJg.js
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
