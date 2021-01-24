import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 20 },
        { duration: '20', target: 10 },
        { duration: '10s', target: 0 }
    ]
};

export default function () {
    const BASE_URL = "https://technogram-api.technogram.tech"

    group('', function () {
    
    });
}
