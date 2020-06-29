import { call, put, takeEvery, all, select } from "redux-saga/effects";
import { Action } from "../types";
import store from "./store";

function* getRepos(action: Action) {
  try {
    let Token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));
    yield put({
      type: "REPOLOADING",
      payload: {
        loading: true,
      },
    });

    yield delay(3000);
    if (!user) {
      yield put({
        type: "AVATARLOADING",
        payload: {
          loading: true,
        },
      });
      yield put({
        type: "LOGINLOADING",
        payload: {
          loading: true,
        },
      });
      yield put({
        type: "GETUSER",
        payload: {
          token: Token,
        },
      });
    } else {
      yield put({
        type: "AVATARLOADING",
        payload: {
          loading: true,
        },
      });
      let myImage = new Image(100, 200);
      let url = `https://github.com/${user}.png`;
      myImage.src = url;
      myImage.onload = () => {
        let { dispatch } = store;
        dispatch({
          type: "AVATARLOADING",
          payload: {
            loading: false,
          },
        });
      };
    }

    let get = yield call(fetch, "https://api.github.com/user/repos", {
      headers: {
        Authorization: `token ${Token}`,
      },
      cache: "no-cache",
    });
    let repos = yield get.json();
    console.log(repos);
    repos = repos.map((item: any) => {
      let { full_name, html_url, name } = item;
      return { full_name, html_url, name };
    });
    yield put({
      type: "REPOLOADING",
      payload: {
        loading: false,
      },
    });
    yield put({
      type: "REPOS",
      payload: {
        repos,
      },
    });
  } catch (error) {
    yield put({
      type: "ERROR",
      payload: {
        error,
      },
    });
  }
}

function* deleteRepos() {
  try {
    yield put({
      type: "REPOLOADING",
      payload: {
        loading: true,
      },
    });
    let Token = localStorage.getItem("token");
    yield put({
      type: "DELETING",
      payload: {
        complete: false,
      },
    });

    let selected = yield select((val) => val.selected);
    console.log("selectec ccccccccccccccccis ", selected);
    let get = yield all(
      selected.map((item: any) => {
        console.log("raterererer");
        return call(fetch, `https://api.github.com/repos/${item}`, {
          headers: {
            Authorization: `token ${Token}`,
          },
          method: "DELETE",
        });
      })
    );
    console.log(get, "bbbbbbbbbbbbbbbbbbbbbbbbbb");
    yield put({
      type: "GETREPO",
    });
    yield put({
      type: "DELETING",
      payload: {
        complete: true,
      },
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: "ERROR",
      payload: {
        error,
      },
    });
  }
}
function* getUser(action: Action) {
  console.log("best is baest");
  try {
    let Token = action.payload.token;
    let get = yield call(fetch, "https://api.github.com/user", {
      headers: {
        Authorization: `token ${Token}`,
      },
      cache: "no-cache",
    });
    let user = yield get.json();
    console.log(`user iss ${user}`);
    localStorage.setItem("user", user.login);
    localStorage.setItem("login", "true");
    yield put({
      type: "LOGINLOADING",
      payload: {
        user: user.login,
        loading: false,
      },
    });
    let myImage = new Image(100, 200);
    let url = `https://github.com/${user.login}.png`;
    myImage.src = url;
    myImage.onload = () => {
      let { dispatch } = store;
      dispatch({
        type: "AVATARLOADING",
        payload: {
          loading: false,
        },
      });
    };
  } catch (error) {
    yield put({
      type: "ERROR",
      payload: error,
    });
  }
}

function* logOut() {
  yield put({ type: "RESET" });
  window.location.href = "https://github.com/logout";
}
export default function* watchSagas() {
  console.log("bat");
  yield takeEvery("GETREPO", getRepos);
  yield takeEvery("GETUSER", getUser);
  yield takeEvery("DELREPO", deleteRepos);
  yield takeEvery("LOGOUT", logOut);
}

function* rootSaga() {
  console.log("ben");
  yield all([watchSagas]);
}
