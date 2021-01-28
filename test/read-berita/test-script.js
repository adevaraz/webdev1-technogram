import { group, sleep } from 'k6';
import http from 'k6/http';

// Version: 1.2
// Creator: WebInspector

export let options = {
    maxRedirects: 0,
    stages: [
        { target: 30, duration: '1m'},
        { target: 50, duration: '2m'},
        { target: 0, duration: '1m'},
    ]
};

export default function() {

	group("page_1 - https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'", function() {
		let req, res;
		req = [{
			"method": "get",
			"url": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
			"params": {
				"cookies": {
					"_ga": "GA1.2.918668604.1608351452",
					"__cfduid": "d7d7dcc23bb96d05c4ba02f0ddf5e37f31609899702",
					"_gid": "GA1.2.1958359623.1611479511",
					"_gat": "1"
				},
				"headers": {
					"cache-control": "max-age=0",
					"upgrade-insecure-requests": "1",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
					"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
					"sec-fetch-site": "same-origin",
					"sec-fetch-mode": "navigate",
					"sec-fetch-user": "?1",
					"sec-fetch-dest": "document",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9,id;q=0.8",
					"if-modified-since": "Mon, 25 Jan 2021 07:06:53 GMT"
				}
			}
		}];
		res = http.batch(req);
		sleep(1.14);
		req = [{
			"method": "get",
			"url": "https://technogram.tech/css/app.1578ebbf.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-vendors.d41ab357.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/app.c4230451.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-vendors.3e8956a4.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://ajax.cloudflare.com/cdn-cgi/scripts/7089c43e/cloudflare-static/rocket-loader.min.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		}];
		res = http.batch(req);
		sleep(0.59);
		req = [{
			"method": "get",
			"url": "https://apis.google.com/js/platform.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://www.google-analytics.com/analytics.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-6e83591c.eda48252.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-190c1127.9850b469.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-190c1127.38f192e7.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-af494da0.98204e1e.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-af494da0.aeaf7f65.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://www.gstatic.com/recaptcha/releases/_KUxfxvAoJ4k7SaKyLbja4Mi/recaptcha__en.js",
			"params": {
				"headers": {
					"Origin": "https://technogram.tech",
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/technogram.ico",
			"params": {
				"cookies": {
					"_ga": "GA1.2.918668604.1608351452",
					"__cfduid": "d7d7dcc23bb96d05c4ba02f0ddf5e37f31609899702",
					"_gid": "GA1.2.1958359623.1611479511"
				},
				"headers": {
					"pragma": "no-cache",
					"cache-control": "no-cache",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
					"accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
					"sec-fetch-site": "same-origin",
					"sec-fetch-mode": "no-cors",
					"sec-fetch-dest": "image",
					"referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9,id;q=0.8"
				}
			}
		},{
			"method": "get",
			"url": "https://apis.google.com/_/scs/apps-static/_/js/k=oz.gapi.id.a56Luph3Plc.O/m=analytics/rt=j/sv=1/d=1/ed=1/am=wQE/rs=AGLTcCM_U1uIlQLBtS_jfSAwbvww2pM_Ng/cb=gapi.loaded_0",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,900;1,400&display=swap",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://apis.google.com/_/scs/apps-static/_/js/k=oz.gapi.id.a56Luph3Plc.O/m=client/exm=analytics/rt=j/sv=1/d=1/ed=1/am=wQE/rs=AGLTcCM_U1uIlQLBtS_jfSAwbvww2pM_Ng/cb=gapi.loaded_1",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://apis.google.com/_/scs/apps-static/_/js/k=oz.gapi.id.a56Luph3Plc.O/m=auth2/exm=analytics,client/rt=j/sv=1/d=1/ed=1/am=wQE/rs=AGLTcCM_U1uIlQLBtS_jfSAwbvww2pM_Ng/cb=gapi.loaded_2",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "post",
			"url": "https://technogram-api.technogram.tech/account/refresh",
			"body": "{}",
			"params": {
				"cookies": {
					"_ga": "GA1.2.918668604.1608351452",
					"__cfduid": "d7d7dcc23bb96d05c4ba02f0ddf5e37f31609899702",
					"_gid": "GA1.2.1958359623.1611479511"
				},
				"headers": {
					"accept": "application/json, text/plain, */*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
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
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
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
			"url": "https://content.googleapis.com/static/proxy.html?usegapi=1&jsh=m%3B%2F_%2Fscs%2Fapps-static%2F_%2Fjs%2Fk%3Doz.gapi.id.a56Luph3Plc.O%2Fam%3DwQE%2Fd%3D1%2Fct%3Dzgms%2Frs%3DAGLTcCM_U1uIlQLBtS_jfSAwbvww2pM_Ng%2Fm%3D__features__",
			"params": {
				"headers": {
					"upgrade-insecure-requests": "1",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
					"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
					"x-client-data": "CIe2yQEIpbbJAQjEtskBCKmdygEIxsLKAQisx8oBCKTNygEI3NXKAQiUmssBCM2aywEI1ZzLAQipncsBCKqdywEIrZ3LARj6uMoB",
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
		sleep(1.02);
		req = [{
			"method": "post",
			"url": "https://www.google-analytics.com/j/collect?v=1&_v=j87&a=189138973&t=pageview&_s=1&dl=https%3A%2F%2Ftechnogram.tech%2Fberita%2F27%2Fpembaruan-chrome-terbaru-google-memberikan-%27peningkatan-kinerja-terbesar-dalam-beberapa-tahun%27&dp=%2Fberita%2F27%2Fpembaruan-chrome-terbaru-google-memberikan-%27peningkatan-kinerja-terbesar-dalam-beberapa-tahun%27&ul=en-us&de=UTF-8&dt=Technogram%20%7C%20Technogram&sd=24-bit&sr=1366x768&vp=785x657&je=0&_u=SACAAEABEAAAAC~&jid=872011835&gjid=1768120127&cid=918668604.1608351452&tid=UA-183633936-2&_gid=1958359623.1611479511&_r=1&_slc=1&z=1082636518",
			"params": {
				"headers": {
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
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
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-816496e4.60ebafcd.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "put",
			"url": "https://technogram-api.technogram.tech/news/update-reader/27",
			"body": "{}",
			"params": {
				"headers": {
					"accept": "application/json, text/plain, */*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
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
			"url": "https://technogram-api.technogram.tech/news/27",
			"params": {
				"headers": {
					"accept": "application/json, text/plain, */*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
					"origin": "https://technogram.tech",
					"sec-fetch-site": "same-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9,id;q=0.8",
					"if-none-match": "W/\"dc5-8FJfZ8NkYez3Huvnmso+tNXTtpI\""
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
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
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
			"url": "https://technogram-api.technogram.tech/news/27",
			"params": {
				"headers": {
					"accept": "application/json, text/plain, */*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
					"origin": "https://technogram.tech",
					"sec-fetch-site": "same-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9,id;q=0.8",
					"if-none-match": "W/\"dc5-hezcPqV7IckamrHwlkyjCM9TIo0\""
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/kategori/get",
			"params": {
				"headers": {
					"accept": "application/json, text/plain, */*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
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
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/worksans/v8/QGYsz_wNahGAdqQ43Rh_fKDp.woff2",
			"params": {
				"headers": {
					"Origin": "https://technogram.tech",
					"Referer": "https://fonts.googleapis.com/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		}];
		res = http.batch(req);
		sleep(2.15);
		req = [{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/app/public/images/c0fc17de-d3bc-48e2-adc7-2a6656873137.webp",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/img/heart-empty.77681a7c.svg",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/img/view.01232f08.svg",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/img/unsaved-icon.d4b6dcf4.svg",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/img/share.cc60fa7e.svg",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/playfairdisplay/v21/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgA.woff2",
			"params": {
				"headers": {
					"Origin": "https://technogram.tech",
					"Referer": "https://fonts.googleapis.com/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/worksans/v8/QGYsz_wNahGAdqQ43Rh_fKDp.woff2",
			"params": {
				"headers": {
					"Origin": "https://technogram.tech",
					"Referer": "https://fonts.googleapis.com/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2",
			"params": {
				"headers": {
					"Origin": "https://technogram.tech",
					"Referer": "https://fonts.googleapis.com/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/app/public/images/c0fc17de-d3bc-48e2-adc7-2a6656873137.webp",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/news/?perpage=4&category=Software&page=1",
			"params": {
				"headers": {
					"accept": "application/json, text/plain, */*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
					"origin": "https://technogram.tech",
					"sec-fetch-site": "same-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9,id;q=0.8",
					"if-none-match": "W/\"1c0a-97/TQn57gl78kXiYW/VpcFBr4EI\""
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-045b8e8a.c05d9db5.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-045b8e8a.8bd1828b.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/css/chunk-0d1e95bb.ced24997.css",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-0d1e95bb.222f98b5.js",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/worksans/v8/QGYsz_wNahGAdqQ43Rh_fKDp.woff2",
			"params": {
				"headers": {
					"Origin": "https://technogram.tech",
					"Referer": "https://fonts.googleapis.com/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/app/public/images/6fbdffc4-03b0-4117-91b5-fa88566ddf55.webp",
			"params": {
				"headers": {
					"Referer": "https://technogram.tech/",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		}];
		res = http.batch(req);
		// Random sleep between 20s and 40s
		sleep(Math.floor(Math.random()*20+20));
	});

}
