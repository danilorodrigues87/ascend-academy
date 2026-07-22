import { n as delay, r as http, t as USE_API } from "./http-B1eFK7Op.js";
import { t as mockAchievements } from "./data-ebpVXPb2.js";
import { n as cn, t as Button } from "./button-DRsC1qZi.js";
import { t as Skeleton } from "./skeleton-wE5XVTSu.js";
import { t as Progress } from "./progress-Crx1Tb8I.js";
import { t as EmptyState } from "./EmptyState-CuuisWFT.js";
import * as React from "react";
import { useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as Icons from "lucide-react";
import { Trophy, X } from "lucide-react";
//#region src/services/achievementsService.ts
var achievementsService = { async list() {
	if (USE_API) return http.get("/achievements");
	await delay(250);
	return structuredClone(mockAchievements);
} };
//#endregion
//#region src/components/ui/dialog.tsx
var Dialog = DialogPrimitive.Root;
var DialogPortal = DialogPrimitive.Portal;
var DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Overlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [/* @__PURE__ */ jsx(DialogOverlay, {}), /* @__PURE__ */ jsxs(DialogPrimitive.Content, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ jsxs(DialogPrimitive.Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ jsx(X, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Title, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
//#endregion
//#region src/routes/_app.achievements.tsx?tsr-split=component
var rarityLabel = {
	bronze: "Bronze",
	prata: "Prata",
	ouro: "Ouro",
	lendario: "Lendário"
};
function AchievementsPage() {
	const [filter, setFilter] = useState("all");
	const [rarity, setRarity] = useState("all");
	const [selected, setSelected] = useState(null);
	const { data = [], isLoading, isError, refetch } = useQuery({
		queryKey: ["achievements"],
		queryFn: () => achievementsService.list()
	});
	const filtered = useMemo(() => {
		return data.filter((a) => {
			const unlocked = !!a.unlockedAt;
			if (filter === "unlocked" && !unlocked) return false;
			if (filter === "locked" && unlocked) return false;
			if (rarity !== "all" && (a.rarity ?? "bronze") !== rarity) return false;
			return true;
		});
	}, [
		data,
		filter,
		rarity
	]);
	const unlockedCount = data.filter((a) => a.unlockedAt).length;
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-6xl space-y-6 p-4 md:p-8",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
					className: "font-display text-4xl font-semibold",
					children: "Conquistas"
				}), /* @__PURE__ */ jsxs("p", {
					className: "mt-1 text-muted-foreground",
					children: [
						unlockedCount,
						" de ",
						data.length,
						" medalhas conquistadas. Clique para ver como desbloquear."
					]
				})] }), /* @__PURE__ */ jsx(Trophy, { className: "h-8 w-8 text-primary" })]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap gap-2",
				children: [
					[
						["all", "Todas"],
						["unlocked", "Desbloqueadas"],
						["locked", "Bloqueadas"]
					].map(([k, label]) => /* @__PURE__ */ jsx(Button, {
						size: "sm",
						variant: filter === k ? "default" : "outline",
						onClick: () => setFilter(k),
						children: label
					}, k)),
					/* @__PURE__ */ jsx("span", { className: "mx-1 hidden h-8 w-px bg-border sm:inline-block" }),
					[
						["all", "Raridade"],
						["bronze", "Bronze"],
						["prata", "Prata"],
						["ouro", "Ouro"],
						["lendario", "Lendário"]
					].map(([k, label]) => /* @__PURE__ */ jsx(Button, {
						size: "sm",
						variant: rarity === k ? "default" : "outline",
						onClick: () => setRarity(k),
						children: label
					}, k))
				]
			}),
			isLoading ? /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
				children: Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ jsx(Skeleton, { className: "h-36 rounded-xl" }, i))
			}) : isError ? /* @__PURE__ */ jsx(EmptyState, {
				icon: Trophy,
				title: "Não foi possível carregar as conquistas",
				description: "Peça à escola para executar database/lms_conquistas.sql e lms_conquistas_v2.sql no painel.",
				onRetry: () => void refetch()
			}) : filtered.length === 0 ? /* @__PURE__ */ jsx(EmptyState, {
				icon: Trophy,
				title: "Nenhuma conquista neste filtro",
				description: "Tente outro filtro de status ou raridade."
			}) : /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
				children: filtered.map((a) => /* @__PURE__ */ jsx(AchievementTile, {
					achievement: a,
					onClick: () => setSelected(a)
				}, a.id))
			}),
			/* @__PURE__ */ jsx(AchievementModal, {
				achievement: selected,
				onClose: () => setSelected(null)
			})
		]
	});
}
function AchievementTile({ achievement: a, onClick }) {
	const unlocked = !!a.unlockedAt;
	const IconComp = Icons[a.icon] ?? Icons.Award;
	return /* @__PURE__ */ jsxs("button", {
		type: "button",
		onClick,
		className: cn("rounded-xl border p-3 text-left transition hover:border-primary/40", unlocked ? "border-primary/40 bg-primary/5" : "border-border/60 opacity-45 grayscale"),
		children: [
			/* @__PURE__ */ jsx("div", {
				className: cn("grid h-12 w-12 place-items-center rounded-xl", unlocked ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"),
				children: a.badgeUrl ? /* @__PURE__ */ jsx("img", {
					src: a.badgeUrl,
					alt: "",
					className: "h-10 w-10 object-contain"
				}) : /* @__PURE__ */ jsx(IconComp, { className: "h-6 w-6" })
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-2 truncate text-xs font-medium text-primary/80",
				children: a.subtitle || rarityLabel[a.rarity ?? "bronze"]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "truncate text-sm font-semibold",
				children: a.title
			}),
			!unlocked && a.progress != null && a.goal ? /* @__PURE__ */ jsx(Progress, {
				value: a.progress / a.goal * 100,
				className: "mt-2 h-1"
			}) : null
		]
	});
}
function AchievementModal({ achievement, onClose }) {
	const a = achievement;
	const IconComp = a ? Icons[a.icon] ?? Icons.Award : Icons.Award;
	const unlocked = !!a?.unlockedAt;
	const goal = Math.max(1, a?.goal ?? 1);
	const progress = a?.progress ?? 0;
	return /* @__PURE__ */ jsx(Dialog, {
		open: !!a,
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ jsx(DialogContent, {
			className: "sm:max-w-md",
			children: a && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs("div", {
				className: "mb-2 flex items-center gap-3",
				children: [/* @__PURE__ */ jsx("div", {
					className: cn("grid h-14 w-14 place-items-center rounded-2xl", unlocked ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"),
					children: a.badgeUrl ? /* @__PURE__ */ jsx("img", {
						src: a.badgeUrl,
						alt: "",
						className: "h-12 w-12 object-contain"
					}) : /* @__PURE__ */ jsx(IconComp, { className: "h-7 w-7" })
				}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "text-xs uppercase tracking-wider text-muted-foreground",
					children: a.subtitle || rarityLabel[a.rarity ?? "bronze"]
				}), /* @__PURE__ */ jsx(DialogTitle, { children: a.title })] })]
			}), /* @__PURE__ */ jsx(DialogDescription, { children: a.description })] }), /* @__PURE__ */ jsxs("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-1 flex justify-between text-xs text-muted-foreground",
						children: [/* @__PURE__ */ jsx("span", { children: "Progresso" }), /* @__PURE__ */ jsxs("span", { children: [
							Math.min(progress, goal),
							" / ",
							goal
						] })]
					}), /* @__PURE__ */ jsx(Progress, {
						value: Math.min(progress, goal) / goal * 100,
						className: "h-2"
					})] }),
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-lg border border-border/60 bg-muted/30 p-3",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
							children: "Como conquistar"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-1 text-sm",
							children: a.howTo || a.description
						})]
					}),
					unlocked ? /* @__PURE__ */ jsx("p", {
						className: "text-sm text-primary",
						children: "Medalha desbloqueada!"
					}) : null
				]
			})] })
		})
	});
}
//#endregion
export { AchievementsPage as component };
