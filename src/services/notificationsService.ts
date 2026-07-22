import type { Certificate, Notification } from "@/types";
import { delay, http, USE_API } from "./http";
import { mockCertificates, mockNotifications } from "./mocks/data";

export const notificationsService = {
  async list(): Promise<Notification[]> {
    if (USE_API) {
      return http.get<Notification[]>("/notifications");
    }
    await delay(250);
    return structuredClone(mockNotifications);
  },
  async markAllRead(): Promise<void> {
    if (USE_API) {
      await http.post<{ ok: true }>("/notifications/mark-all-read", {});
      return;
    }
    await delay(150);
    mockNotifications.forEach((n) => (n.read = true));
  },
  async markRead(id: string): Promise<void> {
    if (USE_API) {
      await http.post<{ ok: true }>(`/notifications/${encodeURIComponent(id)}/read`, {});
      return;
    }
    await delay(100);
    const n = mockNotifications.find((x) => x.id === id);
    if (n) n.read = true;
  },
};

export const certificatesService = {
  async list(): Promise<Certificate[]> {
    if (USE_API) {
      return http.get<Certificate[]>("/certificates");
    }
    await delay(300);
    return structuredClone(mockCertificates);
  },
};
