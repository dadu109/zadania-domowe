import React from "react";
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

const StyledInput = styled.input`
  padding-bottom:5px;
  width:100%;
  font-size: 14px;
  color:#fff;
  outline:none;
  border:none;
  background: none;
  border-bottom: 1px solid #fff;
  margin-top:10px;
`;

const TextInput = ({changeHandle,title, ...props}) => {
    return <InputWrapper>
        <Title>{title}</Title>
        <StyledInput {...props} onChange={(e)=>{changeHandle(e.target.value)}}/>
    </InputWrapper>
};

export default TextInput;