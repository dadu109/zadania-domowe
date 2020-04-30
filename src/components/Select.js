import React, {useEffect, useState} from 'react';
import styled from "styled-components";

const SelectWrapper = styled.div`
  position:relative;
  width:100%;
`;

const StyledWrapper = styled.div`
  background-color:${props => props.theme.color.dark5};
  width:100%;
  max-height: ${props => props.open ? "100px" : '0px'};
  transition:max-height 0.2s cubic-bezier(0.77, 0.2, 0.05, 1);
  position:absolute;
  padding:0 9px;
  overflow: scroll;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  &::-webkit-scrollbar {
       display: none;
   }
`;
const SelectItem = styled.div`
  background: ${props => props.theme.color.dark6};
  height:28px;
  color:#fff;
  padding:6px 6px 6px ${props => props.hasColor?'40px':'6px'};
  margin:7px 0 ;
  border-radius:15px;
  top:100%;
  position:relative;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  &::before{
    ${props => props.hasColor?"content:''":null};
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
  padding:6px 6px 6px ${props => props.hasColor?'40px':'6px'};
  width: 100%;
  color:#fff;
  font-weight: bold;
  font-size: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  border-radius:10px 10px ${props => props.open ? "0" : '10px'} ${props => props.open ? "0" : '10px'} !important;
  transition: border-radius .2s;
  background-color:${props => props.theme.color.dark5};
  &::before{
    ${props => props.hasColor?"content:''":null};
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
    const [currOption, setCurrOption] = useState(options[0].name);
    const [currColor, setCurrColor] = useState(options[0].color);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        changeHandle(currOption)
    }, [currOption]);

    return (
        <SelectWrapper>
            <StyledHeader
                open={open}
                onClick={() => setOpen(!open)}
                hasColor={currColor}
                color={`#${currColor}`}>{currOption}
            </StyledHeader>
            <StyledWrapper open={open}>
                {options.map(e => <SelectItem onClick={
                    () => {
                        setCurrOption(e.name);
                        if (e.color) {
                            setCurrColor(e.color)
                        }
                        setOpen(false);
                    }
                } value={e.name} hasColor={e.color} color={`#${e.color}`}>
                    {e.name}
                </SelectItem>)}
            </StyledWrapper>
        </SelectWrapper>
    )
};

export default Select