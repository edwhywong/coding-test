import classes from "./styles.module.css";

function Button({ children, variant, onClick, style, ...props }) {
  return (
    <button
      className={[classes.button, classes[variant]].join(" ")}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}

export default Button;
