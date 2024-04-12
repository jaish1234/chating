import React, { useState } from 'react'
import './Forgot.css'
import update from "../../assets/img/update.png"
// import robot from '../forgot-password/pass-robot.png'
import ReCAPTCHA from "react-google-recaptcha";

function Forgot() {

        // ReCaptcha to submit form

        const [capval, setcapval] = useState(null)

        //login button throw login to validation
  
        const [value1, setvalue1] = useState({})
        const [errors, seterror] = useState({});
        console.log("errors", errors);
        console.log("value1", value1);
        function Hchange(e) {
            setvalue1({ ...value1, [e.target.name]: e.target.value });
            seterror({ ...errors, [e.target.name]: "" });
        }
        console.log("value1", value1);
    
        function hsubmit(e) {
            e.preventDefault();
            const validaterror = validate(value1);
            if (Object.keys(validaterror).length === 0) {
                alert("Send Email, Done")
            }
        }
    
        const validate = (value1) => {
            let errors = {};
            const mailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
            if (!value1?.email) {
                errors.email = "Email Required";
            } else if (!mailregex.test(value1?.email)) {
                errors.email = "Invalid Email Address";
            }
            seterror(errors);
            return errors;
        };
  return (
    <>
        <div className='fl1'>

            <div className='fl2'>
                <p>Already have an Upwork account?</p>
                <a href='/Login1'>Log In</a>
            </div>
        </div>
        <div className='fl3'>
            <div className='fl4'>
                <div className='fl5'>
                    <img src={update} className='imgup' alt='not found'/>
                </div>
                <p className='fp1'>Update your password</p>

                <p className='fp2'>Enter your username or email address and select <strong>Send Email</strong>.</p>

                <form className='fl6' onSubmit={(e) => hsubmit(e)}>
                    <p>Username or Email</p>

                    <div className="c6">
                        <input type="email"  onChange={Hchange} name="email"/>
                        {errors.email && (<p style={{ color: "red" }}>{errors.email}</p>)}
                    </div>

                    <div className='fl7'>
                        <ReCAPTCHA
                            sitekey='6Lf403cpAAAAAEFops1DQcP1j2-yygZzBzQEou10'
                            onChange={val => setcapval(val)}
                        />
                    </div>

                    <div className='fl8 fl9'>
                        <a href='/Login1'>Cancel</a>
                        <button className='btn1' disabled={!capval}>Send Email</button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default Forgot