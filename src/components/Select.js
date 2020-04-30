import React, {useEffect, useState} from 'react';
import styled from "styled-components";

const SelectWrapper = styled.div`
  position:relative;
  width:100%;
`;

const StyledWrapper = styled.div`
  background-color:${props => props.theme.color.dark4};
  width:100%;
  max-height: ${props => props.open ? "100px" : '0px'};
  transition:max-height 0.2s cubic-bezier(0.77, 0.2, 0.05, 1);
  position:absolute;
  padding:0 7px;
  overflow: scroll;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  &::-webkit-scrollbar {
       display: none;
   }
`;
const SelectItem = styled.div`
  background: ${props => props.theme.color.dark5};
  height:28px;
  color:#fff;
  padding:6px 6px 6px 40px;
  margin:7px 0 ;
  border-radius:15px;
  top:100%;
  position:relative;
  &::before{
    content:'';
    position:absolute;
    width:16px;
    height:16px;
    border-radius: 50%;
    top:50%;
    transform: translate(-28px,-50%);
    background-color:${props => props.color};
  }
`;
const StyledHeader = styled.div`
  position:relative;
  padding:6px 6px 6px 40px;
  width: 100%;
  color:#fff;
  font-weight: bold;
  border-radius:10px 10px ${props => props.open ? "0" : '10px'} ${props => props.open ? "0" : '10px'} !important;
  transition: border-radius .2s;
  background-color:${props => props.theme.color.dark4};
  &::before{
    content:'';
    position:absolute;
    width:16px;
    height:16px;
    border-radius: 50%;
    top:50%;
    transform: translate(-28px,-50%);
    background-color:${props => props.color};
  }
`;

const Select = ({options, changeHandle}) => {
    //TODO: context on use state
    const [curr, setCurr] = useState(options[0]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        changeHandle(curr)
    }, [curr]);

    return (
        <SelectWrapper>
            <StyledHeader open={open} onClick={() => setOpen(!open)} color={`#${curr}`}>{curr}</StyledHeader>
            <StyledWrapper open={open}>
                {options.map(e => <SelectItem onClick={
                    () => {
                        setCurr(e);
                        setOpen(false)
                    }
                } value={e} color={`#${e}`}>
                    {e}
                </SelectItem>)}
            </StyledWrapper>
        </SelectWrapper>
    )
};

export default Select