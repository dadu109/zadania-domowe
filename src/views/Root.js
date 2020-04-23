import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme , GlobalStyle } from '../theme';
import NavItem from "../components/NavItem";
import SideNav from "../components/SideNav"

const randCol = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900']

function Root() {
  return (
      <ThemeProvider theme={theme}>
          <GlobalStyle/>
          <SideNav>
              {randCol.map(e=><NavItem color={e} title={e}/>)}
              <NavItem color="#000" title="#000"/>
              <NavItem color="#fff" title="#fff"/>
          </SideNav>
      </ThemeProvider>
  );
}

export default Root;
