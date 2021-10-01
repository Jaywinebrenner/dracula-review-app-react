
import React, { useState } from 'react'
import axios from 'axios'


function LoginModal({toggleLoginModal}) {



      const refreshPage = () => {
        window.location.reload(false);
      }

      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const [passwordConfirmation, setPasswordConfirmation] = useState('')
  
      const signup = () => {
  
          axios.post("http://localhost3000/api/v1/registrations", {
              user: {
                  email: email,
                  password: password,
                  password_confirmation: passwordConfirmation
              }
          },
          { withCredentials: true }
          ).then(res => {
              console.log("reg res", res)
              refreshPage();
          }).catch((err) => {
              console.log("err", err)
          })
  
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

                            <button onClick={signup} className="submit-review-button" type="button">Submit Review</button>
                        </div>
                    </div>

                </div>
            </div>
      </div>
  );
}

export default LoginModal;
