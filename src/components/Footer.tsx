import React from 'react'
import { IonToast } from '@ionic/react'
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../types';

let Footer:React.FC= ()=>{
    let showToast = useSelector((state:State)=>state.showToast)
    return(
        <>
            <IonToast
        isOpen={showToast}
        message="Deletion completed"
        duration={200}
       />
        </>
    )
    }

export default Footer