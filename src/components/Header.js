import React from "react";
import styled from "styled-components";
import sort from "../assets/sort-solid.svg"

const StyledHeader = styled.div`
  position:relative;
  width:100%;
  height:${props => props.theme.headerHeight};
  
  h1{
    padding:0;
    margin:0;
    color:#fff;
    text-align:center;
    height:100%;
    font-weight: bold;
    font-size: 24px;
    position:relative;
    line-height: ${props => props.theme.headerHeight};
    background-color:${props => props.theme.color.dark2};
    ${props => props.color?`
        &::before{
            content:'';
            position:absolute;
            top:50%;
            border-radius:50%;
            transform:translate(-40px ,-50%);
            width: 23px;
            height: 23px;
            background-color:${props.color};
        }
    `:null}
  }
  
  img{
    height: 42px;
    position:absolute;
    top:50%;
    right:12px;
    transform:translateY(-50%);
  }
`;

const Header = ({children, color}) => (
    <StyledHeader color={color}>
        <h1>{children}</h1>
        {/*TODO: Sort modal opening on img click*/}
        <img alt='we' src={sort}/>
    </StyledHeader>
);

export default Header;