import React, {useState,useContext} from "react";
import styled from "styled-components"
import Modal from "./Modal";
import TextInput from "../components/TextInput";
import Button from "../components/Button"
import firebase from "firebase";
import {AuthContext} from "../Auth";
import Context from "../store/context";
import { HuePicker } from 'react-color';

const StyledButton = styled(Button)`
  height:48px;
`;
const StyledHuePicker = styled(HuePicker)`
  margin:2em auto;
  
  div{
    border-radius: 10px !important;
  }
`;

const AddSubject = ({closingFn}) => {
    const {currentUser} = useContext(AuthContext);
    const {actions} = useContext(Context);
    const [formData, setFormData] = useState({
        title: '',
        color: '',
    });

    const handleChangeComplete = (col) => {
        setFormData({...formData,color:col.hex})
    };

    return <Modal closingFn={closingFn}>
        <TextInput title={"Nazwa przedmiotu"} changeHandle={(e)=>setFormData({...formData,title:e})}/>
        {/*<TextInput title={"Kolor przedmiotu"} changeHandle={(e)=>setFormData({...formData,color:e})}/>*/}
        <StyledHuePicker
            color={ formData.color }
            onChange={ handleChangeComplete }
        />
        <StyledButton color={formData.color} yes onClick={async()=>{
            const dbRef = firebase.firestore().collection('users').doc(currentUser.uid);
            dbRef.update({
                subjects: firebase.firestore.FieldValue.arrayUnion({
                    title:formData.title,
                    color:formData.color.substring(1)
                })
            });
            const data = await firebase.firestore().collection('users').doc(currentUser.uid).get().then(doc => doc.data());
            actions({
                type: 'setState',
                payload: data
            });
            closingFn();
        }}>Dodaj</StyledButton>
    </Modal>
};

export default AddSubject;