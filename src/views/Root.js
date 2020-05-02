import React, {useContext} from 'react';
import firebase from "firebase";
import {ThemeProvider} from 'styled-components';
import {BrowserRouter as Router, Route ,Redirect} from "react-router-dom";
import {theme, GlobalStyle} from '../theme';
import NavItem from "../components/NavItem";
import SideNav from "../components/SideNav";
import Page from "./Page";
import Container from '../components/Container'
import Assignment from "../components/Assignment";
import {randCol} from '../utils'
import Context from "../store/context";
import {AuthProvider} from "../Auth";
import PrivateRoute from "../components/PrivateRoute";
import SignInPage from "./SignInPage";
import Button from "../components/Button";


const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula dui urna, eu egestas odio condimentum vitae. Sed imperdiet aliquam auctor. Ut at urna sit amet tortor mattis. ';


function Root() {
    const {state} = useContext(Context);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle/>
            <AuthProvider>
                <Router>
                    <SideNav>
                        {randCol.map(e => <NavItem color={`#${e.color}`} link={e.name} title={e.name}/>)}
                    </SideNav>
                    <PrivateRoute path="/">
                        <Page title="Zadania">
                            <Container title="Wszystkie" open={true}>
                                {state.map(e => (
                                    <Assignment
                                        dueDate={e.dueDate}
                                        title={e.title}
                                        description={e.desc}
                                        subjectColor={randCol.find(f => f.name === e.subject).color}
                                    />
                                ))}
                            </Container>
                        </Page>
                    </PrivateRoute>
                    {randCol.map(p =>
                        <PrivateRoute path={`/${p.name}`}>
                            <Page title={p.name} color={`#${p.color}`}>
                                <Container title="Do zrobienia" open={true}>
                                    {state.filter(e => e.subject === p.name).map(e => (
                                        <Assignment dueDate={e.dueDate} title={e.title} description={e.desc}/>
                                    ))}
                                </Container>
                                <Container title="Zrobione">
                                    <Assignment dueDate={new Date()} title='Rozprawka' description={lorem}/>
                                </Container>
                            </Page>
                        </PrivateRoute>
                    )}
                    <PrivateRoute path="/settings">
                        <Page title="Ustawienia">
                            <Container title="Wszystkie" open={true}>
                                <Button
                                    onClick={()=>{
                                        firebase.auth().signOut().then(function() {
                                            console.log('signed out');
                                            return <Redirect to={'/login'}/>
                                        }).catch(function(error) {
                                            // An error happened.
                                        });
                                    }}
                                >
                                    Wyloguj
                                </Button>
                            </Container>
                        </Page>
                    </PrivateRoute>
                    <Route path="/login">
                        <SignInPage/>
                    </Route>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default Root;
