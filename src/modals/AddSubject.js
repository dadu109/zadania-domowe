import React, {useState,useContext} from "react";
import styled from "styled-components"
import Modal from "./Modal";
import TextInput from "../components/TextInput";
import Button from "../components/Button"
import firebase from "firebase";
import {AuthContext} from "../Auth";
import Context from "../store/context";

const StyledButton = styled(Button)`
  height:48px;
`;


const AddSubject = ({closingFn}) => {
    const {currentUser} = useContext(AuthContext);
    const {actions} = useContext(Context);
    const [formData, setFormData] = useState({
        title: '',
        color: '',
    });

    return <Modal closingFn={closingFn}>
        <TextInput title={"Nazwa przedmiotu"} changeHandle={(e)=>setFormData({...formData,title:e})}/>
        <TextInput title={"Kolor przedmiotu"} changeHandle={(e)=>setFormData({...formData,color:e})}/>
        <StyledButton yes onClick={async()=>{
            const dbRef = firebase.firestore().collection('users').doc(currentUser.uid);
            dbRef.update({
                subjects: firebase.firestore.FieldValue.arrayUnion({
                    title:formData.title,
                    color:formData.color
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