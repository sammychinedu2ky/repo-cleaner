import React, { useState } from "react";
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
  
  IonAlert,
} from "@ionic/react";
import {
  logInOutline,
  gitMergeOutline,
  logoGithub,
  logOutOutline,
} from "ionicons/icons";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../types";
import { Login } from "../util";

let Menu: React.FC = () => {
  let dispatch = useDispatch();
  let state = useSelector((state: State) => state);
  const [showAlert, setShowAlert] = useState(false);

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
      <IonMenu side="start" contentId="first" menuId="first">
        <IonHeader color="primary">
          <IonToolbar color="primary">
            <IonTitle>Repo Cleaner</IonTitle>
          </IonToolbar>
        </IonHeader>
        <span id="first"></span>
        <IonContent>
          <IonAvatar className="ion-margin ">
            <img src={state.avatar} alt='avatar' />
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
              <a href="https://github.com/sammychinedu2ky/repo-cleaner" target="_blank">
                <IonIcon icon={logoGithub} className="ion-margin-end" />
                Fork@GitHub
              </a>
            </IonItem>
          </IonList>
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
        </IonContent>
      </IonMenu>
    </>
  );
};

export default Menu;
