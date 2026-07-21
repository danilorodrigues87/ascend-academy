import { Outlet } from "@tanstack/react-router";
import { jsx } from "react/jsx-runtime";
//#region src/routes/_app.courses.tsx?tsr-split=component
/** Layout pai de /courses — lista fica no index; aulas nos filhos. */
var SplitComponent = () => /* @__PURE__ */ jsx(Outlet, {});
//#endregion
export { SplitComponent as component };
