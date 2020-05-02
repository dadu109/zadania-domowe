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

    if(!!currentUser)return <Redirect to={'/'}/>;

    return <StyledButton onClick={() => {
        firebase.auth().signInWithPopup(provider).then(function(user) {
            const userUid = user.user.uid;
            if(!user.additionalUserInfo.isNewUser)return;
            console.log(user.additionalUserInfo.isNewUser);
            console.log(user.user);
            const account = {
                userUid: userUid,
                subjects: []
            };
            firebase.firestore().collection('users').doc(userUid).set(account);
        })
            .catch(function(error) {
                console.log(error);
            });
        }
    }>Login</StyledButton>
};

export default SignInPage;