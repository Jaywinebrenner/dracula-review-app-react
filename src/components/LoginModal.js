
import React, { useState } from 'react'
import {useAuth} from '../contexts/AuthContext'

function LoginModal({toggleLoginModal}) {
    const {login} = useAuth()


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
        if(password !== passwordConfirmation){
            alert("Passwords don't match. Darn it.")
            return;
        }
        try {
            setLoading(true)
            await login(email, password)

        } catch(error){
            alert("It didn't work. Try again please.")
            setLoading(false)
            return;
        }
        setLoading(false)
        toggleLoginModal()
    }
  

  return (
      <div className="modal-page">
            <div className="modal-wrapper">
                <div className="modal-content">
                   <div className="modal-top">
                        <h1>Login</h1>
                        <div onClick={() => toggleLoginModal()} className="x">x</div>
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
                                type="text"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        <input
                            className="reg-password-confirmation"
                                type="text"
                                placeholder="Password Confirmation"
                                value={passwordConfirmation}
                                onChange={e => setPasswordConfirmation(e.target.value)}
                                required
                            />

                            <button onClick={handleLogin} className="submit-review-button" type="button">Submit Review</button>
                        </div>
                    </div>

                </div>
            </div>
      </div>
  );
}

export default LoginModal;
