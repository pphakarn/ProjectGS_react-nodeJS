import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 100 },
    { duration: '2m', target: 150 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // ขอให้ Error น้อยกว่า 1%
    http_req_duration: ['p(95)<500'], // 95% ของ Request ต้องตอบกลับใน 0.5 วินาที
  },
};

export default function () {
  let res = http.get('http://a6033c0c47b864a2da8be7492fcf8988-86221655358c006a.elb.ap-southeast-1.amazonaws.com/api');
  
  // เพิ่ม Check เพื่อดูว่าพังเพราะอะไร
  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1); // ปรับเป็น 1 วินาทีเพื่อให้สมจริง
}