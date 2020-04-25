import React from "react";
import styled from "styled-components";
import Header from '../components/Header'

const StyledWrapper = styled.div`
  width:calc(100vw - ${props => props.theme.navWidth});
  min-height: 100vh;
  background-color:${props => props.theme.color.dark1};
  position:absolute;
  top:0;
  right:0;
`;

const ContentWrapper = styled.div`
  padding:20px;
`;

const Page = ({title, color, children}) => {
    return <StyledWrapper>
        <Header color={color}>{title}</Header>
        <ContentWrapper>
            {children}
        </ContentWrapper>
    </StyledWrapper>

};

export default Page;