import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import loadingImg from "../../assets/loading.svg";

interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  error?: string;
  isLoading: boolean;
}

export default function ButtonBase({
  className,
  children,
  isLoading,
  ...props
}: PropsWithChildren<ButtonBaseProps>) {
  return (
    <button
      className={`mt-[17px] h-[60px] w-[100%] text-center text-white text-lg bg-[#5970FF] rounded-[5px] hover:bg-[#1b32c6] hover:scale-[1.05] transition disabled:opacity-50 disabled:hover:opacity-50 disabled:hover:bg-[#5970FF] disabled:transform-none ${className}`}
      {...props}
    >
      {!isLoading ? (
        children
      ) : (
        <img
          src={loadingImg}
          alt="Загрузка"
          className="h-10 animate-spin mx-auto"
        />
      )}
    </button>
  );
}
