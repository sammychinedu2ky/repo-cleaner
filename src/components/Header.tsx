import React, { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonMenuButton,
  IonTitle,
  IonIcon,
  IonText,
  IonAvatar,
  IonAlert,
} from "@ionic/react";
import {
  images,
  ellipse,
  square,
  triangle,
  trashBin,
  logIn,
  logInOutline,
  gitMergeOutline,
  logoGithub,
  add,
  gitBranchOutline,
  logOutOutline,
} from "ionicons/icons";
import "./index.css";
import Menu from "./Menu";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../types";
import { checkLogin } from "../redux/reducers/index";
import store from "../redux/store";
import { Login } from "../util";

let Header: React.FC = () => {
  let dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);

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
      setShowAlert(true);
    } else {
      Login();
    }
  };
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle slot="start">
            <IonIcon id="repoIcon" icon={gitBranchOutline} color="primary" />
            <IonText color="primary">
              <span id="repoTitle">Repo Cleaner</span>
            </IonText>
          </IonTitle>

          <IonText
            slot="primary"
            className="ion-margin ion-hide-md-down"
            onClick={login}
          >
            <a target="_blank">{details.text}</a>
          </IonText>

          <IonText slot="primary" className="ion-margin">
            <a href="https://github.com/sammychinedu2ky/repo-cleaner" target="_blank">
              <IonIcon icon={logoGithub} />
            </a>
          </IonText>
          <IonAvatar
            id="avatar"
            slot="primary"
            className="ion-padding ion-hide-md-down"
          >
            <img id="avatarImg" src={state.avatar} />
          </IonAvatar>
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header={"Alert"}
            subHeader={"Signout"}
            message={
              "You would be redirected to github to finish the signout process"
            }
            buttons={[
              {
                text: "Cancel",
                role: "cancel",
                cssClass: "secondary",
              },
              {
                text: "Okay",
                handler: () => {
                  dispatch({ type: "LOGOUT" });
                },
              },
            ]}
          />
        </IonToolbar>
      </IonHeader>
      <Menu />
    </>
  );
};

export default Header;
