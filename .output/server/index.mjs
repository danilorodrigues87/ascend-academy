globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-07-18T14:51:08.842Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/brand/cti-logo.png": {
		"type": "image/png",
		"etag": "\"7c9b-g4l7dnFia3A7GpxRGzhR7R72Uao\"",
		"mtime": "2026-07-20T17:08:06.685Z",
		"size": 31899,
		"path": "../public/brand/cti-logo.png"
	},
	"/assets/assessmentsService-CBprbRBl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"618-UpuT1Cn94eAeRSR/bHgH4aOl0ns\"",
		"mtime": "2026-07-21T15:03:24.925Z",
		"size": 1560,
		"path": "../public/assets/assessmentsService-CBprbRBl.js"
	},
	"/assets/authService-2GS7sK0o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"48e-MAecYp6Ekgdy1Ug7ls4kwOgBbYc\"",
		"mtime": "2026-07-21T15:03:24.925Z",
		"size": 1166,
		"path": "../public/assets/authService-2GS7sK0o.js"
	},
	"/assets/arrow-left-u84zHv43.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-LNX9AhSBjkvz5M9nHKv5HNcwMOo\"",
		"mtime": "2026-07-21T15:03:24.923Z",
		"size": 165,
		"path": "../public/assets/arrow-left-u84zHv43.js"
	},
	"/assets/aiService-DR5_lw1l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3e9-39en7/ZGvCIOh7JvZBScIpGqgl0\"",
		"mtime": "2026-07-21T15:03:24.923Z",
		"size": 1001,
		"path": "../public/assets/aiService-DR5_lw1l.js"
	},
	"/assets/arrow-right-BjrPdcli.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-4WM0mRZf9DjqSihPdX+94WaTMYE\"",
		"mtime": "2026-07-21T15:03:24.925Z",
		"size": 165,
		"path": "../public/assets/arrow-right-BjrPdcli.js"
	},
	"/assets/avatar-CO_6mDS1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a43-eLXOVgq9thHiBvKi9J2s9bF0Ijo\"",
		"mtime": "2026-07-21T15:03:24.925Z",
		"size": 2627,
		"path": "../public/assets/avatar-CO_6mDS1.js"
	},
	"/assets/badge-BNwHM-jk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"326-YoCv9DiKufh+2mmGsvDA0J0/O9U\"",
		"mtime": "2026-07-21T15:03:24.925Z",
		"size": 806,
		"path": "../public/assets/badge-BNwHM-jk.js"
	},
	"/assets/book-open-IR3ZFn6B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"117-n7Fdzy+Oeorq7t4A6+DRvs0JSSI\"",
		"mtime": "2026-07-21T15:03:24.925Z",
		"size": 279,
		"path": "../public/assets/book-open-IR3ZFn6B.js"
	},
	"/assets/award-MSbGY8dP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"112-nJ61LkfbmpxFIkWd/VuZaoAd5YI\"",
		"mtime": "2026-07-21T15:03:24.925Z",
		"size": 274,
		"path": "../public/assets/award-MSbGY8dP.js"
	},
	"/assets/button-Do8LGpD6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"764-bO1+pJsiK2QqDk1XzLRVKxskL1I\"",
		"mtime": "2026-07-21T15:03:24.925Z",
		"size": 1892,
		"path": "../public/assets/button-Do8LGpD6.js"
	},
	"/assets/bell-C6K6qnh8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-9spzXczGmob0SD9u5V/XJu4DcK8\"",
		"mtime": "2026-07-21T15:03:24.925Z",
		"size": 290,
		"path": "../public/assets/bell-C6K6qnh8.js"
	},
	"/assets/circle-DSMw184M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82-RMarGmlhtWGr2+jbrURJg1DCTfQ\"",
		"mtime": "2026-07-21T15:03:24.925Z",
		"size": 130,
		"path": "../public/assets/circle-DSMw184M.js"
	},
	"/assets/circle-play-Ccf7zCv2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-EJsIvSMDOITodt4CUTkj01QYMCI\"",
		"mtime": "2026-07-21T15:03:24.925Z",
		"size": 256,
		"path": "../public/assets/circle-play-Ccf7zCv2.js"
	},
	"/assets/card-DC_aq5HO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"407-eYnW57ry8mYZzNmEKNGmAf/oHZ4\"",
		"mtime": "2026-07-21T15:03:24.925Z",
		"size": 1031,
		"path": "../public/assets/card-DC_aq5HO.js"
	},
	"/assets/clock-BoRxUZtc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-vT1hVK2ANwogv3pn+Bp+gpFHXIk\"",
		"mtime": "2026-07-21T15:03:24.935Z",
		"size": 169,
		"path": "../public/assets/clock-BoRxUZtc.js"
	},
	"/assets/circle-check-BjRRRODm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-Rv7y9Jamqj5IlIpn3a/4WU0Xdcw\"",
		"mtime": "2026-07-21T15:03:24.925Z",
		"size": 178,
		"path": "../public/assets/circle-check-BjRRRODm.js"
	},
	"/assets/dist-B-1vYawf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"255-vRgmjOTlhg3qWAeX18uHPjweKzg\"",
		"mtime": "2026-07-21T15:03:24.937Z",
		"size": 597,
		"path": "../public/assets/dist-B-1vYawf.js"
	},
	"/assets/data-Bz8D1pSc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2959-xh1zit8z/srfHlnlTXntYe4MYSk\"",
		"mtime": "2026-07-21T15:03:24.936Z",
		"size": 10585,
		"path": "../public/assets/data-Bz8D1pSc.js"
	},
	"/assets/createLucideIcon-DRtK7t0W.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b2-rltlbBrxxZIbZPjljzkg1KWeyXw\"",
		"mtime": "2026-07-21T15:03:24.935Z",
		"size": 1202,
		"path": "../public/assets/createLucideIcon-DRtK7t0W.js"
	},
	"/assets/dist-B5rmyWsl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b47-UiqybWRkc6XnXlYBSs3pfnvkNGk\"",
		"mtime": "2026-07-21T15:03:24.937Z",
		"size": 2887,
		"path": "../public/assets/dist-B5rmyWsl.js"
	},
	"/assets/dist-BgS0QiwW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14e3-r+KqpvqvD7HOeHJS8y9yyfuAjXg\"",
		"mtime": "2026-07-21T15:03:24.940Z",
		"size": 5347,
		"path": "../public/assets/dist-BgS0QiwW.js"
	},
	"/assets/CourseCard-D-JsaTF0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1254-7yBBScRHPeMtWiNZ62nfXgLfkag\"",
		"mtime": "2026-07-21T15:03:24.907Z",
		"size": 4692,
		"path": "../public/assets/CourseCard-D-JsaTF0.js"
	},
	"/assets/dist-BJg6M8Rx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9fb-0JskhO0vf1WeI6hg///H2gBvtkY\"",
		"mtime": "2026-07-21T15:03:24.940Z",
		"size": 2555,
		"path": "../public/assets/dist-BJg6M8Rx.js"
	},
	"/assets/dist-ClUV1eFf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"83-iqf0XomyfuNFRrs+vfvITN6p5qM\"",
		"mtime": "2026-07-21T15:03:24.940Z",
		"size": 131,
		"path": "../public/assets/dist-ClUV1eFf.js"
	},
	"/assets/dist-ByCQDXdM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c7-huLqMUFZ6OTRFHv3ZPLNNbAG8vk\"",
		"mtime": "2026-07-21T15:03:24.940Z",
		"size": 199,
		"path": "../public/assets/dist-ByCQDXdM.js"
	},
	"/assets/dist-DVLgA-9k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22e-nf3Gld5ydUonh76G3b9NkCHI8F0\"",
		"mtime": "2026-07-21T15:03:24.944Z",
		"size": 558,
		"path": "../public/assets/dist-DVLgA-9k.js"
	},
	"/assets/dist-zCcKVltv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"436-VQmp/2rmm+8Trxqd8H4MmHkriKQ\"",
		"mtime": "2026-07-21T15:03:24.944Z",
		"size": 1078,
		"path": "../public/assets/dist-zCcKVltv.js"
	},
	"/assets/download-GUmCpNPL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e8-bdEWgzlv5tiXCMRy8RTIlnxqYWA\"",
		"mtime": "2026-07-21T15:03:24.944Z",
		"size": 232,
		"path": "../public/assets/download-GUmCpNPL.js"
	},
	"/assets/eye-Dj4bgWxK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-VjYI4pQEZmCICFAA9lVC02gLEhA\"",
		"mtime": "2026-07-21T15:03:24.944Z",
		"size": 256,
		"path": "../public/assets/eye-Dj4bgWxK.js"
	},
	"/assets/eye-off-jA0f44Tf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ae-azbtQsGven488uMZO4Q2RQ1IGLU\"",
		"mtime": "2026-07-21T15:03:24.944Z",
		"size": 430,
		"path": "../public/assets/eye-off-jA0f44Tf.js"
	},
	"/assets/first-access-DH-HgR90.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae3-O8rduNe7LFqNUGkgea/yAfTuGzQ\"",
		"mtime": "2026-07-21T15:03:24.944Z",
		"size": 2787,
		"path": "../public/assets/first-access-DH-HgR90.js"
	},
	"/assets/forgot-password-Cx6xrnwm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9e5-7Rfs2m4ybhAWcf1sqefMPThjJKQ\"",
		"mtime": "2026-07-21T15:03:24.953Z",
		"size": 2533,
		"path": "../public/assets/forgot-password-Cx6xrnwm.js"
	},
	"/assets/format-CH5P-Hnr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20e-dZ/RxqXhE7K5fh6I1bZxIz9gly8\"",
		"mtime": "2026-07-21T15:03:24.953Z",
		"size": 526,
		"path": "../public/assets/format-CH5P-Hnr.js"
	},
	"/assets/http-DqkXlqCz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"378-fx9GxSl/S7sZqK0xzIZ0mEVa1Dk\"",
		"mtime": "2026-07-21T15:03:24.955Z",
		"size": 888,
		"path": "../public/assets/http-DqkXlqCz.js"
	},
	"/assets/info-BALk29Dt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14a-InGvICeu/y9RGMXqgN4ZiGVDTqY\"",
		"mtime": "2026-07-21T15:03:24.956Z",
		"size": 330,
		"path": "../public/assets/info-BALk29Dt.js"
	},
	"/assets/input-BM11SITx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26d-sR80bzV6NdD/f2wMyBi9ewrJzcs\"",
		"mtime": "2026-07-21T15:03:24.959Z",
		"size": 621,
		"path": "../public/assets/input-BM11SITx.js"
	},
	"/assets/jsx-runtime-n5LQ9ujS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2157-x+FjD3p74bnIvIhkIVLOQLFM4M0\"",
		"mtime": "2026-07-21T15:03:24.962Z",
		"size": 8535,
		"path": "../public/assets/jsx-runtime-n5LQ9ujS.js"
	},
	"/assets/index-DF3arDBI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"461a2-7AxYmQYfkVISbRp/xxLuB4HpO2E\"",
		"mtime": "2026-07-21T15:03:24.905Z",
		"size": 287138,
		"path": "../public/assets/index-DF3arDBI.js"
	},
	"/assets/label-DJLHIf-Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2cf-u6upqK2mACPDLDOs+Tb4SkJVUak\"",
		"mtime": "2026-07-21T15:03:24.962Z",
		"size": 719,
		"path": "../public/assets/label-DJLHIf-Q.js"
	},
	"/assets/link-DxNlzXeP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1123-gVkRU5AbbuI2acilXKT/Ls2ffQo\"",
		"mtime": "2026-07-21T15:03:24.962Z",
		"size": 4387,
		"path": "../public/assets/link-DxNlzXeP.js"
	},
	"/assets/list-checks-Cv9wuQki.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"117-DzI/NEQzzcxmSDdrt+r4o0kdcd4\"",
		"mtime": "2026-07-21T15:03:24.962Z",
		"size": 279,
		"path": "../public/assets/list-checks-Cv9wuQki.js"
	},
	"/assets/login-ChEpPiPg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14ce-sZaI8bS1CSE//c56zM1f7kXt5RI\"",
		"mtime": "2026-07-21T15:03:24.965Z",
		"size": 5326,
		"path": "../public/assets/login-ChEpPiPg.js"
	},
	"/assets/Logo-Cs5tnSAk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"259-ZAaip1P4Dgbk/yYzsIWyav/X7VY\"",
		"mtime": "2026-07-21T15:03:24.907Z",
		"size": 601,
		"path": "../public/assets/Logo-Cs5tnSAk.js"
	},
	"/assets/mail-check-Bxih5lwW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11c-E+yMvx0mUFXfWFtXnV3dHUQddwE\"",
		"mtime": "2026-07-21T15:03:24.965Z",
		"size": 284,
		"path": "../public/assets/mail-check-Bxih5lwW.js"
	},
	"/assets/Match-Cwr3sq-e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"be07-hJdUbEJ57PmCG39f3AiXV0fRKvs\"",
		"mtime": "2026-07-21T15:03:24.907Z",
		"size": 48647,
		"path": "../public/assets/Match-Cwr3sq-e.js"
	},
	"/assets/matchContext-CUR3OA_k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29c-+C9ZNYZ9SnNPezs4YqiKEYmfvCw\"",
		"mtime": "2026-07-21T15:03:24.965Z",
		"size": 668,
		"path": "../public/assets/matchContext-CUR3OA_k.js"
	},
	"/assets/message-square-CaKgxlGo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-6WWEp99+mhbnCRnB85fwjIlZWrQ\"",
		"mtime": "2026-07-21T15:03:24.968Z",
		"size": 233,
		"path": "../public/assets/message-square-CaKgxlGo.js"
	},
	"/assets/notificationsService-DLoIEK2W.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"144-Yo/I6Tto0eZzwQBkMZVNf7lkYW0\"",
		"mtime": "2026-07-21T15:03:24.971Z",
		"size": 324,
		"path": "../public/assets/notificationsService-DLoIEK2W.js"
	},
	"/assets/progress--zpMnkAE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f0-25J+xIZfJ2RO2ikDpAtWM4X9xpg\"",
		"mtime": "2026-07-21T15:03:24.972Z",
		"size": 2288,
		"path": "../public/assets/progress--zpMnkAE.js"
	},
	"/assets/preload-helper-B31KGKxK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14ac-DrYsXPQnOd0JH+kOT/iwYuMNIvE\"",
		"mtime": "2026-07-21T15:03:24.971Z",
		"size": 5292,
		"path": "../public/assets/preload-helper-B31KGKxK.js"
	},
	"/assets/QueryClientProvider-DwN2x3cj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3b99-iMpTOP9Qg39uNl79cdRze6G6kaU\"",
		"mtime": "2026-07-21T15:03:24.907Z",
		"size": 15257,
		"path": "../public/assets/QueryClientProvider-DwN2x3cj.js"
	},
	"/assets/react-dom-CQmWuZA8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dda-+IRX1VEQ+614FViNS2l9Mg3wio8\"",
		"mtime": "2026-07-21T15:03:24.974Z",
		"size": 3546,
		"path": "../public/assets/react-dom-CQmWuZA8.js"
	},
	"/assets/refresh-cw-DjgBKo-Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-UrBI1DPw1zzY9xoCGZnsUzpc440\"",
		"mtime": "2026-07-21T15:03:24.974Z",
		"size": 321,
		"path": "../public/assets/refresh-cw-DjgBKo-Y.js"
	},
	"/assets/rolePlayService-Bqya9DQl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fc9-fih9ib0IEeZi1YELjxOsAbt4m38\"",
		"mtime": "2026-07-21T15:03:24.974Z",
		"size": 8137,
		"path": "../public/assets/rolePlayService-Bqya9DQl.js"
	},
	"/assets/routes-DJ7LAi8J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26-SoFMfAHVJ5oqB5t+mpFRoQvFIoc\"",
		"mtime": "2026-07-21T15:03:24.974Z",
		"size": 38,
		"path": "../public/assets/routes-DJ7LAi8J.js"
	},
	"/assets/search-BnXs40GX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-f2IiAWBLc6pKZnDpPFuRqsgWaXE\"",
		"mtime": "2026-07-21T15:03:24.986Z",
		"size": 174,
		"path": "../public/assets/search-BnXs40GX.js"
	},
	"/assets/send-P5hs4gcH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-LfNqfod1YbZvHF9vVIpqyiRbcCE\"",
		"mtime": "2026-07-21T15:03:24.987Z",
		"size": 290,
		"path": "../public/assets/send-P5hs4gcH.js"
	},
	"/assets/skeleton-C6lPrc1u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"df-2xOKo4ebYMlRKGe+bwC4RxWN3ig\"",
		"mtime": "2026-07-21T15:03:24.993Z",
		"size": 223,
		"path": "../public/assets/skeleton-C6lPrc1u.js"
	},
	"/assets/sparkles-BgxWFEV8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-WaO2JjEE3hXfbkdqkF3GKQvoOEI\"",
		"mtime": "2026-07-21T15:03:24.994Z",
		"size": 494,
		"path": "../public/assets/sparkles-BgxWFEV8.js"
	},
	"/assets/square-CUuzA6TN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"780-3XsOZ+upMvIIX7JSf2PeN4Ti6bw\"",
		"mtime": "2026-07-21T15:03:24.994Z",
		"size": 1920,
		"path": "../public/assets/square-CUuzA6TN.js"
	},
	"/assets/styles-Uxmhz1-2.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1a20a-qLEJ6w6qXKVjnTUq1+l0NtYZz58\"",
		"mtime": "2026-07-21T15:03:25.014Z",
		"size": 107018,
		"path": "../public/assets/styles-Uxmhz1-2.css"
	},
	"/assets/tabs-Ckel4buA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e20-+ar+kZ3JJxSglQB9Pw86rBmmOco\"",
		"mtime": "2026-07-21T15:03:24.994Z",
		"size": 3616,
		"path": "../public/assets/tabs-Ckel4buA.js"
	},
	"/assets/target-Bk3lkpTn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e2-W7AkZXx77A1N0vI5Rz5jDwkoSRg\"",
		"mtime": "2026-07-21T15:03:24.994Z",
		"size": 226,
		"path": "../public/assets/target-Bk3lkpTn.js"
	},
	"/assets/textarea-BDZiZbsj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"207-sUY/Wmj4ZUGyVvZvUyMY0ZDk9kc\"",
		"mtime": "2026-07-21T15:03:24.994Z",
		"size": 519,
		"path": "../public/assets/textarea-BDZiZbsj.js"
	},
	"/assets/timer-reset-BCbQYBQP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c9-GvySONnJuZPqvrmri6tkQFtO5eQ\"",
		"mtime": "2026-07-21T15:03:25.003Z",
		"size": 1225,
		"path": "../public/assets/timer-reset-BCbQYBQP.js"
	},
	"/assets/trophy-B3IkAFdC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1dc-pVud6PA+dJPXxJAFlddlKQNSevo\"",
		"mtime": "2026-07-21T15:03:25.005Z",
		"size": 476,
		"path": "../public/assets/trophy-B3IkAFdC.js"
	},
	"/assets/useMatch-BOqw31_B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26d-/T4ZfGBSHOLvEVfqHtgdyaojb9o\"",
		"mtime": "2026-07-21T15:03:25.006Z",
		"size": 621,
		"path": "../public/assets/useMatch-BOqw31_B.js"
	},
	"/assets/useMutation-ChEt5YS5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f4-YDeMLu+5wPl153fau+IMYTlElKM\"",
		"mtime": "2026-07-21T15:03:25.007Z",
		"size": 2292,
		"path": "../public/assets/useMutation-ChEt5YS5.js"
	},
	"/assets/useNavigate-K3rkWkZK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"de-9zhe8j9Qs3t6AkEWk7NsPK9iYK0\"",
		"mtime": "2026-07-21T15:03:25.008Z",
		"size": 222,
		"path": "../public/assets/useNavigate-K3rkWkZK.js"
	},
	"/assets/useQuery-DR6c2fIS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2264-oetbajpF9+gBAHqrm9grOjl1FFI\"",
		"mtime": "2026-07-21T15:03:25.008Z",
		"size": 8804,
		"path": "../public/assets/useQuery-DR6c2fIS.js"
	},
	"/assets/users-DAtQMKgz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c4-SRIC7X9p3NBJC526Qn68f9BKVTs\"",
		"mtime": "2026-07-21T15:03:25.008Z",
		"size": 452,
		"path": "../public/assets/users-DAtQMKgz.js"
	},
	"/assets/useStore-CQo-MNEv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4af0-+DK1CkfLnWVq3oENM8IMKng9Dcg\"",
		"mtime": "2026-07-21T15:03:25.008Z",
		"size": 19184,
		"path": "../public/assets/useStore-CQo-MNEv.js"
	},
	"/assets/utils-lp4SDbGI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7434-MScuLiVJWggqt9c64nIaHribWB4\"",
		"mtime": "2026-07-21T15:03:25.008Z",
		"size": 29748,
		"path": "../public/assets/utils-lp4SDbGI.js"
	},
	"/assets/x-CZ3Gil7Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"765-7wfnA3rNVdYNiHpETX0kQtRaOOU\"",
		"mtime": "2026-07-21T15:03:25.014Z",
		"size": 1893,
		"path": "../public/assets/x-CZ3Gil7Z.js"
	},
	"/assets/wand-sparkles-DF0piAFs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"981-9rlXqFkrXrnuje2NsAGeNcTeH+8\"",
		"mtime": "2026-07-21T15:03:25.008Z",
		"size": 2433,
		"path": "../public/assets/wand-sparkles-DF0piAFs.js"
	},
	"/assets/_app-jgWkre_l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"142bf-rOEm2UNZa6E6LQbMgrY16v4ozuY\"",
		"mtime": "2026-07-21T15:03:24.907Z",
		"size": 82623,
		"path": "../public/assets/_app-jgWkre_l.js"
	},
	"/assets/_app.ai-cVg0WRnS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19d4-pPIVcgpgmARVSaCEu/ufLc2+/To\"",
		"mtime": "2026-07-21T15:03:24.907Z",
		"size": 6612,
		"path": "../public/assets/_app.ai-cVg0WRnS.js"
	},
	"/assets/_app.assessments-C3vN9Ozz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33ca-WYJzCjG3sIWdWHZaU/39Fq0WEEw\"",
		"mtime": "2026-07-21T15:03:24.907Z",
		"size": 13258,
		"path": "../public/assets/_app.assessments-C3vN9Ozz.js"
	},
	"/assets/_app.certificates-BT6HH5sf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b31-S2y33vhjnSKx97JmVb9ocv1XaWs\"",
		"mtime": "2026-07-21T15:03:24.907Z",
		"size": 2865,
		"path": "../public/assets/_app.certificates-BT6HH5sf.js"
	},
	"/assets/_app.continue-DCwBwfgo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b80-j1Gk3oJPWIHVIB7HpdgI4Fe3WGg\"",
		"mtime": "2026-07-21T15:03:24.907Z",
		"size": 2944,
		"path": "../public/assets/_app.continue-DCwBwfgo.js"
	},
	"/assets/_app.courses-Vy44ytEy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8d-7h2VdVqrnUTrDTLl06QaRzJZLm0\"",
		"mtime": "2026-07-21T15:03:24.907Z",
		"size": 141,
		"path": "../public/assets/_app.courses-Vy44ytEy.js"
	},
	"/assets/_app.courses.index-D0NRiUlt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e3-a11+YmDxzNq58WmopmyneNH4cGk\"",
		"mtime": "2026-07-21T15:03:24.914Z",
		"size": 2275,
		"path": "../public/assets/_app.courses.index-D0NRiUlt.js"
	},
	"/assets/_app.courses._courseId-Vy44ytEy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8d-7h2VdVqrnUTrDTLl06QaRzJZLm0\"",
		"mtime": "2026-07-21T15:03:24.914Z",
		"size": 141,
		"path": "../public/assets/_app.courses._courseId-Vy44ytEy.js"
	},
	"/assets/_app.courses._courseId.index-DJ7LAi8J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26-SoFMfAHVJ5oqB5t+mpFRoQvFIoc\"",
		"mtime": "2026-07-21T15:03:24.914Z",
		"size": 38,
		"path": "../public/assets/_app.courses._courseId.index-DJ7LAi8J.js"
	},
	"/assets/_app.courses._courseId.lessons._lessonId-QKNXyTUA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"606b-zVVdJtGBK/Y2WfXIQ8pKYqCHyR0\"",
		"mtime": "2026-07-21T15:03:24.914Z",
		"size": 24683,
		"path": "../public/assets/_app.courses._courseId.lessons._lessonId-QKNXyTUA.js"
	},
	"/assets/_app.notifications-DBmaydHX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9df-t6MAMXBRGewcVVWDV2aDER2UtXI\"",
		"mtime": "2026-07-21T15:03:24.914Z",
		"size": 2527,
		"path": "../public/assets/_app.notifications-DBmaydHX.js"
	},
	"/assets/_app.profile-Dacfz_fv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e70-ImcC1Kt2P6iekJyyIAWndB8z2x0\"",
		"mtime": "2026-07-21T15:03:24.914Z",
		"size": 3696,
		"path": "../public/assets/_app.profile-Dacfz_fv.js"
	},
	"/assets/_app.ranking-t3cB014P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a00-i3CLvQoEXI1X1gvrq4Xvp43w+LU\"",
		"mtime": "2026-07-21T15:03:24.914Z",
		"size": 2560,
		"path": "../public/assets/_app.ranking-t3cB014P.js"
	},
	"/assets/_app.roleplay-D7vtqqLg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b15-3BQUFL5Y4c3Ef049rPYzgvEuYbo\"",
		"mtime": "2026-07-21T15:03:24.921Z",
		"size": 6933,
		"path": "../public/assets/_app.roleplay-D7vtqqLg.js"
	},
	"/assets/_app.roleplay._simulationId-Cdvv3uy5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5bfd-R8nPr2e2F4I5tBElvX2aUMOb5cQ\"",
		"mtime": "2026-07-21T15:03:24.922Z",
		"size": 23549,
		"path": "../public/assets/_app.roleplay._simulationId-Cdvv3uy5.js"
	},
	"/assets/_app.settings-C3FSp3x6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1af0-vXESQhzQuy+1qaxyJzXCLoUgDaM\"",
		"mtime": "2026-07-21T15:03:24.922Z",
		"size": 6896,
		"path": "../public/assets/_app.settings-C3FSp3x6.js"
	},
	"/assets/_app.dashboard-BQ6TBCbS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"930b1-7xwO5U6oKR2WydxWxPox1gL1SY0\"",
		"mtime": "2026-07-21T15:03:24.914Z",
		"size": 602289,
		"path": "../public/assets/_app.dashboard-BQ6TBCbS.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_p4y6gs = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_p4y6gs
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
