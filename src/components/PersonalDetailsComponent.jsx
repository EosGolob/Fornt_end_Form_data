import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PersonalDetailsComponent = ({
  formData,
  errors,
  handleYearChange,
  renderYearOptions,
  handleDateChange,
  handleChange,
}) => {
  return (
    <div className="container"  >
      {/* <br/> */}
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3" style={{'backgroundColor': "#F1FAEE"}}>
          <div className="card-body" >
            <h2 className="text-center" style={{ color: 'darkgoldenrod'}}>Personal Details</h2>
            <form>
              <div className="form-group">
                <label className="form-label"><strong>Full Name</strong></label>
                <input
                  type="text"
                  placeholder="Enter your full Name"
                  className={`form-control ${
                    errors.fullName ? "is-invalid" : ""
                  }`}
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                />
                {errors.fullName && (
                  <div className="invalid-feedback">{errors.fullName}</div>
                )}
              </div>
              <div className="form-group">
                <label className="form-label"><strong>Email</strong></label>
                <input
                  type="text"
                  placeholder="Enter Email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="form-group">
                <label className="form-label"><strong>Mobile No</strong></label>
                <input
                  type="text"
                  placeholder="Enter Mobile Number"
                  className={`form-control ${
                    errors.mobileNo ? "is-invalid" : ""
                  }`}
                  value={formData.mobileNo}
                  onChange={(e) => handleChange("mobileNo", e.target.value)}
                />
                {errors.mobileNo && (
                  <div className="invalid-feedback">{errors.mobileNo}</div>
                )}
              </div>
              <div className="form-group">
                <label className="form-label"><strong>Gender</strong></label>
                <select
                  className={`form-control ${
                    errors.gender ? "is-invalid" : ""
                  }`}
                  value={formData.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                  <option value="OTHER">OTHER</option>
                </select>
                {errors.gender && (
                  <div className="invalid-feedback">{errors.gender}</div>
                )}
              </div>
              <div className="form-group">
                <label className="form-label"><strong>Date of Birth</strong></label>
                <div style={{ display: "flex", gap: "10px" }}>
                  <select
                    value={formData.year}
                    onChange={handleYearChange}
                    className="form-control"
                  >
                    {renderYearOptions()}
                  </select>
                  <DatePicker
                    selected={formData.dob}
                    onChange={handleDateChange}
                    className="form-control"
                    placeholderText=""
                    dateFormat="MM/dd"
                    showMonthDropdown
                    showDayDropdown
                    dropdownMode="select"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label"><strong>Marital Status</strong></label>
                <select
                  className={`form-control ${
                    errors.maritalStatus ? "is-invalid" : ""
                  }`}
                  value={formData.maritalStatus}
                  onChange={(e) => handleChange("maritalStatus", e.target.value)}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                </select>
                {errors.maritalStatus && (
                  <div className="invalid-feedback">{errors.maritalStatus}</div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsComponent;
