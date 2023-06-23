import { CUSTOMER_LIST_RESPONSE } from '../types/customer.types.js'
import axios from 'axios'


export const getCustomerList = () => dispatch => {
  const url = 'https://jsonplaceholder.typicode.com/users'
  let options = Object.assign({ method: 'GET' })
  options.headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'accept': 'application/json'
  }
  options.url = url

  return axios(options).then(resp => {
    if (resp.status === 200 || resp.status === 201) {
      dispatch({ type: CUSTOMER_LIST_RESPONSE, payload: resp })
      return resp
    } else {
      return null
    }
  }).catch(error => {
    console.log(error)
    return;
  })
}
