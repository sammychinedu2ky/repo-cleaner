import React from 'react';
import netlfiy from 'netlify-auth-providers';

let Token;
export async function Login() {
   
    return new Promise((resolve, reject) => {
        let authenticator = new netlfiy({
            site_id: 'a0c5f142-3712-47a1-8ff7-f15eeac2dd01'
        })
        authenticator.authenticate({
            provider: 'github',
            scope: 'user,delete_repo'
        },
            function (err, data) {
                if (err) {
                    reject(err)
                }
                resolve(data)
                console.log(data.token)
                Token = data.token;
            })
    })

}
export async function GetRepo() {

    const response = await fetch("https://api.github.com/user/repos",
        {
            headers: {
                Authorization: `token ${Token}`,
            },
            cache: "no-cache"
        })
    let repos = await response.json();
    console.log(Token)

    return repos


}
export async function DelRepo(name) {
    console.log(Token)
    const make = await fetch(`https://api.github.com/repos/${name}`, {
        headers: {
            Authorization: `token ${Token}`
        },
        method: 'DELETE'
    })
    return Promise.resolve(make.status)
}

