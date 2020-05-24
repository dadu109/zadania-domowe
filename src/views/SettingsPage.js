import React, {useContext, useEffect, useState} from 'react';
import Page from './Page';
import Container from '../components/Container';
import Button from '../components/Button';
import firebase from 'firebase';
import Context from "../store/context";
import styled from 'styled-components';
import SubjectPicker from '../components/SubjectPicker';
import YesNoModal from '../modals/YesNoModal'
import { useHistory } from 'react-router-dom';
import {AuthContext} from "../Auth";

const StyledButton = styled(Button)`
    margin-bottom:20px;
`;
const StyledDiv = styled.div`
    background:${props => props.theme.color.dark3};
    border-radius:10px;
    color:#fff;
    text-align:center;
    font-weight:bold;
    padding: 18px;
`;

const Settings = () => {

    const {actions, state} = useContext(Context);
    const [toDelete,setToDelete] = useState(null);
    const [deleteModalOpen,setDeleteModalOpen] = useState(false);
    const history = useHistory();
    const {currentUser} = useContext(AuthContext);

    const closeDeleteModal = () => {setDeleteModalOpen(false)};

    const logOut = () => {
        firebase.auth().signOut().then(() => {
           actions({
               type: 'setState',
               payload: {subjects: [], assignments: [], done: []}
           });
           history.push('/login')
       })
    };

    return (<Page title="Ustawienia">
            {deleteModalOpen && <YesNoModal
                yesValue={'Tak'}
                noValue={'Nie'}
                closingFn={closeDeleteModal}
                message={`Czy napewno chcesz usunąć przedmiot "${toDelete}" i wszyskie związane z nim zadania ?`}
                yesFn={async () => {
                    const filteredSubjects = state.subjects.filter(e => e.title !== toDelete);
                    const filteredAssignments = state.assignments.filter(e => e.subject !== toDelete);
                    const dbRef = await firebase.firestore().collection('users').doc(currentUser.uid);
                    await dbRef.update({
                        subjects: filteredSubjects,
                        assignments: filteredAssignments,
                    });
                    const data = await dbRef.get().then(doc => doc.data());
                    actions({
                        type: 'setState',
                        payload: data
                    });
                    closeDeleteModal();
                }}
            />}
           <Container title="Wszystkie" open={true}>
               <StyledButton onClick={logOut}> Wyloguj </StyledButton>
                <StyledDiv>
                    <SubjectPicker
                        title="Usuń przedmiot"
                        onItemClick={(item)=>{
                            setToDelete(item);
                            setDeleteModalOpen(true)
                        }}
                        options={state.subjects}
                    />
                </StyledDiv>
           </Container>
       </Page>
    )};

export default Settings