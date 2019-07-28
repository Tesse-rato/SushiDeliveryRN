import Axios from 'axios';

export const baseURL = 'http://caserahost.ddns.net';

const api = Axios.create({ baseURL });

export function getDishes() {
  return new Promise((resolve, reject) => {
    api.get('/dishes')
      .then(({ data }) => resolve(data))
      .catch(({ response: { data: { error } } }) => reject(error));
  });
}