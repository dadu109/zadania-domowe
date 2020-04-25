import React, {useState} from "react";
import styled from "styled-components";
import triangle from '../assets/triangle.svg';

const StyledContainer = styled.div`
  width:100%;
  height:auto;
  border-radius:10px;
  background-color:${props => props.theme.color.dark2};
  transition:height .2s cubic-bezier(0.77, 0.2, 0.05, 1);
  overflow: hidden;
`;

const ContainerHeader = styled.div`
  position:relative;
  height: ${props => props.theme.containerHeight};
  h3{
    font-weight: bold;
    font-size: 18px;
    color: #FFFFFF;
    margin:0;
    position:absolute;
    left:15px;
    top:calc(${props => props.theme.containerHeight} / 2);
    transform: translateY(-50%);
  }
`;

const Trigger = styled.div`
  background-color:${props => props.theme.color.dark3}; 
  width: 29px;
  height: 29px;
  border-radius: 50%;
  position:absolute;
  right:15px;
  top:7px;
  img{
      position: absolute;
      top:50%;
      left: 50%;
      transition: transform 0.2s cubic-bezier(0.77, 0.2, 0.05, 1);
      transform: translate(-50%,-50%) ${props => props.containerOpen?'rotate(-90deg)':'rotate(90deg)'};
      width:16px;
      min-width: 16px;
      height:16px;
      min-height: 16px;
  }
`;

const Content = styled.div`
  padding: ${props => props.containerOpen?'26px':'0'};
  overflow: hidden;
  width:100%;
  height:auto ;
`;

const Container = ({title, count, children, open}) => {
    const [containerOpen, setContainerOpen] = useState(!!open);

    return <StyledContainer >
        <ContainerHeader onClick={() => setContainerOpen(!containerOpen)}>
            <h3>{title}</h3>
            <Trigger containerOpen={containerOpen}>
                <img src={triangle} />
            </Trigger>
        </ContainerHeader>
        <Content containerOpen={containerOpen}>
            {containerOpen && children}
        </Content>
    </StyledContainer>
};

export default Container;