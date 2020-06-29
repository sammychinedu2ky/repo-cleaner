import {createStore, applyMiddleware,compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers'
import rootSaga from './saga';
import { checkLogin } from './reducers/index';

const middleWare = createSagaMiddleware()
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let  store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(middleWare)

    )
)
middleWare.run(rootSaga)
if(checkLogin){
    store.dispatch({
        type:"GETREPO"
    })
}
export default store