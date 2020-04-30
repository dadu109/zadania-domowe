import React, {useEffect, useState} from 'react';
import styled from "styled-components";

const InputWrapper = styled.div`
  border-radius:10px;
  background-color:${props => props.theme.color.dark4};
  padding:15px;
`;

const Title = styled.h5`
  padding:0;
  margin:0;
  font-size: 12px;
  color:#fff;
`;

const InputsBox = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  border-radius:10px;
  background-color:${props => props.theme.color.dark5};
  padding:10px;
  width:auto;
`;

const DateInput = ({changeHandle, title}) => {
    const date = new Date();
    const [state, setState] = useState({
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
    });
    let maxDayNumber = new Date(state.year, state.month, 0).getDate();

    useEffect(() => {
        maxDayNumber = new Date(state.year, state.month, 0).getDate();
    }, [state]);
    console.log(maxDayNumber);

    return <InputWrapper>
        <Title>{title}</Title>
        <InputsBox>
            <Input type='number'
                   onChange={(e) => {
                       setState({...state, day:e.target.value})
                   }}
                   value={state.day}
                   size='2'
                   min="1"
                   max={maxDayNumber}
            />
            <Input/>
            <Input/>
        </InputsBox>
    </InputWrapper>
};

export default DateInput;