import React from 'react';
import './WelcomePageComponent.css';
// import { useNavigate } from 'react-router-dom';


const WelcomePageComponent = ({ onStart }) => {
    // const navigate = useNavigate();

    // const startEmployeeCreation = () => {
    //     navigate('/create-employee');
    //   };
    return (
        <div className="welcome-page">
            <h1 className="title">Welcome to EOS Registration portal !</h1>
            <p className="intro">
                Welcome to the Employee Registration Form. Please read the instructions below before you start filling out the form:
            </p>
            <ul className="instructions">
                <li>
                    <div className="flex-container">
                        <p className="required">*</p>
                        <p>Please ensure you have all the necessary documents ready.</p>
                    </div>
                </li>
                <li>
                    <div className="flex-container">
                        <p className="required">*</p>
                        <p>Fill out all required fields accurately.</p>
                    </div>
                </li>
                <div className='flex-container'>
                    <p className="required">*</p>
                    <li>
                        <p>In the "Total Experience" field, if you are a fresher, please type "0" (zero).</p>
                    </li>
                </div>
                <div className='flex-container'>
                    <p className="required">*</p>
                    <li>
                        <p>Please enter your total experience in years only (e.g. 2, not 2.6) in the "Total Experience" field.</p>
                    </li>
                </div>
                <li>
                    <p>If you need help, refer to the guidelines provided in the form sections.</p>
                </li>

                <li>
                    <h2 className="subsection">Required Documents</h2>
                </li>
                <li>
                    <div className="flex-container">
                        <p className="required">*</p>
                        <p>Aadhaar card picture</p>
                    </div>
                </li>
                <li>
                    <div className="flex-container">
                        <p className="required">*</p>
                        <p>Aadhaar card picture (less than 2MB) - please upload backside of the Aadhaar card.</p>
                    </div>
                </li>
                <li>
                    <div className="flex-container">
                        <p className="required">*</p>
                        <p>Aadhaar Number</p>
                    </div>
                </li>
                <li>
                    <div className="flex-container">
                        <p className="required">*</p>
                        <p>Date of Birth</p>
                    </div>
                </li>
                <li>
                    <div className="flex-container">
                        <p className="required">*</p>
                        <p>Educational Details</p>
                    </div>
                </li>
                <li>
                    <p className="required">Note: All fields marked with * are compulsory and must be filled out to proceed to the next page.</p>
                </li>
                <li>
                    <p className="required">Once you have read and understood the above information, please click the "Next" button to proceed to the next page and fill out the form.</p>
                </li>
                <li>
                    <p className="required" >Before submitting the form, please ensure you have checked the "Terms and Conditions" checkbox, confirming that all the information provided by you is accurate and true.</p>
                </li>
            </ul>
            {/* <div>
            <button onClick={startEmployeeCreation}>Start</button>
            </div> */}
        </div>
    );
};

export default WelcomePageComponent;