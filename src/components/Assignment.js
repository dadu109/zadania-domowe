import React, {useState} from 'react';
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import {monthNames} from '../utils';
import check from '../assets/check-solid.svg';
import edit from '../assets/edit-solid.svg';
import trash from '../assets/trash-solid.svg'

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

const Date = styled.div`
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
  max-height:${props => props.assignmentOpen?'500px':'0px'};
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

const Assignment = ({title,dueDate,subject,description}) => {
    const [assignmentOpen,setAssignmentOpen] = useState(false);
    const toggle = () => {setAssignmentOpen(!assignmentOpen)};
    const parseTime = (time) => (time<10?`0${time}`:time);
    const location = useLocation();
    const path = location.pathname;

    return<StyledWrapper>
        {path==="/home"&&<Color color={`#${subject}`}/>}
        <Header onClick={toggle}>
            <Title>{title}</Title>
            <Date>
                <span>{parseTime(dueDate.getHours())}:{parseTime(dueDate.getMinutes())}</span>
                <span>{dueDate.getDate()} {monthNames[dueDate.getMonth()]}</span>
            </Date>
        </Header>
        <Content assignmentOpen={assignmentOpen}>
            <p>{description}</p>
            <Buttons>
                <span className="mr-auto"><img src={edit} alt="edit"/></span>
                <span className="mr-10"><img src={trash} alt="trash"/></span>
                <span><img src={check} alt="check"/></span>
            </Buttons>
        </Content>
    </StyledWrapper>

};

export default Assignment;