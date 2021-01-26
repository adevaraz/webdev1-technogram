import { group, sleep } from 'k6';
import http from 'k6/http';

// Version: 1.2
// Creator: WebInspector

export let options = {
	maxRedirects: 0,
	stages: [
		{ target: 10, duration: '30s'},
		{ target: 10, duration: '1m'},
		{ target: 0, duration: '30s'}
	]
};

export default function() {

	group("page_1 - https://technogram.tech/", function() {
		let req, res;
		req = [{
			"method": "get",
			"url": "https://technogram.tech/",
			"params": {
				"cookies": {
					"__cfduid": "debf16d8863499f0807723a9d8d9af5ef1610453787",
					"_ga": "GA1.2.185815533.1610453788",
					"_gid": "GA1.2.1757052122.1611455731"
				},
				"headers": {
					"cache-control": "max-age=0",
					"upgrade-insecure-requests": "1",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50",
					"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
					"sec-fetch-site": "none",
					"sec-fetch-mode": "navigate",
					"sec-fetch-user": "?1",
					"sec-fetch-dest": "document",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9,id;q=0.8",
					"if-modified-since": "Mon, 25 Jan 2021 07:06:53 GMT"
				}
			}
		}];
		res = http.batch(req);
		sleep(0.58);
		req = [{
			"method": "get",
			"url": "https://technogram.tech/css/app.1578ebbf.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-vendors.d41ab357.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/app.c4230451.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-vendors.3e8956a4.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://ajax.cloudflare.com/cdn-cgi/scripts/7089c43e/cloudflare-static/rocket-loader.min.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://cdn.jsdelivr.net/npm/@mdi/font@latest/fonts/materialdesignicons-webfont.woff2?v=5.9.55",
			"params": {
				"headers": {
					"Referer": ""
				}
			}
		},{
			"method": "get",
			"url": "https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://apis.google.com/js/platform.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://www.google-analytics.com/analytics.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-6e83591c.eda48252.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-190c1127.9850b469.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-190c1127.38f192e7.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,900;1,400&display=swap",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-1653584e.9bdf58de.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-1653584e.5bc2354a.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/worksans/v8/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32KxfXBi8JoI3ZKyHaQQ.woff",
			"params": {
				"headers": {
					"Origin": "https://technogram.tech",
					"Referer": "https://fonts.googleapis.com/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/playfairdisplay/v21/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgEM86xQ.woff2",
			"params": {
				"headers": {
					"Origin": "https://technogram.tech",
					"Referer": "https://fonts.googleapis.com/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://www.gstatic.com/recaptcha/releases/_KUxfxvAoJ4k7SaKyLbja4Mi/recaptcha__en.js",
			"params": {
				"headers": {
					"Origin": "https://technogram.tech",
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/technogram.ico",
			"params": {
				"cookies": {
					"__cfduid": "debf16d8863499f0807723a9d8d9af5ef1610453787",
					"_ga": "GA1.2.185815533.1610453788",
					"_gid": "GA1.2.1757052122.1611455731"
				},
				"headers": {
					"pragma": "no-cache",
					"cache-control": "no-cache",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50",
					"accept": "image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
					"sec-fetch-site": "same-origin",
					"sec-fetch-mode": "no-cors",
					"sec-fetch-dest": "image",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9,id;q=0.8"
				}
			}
		},{
			"method": "get",
			"url": "https://apis.google.com/_/scs/apps-static/_/js/k=oz.gapi.en.L7mys-cL6BM.O/m=analytics/rt=j/sv=1/d=1/ed=1/am=wQE/rs=AGLTcCPymG0XQrEqIOsFKina7y-Dy-g0lQ/cb=gapi.loaded_0",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
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
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50",
					"sec-fetch-mode": "cors",
					"sec-fetch-site": "same-site",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9,id;q=0.8"
				}
			}
		},{
			"method": "post",
			"url": "https://technogram-api.technogram.tech/account/refresh",
			"body": "{}",
			"params": {
				"cookies": {
					"__cfduid": "debf16d8863499f0807723a9d8d9af5ef1610453787",
					"_ga": "GA1.2.185815533.1610453788",
					"_gid": "GA1.2.1757052122.1611455731",
					"refresh": "s%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDUsInJvbGVzIjoiXCJwZW1iYWNhXCI7IiwiaWF0IjoxNjExNTAxNjQ2LCJleHAiOjE2MTIxMDY0NDZ9.VQyFkSKB2_uZq37HUbEHSA7g1A7T8wBZ9cPPW8O9aUE.b%2BoJxCmDMhLhE4rVHR0ep2tQY7Hh%2BH%2FaO1n2FavHt5M"
				},
				"headers": {
					"accept": "application/json, text/plain, */*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50",
					"content-type": "application/json;charset=UTF-8",
					"origin": "https://technogram.tech",
					"sec-fetch-site": "same-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9,id;q=0.8"
				}
			}
		},{
			"method": "get",
			"url": "https://apis.google.com/_/scs/apps-static/_/js/k=oz.gapi.en.L7mys-cL6BM.O/m=client/exm=analytics/rt=j/sv=1/d=1/ed=1/am=wQE/rs=AGLTcCPymG0XQrEqIOsFKina7y-Dy-g0lQ/cb=gapi.loaded_1",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://apis.google.com/_/scs/apps-static/_/js/k=oz.gapi.en.L7mys-cL6BM.O/m=auth2/exm=analytics,client/rt=j/sv=1/d=1/ed=1/am=wQE/rs=AGLTcCPymG0XQrEqIOsFKina7y-Dy-g0lQ/cb=gapi.loaded_2",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://content.googleapis.com/static/proxy.html?usegapi=1&jsh=m%3B%2F_%2Fscs%2Fapps-static%2F_%2Fjs%2Fk%3Doz.gapi.en.L7mys-cL6BM.O%2Fam%3DwQE%2Fd%3D1%2Fct%3Dzgms%2Frs%3DAGLTcCPymG0XQrEqIOsFKina7y-Dy-g0lQ%2Fm%3D__features__",
			"params": {
				"headers": {
					"upgrade-insecure-requests": "1",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50",
					"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
					"sec-fetch-site": "cross-site",
					"sec-fetch-mode": "navigate",
					"sec-fetch-dest": "iframe",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9,id;q=0.8",
					"if-modified-since": "Fri, 17 Jul 2020 22:45:00 GMT"
				}
			}
		}];
		res = http.batch(req);
		sleep(2.71);
		req = [{
			"method": "post",
			"url": "https://www.google-analytics.com/j/collect?v=1&_v=j87&a=1989476021&t=pageview&_s=1&dl=https%3A%2F%2Ftechnogram.tech%2F&dp=%2F&ul=en-us&de=UTF-8&dt=Technogram%20%7C%20Technogram&sd=24-bit&sr=1920x1080&vp=1903x298&je=0&_u=SACAAEABEAAAAC~&jid=904245571&gjid=342101721&cid=185815533.1610453788&tid=UA-183633936-2&_gid=1757052122.1611455731&_r=1&_slc=1&z=31331962",
			"params": {
				"headers": {
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50",
					"content-type": "text/plain",
					"accept": "*/*",
					"origin": "https://technogram.tech",
					"sec-fetch-site": "cross-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9,id;q=0.8"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/socket.io/?EIO=4&transport=polling&t=NSvikpX",
			"params": {
				"headers": {
					"accept": "*/*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50",
					"origin": "https://technogram.tech",
					"sec-fetch-site": "same-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9,id;q=0.8"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-816496e4.8717a59c.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-816496e4.60ebafcd.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-6d5afc03.eaace101.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-6d5afc03.ac5b1a0f.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-481ad7aa.bcf4d83d.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-481ad7aa.ebf21c5e.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/news/most-liked?perpage=6&key=&page=1",
			"params": {
				"headers": {
					"accept": "application/json, text/plain, */*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50",
					"origin": "https://technogram.tech",
					"sec-fetch-site": "same-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9,id;q=0.8",
					"if-none-match": "W/\"440e-UIQilBRdDy4VGH9W+n20K3XVHvM\""
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/news/recent?perpage=1&key=&page=1",
			"params": {
				"headers": {
					"accept": "application/json, text/plain, */*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50",
					"origin": "https://technogram.tech",
					"sec-fetch-site": "same-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9,id;q=0.8",
					"if-none-match": "W/\"8c8-x6KTRwjv7iW7kA8EwpA5ysKWXMY\""
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/kategori/get",
			"params": {
				"headers": {
					"accept": "application/json, text/plain, */*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50",
					"origin": "https://technogram.tech",
					"sec-fetch-site": "same-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9,id;q=0.8",
					"if-none-match": "W/\"7b6-XUOvJj/n+sp7NrcAWmCsGdu1iHY\""
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/news/recent?perpage=10&key=&page=1",
			"params": {
				"headers": {
					"accept": "application/json, text/plain, */*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50",
					"origin": "https://technogram.tech",
					"sec-fetch-site": "same-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9,id;q=0.8",
					"if-none-match": "W/\"7872-ZsAwmoQ76KzZ02PqDo6t2MuinCU\""
				}
			}
		},{
			"method": "get",
			"url": "https://cdn.jsdelivr.net/npm/@mdi/font@latest/fonts/materialdesignicons-webfont.woff2?v=5.9.55",
			"params": {
				"headers": {
					"Referer": ""
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/worksans/v8/QGYsz_wNahGAdqQ43Rh_fKDptfpA4Q.woff2",
			"params": {
				"headers": {
					"Origin": "https://technogram.tech",
					"Referer": "https://fonts.googleapis.com/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "post",
			"url": "https://technogram-api.technogram.tech/socket.io/?EIO=4&transport=polling&t=NSvikr-&sid=PTOBIl5gYKgv7_bPAAAc",
			"body": "40",
			"params": {
				"headers": {
					"accept": "*/*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50",
					"content-type": "text/plain;charset=UTF-8",
					"origin": "https://technogram.tech",
					"sec-fetch-site": "same-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9,id;q=0.8"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/socket.io/?EIO=4&transport=polling&t=NSviks2&sid=PTOBIl5gYKgv7_bPAAAc",
			"params": {
				"headers": {
					"accept": "*/*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50",
					"origin": "https://technogram.tech",
					"sec-fetch-site": "same-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9,id;q=0.8"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/kategori/get",
			"params": {
				"headers": {
					"accept": "application/json, text/plain, */*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50",
					"origin": "https://technogram.tech",
					"sec-fetch-site": "same-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9,id;q=0.8",
					"if-none-match": "W/\"7b6-XUOvJj/n+sp7NrcAWmCsGdu1iHY\""
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/img/technogram-logo.e6f72784.svg",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/img/search-icon.ff67bb68.svg",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/img/bell.1fef3135.svg",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/img/profile.c4f6c7ce.svg",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/worksans/v8/QGYsz_wNahGAdqQ43Rh_fKDptfpA4Q.woff2",
			"params": {
				"headers": {
					"Origin": "https://technogram.tech",
					"Referer": "https://fonts.googleapis.com/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/worksans/v8/QGYsz_wNahGAdqQ43Rh_fKDptfpA4Q.woff2",
			"params": {
				"headers": {
					"Origin": "https://technogram.tech",
					"Referer": "https://fonts.googleapis.com/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/socket.io/?EIO=4&transport=polling&t=NSvikto&sid=PTOBIl5gYKgv7_bPAAAc",
			"params": {
				"headers": {
					"accept": "*/*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50",
					"origin": "https://technogram.tech",
					"sec-fetch-site": "same-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9,id;q=0.8"
				}
			}
		},{
			"method": "post",
			"url": "https://technogram-api.technogram.tech/socket.io/?EIO=4&transport=polling&t=NSviktt&sid=PTOBIl5gYKgv7_bPAAAc",
			"body": "42[\"room\",\"general\"]",
			"params": {
				"headers": {
					"accept": "*/*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50",
					"content-type": "text/plain;charset=UTF-8",
					"origin": "https://technogram.tech",
					"sec-fetch-site": "same-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9,id;q=0.8"
				}
			}
		},{
			"method": "get",
			"url": "wss://technogram-api.technogram.tech/socket.io/?EIO=4&transport=websocket&sid=PTOBIl5gYKgv7_bPAAAc",
			"params": {
				"headers": {
					"Pragma": "no-cache",
					"Origin": "https://technogram.tech",
					"Accept-Encoding": "gzip, deflate, br",
					"Host": "technogram-api.technogram.tech",
					"Accept-Language": "en-US,en;q=0.9,id;q=0.8",
					"Sec-WebSocket-Key": "lhVizEVywtXebvliaamQrQ==",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50",
					"Upgrade": "websocket",
					"Sec-WebSocket-Extensions": "permessage-deflate; client_max_window_bits",
					"Cache-Control": "no-cache",
					"Connection": "Upgrade",
					"Sec-WebSocket-Version": "13"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-66c0c1e3.17a89111.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-66c0c1e3.d297139f.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-20177958.bc977dd6.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-20177958.0addd01b.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-0d1e95bb.ced24997.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-0d1e95bb.222f98b5.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/app/public/images/303da901-d98e-495d-b942-f24986019b64.webp",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/app/public/images/32397767-d7e9-490d-a247-8bc976ca2ad5.webp",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/app/public/images/c0fc17de-d3bc-48e2-adc7-2a6656873137.webp",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/app/public/images/ebd341c3-ca19-430c-94da-25bda0326411.webp",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/app/public/images/60c959c5-5a02-4248-99bb-c5d0d72d52d2.webp",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/app/public/images/c59e927b-b228-4930-93c0-098ab472a9cc.webp",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-449c2ce8.4f8d9084.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-449c2ce8.bac54971.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-02c1e328.2dc5480f.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-02c1e328.d5c25cae.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/news/?perpage=4&category=Hardware&page=1",
			"params": {
				"headers": {
					"accept": "application/json, text/plain, */*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50",
					"origin": "https://technogram.tech",
					"sec-fetch-site": "same-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9,id;q=0.8"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/news/?perpage=4&category=Biotechnology&page=1",
			"params": {
				"headers": {
					"accept": "application/json, text/plain, */*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50",
					"origin": "https://technogram.tech",
					"sec-fetch-site": "same-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9,id;q=0.8",
					"if-none-match": "W/\"2e-EiGw6Z/vG96RsjfdmuO8vp/edoA\""
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/news/?perpage=4&category=Smartphone&page=1",
			"params": {
				"headers": {
					"accept": "application/json, text/plain, */*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50",
					"origin": "https://technogram.tech",
					"sec-fetch-site": "same-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9,id;q=0.8"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-203bd8a6.87fe7ca0.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-67469594.efba2a56.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-67469594.21863a46.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/app/public/images/e7a72f33-c805-46d3-a6a3-7305c77b66fb.webp",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/app/public/images/0ef45f4d-4263-435e-b0b0-c0aa0970707a.webp",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/app/public/images/1113df01-4502-4459-8647-2998306a4762.webp",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/app/public/images/ee25f059-fcbc-4731-9294-5f42f859801d.webp",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/app/public/images/d83ef584-1983-4b91-93a1-853a0037933b.webp",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-7a5304f6.1ef5b4eb.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-7a5304f6.f44e0d1a.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/app/public/images/65d7db01-f851-4d25-a911-451352f9697c.webp",
			"params": {
				"cookies": {
					"__cfduid": "debf16d8863499f0807723a9d8d9af5ef1610453787",
					"_ga": "GA1.2.185815533.1610453788",
					"_gid": "GA1.2.1757052122.1611455731",
					"refresh": "s%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDUsInJvbGVzIjoiXCJwZW1iYWNhXCI7IiwiaWF0IjoxNjExNTAxNjQ2LCJleHAiOjE2MTIxMDY0NDZ9.VQyFkSKB2_uZq37HUbEHSA7g1A7T8wBZ9cPPW8O9aUE.b%2BoJxCmDMhLhE4rVHR0ep2tQY7Hh%2BH%2FaO1n2FavHt5M",
					"_gat": "1"
				},
				"headers": {
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50",
					"accept": "image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
					"sec-fetch-site": "same-site",
					"sec-fetch-mode": "no-cors",
					"sec-fetch-dest": "image",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9,id;q=0.8",
					"if-none-match": "W/\"3222-176faa554ec\"",
					"if-modified-since": "Wed, 13 Jan 2021 07:28:27 GMT"
				}
			}
		}];
		res = http.batch(req);
		sleep(4.84);
		req = [{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/worksans/v8/QGYsz_wNahGAdqQ43Rh_fKDptfpA4Q.woff2",
			"params": {
				"headers": {
					"Origin": "https://technogram.tech",
					"Referer": "https://fonts.googleapis.com/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 Edg/88.0.705.50"
				}
			}
		}];
		res = http.batch(req);
		// Random sleep between 20s and 40s
		sleep(Math.floor(Math.random()*20+20));
	});

}
