import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './Home.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import List from '../components/List'

const Home: React.FC = () => {
  return (
    <IonPage>
      <Header/>
      <List/>
      <Footer/>
    </IonPage>
  );
};

export default Home;
