import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    {duration: '20s', target: 1},
    {duration: '30s', target: 100},
    {duration: '30s', target: 1000},
  ]
}

let generateRandomProduct = () => Math.floor((Math.random() * 100000) + 1);
let generateRandomQuestion = () => Math.floor((Math.random() * 100000) + 1);

export default function () {
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