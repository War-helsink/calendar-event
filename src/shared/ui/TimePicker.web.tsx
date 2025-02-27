import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useThemeColor } from "../hooks/useThemeColor";
import { cn, formattedDate, formattedTime } from "../utils";
import { forwardRef, useCallback } from "react";

export interface TimePickerProps {
  className?: string;
  date?: Date;
  setDate?: (date: Date) => void;
  style?: React.CSSProperties;
  textColor?: string;
  mode?: "date" | "time";
}

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  backgroundColor: string;
  textColor?: string;
  placeholderColor: string;
  date: Date;
  mode: "date" | "time";
}

const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  (
    { value, onClick, className, style, backgroundColor, textColor, placeholderColor, date, mode },
    ref
  ) => (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={cn("rounded-xl p-4 text-center", className)}
      style={{ backgroundColor, color: textColor || placeholderColor, ...style }}
    >
      {value || (mode === "time" ? formattedTime(date) : formattedDate(date))}
    </button>
  )
);
CustomInput.displayName = "CustomInput";

export const TimePicker: React.FC<TimePickerProps> = ({
  className,
  style,
  textColor,
  mode = "time",
  date = new Date(),
  setDate,
}) => {
  const placeholderColor = useThemeColor("inputPlaceholderColor");
  const backgroundColor = useThemeColor("inputBackground");

  const handleConfirm = useCallback(
    (date: Date | null) => {
      if (date) {
        setDate?.(date);
      }
    },
    [setDate]
  );

  const datePickerProps =
    mode === "time"
      ? {
          showTimeSelect: true,
          showTimeSelectOnly: true,
          timeIntervals: 15,
          timeCaption: "Time",
          dateFormat: "hh:mm aa",
        }
      : {
          dateFormat: "MMM dd, yyyy",
        };

  return (
    <DatePicker
      selected={date}
      onChange={handleConfirm}
      customInput={
        <CustomInput
          className={className}
          style={style}
          backgroundColor={backgroundColor}
          textColor={textColor}
          placeholderColor={placeholderColor}
          date={date}
          mode={mode}
        />
      }
      {...datePickerProps}
    />
  );
};
