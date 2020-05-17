import React, {useContext, useState} from 'react';
import styled from 'styled-components'
import {useLocation} from 'react-router-dom'
import {monthNames} from '../utils';
import firebase from "firebase";
import check from '../assets/check-solid.svg';
import edit from '../assets/edit-solid.svg';
import trash from '../assets/trash-solid.svg'
import YesNoModal from "../modals/YesNoModal";
import EditAssignment from "../modals/EditAssignment";
import Context from "../store/context";
import {AuthContext} from "../Auth";

const StyledWrapper = styled.div`
  padding: 18px;
  background-color:${props => props.theme.color.dark4};
  border-radius: 10px;
  margin-bottom:20px;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Color = styled.div`
    width: 23px;
    height: 23px;
    border-radius: 50%;
    background-color:${props => props.color};
    position:absolute;
    top:0;
    left:0;
    transform:translate(-40% ,-40%);
`;

const Title = styled.h3`
    margin:0;
    padding: 0;
    font-size: 14px;
    font-weight: bold;
    color: #FFFFFF;
`;

const DateContainer = styled.div`
  display:flex;
  flex-direction: column;
  
  span{
    font-weight: bold;
    font-size: 12px;
    color:#fff;
    text-align: center;
  }
`;

const Content = styled.div`
  max-height:${props => props.assignmentOpen ? '500px' : '0px'};
  overflow: hidden;
  transition:max-height 0.2s cubic-bezier(0.77, 0.2, 0.05, 1);
  p{
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    color:#fff;
    max-width: 500px;
  }
`;

const Buttons = styled.div`
  display:flex;
  justify-content: flex-end;
  .mr-auto{
     margin-right:auto;
  }
  .mr-10{
     margin-right:10px;
  }
  span{
    width: 35px;
    height: 35px;
    background-color:${props => props.theme.color.dark5};
    border-radius: 50%; 
    position:relative;  
    img{
      position: absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      width: 20px;
      height: 20px;
    }
  }
`;

const Assignment = ({title, dueDate, subjectColor, description, timestamp}) => {
    const {state,actions} = useContext(Context);
    const {currentUser} = useContext(AuthContext);
    const actualDate = new Date(dueDate * 1000);
    const [assignmentOpen, setAssignmentOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen,setEditModalOpen] = useState(false);
    const toggle = () => {
        setAssignmentOpen(!assignmentOpen)
    };
    const closeDeleteModal = () => {setDeleteModalOpen(false)};
    const closeEditModal = () => {setEditModalOpen(false)};
    const parseTime = (time) => (time < 10 ? `0${time}` : time);
    const location = useLocation();
    const path = location.pathname;

    return <>
        {deleteModalOpen&&<YesNoModal
            closingFn={closeDeleteModal}
            message={`Czy napewno chcesz usunąć zadanie "${title}"`}
            yesValue={"Tak"}
            noValue={"Nie"}
            yesFn={async ()=>{
                const filteredAssignments = state.assignments.filter(e=>e.timestamp !== timestamp);
                const dbRef = await firebase.firestore().collection('users').doc(currentUser.uid);
                await dbRef.update({
                    assignments:filteredAssignments,
                });
                const data = await dbRef.get().then(doc => doc.data());
                actions({
                    type: 'setState',
                    payload: data
                });
                console.log(filteredAssignments)
            }}
        />}
        {editModalOpen && <EditAssignment
            closingFn={closeEditModal}
            assignment={{title, dueDate, description, timestamp}}
        />}
        <StyledWrapper>
        {path === "/home" && <Color color={`#${subjectColor}`}/>}
        <Header onClick={toggle}>
            <Title>{title}</Title>
            <DateContainer>
                <span>{parseTime(actualDate.getHours())}:{parseTime(actualDate.getMinutes())}</span>
                <span>{actualDate.getDate()} {monthNames[actualDate.getMonth()]}</span>
            </DateContainer>
        </Header>
        <Content assignmentOpen={assignmentOpen}>
            <p>{description}</p>
            <Buttons>
                <span className="mr-auto"><img src={edit} onClick={()=>{setEditModalOpen(true)}} alt="edit"/></span>
                <span className="mr-10"><img src={trash} onClick={()=>{setDeleteModalOpen(true)}} alt="trash"/></span>
                <span><img src={check} alt="check"/></span>
            </Buttons>
        </Content>
    </StyledWrapper>
    </>
};

export default Assignment;