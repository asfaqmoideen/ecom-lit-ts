export class LoginAPIService{

    public expireInMins : number = 30;

    async tryLogin(user :User){
       const response =  await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: user.username,
              password: user.password,
              expiresInMins: this.expireInMins, 
            }),
          })
        
        return response.json();
    }

    async tryAuthenticatingUser(token :string | null){
       
        const response = await fetch('https://dummyjson.com/auth/me', {
            method: 'GET',
            headers: {
            'Authorization': token ? token : "",
            }, 
        })
        return response.json();
    }

    async tryRefreshingUserToke(refreshToken :string | null){
        const response = await fetch('https://dummyjson.com/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              refreshToken: refreshToken ? refreshToken : "", 
              expiresInMins: this.expireInMins,
            })
          })
          return response.json();
    }

}

type User = {
    username:string,
    password:string,
}