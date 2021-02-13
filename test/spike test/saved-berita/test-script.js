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

	group("page_1 - https://technogram.tech/get-save", function() {
		let req, res;
		req = [{
			"method": "get",
			"url": "https://technogram.tech/get-save",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1566768573.1608433455",
					"__cfduid": "d616d7a426f02c79f6d6c2f32ac3dc4f31612943140",
					"_gid": "GA1.2.1045079223.1612943143",
					"_gat": "1"
				},
				"headers": {
					"cache-control": "max-age=0",
					"upgrade-insecure-requests": "1",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
					"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
					"sec-fetch-site": "same-origin",
					"sec-fetch-mode": "navigate",
					"sec-fetch-user": "?1",
					"sec-fetch-dest": "document",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9"
				}
			}
		}];
		res = http.batch(req);
		sleep(0.59);
		req = [{
			"method": "get",
			"url": "https://technogram.tech/js/app.4eaa5bc6.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/get-save",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-vendors.78c0af60.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/get-save",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://ajax.cloudflare.com/cdn-cgi/scripts/7089c43e/cloudflare-static/rocket-loader.min.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2",
			"params": {
				"headers": {
					"Origin": "https://technogram.tech",
					"Referer": "https://fonts.googleapis.com/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fBBc4.woff2",
			"params": {
				"headers": {
					"Origin": "https://technogram.tech",
					"Referer": "https://fonts.googleapis.com/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBBc4.woff2",
			"params": {
				"headers": {
					"Origin": "https://technogram.tech",
					"Referer": "https://fonts.googleapis.com/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://cdn.jsdelivr.net/npm/@mdi/font@latest/fonts/materialdesignicons-webfont.woff2?v=5.9.55",
			"params": {
				"headers": {
					"Origin": "https://technogram.tech",
					"Referer": "https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://apis.google.com/js/platform.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/img/icons/favicon-32x32.png",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1566768573.1608433455",
					"__cfduid": "d616d7a426f02c79f6d6c2f32ac3dc4f31612943140",
					"_gid": "GA1.2.1045079223.1612943143",
					"_gat": "1"
				},
				"headers": {
					"pragma": "no-cache",
					"cache-control": "no-cache",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
					"accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
					"sec-fetch-site": "same-origin",
					"sec-fetch-mode": "no-cors",
					"sec-fetch-dest": "image",
					"referer": "https://technogram.tech/get-save",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://www.google-analytics.com/analytics.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-6e83591c.eda48252.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/get-save",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-33662b86.c432aa85.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/get-save",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-33662b86.6ec97679.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/get-save",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-aaf220ce.aaaa5ca8.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/get-save",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-093a09d8.70ad8147.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/get-save",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-093a09d8.e5599e44.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/get-save",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/manifest.json",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/get-save",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://www.gstatic.com/recaptcha/releases/2Mfykwl2mlvyQZQ3PEgoH710/recaptcha__en.js",
			"params": {
				"headers": {
					"Origin": "https://technogram.tech",
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://apis.google.com/_/scs/apps-static/_/js/k=oz.gapi.en.86MLdKEg0Ug.O/m=analytics/rt=j/sv=1/d=1/ed=1/am=wQE/rs=AGLTcCNVMDBrJcVLxr_OXSrhwhVXLtLCsQ/cb=gapi.loaded_0",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,900;1,400&display=swap",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/worksans/v9/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32KxfXBi8Jpg.woff2",
			"params": {
				"headers": {
					"Origin": "https://technogram.tech",
					"Referer": "https://fonts.googleapis.com/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/playfairdisplay/v22/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgA.woff2",
			"params": {
				"headers": {
					"Origin": "https://technogram.tech",
					"Referer": "https://fonts.googleapis.com/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/img/icons/android-chrome-192x192.png",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/get-save",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "post",
			"url": "https://technogram-api.technogram.tech/account/refresh",
			"body": "{}",
			"params": {
				"cookies": {
					"_ga": "GA1.2.1566768573.1608433455",
					"__cfduid": "d616d7a426f02c79f6d6c2f32ac3dc4f31612943140",
					"_gid": "GA1.2.1045079223.1612943143",
					"refresh": "s%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjUsInJvbGVzIjoiXCJwZW1iYWNhXCI7IiwiaWF0IjoxNjEyOTQzNTcyLCJleHAiOjE2MTM1NDgzNzJ9.u-ilX-zrMDhnn9G-dmNNo8dHQKpY31fTAH2mVT9HimU.Y0EDUUwVxIKXHkOUctQI4JuFqHYICOclVPa7ArVI3B4",
					"_gat": "1"
				},
				"headers": {
					"accept": "application/json, text/plain, */*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
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
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
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
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://apis.google.com/_/scs/apps-static/_/js/k=oz.gapi.en.86MLdKEg0Ug.O/m=auth2/exm=analytics,client/rt=j/sv=1/d=1/ed=1/am=wQE/rs=AGLTcCNVMDBrJcVLxr_OXSrhwhVXLtLCsQ/cb=gapi.loaded_2",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://content.googleapis.com/static/proxy.html?usegapi=1&jsh=m%3B%2F_%2Fscs%2Fapps-static%2F_%2Fjs%2Fk%3Doz.gapi.en.86MLdKEg0Ug.O%2Fam%3DwQE%2Fd%3D1%2Fct%3Dzgms%2Frs%3DAGLTcCNVMDBrJcVLxr_OXSrhwhVXLtLCsQ%2Fm%3D__features__",
			"params": {
				"headers": {
					"upgrade-insecure-requests": "1",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
					"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
					"x-client-data": "CJW2yQEIorbJAQjEtskBCKmdygEI+MfKAQikzcoBCNzVygEIqJzLAQjjnMsBCKmdywEI3p3LAQ==",
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
		sleep(3.65);
		req = [{
			"method": "post",
			"url": "https://www.google-analytics.com/j/collect?v=1&_v=j87&a=494826942&t=pageview&_s=1&dl=https%3A%2F%2Ftechnogram.tech%2Fget-save&dp=%2Fget-save&ul=en-us&de=UTF-8&dt=Technogram%20%7C%20Technogram&sd=24-bit&sr=1366x768&vp=1349x657&je=0&_u=SACAAEABEAAAAC~&jid=&gjid=&cid=1566768573.1608433455&tid=UA-183633936-2&_gid=1045079223.1612943143&_slc=1&z=44709871",
			"params": {
				"headers": {
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
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
			"url": "https://technogram-api.technogram.tech/socket.io/?EIO=4&transport=polling&t=NUAyZ92",
			"params": {
				"headers": {
					"accept": "*/*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
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
			"url": "https://technogram.tech/css/chunk-e4dcd8a8.77f76fa2.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/get-save",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-e4dcd8a8.29e7e9eb.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/get-save",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/account/get-save?perpage=5&key=&page=1",
			"params": {
				"headers": {
					"accept": "application/json, text/plain, */*",
					"authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjUsInJvbGVzIjoiXCJwZW1iYWNhXCI7IiwiaWF0IjoxNjEyOTQzODYzLCJleHAiOjE2MTI5NTEwNjN9.gXWHZ5rqbT2n2B0fK2oqckusWwbZUjyr4DJNGjuxxXI",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
					"origin": "https://technogram.tech",
					"sec-fetch-site": "same-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9",
					"if-none-match": "W/\"14ec-G8VFk7hhK9WrD4f9XNhrXbWtNZY\""
				}
			}
		},{
			"method": "options",
			"url": "https://technogram-api.technogram.tech/account/get-save?perpage=5&key=&page=1",
			"params": {
				"headers": {
					"accept": "*/*",
					"access-control-request-method": "GET",
					"access-control-request-headers": "authorization",
					"origin": "https://technogram.tech",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
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
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/worksans/v9/QGYsz_wNahGAdqQ43Rh_fKDp.woff2",
			"params": {
				"headers": {
					"Origin": "https://technogram.tech",
					"Referer": "https://fonts.googleapis.com/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/img/technogram-logo.e6f72784.svg",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/get-save",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/img/search-icon.ff67bb68.svg",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/get-save",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/img/bell.1fef3135.svg",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/get-save",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/img/profile.c4f6c7ce.svg",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/get-save",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/kategori/get",
			"params": {
				"headers": {
					"accept": "application/json, text/plain, */*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
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
			"method": "post",
			"url": "https://technogram-api.technogram.tech/socket.io/?EIO=4&transport=polling&t=NUAyZHI&sid=1zggow81mNEIGu7qAAJx",
			"body": "40",
			"params": {
				"headers": {
					"accept": "*/*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
					"content-type": "text/plain;charset=UTF-8",
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
			"url": "https://technogram-api.technogram.tech/socket.io/?EIO=4&transport=polling&t=NUAyZHW&sid=1zggow81mNEIGu7qAAJx",
			"params": {
				"headers": {
					"accept": "*/*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
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
			"url": "wss://technogram-api.technogram.tech/socket.io/?EIO=4&transport=websocket&sid=1zggow81mNEIGu7qAAJx",
			"params": {
				"headers": {
					"Pragma": "no-cache",
					"Origin": "https://technogram.tech",
					"Accept-Encoding": "gzip, deflate, br",
					"Host": "technogram-api.technogram.tech",
					"Accept-Language": "en-US,en;q=0.9",
					"Sec-WebSocket-Key": "5LRncz0Pi7N15B8755Ft4w==",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
					"Upgrade": "websocket",
					"Sec-WebSocket-Extensions": "permessage-deflate; client_max_window_bits",
					"Cache-Control": "no-cache",
					"Connection": "Upgrade",
					"Sec-WebSocket-Version": "13"
				}
			}
		}];
		res = http.batch(req);
		sleep(0.70);
		req = [{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-80a519be.df0e04f0.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/get-save",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-d3eec5d0.008fee9e.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/get-save",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-d3eec5d0.55f10f65.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/get-save",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/img/heart-filled.51585115.svg",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/get-save",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/app/public/images/45faaba0-e6f2-4c3c-b1c4-b3531937790f.webp",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/app/public/images/60c959c5-5a02-4248-99bb-c5d0d72d52d2.webp",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
				}
			}
		}];
		res = http.batch(req);
		// Random sleep between 20s and 40s
		sleep(Math.floor(Math.random()*20+20));
	});

}
