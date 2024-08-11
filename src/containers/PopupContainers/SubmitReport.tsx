import React, { useState } from 'react';

export const SubmitReport = () => {
  const [formData, setFormData] = useState({
    reason: '',
    info: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Reason:
          <input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Reason"
          />
        </label>
      </div>
      <div>
        <label>
          Content:
          <textarea
            name="info"
            value={formData.info}
            onChange={handleChange}
            placeholder="Any other additional info "
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SubmitReport;
