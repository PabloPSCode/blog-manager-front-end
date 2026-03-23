import { collapseLongString } from "../../../utils/formats";
import { CSSProperties, forwardRef, InputHTMLAttributes } from "react";
import Select, { StylesConfig } from "react-select";

interface SelectInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  options: any[];
  selectedOption?: {
    value: number | string;
    label: string;
  } | null;
  widthVariant?: "mid" | "full";
  isSearchable?: boolean;
  labelStyle?: CSSProperties;
  selectStyle?: CSSProperties;
  singleValueStyle?: CSSProperties;
  containerStyle?: CSSProperties;
  labelClassName?: string;
  singleValueClassName?: string;
  containerClassName?: string;
  onSelectOption?: (selectedOption: {
    value: number | string;
    label: string;
  }) => void;
}

// //TODO-PABLO: Grant all select input is filled with an object that contains the label and the value whose must be the id for the selected option that represents the record on database

export const SelectInput = forwardRef<HTMLInputElement, SelectInputProps>(
  (
    {
      label,
      options,
      selectedOption,
      widthVariant,
      isSearchable,
      containerStyle,
      selectStyle,
      labelStyle,
      singleValueStyle,
      onSelectOption,
      labelClassName,
      containerClassName,
      singleValueClassName,
      ...rest
    },
    ref
  ) => {
    const customStyles: StylesConfig = {
      input: (base) => ({
        ...base,
        height: "40px",
        display: "flex",
        alignItems: "center",
        ...selectStyle,
      }),
      control: (base) => ({
        ...base,
        fontSize: "14px",
        ...selectStyle,
      }),
      singleValue: (base) => ({
        ...base,
        ...singleValueStyle,
      }),
      option: (base) => ({
        ...base,
        fontSize: "14px",
      }),
      dropdownIndicator: (base, state) =>
        ({
          ...base,
          fontSize: "14px",
          transform: state.isFocused ? "rotateZ(90deg)" : null,
          transition: "transform 0.2s",
        } as never),
    };

    const MAX_SELECT_INPUT_MID_WIDTH_OPTION_STRING_LENGTH = 32;
    const MAX_SELECT_INPUT_FULL_WIDTH_OPTION_STRING_LENGTH = 80;

    const formattedOptions = options
      .map((opt) => ({
        value: opt.value,
        label:
          widthVariant === "mid"
            ? collapseLongString(
                opt.label,
                MAX_SELECT_INPUT_MID_WIDTH_OPTION_STRING_LENGTH
              )
            : collapseLongString(
                opt.label,
                MAX_SELECT_INPUT_FULL_WIDTH_OPTION_STRING_LENGTH
              ),
      }))
      .sort((a, b) => {
        if (typeof a.value === "string" && typeof b.value === "string") {
          if (a.label.toLowerCase() > b.label.toLowerCase()) return 1;
          if (a.label.toLowerCase() < b.label.toLowerCase()) return -1;
        }
        return 0;
      });

    const handleChange = (selectedOption: any) => {
      if (onSelectOption) {
        onSelectOption(selectedOption);
      }
    };

    const resolvedSelectedOption =
      selectedOption === undefined
        ? undefined
        : formattedOptions.find(
            (option) => option.value === selectedOption?.value,
          ) ?? null;

    return (
      <div
        className={
          containerClassName
            ? containerClassName
            : "flex flex-col min-w-[96px] w-full"
        }
        style={containerStyle}
      >
        <label
          htmlFor="select"
          className={
            labelClassName
              ? labelClassName
              : "text-gray-700 dark:text-gray-100 text-[12px] lg:text-sm mb-1"
          }
          style={labelStyle}
        >
          {label}
        </label>
        <Select
          defaultValue={selectedOption === undefined ? options[0] : undefined}
          className={
            widthVariant === "full"
              ? "w-full text-gray-600"
              : "w-[99%] text-gray-700"
          }
          classNamePrefix="select"
          styles={customStyles}
          options={formattedOptions}
          onChange={handleChange}
          value={resolvedSelectedOption}
          noOptionsMessage={({ inputValue }) =>
            !inputValue
              ? inputValue
              : "Não foi encontrado nenhum dado nesta lista para a pesquisa " +
                "'" +
                inputValue +
                "'"
          }
          isSearchable={isSearchable}
          {...rest}
          blurInputOnSelect
          ref={ref as never}
        />
      </div>
    );
  }
);

SelectInput.displayName = "SelectInput";
