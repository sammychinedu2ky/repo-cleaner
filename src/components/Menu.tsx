import React from "react";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAvatar,
  IonText,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonSpinner,
} from "@ionic/react";
import {
  logInOutline,
  gitMergeOutline,
  logoGithub,
  logOutOutline,
} from "ionicons/icons";
import { useStore, useSelector, useDispatch } from "react-redux";
import dummy from "./dummy.png";
import loader from "./loader.gif";
import { State } from "../types";
import { Login } from "../util";

let Menu: React.FC = () => {
  let dispatch = useDispatch();
  let state = useSelector((state: State) => state);
  let details = {
    text: "Login",
    icon: logInOutline,
  };
  if (state.user) {
    details.text = "Signout";
    details.icon = logOutOutline;
  } else {
    details.text = "Login";
    details.icon = logInOutline;
  }

  const login = () => {
    if (state.login) {
      dispatch({ type: "LOGOUT" });
    } else {
      Login();
    }
  };

  return (
    <>
      <IonMenu side="start" contentId="first" menuId="first">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Repo Cleaner</IonTitle>
          </IonToolbar>
        </IonHeader>
        <span id="first"></span>
        <IonContent>
          <IonAvatar className="ion-margin ">
            <img src={state.avatar} />
          </IonAvatar>
          <IonText class="ion-margin">{state.user}</IonText>
          <IonList>
            <IonItem onClick={login}>
              <a>
                <IonIcon icon={details.icon} className="ion-margin-end" />
                {details.text}
              </a>
            </IonItem>

            <IonItem>
              <a href="https://www.google.com" target="_blank">
                <IonIcon icon={logoGithub} className="ion-margin-end" />
                Fork@GitHub
              </a>
            </IonItem>
          </IonList>
          
        </IonContent>
      </IonMenu>
    </>
  );
};

export default Menu;
