import React from "react";
import styled from "styled-components";
import Select from "./Select";

const InputWrapper = styled.div`
  border-radius:10px;
  background-color:${props => props.theme.color.dark4};
  padding:15px;
`;

const Title = styled.h5`
  padding:0;
  font-weight: normal;
  margin:0 0 10px 0;
  font-size: 12px;
  color:#fff;
`;

const SubjectPicker = ({changeHandle,title,options,onItemClick}) => {
    return <InputWrapper>
        <Title>{title}</Title>
        <Select onItemClick={onItemClick} changeHandle={changeHandle} options={options}/>
    </InputWrapper>
};

export default SubjectPicker;