import PropTypes from "prop-types";

const TextInput = ({ label, id, value, onChange, type = "text" }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        className="form-control"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default TextInput;
