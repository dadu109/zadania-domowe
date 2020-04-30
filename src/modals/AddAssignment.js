import React, {useState} from "react";
import styled from "styled-components";
import Modal from "./Modal";
import TextInput from "../components/TextInput";
import TextArea from "../components/TextArea";
//import DateInput from "../components/DateInput";
import {randCol} from "../utils";
import SubjectPicker from "../components/SubjectPicker";

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

const AddAssignment = ({closingFn, subject}) => {
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        subject: '',
        date: '',
        time: ''
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
            options={randCol}
        />
        {/*<DateInput/>*/}
    </Modal>
};

export default AddAssignment;