import type { FC, ButtonHTMLAttributes } from "react";
import "./CommonButton.css";

interface CommonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "green" | "red" | "gray";
  children: React.ReactNode;
}

const CommonButton: FC<CommonButtonProps> = ({
  color = "green",
  children,
  ...rest
}) => {
  return (
    <button className={`common-button ${color}`} {...rest}>
      {children}
    </button>
  );
};

export default CommonButton;
