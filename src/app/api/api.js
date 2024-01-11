import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8055',
  // คุณสามารถกำหนดค่าอื่น ๆ ตามต้องการ, เช่น headers, timeout, etc.
});

export default instance;