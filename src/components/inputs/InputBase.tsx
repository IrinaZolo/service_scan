import { InputHTMLAttributes, useEffect, useRef } from "react";

interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export default function InputBase({ className, ...props }: InputBaseProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (props.autoComplete) {
      inputRef?.current?.focus();
    }
  });
  return (
    <input
      ref={inputRef}
      {...props}
      className={
        (props.error
          ? "border-[#FF5959] shadow-[0px_0px_20px_rgba(255,89,89,0.2)]"
          : "border-[#C7C7C7]") +
        " relative h-[43px] border-[1px] rounded-[5px] shadow-[0px_0px_10px_rgba(0,0,0,0.05)] " +
        className
      }
    />
  );
}
