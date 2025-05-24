"use client";
import "./Steps.css";

const fontOptions = [
  { value: "Roboto", label: "Roboto (Modern)" },
  { value: "Lato", label: "Lato (Clean)" },
  { value: "Merriweather", label: "Merriweather (Traditional)" },
  { value: "Montserrat", label: "Montserrat (Bold)" },
  { value: "Open Sans", label: "Open Sans (Friendly)" },
  { value: "Playfair Display", label: "Playfair Display (Elegant)" },
];

const themeOptions = [
  { value: "modern", label: "Modern" },
  { value: "classic", label: "Classic" },
  { value: "minimal", label: "Minimal" },
  { value: "bold", label: "Bold" },
];

const DesignStep = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="step-container">
      <p className="step-description">
        Customize the look and feel of your website by selecting colors, fonts,
        and a theme that matches your organization's identity.
      </p>

      <div
        className="design-preview"
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            backgroundColor: data.primaryColor,
            color: "#ffffff",
            padding: "20px",
            borderRadius: "8px 8px 0 0",
            fontFamily: data.font,
          }}
        >
          <h3>Primary Color Header</h3>
          <p>This is how your primary color will look on your website.</p>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderBottom: `3px solid ${data.accentColor}`,
            fontFamily: data.font,
          }}
        >
          <h4 style={{ color: data.secondaryColor }}>
            Secondary Color Heading
          </h4>
          <p>
            This text shows your selected font: <strong>{data.font}</strong>
          </p>
          <button
            style={{
              backgroundColor: data.accentColor,
              color: "#ffffff",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Accent Color Button
          </button>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="primaryColor">Primary Color</label>
        <div className="color-picker-container">
          <input
            type="color"
            id="primaryColor"
            className="color-picker"
            value={data.primaryColor}
            onChange={(e) => handleChange("primaryColor", e.target.value)}
          />
          <input
            type="text"
            className="color-value"
            value={data.primaryColor}
            onChange={(e) => handleChange("primaryColor", e.target.value)}
          />
        </div>
        <small className="form-text text-muted">
          Main color for headers and important elements.
        </small>
      </div>

      <div className="form-group">
        <label htmlFor="secondaryColor">Secondary Color</label>
        <div className="color-picker-container">
          <input
            type="color"
            id="secondaryColor"
            className="color-picker"
            value={data.secondaryColor}
            onChange={(e) => handleChange("secondaryColor", e.target.value)}
          />
          <input
            type="text"
            className="color-value"
            value={data.secondaryColor}
            onChange={(e) => handleChange("secondaryColor", e.target.value)}
          />
        </div>
        <small className="form-text text-muted">
          Used for subheadings and secondary elements.
        </small>
      </div>

      <div className="form-group">
        <label htmlFor="accentColor">Accent Color</label>
        <div className="color-picker-container">
          <input
            type="color"
            id="accentColor"
            className="color-picker"
            value={data.accentColor}
            onChange={(e) => handleChange("accentColor", e.target.value)}
          />
          <input
            type="text"
            className="color-value"
            value={data.accentColor}
            onChange={(e) => handleChange("accentColor", e.target.value)}
          />
        </div>
        <small className="form-text text-muted">
          Used for buttons, links, and highlights.
        </small>
      </div>

      <div className="form-group">
        <label htmlFor="font">Font Family</label>
        <select
          id="font"
          className="form-control"
          value={data.font}
          onChange={(e) => handleChange("font", e.target.value)}
        >
          {fontOptions.map((font) => (
            <option key={font.value} value={font.value}>
              {font.label}
            </option>
          ))}
        </select>
        <small className="form-text text-muted">
          Select a font that reflects your organization's personality.
        </small>
      </div>

      <div className="form-group">
        <label htmlFor="theme">Website Theme</label>
        <select
          id="theme"
          className="form-control"
          value={data.theme}
          onChange={(e) => handleChange("theme", e.target.value)}
        >
          {themeOptions.map((theme) => (
            <option key={theme.value} value={theme.value}>
              {theme.label}
            </option>
          ))}
        </select>
        <small className="form-text text-muted">
          Choose a theme that best represents your organization's style.
        </small>
      </div>
    </div>
  );
};

export default DesignStep;
