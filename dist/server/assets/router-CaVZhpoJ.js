import { t as ThemeProvider } from "./ThemeContext-QMQ0j3Uz.js";
import { t as authService } from "./authService-kzsr7Ii9.js";
import { t as AuthProvider } from "./AuthContext-CznbIjur.js";
import { t as Route$20 } from "./_app.roleplay._simulationId-Be7OAShR.js";
import { t as coursesService } from "./coursesService-By3p87WC.js";
import { n as resolveContinueLesson } from "./continueLesson-VGpi5kJW.js";
import { t as Route$21 } from "./_app.courses._courseId.lessons._lessonId-CNykViHL.js";
import { useEffect } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, redirect, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
//#region src/components/ui/sonner.tsx
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ jsx(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
//#endregion
//#region src/styles.css?url
var styles_default = "/assets/styles-Uxmhz1-2.css";
//#endregion
//#region src/lib/lovable-error-reporting.ts
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-7xl font-display font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-4 text-xl font-semibold",
					children: "Página não encontrada"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "A página que você procura não existe ou foi movida."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90",
						children: "Ir para o início"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	useEffect(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-xl font-semibold tracking-tight",
					children: "Algo deu errado"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Tente novamente ou volte ao início."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90",
						children: "Tentar novamente"
					}), /* @__PURE__ */ jsx("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent",
						children: "Início"
					})]
				})
			]
		})
	});
}
var Route$19 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "CTI Educacional — Portal do Aluno" },
			{
				name: "description",
				content: "Portal do Aluno da CTI Educacional. Estude com uma experiência moderna e intuitiva."
			},
			{
				property: "og:title",
				content: "CTI Educacional — Portal do Aluno"
			},
			{
				property: "og:description",
				content: "Cursos online, atividades, assistente IA e ranking da sua escola."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/brand/cti-logo.png",
				type: "image/png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700;800&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "pt-BR",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$19.useRouteContext();
	return /* @__PURE__ */ jsx(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsxs(AuthProvider, { children: [/* @__PURE__ */ jsx(Outlet, {}), /* @__PURE__ */ jsx(Toaster$1, {
			position: "top-right",
			richColors: true
		})] }) })
	});
}
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$18 = () => import("./routes-DTEZEvkE.js");
var Route$18 = createFileRoute("/")({
	beforeLoad: () => {
		if (typeof window === "undefined") return;
		if (authService.getSession()) throw redirect({ to: "/dashboard" });
		throw redirect({ to: "/login" });
	},
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
//#endregion
//#region src/routes/_app.tsx
var $$splitComponentImporter$17 = () => import("./_app-C7nHUrmo.js");
var Route$17 = createFileRoute("/_app")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
//#endregion
//#region src/routes/first-access.tsx
var $$splitComponentImporter$16 = () => import("./first-access-CwZ62azK.js");
var Route$16 = createFileRoute("/first-access")({
	component: lazyRouteComponent($$splitComponentImporter$16, "component"),
	head: () => ({ meta: [{ title: "Primeiro acesso — Aurora" }] })
});
//#endregion
//#region src/routes/forgot-password.tsx
var $$splitComponentImporter$15 = () => import("./forgot-password-BJOPVSvd.js");
var Route$15 = createFileRoute("/forgot-password")({
	component: lazyRouteComponent($$splitComponentImporter$15, "component"),
	head: () => ({ meta: [{ title: "Recuperar senha — Aurora" }] })
});
//#endregion
//#region src/routes/login.tsx
var $$splitComponentImporter$14 = () => import("./login-DJG-eX-E.js");
var Route$14 = createFileRoute("/login")({
	component: lazyRouteComponent($$splitComponentImporter$14, "component"),
	head: () => ({ meta: [{ title: "Entrar — Aurora Portal do Aluno" }, {
		name: "description",
		content: "Acesse sua conta na plataforma Aurora EAD."
	}] })
});
//#endregion
//#region src/routes/_app.ai.tsx
var $$splitComponentImporter$13 = () => import("./_app.ai-CpojeF0y.js");
var Route$13 = createFileRoute("/_app/ai")({
	component: lazyRouteComponent($$splitComponentImporter$13, "component"),
	head: () => ({ meta: [{ title: "IA Pedagógica — Aurora" }] })
});
//#endregion
//#region src/routes/_app.assessments.tsx
var $$splitComponentImporter$12 = () => import("./_app.assessments-BOy4Zam3.js");
var Route$12 = createFileRoute("/_app/assessments")({
	component: lazyRouteComponent($$splitComponentImporter$12, "component"),
	head: () => ({ meta: [{ title: "Avaliações — Aurora" }] })
});
//#endregion
//#region src/routes/_app.certificates.tsx
var $$splitComponentImporter$11 = () => import("./_app.certificates-BsvmbQs9.js");
var Route$11 = createFileRoute("/_app/certificates")({
	component: lazyRouteComponent($$splitComponentImporter$11, "component"),
	head: () => ({ meta: [{ title: "Certificados — Aurora" }] })
});
//#endregion
//#region src/routes/_app.continue.tsx
var $$splitComponentImporter$10 = () => import("./_app.continue-oE6UeaZE.js");
var Route$10 = createFileRoute("/_app/continue")({
	component: lazyRouteComponent($$splitComponentImporter$10, "component"),
	head: () => ({ meta: [{ title: "Continuar estudando — CTI Educacional" }] })
});
//#endregion
//#region src/routes/_app.courses.tsx
var $$splitComponentImporter$9 = () => import("./_app.courses-BcClfPW3.js");
/** Layout pai de /courses — lista fica no index; aulas nos filhos. */
var Route$9 = createFileRoute("/_app/courses")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
//#endregion
//#region src/routes/_app.dashboard.tsx
var $$splitComponentImporter$8 = () => import("./_app.dashboard-B-0lfR2d.js");
var Route$8 = createFileRoute("/_app/dashboard")({
	component: lazyRouteComponent($$splitComponentImporter$8, "component"),
	head: () => ({ meta: [{ title: "Dashboard — Aurora" }] })
});
//#endregion
//#region src/routes/_app.notifications.tsx
var $$splitComponentImporter$7 = () => import("./_app.notifications-BWdfGa0k.js");
var Route$7 = createFileRoute("/_app/notifications")({
	component: lazyRouteComponent($$splitComponentImporter$7, "component"),
	head: () => ({ meta: [{ title: "Notificações — Aurora" }] })
});
//#endregion
//#region src/routes/_app.profile.tsx
var $$splitComponentImporter$6 = () => import("./_app.profile-qkNfhb18.js");
var Route$6 = createFileRoute("/_app/profile")({
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	head: () => ({ meta: [{ title: "Perfil — Aurora" }] })
});
//#endregion
//#region src/routes/_app.ranking.tsx
var $$splitComponentImporter$5 = () => import("./_app.ranking-DGcHkM4B.js");
var Route$5 = createFileRoute("/_app/ranking")({
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	head: () => ({ meta: [{ title: "Ranking — CTI Educacional" }] })
});
//#endregion
//#region src/routes/_app.roleplay.tsx
var $$splitComponentImporter$4 = () => import("./_app.roleplay-hnjujBB5.js");
var Route$4 = createFileRoute("/_app/roleplay")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => ({ meta: [{ title: "Simulações Práticas — Aurora" }] })
});
//#endregion
//#region src/routes/_app.settings.tsx
var $$splitComponentImporter$3 = () => import("./_app.settings-BWqAeS2W.js");
var Route$3 = createFileRoute("/_app/settings")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => ({ meta: [{ title: "Configurações — Aurora" }] })
});
//#endregion
//#region src/routes/_app.courses.index.tsx
var $$splitComponentImporter$2 = () => import("./_app.courses.index-BN-RlLBn.js");
var Route$2 = createFileRoute("/_app/courses/")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: () => ({ meta: [{ title: "Meus Cursos — CTI Educacional" }] })
});
//#endregion
//#region src/routes/_app.courses.$courseId.tsx
var $$splitComponentImporter$1 = () => import("./_app.courses._courseId-Bv90pUsv.js");
/** Layout pai das aulas — só Outlet (redirect fica no index). */
var Route$1 = createFileRoute("/_app/courses/$courseId")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: () => ({ meta: [{ title: "Curso — CTI Educacional" }] })
});
//#endregion
//#region src/routes/_app.courses.$courseId.index.tsx
var $$splitComponentImporter = () => import("./_app.courses._courseId.index-D23FcVb-.js");
/** /courses/:id → abre a 1ª aula (ou lastAccessed). */
var Route = createFileRoute("/_app/courses/$courseId/")({
	beforeLoad: async ({ params }) => {
		const course = await coursesService.getById(params.courseId);
		if (!course) throw redirect({ to: "/courses" });
		const lesson = resolveContinueLesson(course);
		if (!lesson) throw redirect({ to: "/courses" });
		throw redirect({
			to: "/courses/$courseId/lessons/$lessonId",
			params: {
				courseId: course.id,
				lessonId: lesson.id
			},
			search: { panel: "content" }
		});
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
//#region src/routeTree.gen.ts
var IndexRoute = Route$18.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$19
});
var AppRoute = Route$17.update({
	id: "/_app",
	getParentRoute: () => Route$19
});
var FirstAccessRoute = Route$16.update({
	id: "/first-access",
	path: "/first-access",
	getParentRoute: () => Route$19
});
var ForgotPasswordRoute = Route$15.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => Route$19
});
var LoginRoute = Route$14.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$19
});
var AppAiRoute = Route$13.update({
	id: "/ai",
	path: "/ai",
	getParentRoute: () => AppRoute
});
var AppAssessmentsRoute = Route$12.update({
	id: "/assessments",
	path: "/assessments",
	getParentRoute: () => AppRoute
});
var AppCertificatesRoute = Route$11.update({
	id: "/certificates",
	path: "/certificates",
	getParentRoute: () => AppRoute
});
var AppContinueRoute = Route$10.update({
	id: "/continue",
	path: "/continue",
	getParentRoute: () => AppRoute
});
var AppCoursesRoute = Route$9.update({
	id: "/courses",
	path: "/courses",
	getParentRoute: () => AppRoute
});
var AppDashboardRoute = Route$8.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AppRoute
});
var AppNotificationsRoute = Route$7.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => AppRoute
});
var AppProfileRoute = Route$6.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => AppRoute
});
var AppRankingRoute = Route$5.update({
	id: "/ranking",
	path: "/ranking",
	getParentRoute: () => AppRoute
});
var AppRoleplayRoute = Route$4.update({
	id: "/roleplay",
	path: "/roleplay",
	getParentRoute: () => AppRoute
});
var AppSettingsRoute = Route$3.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AppRoute
});
var AppCoursesIndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppCoursesRoute
});
var AppCoursesCourseIdRoute = Route$1.update({
	id: "/$courseId",
	path: "/$courseId",
	getParentRoute: () => AppCoursesRoute
});
var AppRoleplaySimulationIdRoute = Route$20.update({
	id: "/$simulationId",
	path: "/$simulationId",
	getParentRoute: () => AppRoleplayRoute
});
var AppCoursesCourseIdRouteChildren = {
	AppCoursesCourseIdIndexRoute: Route.update({
		id: "/",
		path: "/",
		getParentRoute: () => AppCoursesCourseIdRoute
	}),
	AppCoursesCourseIdLessonsLessonIdRoute: Route$21.update({
		id: "/lessons/$lessonId",
		path: "/lessons/$lessonId",
		getParentRoute: () => AppCoursesCourseIdRoute
	})
};
var AppCoursesRouteChildren = {
	AppCoursesCourseIdRoute: AppCoursesCourseIdRoute._addFileChildren(AppCoursesCourseIdRouteChildren),
	AppCoursesIndexRoute
};
var AppCoursesRouteWithChildren = AppCoursesRoute._addFileChildren(AppCoursesRouteChildren);
var AppRoleplayRouteChildren = { AppRoleplaySimulationIdRoute };
var AppRouteChildren = {
	AppAiRoute,
	AppAssessmentsRoute,
	AppCertificatesRoute,
	AppContinueRoute,
	AppCoursesRoute: AppCoursesRouteWithChildren,
	AppDashboardRoute,
	AppNotificationsRoute,
	AppProfileRoute,
	AppRankingRoute,
	AppRoleplayRoute: AppRoleplayRoute._addFileChildren(AppRoleplayRouteChildren),
	AppSettingsRoute
};
var rootRouteChildren = {
	IndexRoute,
	AppRoute: AppRoute._addFileChildren(AppRouteChildren),
	FirstAccessRoute,
	ForgotPasswordRoute,
	LoginRoute
};
var routeTree = Route$19._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
