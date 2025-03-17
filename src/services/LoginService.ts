export class LoginAPIService{

    async tryLogin(user :User){
       const response =  await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: user.username,
              password: user.password,
              expiresInMins: 30, 
            }),
          })
        
        return response.json();
    }

    tryAuthenticatingUser(){
        fetch('https://dummyjson.com/auth/me', {
            method: 'GET',
            headers: {
            'Authorization': "das" 
            }, 
        })
        .then(res => res.json())
        .then(console.log);
    }

    tryRefreshingUserToke(){
        fetch('https://dummyjson.com/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              refreshToken: '/* YOUR_REFRESH_TOKEN_HERE */', 
              expiresInMins: 30,
            })
          })
          .then(res => res.json())
          .then(console.log);
    }

}

type User = {
    username:string,
    password:string,
}