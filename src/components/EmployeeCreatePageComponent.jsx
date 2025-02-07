import React, { useState } from "react";
import PersonalDetailsComponent from "./PersonalDetailsComponent";
import EducationalDetailsComponent from "./EducationalDetailsComponent";
import AdditionalDetailsComponent from "./AdditionalDetailsComponent";
import WelcomePageComponent from "./WelcomePageComponent";
import { creatEmployee } from "../services/EmployeeService";
import '../components/EmployeeCreatePageComponent.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EmployeeCreatePageComponent = () => {

  const [formData, setFormData] = useState({
    fullName: "",email: "",jobProfile: "",qualification: "",mobileNo: "",
    permanentAddress: "",currentAddress: "",gender: "",previousOrganisation: "",
    dob: null,maritalStatus: "",refferal: "",year: new Date().getFullYear(),
    file: null,
    source: "",subSource: "",language: "",experience: "",workExp:""
  });

  const [errors, setErrors] = useState({
    fullName: "",email: "",jobProfile: "",qualification: "",mobileNo: "",
    permanentAddress: "",currentAddress: "",gender: "",previousOrganisation: "",
    dob: "",maritalStatus: "",refferal: "",year: "",
    file: "",
    source: "",
    subSource: "",language: "",experience: "",aadhaarNumber: "",workExp:""
  });
  const [currentPage, setCurrentPage] = useState(0);
  // const [startDate, setStartDate] = useState(formData.dob ? new Date(formData.dob) : null);
  const [isDeclarationChecked, setIsDeclarationChecked] = useState(false);


  const handleChange = (field, value) => {
    let errorMessage = "";
    if (field === "workExp" && value === "Fresher") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: value,
        previousOrganisation: "" 
      }));
      return; 
    }
   
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
      case "experience":
        errorMessage = validateExperience(value) ? "" :"Only Integer value required";
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
    let isValid = true;
    if (currentPage === 1) {
      if (!validateRequiredForPersonalDetailsPage())
         return;
    } else if (currentPage === 2) {
      if (!validateRequiredEducationalDetailsPage()) 
        return;
    }
    if (isValid) {
    setCurrentPage((prevPage) => prevPage + 1);
    }
  };



  const previousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const validateRequiredForPersonalDetailsPage = () => {
    const newErrors = {};
    const requiredFields = [
      'fullName', 'email', 'mobileNo',
      'gender' ,'dob','maritalStatus' 
    ];
    requiredFields.forEach(field => {
      if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
        newErrors[field] = 'This field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const validateRequiredEducationalDetailsPage = () => {
    const newErrors = {};
    const requiredFields = [
      'qualification', 'workExp', 'languages',
      'experience'
    ];
    requiredFields.forEach(field => {
      if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
        if (field === 'previousOrganisation' && formData.workExp === "Fresher") {
          return;
        }
        if (field === 'previousOrganisation' && formData.workExp === "Experience" && !formData.previousOrganisation.trim()) {
          newErrors[field] = 'This field is required';
          return;
        }
        if (field === 'previousOrganisation' && formData.workExp === "Experience in BPO" && !formData.previousOrganisation.trim()) {
          newErrors[field] = 'This field is required';
          return;
        }
        newErrors[field] = 'This field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const validateRequiredFields = () => {
    const newErrors = {};
    const requiredFields = [
      'permanentAddress', 'currentAddress','refferal',
      'aadhaarNumber','jobProfile',
      'file'
    ];

    requiredFields.forEach(field => {
      if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
        newErrors[field] = 'This field is required';
      }
    });
   
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const saveEmployee = () => {
    if (!validateRequiredFields()) {
      return;
    }
    if (formData.refferal === "Yes" && (!formData.source || !formData.subSource)) {
      toast.error("Please fill in the source and sub source fields");
      return;
    }
    console.log('FormData before sending to API:', formData); // <--- Add this line
    if (!isDeclarationChecked) {
      toast.error('You must agree to the declaration to submit.');
      setErrors((prevErrors) => ({
        ...prevErrors,
        declaration: 'You must agree to the declaration to submit.'
      }));
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
          fullName: "",email: "",jobProfile: "",qualification: "", mobileNo: "",
          permanentAddress: "",currentAddress: "",gender: "",previousOrganisation: "",
          dob: null,maritalStatus: "",refferal: "",year: new Date().getFullYear(),
          file: null,
          source: "",subSource: "",language: "",experience: "",aadhaarNumber: "",workExp:"",
        });
        setCurrentPage(1);
        setIsDeclarationChecked(false);
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
              toast.error("Failed to create employee. Please try again.");
            }
            setErrors(updatedErrors); 
          }
        }
      });
  };


  const handleSourceChange = (e) => {
    const value = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      source: value,
      subSource: value ? prevFormData.subSource : "", 
    }));
  };
  
  const handleSubSourceChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      subSource: e.target.value,
    }));
  };
  
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    return /^\d{10}$/.test(phoneNumber);
  };

  const validateAadhaar = (aadhaarNumber) => {
    return /^\d{12}$/.test(aadhaarNumber);
  };

  const validateDOB = (dob) => {
    const currentDate = new Date();
    const selectedDate = new Date(dob);
    return selectedDate < currentDate;
  };
  const validateExperience = (experience) => {
    const experienceValue = Number(experience);
    return !isNaN(experienceValue) && Number.isInteger(experienceValue);

};

const handleStart = () => {
  setCurrentPage(0);
};

  
  return (

    <div style={{ minHeight: '100vh', padding: '20px' }}>
      <ToastContainer />
      {currentPage === 0 && (
        <WelcomePageComponent onStart={handleStart} />
      )}
      {currentPage === 1 && (
        <PersonalDetailsComponent formData={formData} 
        handleChange={handleChange}   
         errors={errors}
        />
      )}
      {currentPage === 2 && (
        <EducationalDetailsComponent formData={formData} handleChange={handleChange}
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


          isDeclarationChecked={isDeclarationChecked}
          setIsDeclarationChecked={setIsDeclarationChecked}
        />
      )}
      <div className="button-container">

        {currentPage > 0 && (
          <button className="btn btn-secondary mx-2"
           style={{ 'backgroundColor': "#D4A373", 'color': 'black', 'width': '10%' }} 
           onClick={previousPage}>Previous</button>
        )}
        {currentPage < 3 ? (
          <button className="btn btn-secondary mx-2" 
          style={{ 'backgroundColor': "#D4A373", 'color': 'black', 'width': '10%' }} 
          onClick={nextPage}>Next</button>
        ) : (
          <button className="btn btn-secondary mx-2" 
          style={{ 'backgroundColor': "#D4A373", 'color': 'black', 'width': '10%' }} 
          onClick={saveEmployee}>Submit</button>
        )}
      </div>
    </div>

  );
};

export default EmployeeCreatePageComponent;
