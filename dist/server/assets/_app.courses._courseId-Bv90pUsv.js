import { Outlet } from "@tanstack/react-router";
import { jsx } from "react/jsx-runtime";
//#region src/routes/_app.courses.$courseId.tsx?tsr-split=component
/** Layout pai das aulas — só Outlet (redirect fica no index). */
var SplitComponent = () => /* @__PURE__ */ jsx(Outlet, {});
//#endregion
export { SplitComponent as component };
