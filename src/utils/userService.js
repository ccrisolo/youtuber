import tokenService from './tokenService';
const BASE_URL = '/api/users/';


// function signup(user) {
//     return fetch(BASE_URL + 'signup', {
//       method: 'POST',
//       headers: new Headers({'Content-Type': 'application/json'}),
//       body: JSON.stringify(user)
//     })
//     .then(res => {
//       console.log(res);
//       if (res.ok) return res.json();
//       throw new Error('Email already taken!');
//     })
//     // Parameter destructuring!
//     .then(({token}) => {
//         tokenService.setToken(token);
//     });
//   }

async function signup(user) {
  try {
      const response = await fetch(BASE_URL + 'signup', {
          method: 'POST',
          headers: new Headers({'Content-Type': 'application/json'}),
          body: JSON.stringify(user)
      });

      console.log(response);

      if (response.ok) {
          const { token } = await response.json();
          tokenService.setToken(token);
      } else {
          throw new Error('Email already taken!');
      }
  } catch (error) {
      console.error('Error during signup:', error);
      throw error; // Re-throw the error if you need it to be handled further up the call stack
  }
}


  function getUser() {
    return tokenService.getUserFromToken();
  }


    function logout() {
        tokenService.removeToken();
    }

    // function login(creds) {
    //     return fetch(BASE_URL + 'login', {
    //       method: 'POST',
    //       headers: new Headers({'Content-Type': 'application/json'}),
    //       body: JSON.stringify(creds)
    //     })
    //     .then(res => {
    //       // Valid login if we have a status of 2xx (res.ok)
    //       if (res.ok) return res.json();
    //       throw new Error('Bad Credentials!');
    //     })
    //     .then(({token}) => tokenService.setToken(token));
    //   }

    async function login(creds) {
      try {
          const response = await fetch(BASE_URL + 'login', {
              method: 'POST',
              headers: new Headers({'Content-Type': 'application/json'}),
              body: JSON.stringify(creds)
          });
  
          // Check if the response is ok (status code in the range 200-299)
          if (response.ok) {
              const { token } = await response.json();
              tokenService.setToken(token);
          } else {
              throw new Error('Bad Credentials!');
          }
      } catch (error) {
          console.error('Error during login:', error);
          throw error; // Re-throw the error if you need it to be handled further up the call stack
      }
  }
  
      
export default {
    signup,
    getUser,
    logout,
    login
}