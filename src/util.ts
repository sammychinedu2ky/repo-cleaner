import netlify from 'netlify-auth-providers';
import store from './redux/store'

let Token:string;
export async function Login() {
   
    return new Promise((resolve, reject) => {
        let authenticator = new netlify({site_id:"1c615e80-7fa1-4098-9db2-220a28d556cf"})
        authenticator.authenticate({
            provider: 'github',
            scope: 'user,delete_repo'
        },
            function (err:any, data:any) {
                if (err) {
                    reject(err)
                }
                
                console.log(data.token)
                Token = data.token;
                localStorage.setItem("token",Token)
                store.dispatch({
                    type:"GETREPO",
                    payload:{
                        Token
                    }
                })
                console.log('ben')
                resolve(data)
            })
    })

}
