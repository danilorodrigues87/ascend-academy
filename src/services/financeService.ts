import type { StudentFinanceSummary } from "@/types";
import { delay, http, USE_API } from "./http";

export const financeService = {
  async summary(): Promise<StudentFinanceSummary> {
    if (USE_API) {
      return http.get<StudentFinanceSummary>("/finance");
    }
    await delay(200);
    return { hasFinance: false, totals: { paid: 0, open: 0, overdue: 0 }, items: [] };
  },
};
