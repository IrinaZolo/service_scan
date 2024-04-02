import { InputHTMLAttributes, useRef, useState } from "react";

interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  dateValue: string;
  textValue: string;
  width?: string;
}

export default function InputDate({ className, ...props }: InputBaseProps) {
  const [inputArrowVisible, setInputArrowVisible] = useState<boolean>(true);
  const typeInputRef = useRef<HTMLInputElement>(null);

  function changeInputType(value: string) {
    return () => {
      if (typeInputRef.current) typeInputRef.current.type = value;
      setInputArrowVisible(value === "text" ? true : false);
    };
  }

  return (
    <div className={`relative ${props.width} min-w-[152px]`}>
      <input
        ref={typeInputRef}
        type={"text"}
        onFocus={changeInputType("date")}
        onBlur={changeInputType("text")}
        value={inputArrowVisible ? props.textValue : props.dateValue}
        className={
          (props.error
            ? "border-[#FF5959] shadow-[0px_0px_20px_rgba(255,89,89,0.2)]"
            : "border-[#C7C7C7]") +
          " w-[100%] h-[43px] border-[1px] rounded-[5px] shadow-[0px_0px_10px_rgba(0,0,0,0.05)] bg-transparent " +
          className
        }
        {...props}
      />
      {inputArrowVisible && (
        <div
          className={
            "absolute z-[-10] top-[48px] right-[19px] w-[10px] after:content-[''] after:absolute after:border-[10px] after:border-l-transparent after:border-r-transparent after:border-b-transparent after:border-t-[10px] after:border-t-[(217,217,217,1)] after:mt-[-30px] after:mb-[-10px]"
          }
        ></div>
      )}
    </div>
  );
}
