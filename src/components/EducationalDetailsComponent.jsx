import React from "react";

const EducationalDetailsComponent = ({ formData, errors, handleChange, selectedLanguages, handleLanguageChange}) => {
  const availableLanguages = ["English","Hindi", "Tamil", "Bengali", "Telugu","Marathi","Other"];

  return (
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3" style={{ 'backgroundColor': "#F1FAEE" }}>
          <div className="card-body">
            <h2 className="text-center" style={{ color: 'darkgoldenrod' }}>Educational Details</h2>
            <form>
              <div className="form-group">
                <div className="label-error-container">
                  <label className="form-label"><strong>Qualification </strong></label>
                  {errors.qualification && (
                    <span className="text-danger">{errors.qualification}</span>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Enter qualification"
                  className={`form-control ${errors.qualification ? "is-invalid" : ""
                    }`}
                  value={formData.qualification}
                  onChange={(e) =>
                    handleChange("qualification", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <div className="label-error-container">
                  <label className="form-label"><strong>Work Experience</strong></label>
                  {errors.workExp && (
                    <span className="text-danger">
                      {errors.workExp}
                    </span>
                  )}
                </div>
                <select
                  className={`form-control ${errors.workExp ? "is-invalid" : ""}`}
                  value={formData.workExp}
                  onChange={(e) => handleChange("workExp", e.target.value)}
                >
                  <option value="" disabled>Select Work Experience</option>
                  <option value="Fresher">Fresher</option>
                  <option value="Experience">Experience</option>
                  <option value="Experience in BPO">Experience in BPO</option>
                </select>

              </div>
              {(formData.workExp === "Experience" || formData.workExp === "Experience in BPO") && (
                <div className="form-group">
                  <div className="label-error-container">
                    <label className="form-label"><strong>Previous Organisation</strong></label>
                    {errors.previousOrganisation && (
                      <span className="text-danger">
                        {errors.previousOrganisation}
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Previous Organisation"
                    className={`form-control ${errors.previousOrganisation ? "is-invalid" : ""
                      }`}
                    value={formData.previousOrganisation || ""}
                    onChange={(e) =>
                      handleChange("previousOrganisation", e.target.value)
                    }
                  />

                </div>
              )}
              <div className="form-group">
                
                <div className="label-error-container">
                <label className="form-label"><strong>Languages</strong></label>
                {errors.languages && (
                  <span className="text-danger">{errors.languages}</span>
                )}
              </div>
              <div className="checkbox-container">
                {availableLanguages.map((languages) => (
                  <div key={languages} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={languages}
                      checked={selectedLanguages.includes(languages)} // Use selectedLanguages prop
                      onChange={() => handleLanguageChange(languages)} // Call handleLanguageChange on change
                    />
                    <label className="form-check-label" htmlFor={languages}>
                      {languages}
                    </label>
                  </div>
                ))}
              </div>
           </div> 
              <div className="form-group">
                <div className="label-error-container">
                  <label className="form-label"><strong>Total Experience</strong></label>
                  {errors.experience && (
                    <span className="text-danger">{errors.experience}</span>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Enter Total Experience"
                  className={`form-control ${errors.experience ? "is-invalid" : ""
                    }`}
                  value={formData.experience}
                  onChange={(e) => handleChange("experience", e.target.value)}
                />

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalDetailsComponent;
{/* <div className="label-error-container">
                  <label className="form-label"><strong>Languages</strong></label>
                  {errors.languages && (
                    <span className="text-danger">{errors.languages}</span>
                  )}

                </div>
                <input
                  type="text"
                  placeholder="Enter languages"
                  className={`form-control ${errors.languages ? "is-invalid" : ""
                    }`}
                  value={formData.languages}
                  onChange={(e) => handleChange("languages", e.target.value)}
                />
              </div> */}