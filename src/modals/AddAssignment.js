import React, {useState,useContext} from "react";
import styled from "styled-components";
import Modal from "./Modal";
import TextInput from "../components/TextInput";
import TextArea from "../components/TextArea";
import DateInput from "../components/DateInput";
import SubjectPicker from "../components/SubjectPicker";
import TimeInput from '../components/TimeInput'
import Button from "../components/Button";
import firebase from "firebase";
import {AuthContext} from "../Auth";
import Context from "../store/context";

const Header = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  h4{
    margin:0;
    color:#fff;
    font-weight: bold;
    font-size: 18px;
  }
`;
const Close = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color:${props => props.theme.color.dark3};
  color:#fff;
  font-size: 36px;
  transform: rotate(45deg);
  position:relative;
  span{
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
  }
`;
const Flex = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: stretch;
  position: relative;
`;
const StyledButton = styled(Button)`
  position: absolute;
  right:0;
  height:100%;
  width:48%
`;
const StyledTimeInput = styled(TimeInput)`
  width:48%
`;

const AddAssignment = ({closingFn}) => {
    const {state,actions} = useContext(Context);
    const {currentUser} = useContext(AuthContext);

    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        subject: state.subjects[0].title,
        date: {},
        time: {}
    });

    return <Modal closingFn={closingFn}>
        <Header>
            <h4>Dodaj zadanie</h4>
            <Close onClick={() => {
                closingFn()
            }}>
                <span>+</span>
            </Close>
        </Header>
        <TextInput
            changeHandle={(e) => {
                if (formData.title.length <= 25) {
                    setFormData({...formData, title: e})
                }
            }}
            value={formData.title}
            title="Tytuł"
        />
        <TextArea
            changeHandle={(e) => {
                if (formData.title.length <= 100) {
                    setFormData({...formData, desc: e})
                }
            }}
            value={formData.desc}
            cols="20"
            title="Opis zadania"
        />
        <SubjectPicker
            title="Wybierz przedmiot"
            changeHandle={(curr) => {
                setFormData({...formData, subject: curr})
            }}
            options={state.subjects}
        />
        <DateInput title="Data" changeHandle={date => {
            setFormData({...formData, date: date})
        }}/>
        <Flex>
            <StyledTimeInput
                title="Do której"
                changeHandle={(time) => {
                    setFormData({...formData, time: time})
                }}
            />
            <StyledButton yes onClick={async ()=> {

                const dbRef = firebase.firestore().collection('users').doc(currentUser.uid);
                dbRef.update({
                    assignments: firebase.firestore.FieldValue.arrayUnion({
                        title: formData.title,
                        desc: formData.desc,
                        subject: formData.subject,
                        dueDate: new Date(
                            formData.date.year, formData.date.month, formData.date.day, formData.time.hours, formData.time.minutes)
                    })
                });
                const data = await firebase.firestore().collection('users').doc(currentUser.uid).get().then(doc => doc.data());
                actions({
                    type: 'setState',
                    payload: data
                });
                //console.log(state.subjects.find(e=>e.title === "Matematyka").color);
                closingFn();
            }}>Dodaj</StyledButton>
        </Flex>
    </Modal>
};

export default AddAssignment;