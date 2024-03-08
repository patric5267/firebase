import {createUserWithEmailAndPassword , sendPasswordResetEmail , signInWithPopup, GithubAuthProvider, signInWithEmailAndPassword , GoogleAuthProvider  } from 'firebase/auth'
import { auth } from './firebaseconfig'
const googleAuthProvider = new GoogleAuthProvider()
const githubAuthProvider = new GithubAuthProvider()

export const signup = (email , password)=>{
    return createUserWithEmailAndPassword(auth , email , password)
}
export const login = (email , password)=>{
    return signInWithEmailAndPassword(auth , email , password)
}


export const googlelogin = ()=>{
    return signInWithPopup(auth, googleAuthProvider)
}

export const githublogin = ()=>{
    return signInWithPopup(auth, githubAuthProvider)
}

export const  passwordreset = (email)=>{
    return sendPasswordResetEmail(auth , email)
}