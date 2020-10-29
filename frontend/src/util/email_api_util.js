import axios from 'axios';

export const createEmail = data => {
  return axios.post('/api/emails/new', data)
}
