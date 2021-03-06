import React from "react";
import styled from "styled-components";

const Cover = styled.div`
  position:fixed;
  top:0;
  left:0;
  height:100vh;
  width:100vw;
  background: rgba(18, 18, 18, 0.7);
  z-index:300;
  backdrop-filter: blur(3px);
`;

const Wrapper = styled.div`
  min-width: 80vw;
  position: fixed;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  background: ${props => props.theme.color.dark2};
  border-radius: 10px;
  padding:20px;
  z-index:400;
  &>*{
    margin-bottom: 20px;
    &:last-child{
      margin:0;
    }
  }
  @media (min-width: 800px){
    max-width: 800px;
    min-width: 600px;
  }
`;

const Modal = ({children,closingFn}) => {
    return <>
        <Cover onClick={()=>{closingFn()}}/>
        <Wrapper>
            {children}
        </Wrapper>
    </>
};

export default Modal;