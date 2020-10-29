import axios from 'axios';

export const createEmail = data => {
  return axios.post('/api/sendgrid/new', data)
}
