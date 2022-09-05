import React from "react";
import classes from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className={classes.input}>
        <label htmlFor={props.id}>{label}</label>
        <input {...props} id={props.id} ref={ref} />
      </div>
    );
  }
);

export default Input;
