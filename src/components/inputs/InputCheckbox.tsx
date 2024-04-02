import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputHTMLAttributes, PropsWithChildren } from "react";

interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  name: string;
  isChecked?: boolean;
}

export default function InputCheckbox({
  className,
  children,
  name,
  isChecked = false,
  ...props
}: PropsWithChildren<InputBaseProps>) {
  return (
    <label
      htmlFor={name}
      className="flex flex-row items-center my-[15px] first:mt-0"
    >
      <input
        type="checkbox"
        id={name}
        className="hidden"
        checked={isChecked}
        {...props}
      />
      <div
        className={`mr-[10px] w-[20px] h-[20px] relative before:content-[''] border border-[1px_solid_rgba(0,0,0,0.6)] ${
          isChecked
            ? "border-[rgba(0,0,0,1)] flex justify-center items-center text-green-600"
            : ""
        }`}
      >
        {isChecked && <FontAwesomeIcon icon={faCheck} />}
      </div>
      <span
        className={`whitespace-nowrap ${
          isChecked ? "" : "text-[rgba(0,0,0,0.6)]"
        }`}
      >
        {children}
      </span>
    </label>
  );
}
