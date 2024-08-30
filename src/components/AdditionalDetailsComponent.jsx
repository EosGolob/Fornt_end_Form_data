import React from "react";

const AdditionalDetailsComponent = ({
  formData,
  errors,
  handleSourceChange,
  handleChange,
  handleSubSourceChange,
}) => {
  return (
    <div className="container" style={{'marginTop': '-15px'}}>
      {/* <br></br> */}
      <div className="row-lg">
        <div className="card col-md-6 offset-md-3 offset-md-3" style={{'backgroundColor': "#F1FAEE"}}>
          <div className="card-body">
            <h2  className="text-center" style={{ color: 'darkgoldenrod'}}>Additional Details</h2>
            <form>
              <div className="form-group">
                <label className="form-label"><strong>Appiled for Position</strong></label>
                <input
                  type="text"
                  placeholder="Enter for which position you applied"
                  className={`form-control ${
                    errors.jobProfile ? "is-invalid" : ""
                  }`}
                  value={formData.jobProfile}
                  onChange={(e) => handleChange("jobProfile", e.target.value)}
                />
                {errors.jobProfile && (
                  <div className="invalid-feedback">{errors.jobProfile}</div>
                )}
              </div>
              <div className="form-group">
                <label className="form-label"><strong>Permanent Address</strong></label>
                <input
                  type="text"
                  placeholder="Enter Permanent Address"
                  className={`form-control ${
                    errors.permanentAddress ? "is-invalid" : ""
                  }`}
                  value={formData.permanentAddress}
                  onChange={(e) =>
                    handleChange("permanentAddress", e.target.value)
                  }
                />
                {errors.permanentAddress && (
                  <div className="invalid-feedback">
                    {errors.permanentAddress}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label className="form-label"><strong>Current Address</strong></label>
                <input
                  type="text"
                  placeholder="Enter Current Address"
                  className={`form-control ${
                    errors.currentAddress ? "is-invalid" : ""
                  }`}
                  value={formData.currentAddress}
                  onChange={(e) =>
                    handleChange("currentAddress", e.target.value)
                  }
                />
                {errors.currentAddress && (
                  <div className="invalid-feedback">
                    {errors.currentAddress}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label className="form-label"><strong>Refferal</strong></label>
                <input
                  type="text"
                  placeholder="Enter Refferal Employee Name"
                  className={`form-control ${
                    errors.refferal ? "is-invalid" : ""
                  }`}
                  value={formData.refferal}
                  onChange={(e) => handleChange("refferal", e.target.value)}
                />
                {errors.refferal && (
                  <div className="invalid-feedback">{errors.refferal}</div>
                )}
              </div>
              <div className="form-group">
                <label className="form-label"><strong>Aadhaar Number No</strong></label>
                <input
                  type="text"
                  placeholder="Enter Aadhar No"
                  className={`form-control ${
                    errors.aadhaarNumber ? "is-invalid" : ""
                  }`}
                  value={formData.aadhaarNumber}
                  onChange={(e) =>
                    handleChange("aadhaarNumber", e.target.value)
                  }
                />
                {errors.aadhaarNumber && (
                  <div className="invalid-feedback">{errors.aadhaarNumber}</div>
                )}
              </div>
              <div className="form-group">
                <label className="form-label"><strong>Aadhar upload</strong></label>
                <input
                  type="file"
                  id="image"
                  placeholder="select your Aadhar File"
                  className={`form-control ${errors.file ? "is-invalid" : ""}`}
                  // onChange={(e) => setFile(e.target.files[0])}
                  onChange={(e) => handleChange("file", e.target.files[0])}
                />
                {errors.file && (
                  <div className="invalid-feedback">{errors.file}</div>
                )}
              </div>
             {/**<div className="form-group">
                <label className="form-label"><strong>Source</strong></label>
                <select
                  className={`form-control ${
                    errors.source ? "is-invalid" : ""
                  }`}
                  value={formData.source}
                  onChange={handleSourceChange}
                >
                  <option value="" disabled>
                    Select Source
                  </option>
                  <option value="Vendor">Vendor</option>
                  <option value="Emp Ref">Employee Reference</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Portal">Portal</option>
                  <option value="NGO">NGO</option>
                  <option value="Campus">Campus</option>
                  <option value="Walk In">Walk In</option>
                </select>
                {errors.source && (
                  <div className="invalid-feedback">{errors.source}</div>
                )}

                {formData.source === "Vendor" && (
                  <div className="form-group">
                    <label className="form-label">
                      Sub Source (Name of Vendor)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Vendor Name"
                      className={`form-control ${
                        errors.subSource ? "is-invalid" : ""
                      }`}
                      value={formData.subSource}
                      onChange={handleSubSourceChange}
                    />
                    {errors.subSource && (
                      <div className="invalid-feedback">{errors.subSource}</div>
                    )}
                  </div>
                )}

                {formData.source === "Emp Ref" && (
                  <div className="form-group">
                    <label className="form-label">
                      Sub Source (Employee Code)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Employee Code"
                      className={`form-control ${
                        errors.subSource ? "is-invalid" : ""
                      }`}
                      value={formData.subSource}
                      onChange={handleSubSourceChange}
                    />
                    {errors.subSource && (
                      <div className="invalid-feedback">{errors.subSource}</div>
                    )}
                  </div>
                )}
                {formData.source === "Portal" && (
                  <div className="form-group">
                    <label className="form-label">Sub Source (Portal)</label>
                    <input
                      type="text"
                      placeholder=""
                      className={`form-control ${
                        errors.subSource ? "is-invalid" : ""
                      }`}
                      value={formData.subSource}
                      onChange={handleSubSourceChange}
                    />
                    {errors.subSource && (
                      <div className="invalid-feedback">{errors.subSource}</div>
                    )}
                  </div>
                )}
                {formData.source === "Social Media" && (
                  <div className="form-group">
                    <label className="form-label">
                      Sub Source (Social Media)
                    </label>
                    <input
                      type="text"
                      placeholder="specify medium"
                      className={`form-control ${
                        errors.subSource ? "is-invalid" : ""
                      }`}
                      value={formData.subSource}
                      onChange={handleSubSourceChange}
                    />
                    {errors.subSource && (
                      <div className="invalid-feedback">{errors.subSource}</div>
                    )}
                  </div>
                )}
                {formData.source === "NGO" && (
                  <div className="form-group">
                    <label className="form-label">Sub Source (NGO)</label>
                    <input
                      type="text"
                      placeholder="specify NGO"
                      className={`form-control ${
                        errors.subSource ? "is-invalid" : ""
                      }`}
                      value={formData.subSource}
                      onChange={handleSubSourceChange}
                    />
                    {errors.subSource && (
                      <div className="invalid-feedback">{errors.subSource}</div>
                    )}
                  </div>
                )}
                {formData.source === "Campus" && (
                  <div className="form-group">
                    <label className="form-label">Sub Source (Campus)</label>
                    <input
                      type="text"
                      placeholder=""
                      className={`form-control ${
                        errors.subSource ? "is-invalid" : ""
                      }`}
                      value={formData.subSource}
                      onChange={handleSubSourceChange}
                    />
                    {errors.subSource && (
                      <div className="invalid-feedback">{errors.subSource}</div>
                    )}
                  </div>
                )}
                {formData.source === "Walk In" && (
                  <div className="form-group">
                    <label className="form-label">Sub Source (Walk In)</label>
                    <input
                      type="text"
                      placeholder=""
                      className={`form-control ${
                        errors.subSource ? "is-invalid" : ""
                      }`}
                      value={formData.subSource}
                      onChange={handleSubSourceChange}
                    />
                    {errors.subSource && (
                      <div className="invalid-feedback">{errors.subSource}</div>
                    )}
                  </div>
                )}
              </div>
              **/}
               <div className="form-group">
                <label className="form-label"><strong>Source</strong></label>
                <select
                  className={`form-control ${errors.source ? "is-invalid" : ""}`}
                  value={formData.source}
                  onChange={handleSourceChange}
                >
                  <option value="" disabled>Select Source</option>
                  <option value="Vendor">Vendor</option>
                  <option value="Emp Ref">Employee Reference</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Portal">Portal</option>
                  <option value="NGO">NGO</option>
                  <option value="Campus">Campus</option>
                  <option value="Walk In">Walk In</option>
                </select>
                {errors.source && <div className="invalid-feedback">{errors.source}</div>}

                {formData.source === "Social Media" && (
                  <div className="form-group">
                    <label className="form-label"><strong>Social Media Platform</strong></label>
                    <select
                      className={`form-control ${errors.subSource ? "is-invalid" : ""}`}
                      value={formData.subSource}
                      onChange={handleSubSourceChange}
                    >
                      <option value="" disabled>Select Platform</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Twitter">Twitter</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Telegram">Telegram</option>
                      <option value="Others">Others</option>
                    </select>
                    {errors.subSource && <div className="invalid-feedback">{errors.subSource}</div>}
                  </div>
                )}

                {formData.source !== "Social Media" && formData.source && (
                  <div className="form-group">
                    <label className="form-label"><strong>Sub Source</strong></label>
                    <input
                      type="text"
                      placeholder={`Enter ${formData.source} Details`}
                      className={`form-control ${errors.subSource ? "is-invalid" : ""}`}
                      value={formData.subSource}
                      onChange={handleSubSourceChange}
                    />
                    {errors.subSource && <div className="invalid-feedback">{errors.subSource}</div>}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalDetailsComponent;
