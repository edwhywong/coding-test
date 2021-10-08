import "./styles.css";

function Checkbox({ label, onChange, checked }) {
  return (
    <label className="container">
      {label}
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="checkmark"></span>
    </label>
  );
}

export default Checkbox;
