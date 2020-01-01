import { login } from './controller/login';



export default [
  {
    path: '/api/login',
    method: 'post',
    action: login,
  },
];
