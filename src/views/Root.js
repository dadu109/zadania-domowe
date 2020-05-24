import React, {useContext, useEffect} from 'react';
import firebase from "firebase";
import {ThemeProvider} from 'styled-components';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {theme, GlobalStyle} from '../theme';
import NavItem from "../components/NavItem";
import SideNav from "../components/SideNav";
import Page from "./Page";
import Container from '../components/Container'
import Assignment from "../components/Assignment";
import Context from "../store/context";
import PrivateRoute from "../components/PrivateRoute";
import SignInPage from "./SignInPage";
import SettingsPage from './SettingsPage'
import app from "../firebase";

function Root() {
    const {actions, state} = useContext(Context);
    useEffect(() => {

        app.auth().onAuthStateChanged(async (usr) => {
            if (!!usr) {
                const data = await firebase.firestore().collection('users').doc(usr.uid).get().then(doc => doc.data());
                actions({
                    type: 'setState',
                    payload: data
                });
            }
        });

    }, []);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle/>
            <Router>
                <SideNav>
                    {state.subjects.map(e => <NavItem color={`#${e.color}`} link={e.title} title={e.title}/>)}
                </SideNav>
                <PrivateRoute path="/home">
                    <Page title="Zadania">
                        <Container title="Wszystkie" open={true}>
                            {state.assignments.map((assignment) => {
                                const sub = state.subjects.find(e => e.title === assignment.subject);
                                return <Assignment
                                    timestamp={assignment.timestamp}
                                    dueDate={assignment.dueDate}
                                    title={assignment.title}
                                    description={assignment.desc}
                                    subjectColor={sub ? sub.color : 'fff'}
                                />
                            })}
                        </Container>
                    </Page>
                </PrivateRoute>
                {state.subjects.map(subject =>
                    <PrivateRoute path={`/${subject.title}`}>
                        <Page title={subject.title} color={`#${subject.color}`}>
                            <Container title="Do zrobienia" open={true}>
                                {state.assignments.filter(e => e.subject === subject.title).map(assignment => (
                                    <Assignment
                                        timestamp={assignment.timestamp}
                                        dueDate={assignment.dueDate}
                                        title={assignment.title}
                                        description={assignment.desc}
                                    />
                                ))}
                            </Container>
                        </Page>
                    </PrivateRoute>
                )}
                <PrivateRoute path="/done">
                    <Page title={'Zrobione'}>
                        <Container title={'Zrobione'} open={true}>
                            {state.done.map(assignment => (
                                <Assignment
                                    timestamp={assignment.timestamp}
                                    dueDate={assignment.dueDate}
                                    title={assignment.title}
                                    description={assignment.desc}
                                />
                            ))}
                        </Container>
                    </Page>
                </PrivateRoute>
                <PrivateRoute path="/settings">
                    <SettingsPage/>
                </PrivateRoute>
                <Route path="/login">
                    <SignInPage/>
                </Route>
            </Router>
        </ThemeProvider>
    );
}

export default Root;
