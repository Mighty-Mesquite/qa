import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 100 }, // below normal load
    { duration: '1m', target: 100 },
    { duration: '10s', target: 1400 }, // spike to 1400 users
    { duration: '1m', target: 1400 }, // stay at 1400 for 3 minutes
    { duration: '10s', target: 100 }, // scale down. Recovery stage.
    { duration: '1m', target: 100 },
    { duration: '10s', target: 0 },
  ],
};

let generateRandomProduct = () => Math.floor((Math.random() * 100000) + 1);
let generateRandomQuestion = () => Math.floor((Math.random() * 100000) + 1);

export default function() {
  const product_id = generateRandomProduct();
  const question_id = generateRandomQuestion();
  const url = 'http://localhost:3000/';

  let res = http.batch([
    [
      'GET',
      `${url}qa/questions?product_id=${product_id}`,
      null,
      {},
    ],
    [
      'GET',
      `${url}qa/questions/${question_id}/answers`,
      null,
      {},
    ]
  ]);
  check(res, {'status was 200': (r) => r.status == 200});
  sleep(1);
}