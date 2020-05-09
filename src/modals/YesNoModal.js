import React from "react";
import styled from "styled-components";
import Modal from "./Modal";
import Button from '../components/Button'

const Text = styled.div`
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  color:#fff;
`;
const Flex = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: stretch;
  position: relative;
  
  button{
    height:5vh;
    width:48%;
  }
`;

const YesNoModal = ({closingFn,message,yesValue,noValue,yesFn}) => {
    return<Modal closingFn={closingFn}>
        <Text>{message}</Text>
        <Flex>
            <Button no onClick={closingFn}>{noValue}</Button>
            <Button yes onClick={yesFn}>{yesValue}</Button>
        </Flex>
    </Modal>
};

export default YesNoModal;