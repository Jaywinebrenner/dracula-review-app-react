
import React, { useState, useContext } from 'react'
import {useAuth} from '../contexts/AuthContext'

import { ModalContext } from '../contexts/ModalContext.js';

function LoginModal() {
    const {login} = useAuth()
    const { handleLoginIsOpen } = useContext(ModalContext);

      const refreshPage = () => {
        window.location.reload(false);
      }

      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const [passwordConfirmation, setPasswordConfirmation] = useState('')
      const [loading, setLoading] = useState(false)
  
      const handleLogin = async() => {
        if(!email){
            alert("Put in an email")
            return;
        }
        if(!password){
            alert("Put in a password")
            return;
        }
        // if(password !== passwordConfirmation){
        //     alert("Passwords don't match. Darn it.")
        //     return;
        // }
        try {
            setLoading(true)
            await login(email, password)

        } catch(error){
            console.log("error", error);
            alert(`${error}`)
            setLoading(false)
            return;
        }
        setLoading(false)
        handleLoginIsOpen()
    }

  

  return (
      <div className="modal-page">
            <div className="modal-wrapper">
                <div className="modal-content">
                   <div className="modal-top">
                        <h1>Login</h1>

                        <div onClick={() => handleLoginIsOpen()} className="x"><img src="cross.png"/></div>
                   </div>

                   <div className="modal-body">
                      
                    <div className="reg-form">
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
                        {/* <input
                            className="reg-password-confirmation"
                                type="password"
                                placeholder="Password Confirmation"
                                value={passwordConfirmation}
                                onChange={e => setPasswordConfirmation(e.target.value)}
                                required
                            /> */}

                            <button onClick={handleLogin} className="submit-review-button login-submit-button" type="button">Login</button>
                        </div>
                    </div>

                </div>
            </div>
      </div>
  );
}

export default LoginModal;
