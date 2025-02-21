import React, { useState } from 'react';
import axios from 'axios';
import './CreateEmployeeForm.css';


const CreateEmployeeForm = () => {
    const [employee, setEmployee] = useState({
        fullName: '',
        email: '',
        qualification: '',
        mobileNo: '',
        permanentAddress: '',
        currentAddress: '',
        gender: '',
        previousOrganisation: '',
        workExp: '',
        dob: '',
        maritalStatus: '',
        refferal: '',
        aadhaarNumber: '',
        languages: '',
        experience: '',
        source: '',
        subSource: '',
    });

    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [serverMessage, setServerMessage] = useState('');
    const availableLanguages = ['English', 'Spanish', 'French', 'German', 'Chinese'];
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
        setServerMessage('');
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };
    const handleLanguageChange = (e) => {
        const { value, checked } = e.target;
        const selectedLanguages = employee.languages ? employee.languages.split(', ') : [];

        if (checked) {
            // Add language to the list if checked
            selectedLanguages.push(value);
        } else {
            // Remove language from the list if unchecked
            const index = selectedLanguages.indexOf(value);
            if (index > -1) {
                selectedLanguages.splice(index, 1);
            }
        }

        // Join selected languages back to a comma-separated string
        setEmployee((prevState) => ({
            ...prevState,
            languages: selectedLanguages.join(', '),
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Clear previous errors
        setServerMessage(''); // Clear previous server messages

        const formData = new FormData();
        formData.append('employee', new Blob([JSON.stringify(employee)], { type: 'application/json' }));
        formData.append('image', image);

        console.log('Employee Data:', employee);  // Log employee data to inspect
        console.log('Image:', image);  // Log the image file

        try {
            const response = await axios.post('http://localhost:9090/api/employees/createEmployeeDetails', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Explicitly set content type
                },
            });

            console.log('Employee created successfully:', response.data);

            setEmployee({
                fullName: '',
                email: '',
                qualification: '',
                mobileNo: '',
                permanentAddress: '',
                currentAddress: '',
                gender: '',
                previousOrganisation: '',
                workExp: '',
                dob: '',
                maritalStatus: '',
                refferal: '',
                aadhaarNumber: '',
                languages: '',
                experience: '',
                source: '',
                subSource: '',
            });
            setImage(null);
            setErrors({});
        } catch (error) {
            if (error.response) {
                const errorObj = {};

                // Check for fieldErrors and set the error message for the top of the form
                if (error.response.data && error.response.data.fieldErrors) {
                    const fieldErrors = error.response.data.fieldErrors;

                    // Check if there's a specific error we want to display at the top of the form
                    fieldErrors.forEach(err => {
                        if (err.field === 'unknown') {
                            // Set the message from the fieldErrors to be displayed at the top
                            setServerMessage(err.message);
                        }
                        errorObj[err.field] = err.message; // Set individual field errors
                    });

                    setErrors(errorObj);
                }
            } else {
                setServerMessage('An unexpected error occurred. Please try again later.');
            }
        }
    };
    return (
        <div className="create-employee-form">
            <h2>Create Employee</h2>

            {serverMessage && ( // Show server message if exists
                <div style={{ color: 'red', marginBottom: '20px' }}>
                    {serverMessage}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={employee.fullName}
                        onChange={handleChange}
                    />
                    {errors.fullName && <div style={{ color: 'red' }}>{errors.fullName}</div>}
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                    />
                    {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                </div>

                <div>
                    <label>Mobile No</label>
                    <input
                        type="text"
                        name="mobileNo"
                        value={employee.mobileNo}
                        onChange={handleChange}
                    />
                    {errors.mobileNo && <div style={{ color: 'red' }}>{errors.mobileNo}</div>}
                </div>
                <div>
                    <label>Gender</label>
                    <select
                        name="gender"
                        value={employee.gender}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    {errors.gender && <div style={{ color: 'red' }}>{errors.gender}</div>}
                </div>
                <div>
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        name="dob"
                        value={employee.dob}
                        onChange={handleChange}
                    />
                    {errors.dob && <div style={{ color: 'red' }}>{errors.dob}</div>}
                </div>

                <div>
                    <label>Marital Status</label>
                    <select
                        name="maritalStatus"
                        value={employee.maritalStatus}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        {/* <option value="divorced">Divorced</option>
                        <option value="widowed">Widowed</option> */}
                    </select>
                    {errors.maritalStatus && <div style={{ color: 'red' }}>{errors.maritalStatus}</div>}
                </div>
                <div>
                    <label>Qualification</label>
                    <input
                        type="text"
                        name="qualification"
                        value={employee.qualification}
                        onChange={handleChange}
                    />
                    {errors.qualification && <div style={{ color: 'red' }}>{errors.qualification}</div>}
                </div>

                <div>
                    <label>Permanent Address</label>
                    <input
                        type="text"
                        name="permanentAddress"
                        value={employee.permanentAddress}
                        onChange={handleChange}
                    />
                    {errors.permanentAddress && <div style={{ color: 'red' }}>{errors.permanentAddress}</div>}
                </div>

                <div>
                    <label>Current Address</label>
                    <input
                        type="text"
                        name="currentAddress"
                        value={employee.currentAddress}
                        onChange={handleChange}
                    />
                    {errors.currentAddress && <div style={{ color: 'red' }}>{errors.currentAddress}</div>}
                </div>
                <div>
                    <label>Work Experience</label>
                    <select
                        name="workExp"
                        value={employee.workExp}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select Work Experience</option>
                        <option value="Fresher">Fresher</option>
                        <option value="Experience">Experience</option>
                        <option value="Experience in BPO">Experience in BPO</option>
                    </select>
                    {errors.workExp && <div style={{ color: 'red' }}>{errors.workExp}</div>}
                </div>
                {(employee.workExp === "Experience" || employee.workExp === "Experience in BPO") && (
                    <div>
                        <label>Previous Organisation</label>
                        <input
                            type="text"
                            name="previousOrganisation"
                            value={employee.previousOrganisation}
                            onChange={handleChange}
                        />
                        {errors.previousOrganisation && <div style={{ color: 'red' }}>{errors.previousOrganisation}</div>}
                    </div>

                )}
                <div>
                    <label>Aadhaar Number</label>
                    <input
                        type="text"
                        name="aadhaarNumber"
                        value={employee.aadhaarNumber}
                        onChange={handleChange}
                    />
                    {errors.aadhaarNumber && <div style={{ color: 'red' }}>{errors.aadhaarNumber}</div>}
                </div>
                <div>
                    <label>Languages</label>
                    <div className="languages-box">

                        <div>
                            {availableLanguages.map((language) => (
                                <div key={language}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value={language}
                                            checked={employee.languages.split(', ').includes(language)}
                                            onChange={handleLanguageChange}
                                        />
                                        {language}
                                    </label>
                                </div>
                            ))}
                        </div>

                    </div>
                    {errors.languages && <div style={{ color: 'red' }}>{errors.languages}</div>}
                </div>
                <div>
                    <label>Experience</label>
                    <input
                        type="text"
                        name="experience"
                        value={employee.experience}
                        onChange={handleChange}
                    />
                    {errors.experience && <div style={{ color: 'red' }}>{errors.experience}</div>}
                </div>
                <div>
                    <label>Refferal</label>
                    <select
                        name="refferal"
                        value={employee.refferal}
                        onChange={handleChange}
                    >
                        <option value="" disabled> Select</option>
                        <option value="YES">YES</option>
                        <option value="NO">NO</option>
                    </select>
                    {errors.refferal && <div style={{ color: 'red' }}>{errors.refferal}</div>}
                </div>
                {employee.refferal == "YES"&&(
                <div>
                    <label>Source</label>
                    <input
                        type="text"
                        name="source"
                        value={employee.source}
                        onChange={handleChange}
                    />
                    {errors.source && <div style={{ color: 'red' }}>{errors.source}</div>}
                </div>
                )}
                {employee.refferal == "YES"&&(
                <div>
                    <label>Sub Source</label>
                    <input
                        type="text"
                        name="subSource"
                        value={employee.subSource}
                        onChange={handleChange}
                    />
                    {errors.subSource && <div style={{ color: 'red' }}>{errors.subSource}</div>}
                </div>
 )}
                <div>
                    <label>Upload Image</label>
                    <input type="file" name="image" onChange={handleFileChange} />
                    {errors.image && <div style={{ color: 'red' }}>{errors.image}</div>}
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateEmployeeForm;



{/** 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Clear previous errors
        setServerMessage('');
    
        const formData = new FormData();
        formData.append('employee', new Blob([JSON.stringify(employee)], { type: 'application/json' }));
        formData.append('image', image);
    
        console.log('Employee Data:', employee);  // Log employee data to inspect
        console.log('Image:', image);  // Log the image file
        console.log('Form Data:', formData);
        try {
            const response = await axios.post('http://localhost:9090/api/employees/createEmployeeDetails', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Explicitly set content type
                },
            });
    
            console.log('Employee created successfully:', response.data);
    
            setEmployee({
                fullName: '',
                email: '',
                qualification: '',
                mobileNo: '',
                permanentAddress: '',
                currentAddress: '',
                gender: '',
                previousOrganisation: '',
                workExp: '',
                dob: '',
                maritalStatus: '',
                refferal: '',
                aadhaarNumber: '',
                languages: '',
                experience: '',
                source: '',
                subSource: '',
            });
            setImage(null);
            setErrors({});
        } catch (error) {
            if (error.response) {
                console.error('Error Response:', error.response);
                const errorObj = {};
    
                // Check if the error contains fieldErrors
                if (error.response.data && error.response.data.fieldErrors) {
                    error.response.data.fieldErrors.forEach(err => {
                        errorObj[err.field] = err.message;
                    });

                    setErrors(errorObj);
                } if (error.response.data && error.response.data.message) {
                    setServerMessage(error.response.data.message); // Set the error message at the top
                    console.log("gfhgjjkhkhjk",error.response.data.message)
                } 
                // if (error.response.data) 
                else {
                    setServerMessage('An unexpected error occurred. Please try again later.');
                }
            } else {
                setServerMessage('An unexpected error occurred. Please try again later.');
            }
        }
    };
    */}