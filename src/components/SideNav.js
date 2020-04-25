import React,{useState} from 'react';
import styled from 'styled-components';
import NavItem from './NavItem';
import triangle from '../assets/triangle.svg';
import home from '../assets/home-solid.svg'
import cog from '../assets/cog-solid.svg'
import plus from '../assets/plus.svg'

const StyledWrapper = styled.div`
    position:absolute;
    top:0;
    left:0;
    padding:10px 7px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    background-color:${props => props.theme.color.dark2};
    height:100vh;
    width:${props => props.navOpen?'65vw':'55px'};
    transition:width .2s cubic-bezier(0.77, 0.2, 0.05, 1);
    .trigger img{
        transition: transform 0.2s cubic-bezier(0.77, 0.2, 0.05, 1);
        transform: rotate(${props => props.navOpen?'-180deg':'0deg'})
    }
    z-index:200;
`

const ConstItems = styled.div`
    display:flex;
    flex-direction:column;
    overflow-y:scroll;
    max-height:75vh;
    &::-webkit-scrollbar {
       display: none;
     }
`

const Cover = styled.div`
    position:absolute;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    display: ${props => props.show?'block':'none'};
    z-index:100;
    background: rgba(18, 18, 18, 0.7);
`

const SideNav = ({children}) => {
    const [navOpen,setNavOpen] = useState(false)
    const open = () => {setNavOpen(!navOpen)}

    return (
    <>
        <Cover show={navOpen}/>
        <StyledWrapper navOpen={navOpen}>

            <ConstItems>
                <NavItem icon={triangle} title="Schowaj" className="trigger" onClick={open}/>
                <NavItem icon={home} link="#" title="Siemano"/>
                {children}
            </ConstItems>
            <ConstItems>
                <NavItem icon={plus} link="#" title="Dodaj Przedmiot"/>
                <NavItem icon={cog} link="#" title="Ustawienia"/>
            </ConstItems>
        </StyledWrapper>
    </>
    )
}

export default SideNav