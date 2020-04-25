import React from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";

const LinkWrapper = styled(Link)`
  padding:9px;
  min-height: 41px;
  margin-bottom: 20px;
  display:flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  border-radius: 50px;
  text-decoration: none;
  background-color: ${props => props.theme.color.dark3};
`;

const NoLinkWrapper = styled.button`
  border:none;
  padding:9px;
  min-height: 41px;
  margin-bottom: 20px;
  display:flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  border-radius: 50px;
  text-decoration: none;
  background-color: ${props => props.theme.color.dark3};
`;

const StyledColor = styled.div`
  width:23px;
  min-width: 23px;
  height:23px;
  min-height: 23px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const StyledIcon = styled.img`
  width:23px;
  min-width: 23px;
  height:23px;
  min-height: 23px;
`;

const StyledTitle = styled.p`
  font-size: 18px;
  color:#fff;
  margin:0 0 0 13px;
  font-weight: bold;
  white-space: nowrap;
`;

const NavItem = ({color, link, title, icon, ...props}) => {
    const StyledWrapper = link ? LinkWrapper : NoLinkWrapper;

    return <StyledWrapper to={link ? `/${link}` : null} {...props} >
        {icon ? <StyledIcon src={icon}/> : <StyledColor color={color}/>}
        <StyledTitle>{title}</StyledTitle>
    </StyledWrapper>
};

export default NavItem