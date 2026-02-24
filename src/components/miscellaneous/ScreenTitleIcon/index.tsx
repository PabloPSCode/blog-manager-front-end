import FeatherIcon from "feather-icons-react";
import { CSSProperties } from "react";

interface ScreenTitleIconProps {
  screenTitle: string;
  iconName: string;
  style?: CSSProperties;
}

export function ScreenTitleIcon({
  screenTitle,
  iconName,
  style,
}: ScreenTitleIconProps) {
  return (
    <div className="flex flex-row  max-w-[400px] items-center" style={style}>
      <FeatherIcon
        icon={iconName}
        className="text-gray-700 dark:text-gray-100 w-7 h-7 md:w-10 lg:h-10"
        strokeWidth={1}
      />
      <h1 className="ml-2 text-black dark:text-white text-lg md:text-xl font-bold font-secondary">
        {screenTitle}
      </h1>
    </div>
  );
}
