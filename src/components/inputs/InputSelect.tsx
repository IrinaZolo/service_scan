import { PropsWithChildren, SelectHTMLAttributes, useState } from "react";

interface SelectBaseProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  width?: string;
  height?: string;
}

export default function InputSelect({
  children,
  ...props
}: PropsWithChildren<SelectBaseProps>) {
  const [open, setOpen] = useState<boolean>(false);

  function toggleOpen() {
    setOpen((prev) => !prev);
  }

  function onCloseSelect() {
    setOpen(false);
  }

  return (
    <div
      className={`relative ${props.width} min-w-[152px] h-[${props.height}]`}
    >
      <select
        onClick={toggleOpen}
        onBlur={onCloseSelect}
        {...props}
        className={
          (props.error
            ? "border-[#FF5959] shadow-[0px_0px_20px_rgba(255,89,89,0.2)]"
            : "border-[#C7C7C7]") +
          " relative w-[100%] h-[43px] border-[1px] rounded-[5px] my-[15px] px-[15px] shadow-[0px_0px_10px_rgba(0,0,0,0.05)] appearance-none bg-transparent " +
          props.className +
          `w-[100%] h-[${props.height}]`
        }
      >
        {children}
      </select>
      <div
        className={
          "absolute z-[-10] top-[48px] right-[19px] w-[10px] after:content-[''] after:absolute after:border-[10px] after:border-l-transparent after:border-r-transparent  " +
          (open
            ? " after:border-b-[10px] after:border-t-transparent after:border-b-[(217,217,217,1)] after:mt-[-20px]"
            : " after:border-b-transparent after:border-t-[10px] after:border-t-[(217,217,217,1)] after:mt-[-10px] after:mb-[-10px]")
        }
      ></div>
    </div>
  );
}
