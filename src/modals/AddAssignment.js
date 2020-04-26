import React, {useState} from "react";
import styled from "styled-components";
import Modal from "./Modal";
import TextInput from "../components/TextInput";

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

const AddAssignment = ({closingFn}) => {
    const [formData,setFormData] = useState({
        title:'',
        desc:'',
        subject:'',
        date:'',
        time:''
    });
    return <Modal closingFn={closingFn}>
            <Header>
                <h4>Dodaj zadanie</h4>
                <Close onClick={()=>{closingFn()}}>
                    <span>+</span>
                </Close>
            </Header>
            <TextInput
                changeHandle={(e)=>{if(formData.title.length<=25) {
                    console.log(e);
                    setFormData({...formData,title:e})
                }}}
                value={formData.title}
                title="Tytuł"
            />
        </Modal>
};

export default AddAssignment;