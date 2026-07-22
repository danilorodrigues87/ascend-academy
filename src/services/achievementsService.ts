import type { Achievement } from "@/types";
import { delay, http, USE_API } from "./http";
import { mockAchievements } from "./mocks/data";

export const achievementsService = {
  async list(): Promise<Achievement[]> {
    if (USE_API) {
      return http.get<Achievement[]>("/achievements");
    }
    await delay(250);
    return structuredClone(mockAchievements);
  },
};
