import React, { useState } from "react";
import {
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonSkeletonText,
  IonImg,
  IonButton,
  IonText,
  IonAlert,
  AlertInput,
} from "@ionic/react";
import { trashBin } from "ionicons/icons";
import { useSelector, useDispatch } from "react-redux";
import { State, Repos } from "../types";
import trash from "./trash.svg";
import { Login } from "../util";
let List: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  let state = useSelector((state: State) => state);
  let dispatch = useDispatch();
  let repos: Array<Repos> = state.repos;
  const login = () => {
    if (state.login) {
      //logout
    } else {
      Login();
    }
  };

  let showList: boolean;
  if (repos.length && !state.repoLoading) {
    showList = true;
  } else {
    showList = false;
  }

  let select = (e: any) => {
    dispatch({
      type: "SELECTED",
      payload: {
        repo: e,
      },
    });
  };

  let refresh = (e: any) => {
      if(state.login){
        dispatch({ type: "GETREPO" });
        setTimeout(() => {
          e.detail.complete();
        }, 2000);
      }
      else{
        e.detail.complete();
      }
    
  };

  let alertInfo = {
    input: state.selected.map((item) => {
      return {
        name: "repo",
        type: "checkbox",
        label: item,
        checked: true,
        disabled: true,
      };
    }),
    message: state.selected.length ? "Sure to delete?" : "Nothing selected",
  };
  return (
    <IonContent>
      <IonRefresher slot="fixed" onIonRefresh={refresh} closeDuration="500ms">
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>

      <IonFab
        vertical="bottom"
        horizontal="center"
        slot="fixed"
        id="fab"
        onClick={() => setShowAlert(true)}
      >
        <IonFabButton>
          <IonIcon icon={trashBin} id="trashButton" />
        </IonFabButton>
      </IonFab>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={"Alert"}
        subHeader={"Delete Repos"}
        message={alertInfo.message}
        inputs={alertInfo.input as AlertInput[]}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
          },
          {
            text: "Okay",
            handler: () => {
                if(state.selected.length ){
                    dispatch({
                        type:"DELREPO"
                    })
                }
            
            },
          },
        ]}
      />
      <IonGrid>
        <IonRow>
          <IonCol sizeMd="10" sizeSm="12" pushMd="1">
            {" "}
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>{state.user?.toUpperCase()}</IonCardTitle>
              </IonCardHeader>
              {showList ? (
                <IonCardContent>
                  <IonList>
                    {!repos.length ? (
                      <IonItem>
                        <IonLabel>Nothing to show</IonLabel>
                      </IonItem>
                    ) : (
                      repos.map((item: Repos, i: number) => {
                        return (
                          <IonItem key={i} button>
                            <IonLabel>
                              <a href={item.html_url}>{item.name}</a>
                            </IonLabel>
                            <IonCheckbox
                              onClick={() => select(item.full_name)}
                            ></IonCheckbox>
                          </IonItem>
                        );
                      })
                    )}
                  </IonList>
                </IonCardContent>
              ) : state.repoLoading ? (
                <IonCardContent>
                  <IonSkeletonText
                    animated
                    style={{ width: "60%", height: "50px" }}
                  />
                  <IonSkeletonText
                    animated
                    style={{ width: "70%", height: "50px" }}
                  />
                  <IonSkeletonText
                    animated
                    style={{ width: "88%", height: "50px" }}
                  />
                  <IonSkeletonText
                    animated
                    style={{ width: "70%", height: "50px" }}
                  />
                  <IonSkeletonText
                    animated
                    style={{ width: "60%", height: "50px" }}
                  />
                </IonCardContent>
              ) : (
                <IonCardContent>
                  <IonRow className=" ion-align-items-center">
                    <IonCol sizeXs="12" sizeMd="6">
                      <IonImg src={trash} />
                      <IonText><h2>Delete Multiple Github Repositories</h2></IonText>
                    </IonCol>
                    <IonCol pushMd="3" pushXs="4">
                      <IonButton onClick={login}>Login</IonButton>
                    </IonCol>
                  </IonRow>
                </IonCardContent>
              )}{" "}
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default List;
