//#region node_modules/.nitro/vite/services/ssr/assets/continueLesson-VGpi5kJW.js
/** Resolve aula para Continuar / Começar (mesmo com 0% de progresso). */
function resolveContinueLesson(course) {
	const flat = course.modules.flatMap((m) => m.lessons);
	if (!flat.length) return null;
	if (course.lastAccessedLessonId) {
		const found = flat.find((l) => l.id === course.lastAccessedLessonId);
		if (found) return found;
	}
	return flat.find((l) => !l.completed) ?? flat[0] ?? null;
}
function continueLabel(course) {
	return course.progressPercent > 0 ? "Continuar" : "Começar";
}
//#endregion
export { resolveContinueLesson as n, continueLabel as t };
