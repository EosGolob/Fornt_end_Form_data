// EmployeeCreatePages.jsx (Parent Component)
import React, { useState } from "react";
import PersonalDetailsComponent from "./PersonalDetailsComponent";
import EducationalDetailsComponent from "./EducationalDetailsComponent";
import AdditionalDetailsComponent from "./AdditionalDetailsComponent";
import { creatEmployee } from "../services/EmployeeService";

import '../components/EmployeeCreatePageComponent.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const EmployeeCreatePageComponent = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    jobProfile: "",
    qualification: "",
    mobileNo: "",
    permanentAddress: "",
    currentAddress: "",
    gender: "",
    previousOrganisation: "",
    dob: null,
    maritalStatus: "",
    refferal: "",
    year: new Date().getFullYear(),
    file: null,
    source: "",
    subSource: "",
    language: "",
    experience: ""
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    jobProfile: "",
    qualification: "",
    mobileNo: "",
    permanentAddress: "",
    currentAddress: "",
    gender: "",
    previousOrganisation: "",
    dob: "",
    maritalStatus: "",
    refferal: "",
    year: "",
    file: "",
    source: "",
    subSource: "",
    language: "",
    experience: "",
    aadhaarNumber:""
  });
  const [currentPage, setCurrentPage] = useState(1);

 
  const handleChange = (field, value) => {
 
    let errorMessage = "";
    switch (field) {
      case "email":
        errorMessage = validateEmail(value) ? "" : "Invalid email format";
        break;
      case "mobileNo":
        errorMessage = validatePhoneNumber(value) ? "" : "Invalid phone number format";
        break;
      case "aadhaarNumber":
        errorMessage = validateAadhaar(value) ? "" : "Invalid Aadhaar number format";
        break;
      case "dob":
        errorMessage = validateDOB(value) ? "" : "Date of birth cannot be in the future";
        break;
      default:
        errorMessage = "";
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMessage,
    }));

    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };
  
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const previousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const validateRequiredFields = () => {
    const newErrors = {};
    const requiredFields = [
      'fullName', 'email', 'jobProfile', 'qualification', 'mobileNo',
      'permanentAddress', 'currentAddress', 'gender', 'previousOrganisation',
      'dob', 'maritalStatus', 'refferal', 'year', 'file', 'source', 'languages', 'experience', 'aadhaarNumber'
    ];
  
    requiredFields.forEach(field => {
      if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
        newErrors[field] = 'This field is required';
      }
    });
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // const validateRequiredFields = () => {
  //   const newErrors = {};
  //   const requiredFields = [
  //     'fullName', 'email', 'jobProfile', 'qualification', 'mobileNo',
  //     'permanentAddress', 'currentAddress', 'gender', 'previousOrganisation',
  //     'dob', 'maritalStatus', 'refferal', 'year', 'file', 'source', 'language', 'experience', 'aadhaarNumber'
  //   ];
  
  //   const filledFields = requiredFields.filter(field => formData[field]);
  
  //   if (filledFields.length === 1) {
  //     // Show a single error if only one field is filled and the rest are empty
  //     newErrors.general = 'Please fill all required fields';
  //   } else {
  //     requiredFields.forEach(field => {
  //       if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
  //         newErrors[field] = 'This field is required';
  //       }
  //     });
  //   }
  
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };
  
 
  const saveEmployee = () => {
    if (!validateRequiredFields()) {
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append("employee", new Blob([JSON.stringify(formData)], { type: "application/json" }));
    formDataToSend.append("image", formData.file);
  
    creatEmployee(formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log(response.data);
      toast.success("Employee created successfully!");
      setFormData({
        fullName: "",
        email: "",
        jobProfile: "",
        qualification: "",
        mobileNo: "",
        permanentAddress: "",
        currentAddress: "",
        gender: "",
        previousOrganisation: "",
        dob: null,
        maritalStatus: "",
        refferal: "",
        year: new Date().getFullYear(),
        file: null,
        source: "",
        subSource: "",
        language: "",
        experience: "",
        aadhaarNumber:"",
      });
      setCurrentPage(1);
    }).catch((errors) => {
    console.error(errors);
    if (errors.response) {
      const responseData = errors.response.data;
      if (responseData && responseData.message) {
        const errorMessage = responseData.message;
      const updatedErrors = { ...errors };

      if (errorMessage.includes("Email") && errorMessage.includes("Aadhaar")) {
        updatedErrors.email = "Email is already registered";
        updatedErrors.aadhaarNumber = "Aadhaar number is already registered";
        toast.error("Failed to create employee. Email and Aadhaar number are already registered.");
      } else if (errorMessage.includes("Email")) {
        updatedErrors.email = "Email is already registered";
        toast.error("Email is already registered.");
      } else if (errorMessage.includes("Aadhaar")) {
        updatedErrors.aadhaarNumber = "Aadhaar number is already registered";
        toast.error("Aadhaar number is already registered.");
      } else {
        // Handle other errors if needed
        toast.error("Failed to create employee. Please try again.");
      }

      setErrors(updatedErrors); // Update errors state with new messages
    }
   }
  });
};
  
    const handleDateChange = (date) => {
    if (date) {
      const updatedDate = new Date(date);
      updatedDate.setFullYear(formData.year);
      setFormData((prevFormData) => ({
        ...prevFormData,
        dob: updatedDate,
      }));
    }
  };

  const handleYearChange = (event) => {
    const newYear = parseInt(event.target.value, 10);
    setFormData((prevFormData) => ({
      ...prevFormData,
      year: newYear,
    }));
    if (formData.dob) {
      const updatedDate = new Date(formData.dob);
      updatedDate.setFullYear(newYear);
      setFormData((prevFormData) => ({
        ...prevFormData,
        dob: updatedDate,
      }));
    }
  };

  const renderYearOptions = () => {
    const years = [];
    const startYear = new Date().getFullYear() - 100;
    const endYear = new Date().getFullYear() + 10;
    for (let i = startYear; i <= endYear; i++) {
      years.push(i);
    }
    return years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ));
  }

  const handleSourceChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      source: e.target.value,
      subSource: "",
    }));
  };


  const handleSubSourceChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      subSource: e.target.value,
    }));
  };

  const validateEmail = (email) => {
    // Implement email validation logic
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Implement phone number validation logic
    return /^\d{10}$/.test(phoneNumber);
  };

  const validateAadhaar = (aadhaarNumber) => {
    // Implement Aadhaar number validation logic
    return /^\d{12}$/.test(aadhaarNumber);
  };

  const validateDOB = (dob) => {
    // Implement DOB validation logic
    const currentDate = new Date();
    const selectedDate = new Date(dob);
    return selectedDate < currentDate;
  };

  return (
    
    <div style={{minHeight: '100vh', padding: '20px'}}>
        <ToastContainer />
      {currentPage === 1 && (
        <PersonalDetailsComponent
          formData={formData}
          handleChange={handleChange}
          handleYearChange={handleYearChange}
          renderYearOptions={renderYearOptions}
          handleDateChange={handleDateChange}

          errors={errors}
        />
      )}
      {currentPage === 2 && (
        <EducationalDetailsComponent
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />
      )}
      {currentPage === 3 && (
        <AdditionalDetailsComponent
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          handleSourceChange={handleSourceChange}
          handleSubSourceChange={handleSubSourceChange}
        />
      )}
      <div className="button-container">

      {currentPage > 1 && (
        <button className="btn btn-secondary mx-2"  style={{'backgroundColor': "#D4A373", 'color':'black', 'width':'10%'}} onClick={previousPage}>Previous</button>
      )}
      {currentPage < 3 ? (
        <button className="btn btn-secondary mx-2" style={{'backgroundColor': "#D4A373", 'color':'black', 'width':'10%'}} onClick={nextPage}>Next</button>
      ) : (
        <button className="btn btn-secondary mx-2" style={{'backgroundColor': "#D4A373", 'color':'black', 'width':'10%'}} onClick={saveEmployee}>Submit</button>
      )}
      </div>
    </div>
  
  );
};

export default EmployeeCreatePageComponent;
