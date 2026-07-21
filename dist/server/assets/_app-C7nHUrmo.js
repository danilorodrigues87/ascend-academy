import { n as useTheme } from "./ThemeContext-QMQ0j3Uz.js";
import { n as useAuth } from "./AuthContext-CznbIjur.js";
import { n as notificationsService } from "./notificationsService-Bk97yLrW.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { t as Button } from "./button-Bq5vK6RO.js";
import { t as Skeleton } from "./skeleton-D9W9wFsj.js";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-gunzrkKA.js";
import { r as initials } from "./format-BkgF6Xya.js";
import { t as Badge } from "./badge-D1Dupn2y.js";
import { t as Input } from "./input-B8Q2ztVi.js";
import { t as Logo } from "./Logo-2ZONwr81.js";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { Award, Bell, BookOpen, LayoutDashboard, LogOut, Moon, PanelLeft, PlayCircle, Search, Settings, Sun, Trophy, User, X } from "lucide-react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
//#region src/hooks/use-mobile.tsx
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
	const [isMobile, setIsMobile] = React.useState(void 0);
	React.useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener("change", onChange);
	}, []);
	return !!isMobile;
}
//#endregion
//#region src/components/ui/separator.tsx
var Separator = React.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(SeparatorPrimitive.Root, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
	...props
}));
Separator.displayName = SeparatorPrimitive.Root.displayName;
//#endregion
//#region src/components/ui/sheet.tsx
var Sheet = SheetPrimitive.Root;
var SheetPortal = SheetPrimitive.Portal;
var SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SheetPrimitive.Overlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [/* @__PURE__ */ jsx(SheetOverlay, {}), /* @__PURE__ */ jsxs(SheetPrimitive.Content, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ jsxs(SheetPrimitive.Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ jsx(X, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = SheetPrimitive.Content.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SheetPrimitive.Title, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
var SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SheetPrimitive.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = SheetPrimitive.Description.displayName;
//#endregion
//#region src/components/ui/tooltip.tsx
var TooltipProvider = TooltipPrimitive.Provider;
var Tooltip = TooltipPrimitive.Root;
var TooltipTrigger = TooltipPrimitive.Trigger;
var TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsx(TooltipPrimitive.Content, {
	ref,
	sideOffset,
	className: cn("z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin)", className),
	...props
}) }));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
//#endregion
//#region src/components/ui/sidebar.tsx
var SIDEBAR_COOKIE_NAME = "sidebar_state";
var SIDEBAR_COOKIE_MAX_AGE = 3600 * 24 * 7;
var SIDEBAR_WIDTH = "16rem";
var SIDEBAR_WIDTH_MOBILE = "18rem";
var SIDEBAR_WIDTH_ICON = "3rem";
var SIDEBAR_KEYBOARD_SHORTCUT = "b";
var SidebarContext = React.createContext(null);
function useSidebar() {
	const context = React.useContext(SidebarContext);
	if (!context) throw new Error("useSidebar must be used within a SidebarProvider.");
	return context;
}
var SidebarProvider = React.forwardRef(({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }, ref) => {
	const isMobile = useIsMobile();
	const [openMobile, setOpenMobile] = React.useState(false);
	const [_open, _setOpen] = React.useState(defaultOpen);
	const open = openProp ?? _open;
	const setOpen = React.useCallback((value) => {
		const openState = typeof value === "function" ? value(open) : value;
		if (setOpenProp) setOpenProp(openState);
		else _setOpen(openState);
		document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
	}, [setOpenProp, open]);
	const toggleSidebar = React.useCallback(() => {
		return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
	}, [
		isMobile,
		setOpen,
		setOpenMobile
	]);
	React.useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				toggleSidebar();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [toggleSidebar]);
	const state = open ? "expanded" : "collapsed";
	const contextValue = React.useMemo(() => ({
		state,
		open,
		setOpen,
		isMobile,
		openMobile,
		setOpenMobile,
		toggleSidebar
	}), [
		state,
		open,
		setOpen,
		isMobile,
		openMobile,
		setOpenMobile,
		toggleSidebar
	]);
	return /* @__PURE__ */ jsx(SidebarContext.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ jsx(TooltipProvider, {
			delayDuration: 0,
			children: /* @__PURE__ */ jsx("div", {
				style: {
					"--sidebar-width": SIDEBAR_WIDTH,
					"--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
					...style
				},
				className: cn("group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar", className),
				ref,
				...props,
				children
			})
		})
	});
});
SidebarProvider.displayName = "SidebarProvider";
var Sidebar = React.forwardRef(({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }, ref) => {
	const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
	if (collapsible === "none") return /* @__PURE__ */ jsx("div", {
		className: cn("flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground", className),
		ref,
		...props,
		children
	});
	if (isMobile) return /* @__PURE__ */ jsx(Sheet, {
		open: openMobile,
		onOpenChange: setOpenMobile,
		...props,
		children: /* @__PURE__ */ jsxs(SheetContent, {
			"data-sidebar": "sidebar",
			"data-mobile": "true",
			className: "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
			style: { "--sidebar-width": SIDEBAR_WIDTH_MOBILE },
			side,
			children: [/* @__PURE__ */ jsxs(SheetHeader, {
				className: "sr-only",
				children: [/* @__PURE__ */ jsx(SheetTitle, { children: "Sidebar" }), /* @__PURE__ */ jsx(SheetDescription, { children: "Displays the mobile sidebar." })]
			}), /* @__PURE__ */ jsx("div", {
				className: "flex h-full w-full flex-col",
				children
			})]
		})
	});
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: "group peer hidden text-sidebar-foreground md:block",
		"data-state": state,
		"data-collapsible": state === "collapsed" ? collapsible : "",
		"data-variant": variant,
		"data-side": side,
		children: [/* @__PURE__ */ jsx("div", { className: cn("relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)") }), /* @__PURE__ */ jsx("div", {
			className: cn("fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex", side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]", variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l", className),
			...props,
			children: /* @__PURE__ */ jsx("div", {
				"data-sidebar": "sidebar",
				className: "flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow",
				children
			})
		})]
	});
});
Sidebar.displayName = "Sidebar";
var SidebarTrigger = React.forwardRef(({ className, onClick, ...props }, ref) => {
	const { toggleSidebar } = useSidebar();
	return /* @__PURE__ */ jsxs(Button, {
		ref,
		"data-sidebar": "trigger",
		variant: "ghost",
		size: "icon",
		className: cn("h-7 w-7", className),
		onClick: (event) => {
			onClick?.(event);
			toggleSidebar();
		},
		...props,
		children: [/* @__PURE__ */ jsx(PanelLeft, {}), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Toggle Sidebar"
		})]
	});
});
SidebarTrigger.displayName = "SidebarTrigger";
var SidebarRail = React.forwardRef(({ className, ...props }, ref) => {
	const { toggleSidebar } = useSidebar();
	return /* @__PURE__ */ jsx("button", {
		ref,
		"data-sidebar": "rail",
		"aria-label": "Toggle Sidebar",
		tabIndex: -1,
		onClick: toggleSidebar,
		title: "Toggle Sidebar",
		className: cn("absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex", "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize", "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize", "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar", "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2", "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2", className),
		...props
	});
});
SidebarRail.displayName = "SidebarRail";
var SidebarInset = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("main", {
		ref,
		className: cn("relative flex w-full flex-1 flex-col bg-background", "md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow", className),
		...props
	});
});
SidebarInset.displayName = "SidebarInset";
var SidebarInput = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx(Input, {
		ref,
		"data-sidebar": "input",
		className: cn("h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring", className),
		...props
	});
});
SidebarInput.displayName = "SidebarInput";
var SidebarHeader = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("div", {
		ref,
		"data-sidebar": "header",
		className: cn("flex flex-col gap-2 p-2", className),
		...props
	});
});
SidebarHeader.displayName = "SidebarHeader";
var SidebarFooter = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("div", {
		ref,
		"data-sidebar": "footer",
		className: cn("flex flex-col gap-2 p-2", className),
		...props
	});
});
SidebarFooter.displayName = "SidebarFooter";
var SidebarSeparator = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx(Separator, {
		ref,
		"data-sidebar": "separator",
		className: cn("mx-2 w-auto bg-sidebar-border", className),
		...props
	});
});
SidebarSeparator.displayName = "SidebarSeparator";
var SidebarContent = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("div", {
		ref,
		"data-sidebar": "content",
		className: cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className),
		...props
	});
});
SidebarContent.displayName = "SidebarContent";
var SidebarGroup = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("div", {
		ref,
		"data-sidebar": "group",
		className: cn("relative flex w-full min-w-0 flex-col p-2", className),
		...props
	});
});
SidebarGroup.displayName = "SidebarGroup";
var SidebarGroupLabel = React.forwardRef(({ className, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ jsx(asChild ? Slot : "div", {
		ref,
		"data-sidebar": "group-label",
		className: cn("flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0", className),
		...props
	});
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";
var SidebarGroupAction = React.forwardRef(({ className, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ jsx(asChild ? Slot : "button", {
		ref,
		"data-sidebar": "group-action",
		className: cn("absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "after:absolute after:-inset-2 after:md:hidden", "group-data-[collapsible=icon]:hidden", className),
		...props
	});
});
SidebarGroupAction.displayName = "SidebarGroupAction";
var SidebarGroupContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	"data-sidebar": "group-content",
	className: cn("w-full text-sm", className),
	...props
}));
SidebarGroupContent.displayName = "SidebarGroupContent";
var SidebarMenu = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("ul", {
	ref,
	"data-sidebar": "menu",
	className: cn("flex w-full min-w-0 flex-col gap-1", className),
	...props
}));
SidebarMenu.displayName = "SidebarMenu";
var SidebarMenuItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("li", {
	ref,
	"data-sidebar": "menu-item",
	className: cn("group/menu-item relative", className),
	...props
}));
SidebarMenuItem.displayName = "SidebarMenuItem";
var sidebarMenuButtonVariants = cva("peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring cursor-pointer transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0", {
	variants: {
		variant: {
			default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
			outline: "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]"
		},
		size: {
			default: "h-8 text-sm",
			sm: "h-7 text-xs",
			lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var SidebarMenuButton = React.forwardRef(({ asChild = false, isActive = false, variant = "default", size = "default", tooltip, className, ...props }, ref) => {
	const Comp = asChild ? Slot : "button";
	const { isMobile, state } = useSidebar();
	const button = /* @__PURE__ */ jsx(Comp, {
		ref,
		"data-sidebar": "menu-button",
		"data-size": size,
		"data-active": isActive,
		className: cn(sidebarMenuButtonVariants({
			variant,
			size
		}), className),
		...props
	});
	if (!tooltip) return button;
	if (typeof tooltip === "string") tooltip = { children: tooltip };
	return /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
		asChild: true,
		children: button
	}), /* @__PURE__ */ jsx(TooltipContent, {
		side: "right",
		align: "center",
		hidden: state !== "collapsed" || isMobile,
		...tooltip
	})] });
});
SidebarMenuButton.displayName = "SidebarMenuButton";
var SidebarMenuAction = React.forwardRef(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
	return /* @__PURE__ */ jsx(asChild ? Slot : "button", {
		ref,
		"data-sidebar": "menu-action",
		className: cn("absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0", "after:absolute after:-inset-2 after:md:hidden", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0", className),
		...props
	});
});
SidebarMenuAction.displayName = "SidebarMenuAction";
var SidebarMenuBadge = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	"data-sidebar": "menu-badge",
	className: cn("pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground", "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", className),
	...props
}));
SidebarMenuBadge.displayName = "SidebarMenuBadge";
var SidebarMenuSkeleton = React.forwardRef(({ className, showIcon = false, ...props }, ref) => {
	const width = React.useMemo(() => {
		return `${Math.floor(Math.random() * 40) + 50}%`;
	}, []);
	return /* @__PURE__ */ jsxs("div", {
		ref,
		"data-sidebar": "menu-skeleton",
		className: cn("flex h-8 items-center gap-2 rounded-md px-2", className),
		...props,
		children: [showIcon && /* @__PURE__ */ jsx(Skeleton, {
			className: "size-4 rounded-md",
			"data-sidebar": "menu-skeleton-icon"
		}), /* @__PURE__ */ jsx(Skeleton, {
			className: "h-4 max-w-(--skeleton-width) flex-1",
			"data-sidebar": "menu-skeleton-text",
			style: { "--skeleton-width": width }
		})]
	});
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";
var SidebarMenuSub = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("ul", {
	ref,
	"data-sidebar": "menu-sub",
	className: cn("mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5", "group-data-[collapsible=icon]:hidden", className),
	...props
}));
SidebarMenuSub.displayName = "SidebarMenuSub";
var SidebarMenuSubItem = React.forwardRef(({ ...props }, ref) => /* @__PURE__ */ jsx("li", {
	ref,
	...props
}));
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";
var SidebarMenuSubButton = React.forwardRef(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
	return /* @__PURE__ */ jsx(asChild ? Slot : "a", {
		ref,
		"data-sidebar": "menu-sub-button",
		"data-size": size,
		"data-active": isActive,
		className: cn("flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground", "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground", size === "sm" && "text-xs", size === "md" && "text-sm", "group-data-[collapsible=icon]:hidden", className),
		...props
	});
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";
//#endregion
//#region src/components/layout/AppSidebar.tsx
var nav = [
	{
		title: "Dashboard",
		url: "/dashboard",
		icon: LayoutDashboard
	},
	{
		title: "Meus Cursos",
		url: "/courses",
		icon: BookOpen
	},
	{
		title: "Continuar estudando",
		url: "/continue",
		icon: PlayCircle
	},
	{
		title: "Ranking da escola",
		url: "/ranking",
		icon: Trophy
	},
	{
		title: "Certificados",
		url: "/certificates",
		icon: Award
	}
];
var account = [{
	title: "Perfil",
	url: "/profile",
	icon: User
}, {
	title: "Configurações",
	url: "/settings",
	icon: Settings
}];
function AppSidebar() {
	const { state } = useSidebar();
	const collapsed = state === "collapsed";
	const pathname = useRouterState({ select: (r) => r.location.pathname });
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const isActive = (url) => pathname === url || pathname.startsWith(url + "/");
	return /* @__PURE__ */ jsxs(Sidebar, {
		collapsible: "icon",
		className: "border-r border-sidebar-border",
		children: [
			/* @__PURE__ */ jsx(SidebarHeader, {
				className: "px-3 py-4",
				children: /* @__PURE__ */ jsx(Logo, { collapsed })
			}),
			/* @__PURE__ */ jsxs(SidebarContent, { children: [/* @__PURE__ */ jsxs(SidebarGroup, { children: [/* @__PURE__ */ jsx(SidebarGroupLabel, { children: "Aprendizado" }), /* @__PURE__ */ jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsx(SidebarMenu, { children: nav.map((item) => /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsx(SidebarMenuButton, {
				asChild: true,
				isActive: isActive(item.url),
				tooltip: item.title,
				children: /* @__PURE__ */ jsxs(Link, {
					to: item.url,
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ jsx(item.icon, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", { children: item.title })]
				})
			}) }, item.url)) }) })] }), /* @__PURE__ */ jsxs(SidebarGroup, { children: [/* @__PURE__ */ jsx(SidebarGroupLabel, { children: "Conta" }), /* @__PURE__ */ jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsx(SidebarMenu, { children: account.map((item) => /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsx(SidebarMenuButton, {
				asChild: true,
				isActive: isActive(item.url),
				tooltip: item.title,
				children: /* @__PURE__ */ jsxs(Link, {
					to: item.url,
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ jsx(item.icon, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", { children: item.title })]
				})
			}) }, item.url)) }) })] })] }),
			/* @__PURE__ */ jsx(SidebarFooter, {
				className: "border-t border-sidebar-border p-3",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ jsxs(Avatar, {
							className: "h-9 w-9 border border-sidebar-border",
							children: [/* @__PURE__ */ jsx(AvatarImage, {
								src: user?.avatarUrl,
								alt: user?.name
							}), /* @__PURE__ */ jsx(AvatarFallback, { children: user ? initials(user.name) : "AA" })]
						}),
						!collapsed && /* @__PURE__ */ jsxs("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ jsx("p", {
								className: "truncate text-sm font-medium",
								children: user?.name
							}), /* @__PURE__ */ jsxs("p", {
								className: "truncate text-xs text-muted-foreground",
								children: ["Nível ", user?.level ?? 1]
							})]
						}),
						!collapsed && /* @__PURE__ */ jsx("button", {
							onClick: async () => {
								await logout();
								navigate({ to: "/login" });
							},
							className: "rounded-md p-2 text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
							"aria-label": "Sair",
							children: /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" })
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/components/common/ThemeToggle.tsx
function ThemeToggle() {
	const { theme, toggle } = useTheme();
	return /* @__PURE__ */ jsx(Button, {
		variant: "ghost",
		size: "icon",
		onClick: toggle,
		"aria-label": "Alternar tema",
		children: theme === "dark" ? /* @__PURE__ */ jsx(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Moon, { className: "h-4 w-4" })
	});
}
//#endregion
//#region src/components/layout/Topbar.tsx
function Topbar({ unread = 0 }) {
	return /* @__PURE__ */ jsxs("header", {
		className: "sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/60 bg-background/70 px-3 backdrop-blur-xl md:px-6",
		children: [
			/* @__PURE__ */ jsx(SidebarTrigger, {}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative hidden max-w-md flex-1 md:block",
				children: [/* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
					placeholder: "Buscar cursos, aulas, professores...",
					className: "h-10 pl-9"
				})]
			}),
			/* @__PURE__ */ jsx("div", { className: "flex-1 md:hidden" }),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-1",
				children: [/* @__PURE__ */ jsx(ThemeToggle, {}), /* @__PURE__ */ jsx(Button, {
					asChild: true,
					variant: "ghost",
					size: "icon",
					className: "relative",
					"aria-label": "Notificações",
					children: /* @__PURE__ */ jsxs(Link, {
						to: "/notifications",
						children: [/* @__PURE__ */ jsx(Bell, { className: "h-4 w-4" }), unread > 0 && /* @__PURE__ */ jsx(Badge, {
							className: "absolute -right-0.5 -top-0.5 h-4 min-w-4 rounded-full px-1 text-[10px]",
							children: unread
						})]
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/routes/_app.tsx?tsr-split=component
function AppLayout() {
	const { isAuthenticated, loading } = useAuth();
	const navigate = useNavigate();
	const [clientReady, setClientReady] = useState(false);
	useEffect(() => {
		setClientReady(true);
	}, []);
	useEffect(() => {
		if (clientReady && !loading && !isAuthenticated) navigate({ to: "/login" });
	}, [
		clientReady,
		isAuthenticated,
		loading,
		navigate
	]);
	const { data: notifications = [] } = useQuery({
		queryKey: ["notifications"],
		queryFn: () => notificationsService.list(),
		enabled: clientReady && isAuthenticated
	});
	const unread = notifications.filter((n) => !n.read).length;
	if (!clientReady || loading || !isAuthenticated) return /* @__PURE__ */ jsx("div", {
		className: "grid min-h-screen place-items-center bg-background",
		children: /* @__PURE__ */ jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" })
	});
	return /* @__PURE__ */ jsx(SidebarProvider, { children: /* @__PURE__ */ jsxs("div", {
		className: "flex min-h-screen w-full",
		children: [/* @__PURE__ */ jsx(AppSidebar, {}), /* @__PURE__ */ jsxs(SidebarInset, {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ jsx(Topbar, { unread }), /* @__PURE__ */ jsx("main", {
				className: "flex-1",
				children: /* @__PURE__ */ jsx(Outlet, {})
			})]
		})]
	}) });
}
//#endregion
export { AppLayout as component };
