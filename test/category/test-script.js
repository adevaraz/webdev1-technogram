import { group, sleep } from 'k6';
import http from 'k6/http';

// Version: 1.2
// Creator: WebInspector

export let options = {
	maxRedirects: 0,
	stages : [
		{ target : 200 , duration : "30s" } ,
		{ target : 200 , duration : "1m" },
		{ target : 0 , duration : "30s" }
	]
};

export default function() {

	group("page_1 - https://technogram.tech/categories", function() {
		let req, res;
		req = [{
			"method": "get",
			"url": "https://technogram.tech/categories",
			"params": {
				"cookies": {
					"_ga": "GA1.2.811746346.1608267272",
					"__cfduid": "d1cab0a4927381bd917039bee4165daa61610201058",
					"_gid": "GA1.2.1773234119.1611458645",
					"_gat": "1"
				},
				"headers": {
					"cache-control": "max-age=0",
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"sec-ch-ua-mobile": "?1",
					"upgrade-insecure-requests": "1",
					"user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36",
					"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
					"sec-fetch-site": "same-origin",
					"sec-fetch-mode": "navigate",
					"sec-fetch-user": "?1",
					"sec-fetch-dest": "document",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9,id;q=0.8"
				}
			}
		}];
		res = http.batch(req);
		sleep(0.55);
		req = [{
			"method": "get",
			"url": "https://technogram.tech/css/app.1578ebbf.css",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/categories",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-vendors.d41ab357.css",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/categories",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/app.c4230451.js",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/categories",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-vendors.3e8956a4.js",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/categories",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://ajax.cloudflare.com/cdn-cgi/scripts/7089c43e/cloudflare-static/rocket-loader.min.js",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://apis.google.com/js/platform.js",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://www.google-analytics.com/analytics.js",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-6e83591c.eda48252.js",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/categories",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-190c1127.9850b469.css",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/categories",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-190c1127.38f192e7.js",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/categories",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-550924f7.f720bb16.css",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/categories",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-550924f7.14949949.js",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/categories",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://www.gstatic.com/recaptcha/releases/_KUxfxvAoJ4k7SaKyLbja4Mi/recaptcha__en.js",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"Origin": "https://technogram.tech",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/technogram.ico",
			"params": {
				"cookies": {
					"_ga": "GA1.2.811746346.1608267272",
					"__cfduid": "d1cab0a4927381bd917039bee4165daa61610201058",
					"_gid": "GA1.2.1773234119.1611458645",
					"_gat": "1"
				},
				"headers": {
					"pragma": "no-cache",
					"cache-control": "no-cache",
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"sec-ch-ua-mobile": "?1",
					"user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36",
					"accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
					"sec-fetch-site": "same-origin",
					"sec-fetch-mode": "no-cors",
					"sec-fetch-dest": "image",
					"referer": "https://technogram.tech/categories",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9,id;q=0.8"
				}
			}
		},{
			"method": "get",
			"url": "https://apis.google.com/_/scs/apps-static/_/js/k=oz.gapi.en.L7mys-cL6BM.O/m=analytics/rt=j/sv=1/d=1/ed=1/am=wQE/rs=AGLTcCPymG0XQrEqIOsFKina7y-Dy-g0lQ/cb=gapi.loaded_0",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "post",
			"url": "https://technogram-api.technogram.tech/account/refresh",
			"body": "{}",
			"params": {
				"cookies": {
					"_ga": "GA1.2.811746346.1608267272",
					"__cfduid": "d1cab0a4927381bd917039bee4165daa61610201058",
					"_gid": "GA1.2.1773234119.1611458645",
					"refresh": "s%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZXMiOiJcImFkbWluXCI7IiwiaWF0IjoxNjExNDk1MTQyLCJleHAiOjE2MTE2Njc5NDJ9.TxVUxf8vXC4g19ey6NRGSiT8uhHTEBaklFIcMlf8zP0.joo1Yr6ZzaVEzFORNLXLBfw9f5JaZFVqOpFdNrkt2Wg",
					"_gat": "1"
				},
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"accept": "application/json, text/plain, */*",
					"sec-ch-ua-mobile": "?1",
					"user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36",
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
			"method": "options",
			"url": "https://technogram-api.technogram.tech/account/refresh",
			"params": {
				"headers": {
					"accept": "*/*",
					"access-control-request-method": "POST",
					"access-control-request-headers": "content-type",
					"origin": "https://technogram.tech",
					"user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36",
					"sec-fetch-mode": "cors",
					"sec-fetch-site": "same-site",
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
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://apis.google.com/_/scs/apps-static/_/js/k=oz.gapi.en.L7mys-cL6BM.O/m=auth2/exm=analytics,client/rt=j/sv=1/d=1/ed=1/am=wQE/rs=AGLTcCPymG0XQrEqIOsFKina7y-Dy-g0lQ/cb=gapi.loaded_2",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://content.googleapis.com/static/proxy.html?usegapi=1&jsh=m%3B%2F_%2Fscs%2Fapps-static%2F_%2Fjs%2Fk%3Doz.gapi.en.L7mys-cL6BM.O%2Fam%3DwQE%2Fd%3D1%2Fct%3Dzgms%2Frs%3DAGLTcCPymG0XQrEqIOsFKina7y-Dy-g0lQ%2Fm%3D__features__",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"sec-ch-ua-mobile": "?1",
					"upgrade-insecure-requests": "1",
					"user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36",
					"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
					"x-client-data": "CI+2yQEIo7bJAQjEtskBCKmdygEIl6zKAQj1uMoBCMfCygEIrMfKAQj4x8oBCKPNygEI3NXKAQiTmssBCNScywEIqJ3LAQirncsBGPq4ygE=",
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
		sleep(0.62);
		req = [{
			"method": "post",
			"url": "https://www.google-analytics.com/j/collect?v=1&_v=j87&a=103424903&t=pageview&_s=1&dl=https%3A%2F%2Ftechnogram.tech%2Fcategories&dp=%2Fcategories&ul=en-us&de=UTF-8&dt=Technogram%20%7C%20Technogram&sd=24-bit&sr=1005x240&vp=1005x240&je=0&_u=SACAAEABEAAAAC~&jid=&gjid=&cid=811746346.1608267272&tid=UA-183633936-2&_gid=1773234119.1611458645&_slc=1&z=747754170",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"sec-ch-ua-mobile": "?1",
					"user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36",
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
			"url": "https://technogram.tech/css/chunk-816496e4.8717a59c.css",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/categories",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-816496e4.60ebafcd.js",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/categories",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/kategori/get",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"accept": "application/json, text/plain, */*",
					"sec-ch-ua-mobile": "?1",
					"user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36",
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
			"url": "https://fonts.gstatic.com/s/worksans/v8/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32KxfXBi8Jpg.woff2",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://fonts.googleapis.com/",
					"Origin": "https://technogram.tech",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/worksans/v8/QGYsz_wNahGAdqQ43Rh_fKDp.woff2",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://fonts.googleapis.com/",
					"Origin": "https://technogram.tech",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/kategori/get",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"accept": "application/json, text/plain, */*",
					"sec-ch-ua-mobile": "?1",
					"user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36",
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
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/categories",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/img/search-icon.ff67bb68.svg",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/categories",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/worksans/v8/QGYsz_wNahGAdqQ43Rh_fKDp.woff2",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://fonts.googleapis.com/",
					"Origin": "https://technogram.tech",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/worksans/v8/QGYsz_wNahGAdqQ43Rh_fKDp.woff2",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://fonts.googleapis.com/",
					"Origin": "https://technogram.tech",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/app/public/categories/db57cfbf-7dcc-4c90-b466-beacc920df20.webp",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/app/public/categories/c0179924-5808-4412-8b51-2ca4fca1eb94.webp",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/app/public/categories/bd4d808e-5e9d-4320-9def-736e7bbe3fb4.webp",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \"\\\"Not;A\\\\Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"sec-ch-ua-mobile": "?1",
					"User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
				}
			}
		}];
		res = http.batch(req);
		// Random sleep between 20s and 40s
		sleep(Math.floor(Math.random()*20+20));
	});

}
