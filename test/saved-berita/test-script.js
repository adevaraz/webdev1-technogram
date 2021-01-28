import { group, sleep } from 'k6';
import http from 'k6/http';

// Version: 1.2
// Creator: WebInspector

export let options = {
    maxRedirects: 0,
	stages: [
	{ target: 50, duration: "30s"},
	{ target: 50, duration: "1m"},
	{ target: 50, duration: "1m"},
	{ target: 0, duration: "30s"}
	]
};

export default function() {

	group("Global", function() {
		let req, res;
		req = [{
			"method": "post",
			"url": "https://technogram-api.technogram.tech/account/save-news?news=27",
			"body": "{}",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"accept": "application/json, text/plain, */*",
					"authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMsInJvbGVzIjoiXCJwZW1iYWNhXCI7IiwiaWF0IjoxNjExNTg2NTc1LCJleHAiOjE2MTE1OTM3NzV9.aNmSDfl5yGR1Gdfb2KKid-akpEF0Dc2WwM4kV5CQrzk",
					"sec-ch-ua-mobile": "?0",
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
			"url": "https://technogram.tech/img/saved-icon.ef131d8e.svg",
			"params": {
				"headers": {
					"sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
					"Referer": "https://technogram.tech/berita/27/pembaruan-chrome-terbaru-google-memberikan-'peningkatan-kinerja-terbesar-dalam-beberapa-tahun'",
					"sec-ch-ua-mobile": "?0",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
				}
			}
		},{
			"method": "options",
			"url": "https://technogram-api.technogram.tech/account/save-news?news=27",
			"params": {
				"headers": {
					"accept": "*/*",
					"access-control-request-method": "POST",
					"access-control-request-headers": "authorization,content-type",
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
		}];
		res = http.batch(req);
		// Random sleep between 20s and 40s
		sleep(Math.floor(Math.random()*20+20));
	});

}
