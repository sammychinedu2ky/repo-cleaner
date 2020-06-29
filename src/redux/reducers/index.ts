import { State, Action } from '../../types';
import store from '../store'

export let checkLogin: string|null = localStorage.getItem("login")
let token:string|null = localStorage.getItem("token")
let checkUser:string|null = localStorage.getItem("user")


const init: State = {
    login: !!checkLogin,
    loginLoading: false,
    repoLoading: false,
    repos: [],
    user:checkUser ,
    avatar: './dummy.png',
    token: !!token,
    selected: [],
    error:false,
    avatarLoading:false,
    showToast: false
}

const reset:State={
    login: false,
    loginLoading: false,
    repoLoading: false,
    repos: [],
    user: null ,
    avatar: './dummy.png',
    token: false,
    selected: [],
    error:false,
    avatarLoading:false,
    showToast:false
}




export default function (state: State = init, action: Action):State{
    console.log('in reducer')
    switch (action.type) {
        case 'LOGIN': {
            const { val } = action.payload
            return { ...state }
        }
        case 'LOGINLOADING': {
            const { user,loading } = action.payload
            
            return { ...state, user,loginLoading:loading,login:true }
        }
        case 'REPOLOADING': {
            const { loading } = action.payload
            console.log('chikn',loading)
            return { ...state, repoLoading:loading }
        }
        case 'AVATARLOADING':{
            const {loading} =action.payload
            let user:string|null
            if(loading){
                user='./loader.gif'
            }
            else{
                let get = localStorage.getItem('user')
                user =  `https://github.com/${get}.png`

            }
             
            return {...state,avatar:user}
        }
       
        case 'REPOS': {
            const { repos } = action.payload
            return { ...state, repos }
        }
        case 'SHOWTOAST': {
            const { showToast } = action.payload
            return { ...state,showToast }
        }
        case 'AVATAR': {
            const { val } = action.payload
            return { ...state, }
        }
        case 'TOKEN': {
            const { val } = action.payload
            return { ...state,  }
        }
        case 'SELECTED': {
            const {repo} = action.payload
            let arr = [...state.selected]
            if(arr.includes(repo)){
                arr=arr.filter(item=>item!=repo)
            }
            else {
                arr = [...state.selected,repo]
            }
            console.log(arr)
            return { ...state, selected:arr }
        }
        case 'DELETING': {
            const { complete } = action.payload
            let selected=[...state.selected]
            if(complete){
                selected=[]
            }
            return { ...state ,showToast:complete,selected}
        }
        case 'RESET':{
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            localStorage.removeItem("login")
            return {...reset}
        }
        default: {
            return state
        }
    }
}


