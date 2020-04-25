import React from 'react';
import {ThemeProvider} from 'styled-components';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {theme, GlobalStyle} from '../theme';
import NavItem from "../components/NavItem";
import SideNav from "../components/SideNav"
import Page from "./Page";
import Container from '../components/Container'

const randCol = ['FF6633', 'FFB399', 'FF33FF', 'FFFF99', '00B3E6',
    'E6B333', '3366E6', '999966', '99FF99', 'B34D4D',
    '80B300', '809900'];

function Root() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <GlobalStyle/>
                <SideNav>
                    {randCol.map(e => <NavItem color={`#${e}`} link={e} title={e}/>)}
                </SideNav>
                {randCol.map(p =>
                    <Route path={`/${p}`}>
                        <Page title={p} color={`#${p}`}>
                            <Container title="Do zrobienia"><div>{p}</div></Container>
                        </Page>
                    </Route>
                )}
            </Router>
        </ThemeProvider>
    );
}

export default Root;
