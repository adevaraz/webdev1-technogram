import { group, sleep } from 'k6';
import http from 'k6/http';

// Version: 1.2
// Creator: WebInspector

export let options = {
    stages: [
		{ duration: '10s', target: 10 }, // below normal load
		{ duration: '1m', target: 10 },
		{ duration: '10s', target: 50 }, // spike to 50 users
		{ duration: '3m', target: 50 }, // stay at 50 for 3 minutes
		{ duration: '10s', target: 10 }, // scale down. Recovery stage.
		{ duration: '3m', target: 10 },
		{ duration: '10s', target: 0 },
	],
};

export default function() {

	group("page_2 - https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'", function() {
		let req, res;
		req = [{
			"method": "get",
			"url": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1784213884.1608712716",
					"_gid": "GA1.2.1956546407.1612607043",
					"__cfduid": "d56b6d7d5bf7d3b0a0dab79a2a5991b951612607043",
					"_gat": "1"
				},
				"headers": {
					"cache-control": "max-age=0",
					"upgrade-insecure-requests": "1",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63",
					"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
					"sec-fetch-site": "none",
					"sec-fetch-mode": "navigate",
					"sec-fetch-user": "?1",
					"sec-fetch-dest": "document",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9",
					"if-modified-since": "Tue, 02 Feb 2021 06:25:44 GMT"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/app.1578ebbf.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-vendors.fc4a2208.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/app.4eaa5bc6.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-vendors.78c0af60.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://ajax.cloudflare.com/cdn-cgi/scripts/7089c43e/cloudflare-static/rocket-loader.min.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2",
			"params": {
				"headers": {
					"Referer": ""
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2",
			"params": {
				"headers": {
					"Referer": ""
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2",
			"params": {
				"headers": {
					"Referer": ""
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2",
			"params": {
				"headers": {
					"Referer": ""
				}
			}
		},{
			"method": "get",
			"url": "https://apis.google.com/js/platform.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://www.google-analytics.com/analytics.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-6e83591c.eda48252.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-33662b86.c432aa85.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-33662b86.6ec97679.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-aaf220ce.aaaa5ca8.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-247ebfed.1ec12354.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-247ebfed.b8a2aa6b.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/manifest.json",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,900;1,400&display=swap",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://www.gstatic.com/recaptcha/releases/2Mfykwl2mlvyQZQ3PEgoH710/recaptcha__en.js",
			"params": {
				"headers": {
					"Origin": "https://technogram.tech",
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2",
			"params": {
				"headers": {
					"Referer": ""
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2",
			"params": {
				"headers": {
					"Referer": ""
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/playfairdisplay/v22/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgA.woff2",
			"params": {
				"headers": {
					"Origin": "https://technogram.tech",
					"Referer": "https://fonts.googleapis.com/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://apis.google.com/_/scs/apps-static/_/js/k=oz.gapi.en.86MLdKEg0Ug.O/m=analytics/rt=j/sv=1/d=1/ed=1/am=wQE/rs=AGLTcCNVMDBrJcVLxr_OXSrhwhVXLtLCsQ/cb=gapi.loaded_0",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/img/icons/android-chrome-192x192.png",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "post",
			"url": "https://technogram-api.technogram.tech/account/refresh",
			"body": "{}",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1784213884.1608712716",
					"_gid": "GA1.2.1956546407.1612607043",
					"__cfduid": "d56b6d7d5bf7d3b0a0dab79a2a5991b951612607043",
					"_gat": "1"
				},
				"headers": {
					"accept": "application/json, text/plain, */*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63",
					"content-type": "application/json;charset=UTF-8",
					"origin": "https://technogram.tech",
					"sec-fetch-site": "same-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "options",
			"url": "https://technogram-api.technogram.tech/account/refresh",
			"params": {
				"headers": {
					"accept": "*/*",
					"access-control-request-method": "POST",
					"access-control-request-headers": "content-type",
					"origin": "https://technogram.tech",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63",
					"sec-fetch-mode": "cors",
					"sec-fetch-site": "same-site",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://apis.google.com/_/scs/apps-static/_/js/k=oz.gapi.en.86MLdKEg0Ug.O/m=client/exm=analytics/rt=j/sv=1/d=1/ed=1/am=wQE/rs=AGLTcCNVMDBrJcVLxr_OXSrhwhVXLtLCsQ/cb=gapi.loaded_1",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://apis.google.com/_/scs/apps-static/_/js/k=oz.gapi.en.86MLdKEg0Ug.O/m=auth2/exm=analytics,client/rt=j/sv=1/d=1/ed=1/am=wQE/rs=AGLTcCNVMDBrJcVLxr_OXSrhwhVXLtLCsQ/cb=gapi.loaded_2",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://content.googleapis.com/static/proxy.html?usegapi=1&jsh=m%3B%2F_%2Fscs%2Fapps-static%2F_%2Fjs%2Fk%3Doz.gapi.en.86MLdKEg0Ug.O%2Fam%3DwQE%2Fd%3D1%2Fct%3Dzgms%2Frs%3DAGLTcCNVMDBrJcVLxr_OXSrhwhVXLtLCsQ%2Fm%3D__features__",
			"params": {
				"headers": {
					"upgrade-insecure-requests": "1",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63",
					"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
					"sec-fetch-site": "cross-site",
					"sec-fetch-mode": "navigate",
					"sec-fetch-dest": "iframe",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9",
					"if-modified-since": "Fri, 17 Jul 2020 22:45:00 GMT"
				}
			}
		}];
		res = http.batch(req);
		sleep(0.89);
		req = [{
			"method": "post",
			"url": "https://www.google-analytics.com/j/collect?v=1&_v=j87&a=638116848&t=pageview&_s=1&dl=https%3A%2F%2Ftechnogram.tech%2Fberita%2F27%2Fpembaruan-chrome-terbaru-google-memberikan-%27peningkatan-kinerja-terbesar-dalam-beberapa-tahun%27&dp=%2Fberita%2F27%2Fpembaruan-chrome-terbaru-google-memberikan-%27peningkatan-kinerja-terbesar-dalam-beberapa-tahun%27&ul=en-us&de=UTF-8&dt=Technogram%20%7C%20Technogram&sd=24-bit&sr=1536x864&vp=1519x374&je=0&_u=SACAAEABEAAAAC~&jid=&gjid=&cid=1784213884.1608712716&tid=UA-183633936-2&_gid=1956546407.1612607043&_slc=1&z=643840316",
			"params": {
				"headers": {
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63",
					"content-type": "text/plain",
					"accept": "*/*",
					"origin": "https://technogram.tech",
					"sec-fetch-site": "cross-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-e4dcd8a8.77f76fa2.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-e4dcd8a8.29e7e9eb.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "put",
			"url": "https://technogram-api.technogram.tech/news/update-reader/27",
			"body": "{}",
			"params": {
				"headers": {
					"accept": "application/json, text/plain, */*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63",
					"content-type": "application/json;charset=UTF-8",
					"origin": "https://technogram.tech",
					"sec-fetch-site": "same-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/news/27",
			"params": {
				"headers": {
					"accept": "application/json, text/plain, */*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63",
					"origin": "https://technogram.tech",
					"sec-fetch-site": "same-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9",
					"if-none-match": "W/\"dc6-kMhitzAxHKD7c68Fz+TzymBmS9o\""
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/news/27",
			"params": {
				"headers": {
					"accept": "application/json, text/plain, */*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63",
					"origin": "https://technogram.tech",
					"sec-fetch-site": "same-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9",
					"if-none-match": "W/\"dc6-kMhitzAxHKD7c68Fz+TzymBmS9o\""
				}
			}
		},{
			"method": "options",
			"url": "https://technogram-api.technogram.tech/news/update-reader/27",
			"params": {
				"headers": {
					"accept": "*/*",
					"access-control-request-method": "PUT",
					"access-control-request-headers": "content-type",
					"origin": "https://technogram.tech",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63",
					"sec-fetch-mode": "cors",
					"sec-fetch-site": "same-site",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/kategori/get",
			"params": {
				"headers": {
					"accept": "application/json, text/plain, */*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63",
					"origin": "https://technogram.tech",
					"sec-fetch-site": "same-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9",
					"if-none-match": "W/\"7b6-XUOvJj/n+sp7NrcAWmCsGdu1iHY\""
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/img/technogram-logo.e6f72784.svg",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/img/search-icon.ff67bb68.svg",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/worksans/v9/QGYsz_wNahGAdqQ43Rh_fKDp.woff2",
			"params": {
				"headers": {
					"Origin": "https://technogram.tech",
					"Referer": "https://fonts.googleapis.com/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/worksans/v9/QGYsz_wNahGAdqQ43Rh_fKDp.woff2",
			"params": {
				"headers": {
					"Origin": "https://technogram.tech",
					"Referer": "https://fonts.googleapis.com/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/worksans/v9/QGYsz_wNahGAdqQ43Rh_fKDp.woff2",
			"params": {
				"headers": {
					"Origin": "https://technogram.tech",
					"Referer": "https://fonts.googleapis.com/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		}];
		res = http.batch(req);
		sleep(2.38);
		req = [{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/app/public/images/c0fc17de-d3bc-48e2-adc7-2a6656873137.webp",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/img/heart-empty.77681a7c.svg",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/img/view.01232f08.svg",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/img/unsaved-icon.d4b6dcf4.svg",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/img/share.cc60fa7e.svg",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/app/public/images/c0fc17de-d3bc-48e2-adc7-2a6656873137.webp",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		}];
		res = http.batch(req);
		sleep(0.70);
		req = [{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/news/?perpage=4&category=Software&page=1",
			"params": {
				"headers": {
					"accept": "application/json, text/plain, */*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63",
					"origin": "https://technogram.tech",
					"sec-fetch-site": "same-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9",
					"if-none-match": "W/\"1c0b-eNNrOZgxlsJyZcze0ReeAPFDQVQ\""
				}
			}
		}];
		res = http.batch(req);
		sleep(0.78);
		req = [{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-045b8e8a.c05d9db5.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-045b8e8a.bc9379f0.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-0d1e95bb.ced24997.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-0d1e95bb.a48c531d.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/worksans/v9/QGYsz_wNahGAdqQ43Rh_fKDp.woff2",
			"params": {
				"headers": {
					"Origin": "https://technogram.tech",
					"Referer": "https://fonts.googleapis.com/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/app/public/images/6fbdffc4-03b0-4117-91b5-fa88566ddf55.webp",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
				}
			}
		}];
		res = http.batch(req);
		// Random sleep between 20s and 40s
		sleep(Math.floor(Math.random()*20+20));
	});

}
