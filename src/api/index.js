import Axios from 'axios';

export const baseURL = 'http://192.168.1.2:3000';

const api = Axios.create({ baseURL });

export function getDishes() {
  return new Promise((resolve, reject) => {
    api.get('/dishes')
      .then(({ data }) => resolve(data))
      .catch(({ response: { data: { error } } }) => { reject(error); alert("Erro na internet") });
  });
}