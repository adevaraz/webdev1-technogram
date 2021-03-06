import { group, sleep } from 'k6';
import http from 'k6/http';

// Version: 1.2
// Creator: WebInspector

export let options = {
    maxRedirects: 0,
    stages : [
        {target : 50, duration: "30s"},
        {target : 50,  duration: "1m"},
        {target : 0, duration: "30s"}
    ]
};

export default function() {

	group("page_1 - https://technogram.tech/search-result/recent?q=game", function() {
		let req, res;
		req = [{
			"method": "get",
			"url": "https://technogram.tech/search-result/recent?q=game",
			"params": {
				"cookies": {
					"_ga": "GA1.2.636285294.1608467147",
					"__cfduid": "da3bd80c07b6407de329c4d790a87f3b31609678802",
					"_gid": "GA1.2.1528077324.1611490072"
				},
				"headers": {
					"cache-control": "max-age=0",
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"sec-ch-ua-mobile": "?0",
					"upgrade-insecure-requests": "1",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
					"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
					"sec-fetch-site": "same-origin",
					"sec-fetch-mode": "navigate",
					"sec-fetch-user": "?1",
					"sec-fetch-dest": "document",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9"
				}
			}
		}];
		res = http.batch(req);
		sleep(0.52);
		req = [{
			"method": "get",
			"url": "https://technogram.tech/js/app.c4230451.js",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/search-result/recent?q=game",
					"sec-ch-ua-mobile": "?0",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-vendors.3e8956a4.js",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/search-result/recent?q=game",
					"sec-ch-ua-mobile": "?0",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"sec-ch-ua-mobile": "?0",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://ajax.cloudflare.com/cdn-cgi/scripts/7089c43e/cloudflare-static/rocket-loader.min.js",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"sec-ch-ua-mobile": "?0",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://fonts.googleapis.com/",
					"Origin": "https://technogram.tech",
					"sec-ch-ua-mobile": "?0",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://cdn.jsdelivr.net/npm/@mdi/font@latest/fonts/materialdesignicons-webfont.woff2?v=5.9.55",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css",
					"Origin": "https://technogram.tech",
					"sec-ch-ua-mobile": "?0",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit",
			"params": {
				"cookies": {
					"__Secure-3PAPISID": "OJJSxvhupvDmMJIs/AnTrqhIsAREYSOKzX",
					"__Secure-3PSID": "5wfLf08MxlMEFvY5ld_kLlNhW76C59IstzhLdA1qi4JTHCDNs6bpZdgNEk-JG-GqCIbTEw.",
					"ANID": "AHWqTUnR6FTGvBiZubIv6mtkVP_3IOudq3WQhXpIwX5_3i7rZbIfNXxd_SG_u9Lr",
					"1P_JAR": "2021-01-25-13",
					"NID": "207=QJk3xaa9gog6RmjxFsFUcBQR2kpSoYe7mboLcTGZqb0V4MimTgpHjm2kxMjtV9WBXB6kvuRaz7Kc1fjTUiStd-8HDuFelFYfBUaW0_AluPBrMQDt8iaS2-zfSw_0rFKc-aEQT-qndJPSE7pnqOTuBDxMUQXwXgjuWtE6daKptjz0Swj1e2TzniRFicLVfMCadkQztQ5VImm1Xsr6FcBV7npyRRm5Om8sbe-HSsv-85Ue50gecwOquDY8wjQ_Zb3j2b924KLjg2Hrh5x8JbL_veF4lzifJnF9iwpwK1HSaX4tjNmNfnlAj-ubtjoSki5PtAnzwNnSI9vKHry2aVnM3MP6id5WmdD9pLHZSLlgEwwAEbuE7QsP5XUFmUVwxQjuZW4WfWmhAoBV6EE",
					"__Secure-3PSIDCC": "AJi4QfGvV_ZuimAJUWhmpGOvALNVvwojX8OFotpRr1i1cadSEwN18ldOFgG60dokPHat80pRl8Tc"
				},
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"sec-ch-ua-mobile": "?0",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
					"accept": "*/*",
					"x-client-data": "CI+2yQEIpLbJAQjBtskBCKmdygEIusLKAQjGwsoBCKzHygEI98fKAQijzcoBCMbPygEI3NXKAQif1soBCJSaywEI1JzLAQipncsBCKudywEIrp3LARj6uMoB",
					"sec-fetch-site": "cross-site",
					"sec-fetch-mode": "no-cors",
					"sec-fetch-dest": "script",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://apis.google.com/js/platform.js",
			"params": {
				"cookies": {
					"__Secure-3PAPISID": "OJJSxvhupvDmMJIs/AnTrqhIsAREYSOKzX",
					"__Secure-3PSID": "5wfLf08MxlMEFvY5ld_kLlNhW76C59IstzhLdA1qi4JTHCDNs6bpZdgNEk-JG-GqCIbTEw.",
					"ANID": "AHWqTUnR6FTGvBiZubIv6mtkVP_3IOudq3WQhXpIwX5_3i7rZbIfNXxd_SG_u9Lr",
					"1P_JAR": "2021-01-25-13",
					"NID": "207=QJk3xaa9gog6RmjxFsFUcBQR2kpSoYe7mboLcTGZqb0V4MimTgpHjm2kxMjtV9WBXB6kvuRaz7Kc1fjTUiStd-8HDuFelFYfBUaW0_AluPBrMQDt8iaS2-zfSw_0rFKc-aEQT-qndJPSE7pnqOTuBDxMUQXwXgjuWtE6daKptjz0Swj1e2TzniRFicLVfMCadkQztQ5VImm1Xsr6FcBV7npyRRm5Om8sbe-HSsv-85Ue50gecwOquDY8wjQ_Zb3j2b924KLjg2Hrh5x8JbL_veF4lzifJnF9iwpwK1HSaX4tjNmNfnlAj-ubtjoSki5PtAnzwNnSI9vKHry2aVnM3MP6id5WmdD9pLHZSLlgEwwAEbuE7QsP5XUFmUVwxQjuZW4WfWmhAoBV6EE",
					"__Secure-3PSIDCC": "AJi4QfGvV_ZuimAJUWhmpGOvALNVvwojX8OFotpRr1i1cadSEwN18ldOFgG60dokPHat80pRl8Tc"
				},
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"sec-ch-ua-mobile": "?0",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
					"accept": "*/*",
					"x-client-data": "CI+2yQEIpLbJAQjBtskBCKmdygEIusLKAQjGwsoBCKzHygEI98fKAQijzcoBCMbPygEI3NXKAQif1soBCJSaywEI1JzLAQipncsBCKudywEIrp3LARj6uMoB",
					"sec-fetch-site": "cross-site",
					"sec-fetch-mode": "no-cors",
					"sec-fetch-dest": "script",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9",
					"if-none-match": "\"eb2fbae6edcd2bc185e6a8ef92044557\""
				}
			}
		},{
			"method": "get",
			"url": "https://www.google-analytics.com/analytics.js",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"sec-ch-ua-mobile": "?0",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
					"accept": "*/*",
					"sec-fetch-site": "cross-site",
					"sec-fetch-mode": "no-cors",
					"sec-fetch-dest": "script",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9",
					"if-modified-since": "Fri, 23 Oct 2020 03:00:57 GMT"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-6e83591c.eda48252.js",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/search-result/recent?q=game",
					"sec-ch-ua-mobile": "?0",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"sec-ch-ua-mobile": "?0",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-190c1127.38f192e7.js",
			"params": {
				"cookies": {
					"_ga": "GA1.2.636285294.1608467147",
					"__cfduid": "da3bd80c07b6407de329c4d790a87f3b31609678802",
					"_gid": "GA1.2.1528077324.1611490072"
				},
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"sec-ch-ua-mobile": "?0",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
					"accept": "*/*",
					"sec-fetch-site": "same-origin",
					"sec-fetch-mode": "no-cors",
					"sec-fetch-dest": "script",
					"referer": "https://technogram.tech/search-result/recent?q=game",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-af054090.f8f18cfc.js",
			"params": {
				"cookies": {
					"_ga": "GA1.2.636285294.1608467147",
					"__cfduid": "da3bd80c07b6407de329c4d790a87f3b31609678802",
					"_gid": "GA1.2.1528077324.1611490072"
				},
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"sec-ch-ua-mobile": "?0",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
					"accept": "*/*",
					"sec-fetch-site": "same-origin",
					"sec-fetch-mode": "no-cors",
					"sec-fetch-dest": "script",
					"referer": "https://technogram.tech/search-result/recent?q=game",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-4a4a9e2b.3d8ea520.js",
			"params": {
				"cookies": {
					"_ga": "GA1.2.636285294.1608467147",
					"__cfduid": "da3bd80c07b6407de329c4d790a87f3b31609678802",
					"_gid": "GA1.2.1528077324.1611490072"
				},
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"sec-ch-ua-mobile": "?0",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
					"accept": "*/*",
					"sec-fetch-site": "same-origin",
					"sec-fetch-mode": "no-cors",
					"sec-fetch-dest": "script",
					"referer": "https://technogram.tech/search-result/recent?q=game",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/technogram.ico",
			"params": {
				"cookies": {
					"_ga": "GA1.2.636285294.1608467147",
					"__cfduid": "da3bd80c07b6407de329c4d790a87f3b31609678802",
					"_gid": "GA1.2.1528077324.1611490072"
				},
				"headers": {
					"pragma": "no-cache",
					"cache-control": "no-cache",
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"sec-ch-ua-mobile": "?0",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
					"accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
					"sec-fetch-site": "same-origin",
					"sec-fetch-mode": "no-cors",
					"sec-fetch-dest": "image",
					"referer": "https://technogram.tech/search-result/recent?q=game",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://www.gstatic.com/recaptcha/releases/_KUxfxvAoJ4k7SaKyLbja4Mi/recaptcha__en.js",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"Origin": "https://technogram.tech",
					"sec-ch-ua-mobile": "?0",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://apis.google.com/_/scs/apps-static/_/js/k=oz.gapi.en.L7mys-cL6BM.O/m=analytics/rt=j/sv=1/d=1/ed=1/am=wQE/rs=AGLTcCPymG0XQrEqIOsFKina7y-Dy-g0lQ/cb=gapi.loaded_0",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"sec-ch-ua-mobile": "?0",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://apis.google.com/_/scs/apps-static/_/js/k=oz.gapi.en.L7mys-cL6BM.O/m=client/exm=analytics/rt=j/sv=1/d=1/ed=1/am=wQE/rs=AGLTcCPymG0XQrEqIOsFKina7y-Dy-g0lQ/cb=gapi.loaded_1",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"sec-ch-ua-mobile": "?0",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://apis.google.com/_/scs/apps-static/_/js/k=oz.gapi.en.L7mys-cL6BM.O/m=auth2/exm=analytics,client/rt=j/sv=1/d=1/ed=1/am=wQE/rs=AGLTcCPymG0XQrEqIOsFKina7y-Dy-g0lQ/cb=gapi.loaded_2",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"sec-ch-ua-mobile": "?0",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "post",
			"url": "https://technogram-api.technogram.tech/account/refresh",
			"body": "{}",
			"params": {
				"cookies": {
					"_ga": "GA1.2.636285294.1608467147",
					"__cfduid": "da3bd80c07b6407de329c4d790a87f3b31609678802",
					"_gid": "GA1.2.1528077324.1611490072",
					"refresh": "s%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDksInJvbGVzIjoiXCJwZW1iYWNhXCI7IiwiaWF0IjoxNjExNDkwMTA2LCJleHAiOjE2MTIwOTQ5MDZ9.syKb8XG49DI926po_UWo303ATnDQLPjCdDWGe99fzS4.G2dm5K%2BHQSBgHEER%2BEUNj6xGfRsBtF9wNxNqJAWEPic"
				},
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"accept": "application/json, text/plain, */*",
					"sec-ch-ua-mobile": "?0",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
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
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
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
			"url": "https://content.googleapis.com/static/proxy.html?usegapi=1&jsh=m%3B%2F_%2Fscs%2Fapps-static%2F_%2Fjs%2Fk%3Doz.gapi.en.L7mys-cL6BM.O%2Fam%3DwQE%2Fd%3D1%2Fct%3Dzgms%2Frs%3DAGLTcCPymG0XQrEqIOsFKina7y-Dy-g0lQ%2Fm%3D__features__",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"sec-ch-ua-mobile": "?0",
					"upgrade-insecure-requests": "1",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
					"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
					"x-client-data": "CI+2yQEIpLbJAQjBtskBCKmdygEIusLKAQjGwsoBCKzHygEI98fKAQijzcoBCMbPygEI3NXKAQif1soBCJSaywEI1JzLAQipncsBCKudywEIrp3LARj6uMoB",
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
		sleep(2.89);
		req = [{
			"method": "post",
			"url": "https://www.google-analytics.com/j/collect?v=1&_v=j87&a=308605048&t=pageview&_s=1&dl=https%3A%2F%2Ftechnogram.tech%2Fsearch-result%2Frecent%3Fq%3Dgame&dp=%2Fsearch-result%2Frecent%3Fq%3Dgame&ul=en-us&de=UTF-8&dt=Technogram%20%7C%20Technogram&sd=24-bit&sr=1366x768&vp=1349x273&je=0&_u=SACAAEABEAAAAC~&jid=641768599&gjid=1188212920&cid=636285294.1608467147&tid=UA-183633936-2&_gid=1528077324.1611490072&_r=1&_slc=1&z=269272904",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"sec-ch-ua-mobile": "?0",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
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
			"url": "https://technogram-api.technogram.tech/socket.io/?EIO=4&transport=polling&t=NSvvfao",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"accept": "*/*",
					"sec-ch-ua-mobile": "?0",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
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
			"url": "https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"sec-ch-ua-mobile": "?0",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-816496e4.60ebafcd.js",
			"params": {
				"cookies": {
					"_ga": "GA1.2.636285294.1608467147",
					"__cfduid": "da3bd80c07b6407de329c4d790a87f3b31609678802",
					"_gid": "GA1.2.1528077324.1611490072",
					"_gat": "1"
				},
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"sec-ch-ua-mobile": "?0",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
					"accept": "*/*",
					"sec-fetch-site": "same-origin",
					"sec-fetch-mode": "no-cors",
					"sec-fetch-dest": "script",
					"referer": "https://technogram.tech/search-result/recent?q=game",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/worksans/v8/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32KxfXBi8Jpg.woff2",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://fonts.googleapis.com/",
					"Origin": "https://technogram.tech",
					"sec-ch-ua-mobile": "?0",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/news/recent?perpage=5&key=game&page=1",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"accept": "application/json, text/plain, */*",
					"sec-ch-ua-mobile": "?0",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
					"origin": "https://technogram.tech",
					"sec-fetch-site": "same-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9",
					"if-none-match": "W/\"40d3-F9WRCRR2uGs+ygCeWPyGIjM4i+M\""
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/worksans/v8/QGYsz_wNahGAdqQ43Rh_fKDp.woff2",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://fonts.googleapis.com/",
					"Origin": "https://technogram.tech",
					"sec-ch-ua-mobile": "?0",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/img/technogram-logo.e6f72784.svg",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/search-result/recent?q=game",
					"sec-ch-ua-mobile": "?0",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/img/search-icon.ff67bb68.svg",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/search-result/recent?q=game",
					"sec-ch-ua-mobile": "?0",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/img/bell.1fef3135.svg",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/search-result/recent?q=game",
					"sec-ch-ua-mobile": "?0",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/img/profile.c4f6c7ce.svg",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/search-result/recent?q=game",
					"sec-ch-ua-mobile": "?0",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/kategori/get",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"accept": "application/json, text/plain, */*",
					"sec-ch-ua-mobile": "?0",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
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
		}];
		res = http.batch(req);
		sleep(0.94);
		req = [{
			"method": "post",
			"url": "https://technogram-api.technogram.tech/socket.io/?EIO=4&transport=polling&t=NSvvftT&sid=XW7dhe9aKR0fgdhVAAHH",
			"body": "40",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"accept": "*/*",
					"sec-ch-ua-mobile": "?0",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
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
			"url": "https://technogram-api.technogram.tech/socket.io/?EIO=4&transport=polling&t=NSvvftk&sid=XW7dhe9aKR0fgdhVAAHH",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"accept": "*/*",
					"sec-ch-ua-mobile": "?0",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
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
			"url": "https://technogram.tech/js/chunk-cf2630f2.3114aae4.js",
			"params": {
				"cookies": {
					"_ga": "GA1.2.636285294.1608467147",
					"__cfduid": "da3bd80c07b6407de329c4d790a87f3b31609678802",
					"_gid": "GA1.2.1528077324.1611490072",
					"_gat": "1"
				},
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"sec-ch-ua-mobile": "?0",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
					"accept": "*/*",
					"sec-fetch-site": "same-origin",
					"sec-fetch-mode": "no-cors",
					"sec-fetch-dest": "script",
					"referer": "https://technogram.tech/search-result/recent?q=game",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,900;1,400&display=swap",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"sec-ch-ua-mobile": "?0",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/js/chunk-d3eec5d0.7a7136e4.js",
			"params": {
				"cookies": {
					"_ga": "GA1.2.636285294.1608467147",
					"__cfduid": "da3bd80c07b6407de329c4d790a87f3b31609678802",
					"_gid": "GA1.2.1528077324.1611490072",
					"_gat": "1"
				},
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"sec-ch-ua-mobile": "?0",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
					"accept": "*/*",
					"sec-fetch-site": "same-origin",
					"sec-fetch-mode": "no-cors",
					"sec-fetch-dest": "script",
					"referer": "https://technogram.tech/search-result/recent?q=game",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9"
				}
			}
		},{
			"method": "get",
			"url": "https://fonts.gstatic.com/s/playfairdisplay/v21/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgA.woff2",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://fonts.googleapis.com/",
					"Origin": "https://technogram.tech",
					"sec-ch-ua-mobile": "?0",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram.tech/img/heart-filled.51585115.svg",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/search-result/recent?q=game",
					"sec-ch-ua-mobile": "?0",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/app/public/images/e7a72f33-c805-46d3-a6a3-7305c77b66fb.webp",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"sec-ch-ua-mobile": "?0",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/app/public/images/ee25f059-fcbc-4731-9294-5f42f859801d.webp",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"sec-ch-ua-mobile": "?0",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/app/public/images/d83ef584-1983-4b91-93a1-853a0037933b.webp",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"sec-ch-ua-mobile": "?0",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/app/public/images/45faaba0-e6f2-4c3c-b1c4-b3531937790f.webp",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"sec-ch-ua-mobile": "?0",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "https://technogram-api.technogram.tech/app/public/images/d99b7779-898c-4d3b-9be6-95ce91d33df0.webp",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/",
					"sec-ch-ua-mobile": "?0",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "get",
			"url": "wss://technogram-api.technogram.tech/socket.io/?EIO=4&transport=websocket&sid=XW7dhe9aKR0fgdhVAAHH",
			"params": {
				"headers": {
					"Pragma": "no-cache",
					"Origin": "https://technogram.tech",
					"Accept-Encoding": "gzip, deflate, br",
					"Host": "technogram-api.technogram.tech",
					"Accept-Language": "en-US,en;q=0.9",
					"Sec-WebSocket-Key": "fFGqQgSRcSVZpdzjqfY1RQ==",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
					"Upgrade": "websocket",
					"Sec-WebSocket-Extensions": "permessage-deflate; client_max_window_bits",
					"Cache-Control": "no-cache",
					"Connection": "Upgrade",
					"Sec-WebSocket-Version": "13"
				}
			}
		},{
			"method": "post",
			"url": "https://technogram-api.technogram.tech/socket.io/?EIO=4&transport=polling&t=NSvvf_X&sid=XW7dhe9aKR0fgdhVAAHH",
			"body": "42[\"room\",\"video game\"]",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"accept": "*/*",
					"sec-ch-ua-mobile": "?0",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
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
			"url": "https://technogram-api.technogram.tech/socket.io/?EIO=4&transport=polling&t=NSvvf_b&sid=XW7dhe9aKR0fgdhVAAHH",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"accept": "*/*",
					"sec-ch-ua-mobile": "?0",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
					"origin": "https://technogram.tech",
					"sec-fetch-site": "same-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"referer": "https://technogram.tech/",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-US,en;q=0.9"
				}
			}
		}];
		res = http.batch(req);
		// Random sleep between 20s and 40s
		sleep(Math.floor(Math.random()*20+20));
	});

}
