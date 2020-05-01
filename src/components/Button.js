import React from "react";
import styled from "styled-components";

const StyledButton = styled.div`
  border-radius: 10px;
  background-color:${props => props.yes?props.theme.color.green:props.no?props.theme.color.red:props.theme.color.dark3};
  font-weight: bold;
  font-size: 18px;
  display:flex;
  align-items: center;
  justify-content: center;
  color:#fff;
  width:100%;
  height:100%;
`;

const Button = ({yes,no,children, ...props}) => (
    <StyledButton yes={yes} no={no} {...props}><span>{children}</span></StyledButton>
);

export default Button;