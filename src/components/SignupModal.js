
import React, { useState } from 'react'
import axios from 'axios'
import {useAuth} from '../contexts/AuthContext';
import firebase from "./firebase"


function SignupModal({toggleSignupModal}) {

    const {signup, currentUser} = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [loading, setLoading] = useState(false)
    const [nickname, setNickname] = useState('')


    const handleSignup = async() => {
        if(!nickname){
            setNickname("Generic Dracula Review User")
        }
        if(!email){
            alert("Put in an email")
            return;
        }
        if(!password){
            alert("Put in a password")
            return;
        }
        if(password !== passwordConfirmation){
            alert("Passwords don't match. Darn it.")
            return;
        }
        try {
            setLoading(true)
            await signup(email, password)
            .then(function(result) {
                return result.user.updateProfile({
                  displayName: nickname,
                  photoURL: 3
                })
              }).catch(function(error) {
                console.log(error);
              });

        } catch(error){
            alert("It didn't work. Try again please.")
            setLoading(false)
            return;
        }

        setLoading(false)
        toggleSignupModal()
    }
  

  return (
      <div className="modal-page">
            <div className="modal-wrapper">
                <div className="modal-content">
                   <div className="modal-top">
                        <h1>Sign Up</h1>
                        <div onClick={() => toggleSignupModal()} className="x">x</div>
                   </div>

                   <div className="modal-body">
                      <h3>Dracula lovers unite!</h3>
                    <div className="reg-form">
                        <input
                            className="reg-nickname"
                                type="text"
                                placeholder="Nick Name, ex Count Reggie"
                                value={nickname}
                                onChange={e => setNickname(e.target.value)}
                                required
                            />
                        
                        <input
                            className="reg-email"
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        <input
                            className="reg-password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        <input
                            className="reg-password-confirmation"
                                type="password"
                                placeholder="Password Confirmation"
                                value={passwordConfirmation}
                                onChange={e => setPasswordConfirmation(e.target.value)}
                                required
                            />

                            <button disabled={loading} onClick={handleSignup} className="submit-review-button" type="button">Sign Up</button>
                        </div>
                    </div>

                </div>
            </div>
      </div>
  );
}

export default SignupModal;
