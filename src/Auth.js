import React, {useEffect,useState} from "react"
import firebase from "firebase";
import app from "./firebase";

export const provider = new firebase.auth.GoogleAuthProvider()

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
  const [currentUser,setCurrentUser] = useState(null);

  useEffect(()=>{
      app.auth().onAuthStateChanged(setCurrentUser)
  },[]);

  return(
      <AuthContext.Provider value={{currentUser}}>
          {children}
      </AuthContext.Provider>
  )
};

