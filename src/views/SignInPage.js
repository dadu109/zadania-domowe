import React,{useContext} from "react";
import { Redirect } from 'react-router-dom'
import styled from "styled-components";
import firebase from "firebase";
import {AuthContext, provider} from "../Auth";

const StyledButton = styled.button`
  font-size: 70px;
`;

const SignInPage = () => {
    const {currentUser} = useContext(AuthContext);

    if(!!currentUser)return <Redirect to={'/home'}/>;

    return <StyledButton onClick={() => {
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            console.log(token);
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }
    }>Login</StyledButton>
};

export default SignInPage;