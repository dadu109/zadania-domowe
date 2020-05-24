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
const ErrorMessage = styled.div`
  color:${props => props.theme.color.red};
  text-align: center;
  font-weight: bold;
  font-size: 1.2em;
  margin: 1em 0 0 0;
`;

const AddSubject = ({closingFn}) => {
    const {currentUser} = useContext(AuthContext);
    const {actions} = useContext(Context);
    const [error,setError] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        color: '#0086ff',
    });

    const handleChangeComplete = (col) => {
        setFormData({...formData,color:col.hex})
    };

    return <Modal closingFn={closingFn}>
        <TextInput title={"Nazwa przedmiotu"} changeHandle={(e)=> {
            setFormData({...formData, title: e});
            setError(null);
        }}/>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <StyledHuePicker
            color={ formData.color }
            onChange={ handleChangeComplete }
        />
        <StyledButton color={formData.color} yes onClick={async()=>{
            const dbRef = await firebase.firestore().collection('users').doc(currentUser.uid);
            const {subjects} = await dbRef.get().then(doc => doc.data());
            if(subjects && subjects.some(e => e.title === formData.title)){
                setError('Taki przedmiot już istnieje');
            }else if(formData.title.length>15){
                setError('Nazwa przedmiotu nie może mieć więcej niż 15 znaków');
            }else if(formData.title===''){
                setError('Przedmiot musi posiadać nazwę');
            }else{
                dbRef.update({
                    subjects: firebase.firestore.FieldValue.arrayUnion({
                        title:formData.title,
                        color:formData.color.substring(1)
                    })
                });
                const data = await dbRef.get().then(doc => doc.data());
                actions({
                    type: 'setState',
                    payload: data
                });
                closingFn();
            }
        }}>Dodaj</StyledButton>
    </Modal>
};

export default AddSubject;