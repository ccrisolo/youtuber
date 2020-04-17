// write a function thats a fetch req to my backend , make it a POST req,
import tokenService from './tokenService'
const BASE_URL = '/api/favorites'


export function getAll() {
  return fetch(BASE_URL)
  .then(res => res.json());
}

export function create(formData) {
  console.log(formData, 'formData');
    return fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        // Add this header - don't forget the space after Bearer
        'Authorization': 'Bearer ' + tokenService.getToken()
      },
      body: JSON.stringify(formData)
    }).then(res => res.json());
  }
  
 