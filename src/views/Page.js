import React, {useState} from "react";
import styled from "styled-components";
import Header from '../components/Header'
import AddAssignment from "../modals/AddAssignment";

const StyledWrapper = styled.div`
  width:calc(100vw - ${props => props.theme.navWidth});
  min-height: 100vh;
  background-color:${props => props.theme.color.dark1};
  position:absolute;
  top:0;
  right:0;
`;

const ContentWrapper = styled.div`
  padding:20px;
`;

const AddButton = styled.div`
    background-color: ${props => props.theme.color.dark3};
    position:fixed;
    right:17px;
    bottom:17px;
    width: 59px;
    height: 59px;
    border-radius: 50%;
    color:#fff;
    cursor: pointer;
    font-size: 48px;
    text-align: center;
`;

const Page = ({title, color, children}) => {
    const [addingModalOpen,setAddingModalOpen] = useState(false);
    const closeModal = () => {setAddingModalOpen(false)};
    const openModal = () => {setAddingModalOpen(true)};

    return <>
        {addingModalOpen && <AddAssignment closingFn={closeModal}/>}
        <StyledWrapper>
            <Header color={color}>{title}</Header>
            <ContentWrapper>
                {children}
            </ContentWrapper>
        </StyledWrapper>
        <AddButton onClick={()=>{openModal()}}>+</AddButton>
    </>
};

export default Page;