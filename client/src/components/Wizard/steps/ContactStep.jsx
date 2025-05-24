"use client";
import "./Steps.css";

const ContactStep = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handleSocialMediaChange = (platform, value) => {
    onChange({
      ...data,
      socialMedia: {
        ...data.socialMedia,
        [platform]: value,
      },
    });
  };

  return (
    <div className="step-container">
      <p className="step-description">
        Add contact information and social media links to help visitors connect
        with your organization.
      </p>

      <div className="form-group">
        <label htmlFor="email">Email Address *</label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={data.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="contact@yourorganization.org"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          className="form-control"
          value={data.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="+1 (123) 456-7890"
        />
      </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          className="form-control"
          value={data.address}
          onChange={(e) => handleChange("address", e.target.value)}
          rows={3}
          placeholder="123 Main St, City, State, ZIP"
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="donationLink">Donation Link</label>
        <input
          type="url"
          id="donationLink"
          className="form-control"
          value={data.donationLink}
          onChange={(e) => handleChange("donationLink", e.target.value)}
          placeholder="https://donate.yourorganization.org"
        />
        <small className="form-text text-muted">
          Add a link where visitors can donate to your organization.
        </small>
      </div>

      <h3 className="section-subtitle">Social Media Links</h3>
      <p className="step-description">
        Add your organization's social media profiles to help visitors connect
        with you.
      </p>

      <div className="form-group">
        <label htmlFor="facebook">Facebook</label>
        <input
          type="url"
          id="facebook"
          className="form-control"
          value={data.socialMedia.facebook}
          onChange={(e) => handleSocialMediaChange("facebook", e.target.value)}
          placeholder="https://facebook.com/yourorganization"
        />
      </div>

      <div className="form-group">
        <label htmlFor="twitter">Twitter</label>
        <input
          type="url"
          id="twitter"
          className="form-control"
          value={data.socialMedia.twitter}
          onChange={(e) => handleSocialMediaChange("twitter", e.target.value)}
          placeholder="https://twitter.com/yourorganization"
        />
      </div>

      <div className="form-group">
        <label htmlFor="instagram">Instagram</label>
        <input
          type="url"
          id="instagram"
          className="form-control"
          value={data.socialMedia.instagram}
          onChange={(e) => handleSocialMediaChange("instagram", e.target.value)}
          placeholder="https://instagram.com/yourorganization"
        />
      </div>

      <div className="form-group">
        <label htmlFor="linkedin">LinkedIn</label>
        <input
          type="url"
          id="linkedin"
          className="form-control"
          value={data.socialMedia.linkedin}
          onChange={(e) => handleSocialMediaChange("linkedin", e.target.value)}
          placeholder="https://linkedin.com/company/yourorganization"
        />
      </div>
    </div>
  );
};

export default ContactStep;
