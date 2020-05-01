import React, {useEffect, useState} from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  border-radius:10px;
  background-color:${props => props.theme.color.dark4};
  padding:13px;
`;

const Title = styled.h5`
  padding:0;
  margin:0 0 10px 0;
  font-size: 12px;
  color:#fff;
  font-weight: normal;
`;

const StyledInput = styled.input`
  padding: 5px;
  width:100%;
  font-size: 14px;
  color:#fff;
  outline:none;
  border:none;
  border-radius: 10px;
  background-color:${props => props.theme.color.dark5};
  text-align: center;
`;

const TextInput = ({changeHandle, title, ...props}) => {
    const d = new Date();
    const [state, setState] = useState({
        hours: d.getHours(),
        minutes: d.getMinutes()
    });

    useEffect(()=>{
        changeHandle(state)
    },[state]);

    return <InputWrapper {...props}>
        <Title>{title}</Title>
        <StyledInput
            value={`${state.hours}:${state.minutes}`}
            type='time'
            onChange={(e) => {
                const val = e.target.value.split(':');
                setState({
                    hours: val[0],
                    minutes: val[1]
                });
            }}/>
    </InputWrapper>
};

export default TextInput;