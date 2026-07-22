import { n as delay, r as http, t as USE_API } from "./http-BMUz0GfE.js";
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
var certificatesService = {
	async list() {
		if (USE_API) return http.get("/certificates");
		await delay(300);
		return structuredClone(mockCertificates);
	},
	async openHtml(id) {
		if (!USE_API) {
			window.open("about:blank", "_blank");
			return;
		}
		const html = await http.getHtml(`/certificates/${encodeURIComponent(id)}/html`);
		const blob = new Blob([html], { type: "text/html;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		if (!window.open(url, "_blank")) {
			URL.revokeObjectURL(url);
			throw new Error("Permita pop-ups para visualizar o certificado.");
		}
		setTimeout(() => URL.revokeObjectURL(url), 6e4);
	}
};
//#endregion
export { notificationsService as n, certificatesService as t };
