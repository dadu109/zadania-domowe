import React,{useContext} from "react";
import { Redirect } from 'react-router-dom'
import styled from "styled-components";
import firebase from "firebase";
import {AuthContext, provider} from "../Auth";
import Context from "../store/context";
import googleButton from '../assets/btn_google_light_normal_ios.svg'

const StyledButton = styled.button`
  font-size: 30px;
  line-height: 30px;
  background-color:#fff;
  border:none;
  display: flex;
  align-items: center;
  img{
    margin-right: 10px;
  }
`;

const StyledWrapper = styled.div`
  width:calc(100vw - ${props => props.theme.navWidth});
  min-height: 100vh;
  background-color:${props => props.theme.color.dark1};
  position:absolute;
  top:0;
  right:0;
  display:flex;
  justify-content: center;
  align-items: center;
`;

const SignInPage = () => {
    const {currentUser} = useContext(AuthContext);
    const {actions} = useContext(Context);

    if(!!currentUser)return <Redirect to={'/home'}/>;

    return(
        <StyledWrapper>
            <StyledButton onClick={() => {
                firebase.auth().signInWithPopup(provider).then(async function(user) {
                    const userUid = user.user.uid;
                    if(!user.additionalUserInfo.isNewUser){
                        const data = await firebase.firestore().collection('users').doc(userUid).get().then(doc => doc.data());
                        actions({
                            type: 'setState',
                            payload: data
                        });
                        return
                    }
                    const account = {
                        userUid: userUid,
                        subjects: [],
                        assignments:[],
                        done:[]
                    };
                    firebase.firestore().collection('users').doc(userUid).set(account);
                })
                    .catch(function(error) {
                        console.log(error);
                    });
                }
            }><img src={googleButton} alt={'googleSignIn'}/>Sign in</StyledButton>
        </StyledWrapper>
    )
};

export default SignInPage;