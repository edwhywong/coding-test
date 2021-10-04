import "./styles.css";

function Checkbox({ label, onChange, checked }) {
  return (
    <label class="container">
      {label}
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span class="checkmark"></span>
    </label>
  );
}

export default Checkbox;
