import React,{useContext} from "react";
import Modal from "./Modal";
import Button from '../components/Button'
import styled from 'styled-components';
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

const FilterModal = ({closingFn}) => {
    const {state,actions} = useContext(Context);

    const setGlobalState = (comparingFn) => {
        const filtered = [...state.assignments].sort(comparingFn);
        actions({
            type: 'setState',
            payload: {...state,assignments:filtered}
        });
        closingFn();
    };

    return <Modal closingFn={closingFn}>
        <Header>
            <h4>Sortuj według:</h4>
            <Close onClick={() => {
                closingFn()
            }}>
                <span>+</span>
            </Close>
        </Header>
        <Button onClick={()=>{setGlobalState((a,b)=>(b.timestamp.seconds-a.timestamp.seconds))}}>
            Najnowszych
        </Button>
        <Button onClick={()=>{setGlobalState((a,b)=>(a.timestamp.seconds-b.timestamp.seconds))}}>
            Najstarszych
        </Button>
        <Button onClick={()=>{setGlobalState((a,b)=>(a.dueDate.seconds-b.dueDate.seconds))}}>
            Najmniej czasu
        </Button>
        <Button onClick={()=>{setGlobalState((a,b)=>(b.dueDate.seconds-a.dueDate.seconds))}}>
            Najwięcej czasu
        </Button>
    </Modal>
};

export default FilterModal;