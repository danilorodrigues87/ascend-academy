import type { Certificate, Notification } from "@/types";
import { delay, http, USE_API } from "./http";
import { mockCertificates, mockNotifications } from "./mocks/data";

export const notificationsService = {
  async list(): Promise<Notification[]> {
    // Ainda sem endpoint no painel — mock
    await delay(250);
    return structuredClone(mockNotifications);
  },
  async markAllRead(): Promise<void> {
    await delay(150);
    mockNotifications.forEach((n) => (n.read = true));
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
