import { IonAvatar } from '@ionic/react';
/**
 * This is the interface of the Repos Array
 * ```
 * export interface Repos {
    full_name: string
    html_url: string
    name: string
}
 * ```
 */
export interface Repos {
    full_name: string
    html_url: string
    name: string
}



let repos: Array<Repos> = [
    {
        full_name: 'sam',
        html_url: 'samm',
        name: "hello"
    },
    {
        full_name:'man',
        html_url:'cat',
        name:'bal'
    },
]


/**
 * This is the state of this project
 * ```
 * interface State{
   login: boolean
    user: string|null
    loginLoading: boolean
    repos:Array<Repos>
    repoLoading: boolean
    avatar: string
    token: string | boolean
    selected: string[]
    error:any
    avatarLoading: boolean
    showToast: boolean
}
 * ```
 
 */
export interface State {
    login: boolean
    user: string|null
    loginLoading: boolean
    repos:Array<Repos>
    repoLoading: boolean
    avatar: string
    token: string | boolean
    selected: string[]
    error:any
    avatarLoading: boolean
    showToast:boolean
}
/**
 * Actions for redux
 * ```
 *  type: string
    [propName: string]: any
   ```
 * 
 */
export interface Action {
    type: string
    [propName: string]: any;
}
let action: Action = {
    type: 'eat',
    payload: 3,
    man: 4
}

