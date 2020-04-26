import React from 'react';
import {ThemeProvider} from 'styled-components';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {theme, GlobalStyle} from '../theme';
import NavItem from "../components/NavItem";
import SideNav from "../components/SideNav"
import Page from "./Page";
import Container from '../components/Container'
import Assignment from "../components/Assignment";
import {randCol} from '../utils'


const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula dui urna, eu egestas odio condimentum vitae. Sed imperdiet aliquam auctor. Ut at urna sit amet tortor mattis. ';

function Root() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <GlobalStyle/>
                <SideNav>
                    {randCol.map(e => <NavItem color={`#${e}`} link={e} title={e}/>)}
                </SideNav>
                <Route path="/home">
                    <Page title="Zadania" >
                        <Container title="Wszystkie" open={true}>
                            <Assignment subject={randCol[0]} dueDate={new Date()} title='Zadanie na głównej' description={lorem}/>
                        </Container>
                    </Page>
                </Route>
                {randCol.map(p =>
                    <Route path={`/${p}`}>
                        <Page title={p} color={`#${p}`}>
                            <Container title="Do zrobienia" open={true}>
                                <Assignment dueDate={new Date()} title='Rozprawka' description={lorem}/>
                                <Assignment dueDate={new Date()} title='Rozprawka' description={lorem}/>
                            </Container>
                            <Container title="Zrobione">
                                <Assignment dueDate={new Date()} title='Rozprawka' description={lorem}/>
                            </Container>
                        </Page>
                    </Route>
                )}
                <Route path="/settings">
                    <Page title="Ustawienia" >
                        <Container title="Wszystkie" open={true}>

                        </Container>
                    </Page>
                </Route>
            </Router>
        </ThemeProvider>
    );
}

export default Root;
