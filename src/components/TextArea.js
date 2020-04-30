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
  font-weight: normal;
`;

const StyledInput = styled.textarea`
  padding-bottom:5px;
  width:100%;
  height:80px;
  font-size: 14px;
  color:#fff;
  outline:none;
  border:none;
  background: none;
  border-bottom: 1px solid #fff;
  margin-top:10px;
`;

const TextArea = ({changeHandle,title, ...props}) => {
    return <InputWrapper>
        <Title>{title}</Title>
        <StyledInput {...props} onChange={(e)=>{changeHandle(e.target.value)}}/>
    </InputWrapper>
};

export default TextArea;