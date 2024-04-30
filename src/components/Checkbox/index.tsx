import React, { ChangeEventHandler } from 'react';

export const Checkbox = ({
  index,
  name,
  isChecked,
  onCheckboxChange,
  disabled = false,
}: {
  index: string;
  name: string;
  isChecked: boolean;
  onCheckboxChange: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}) => (
  <div className="relative inline-block mr-4 sm:mr-8">
    <div className="relative inline-block w-10 mr-2 align-middle select-none">
      <input
        aria-label={name}
        className="checked:bg-blue-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-gray-500 border-4 appearance-none cursor-pointer"
        type="checkbox"
        id={`pw-checkbox-${index}`}
        name={name}
        value={name}
        checked={isChecked}
        onChange={onCheckboxChange}
        disabled={disabled}
      />

      <label
        htmlFor={`pw-checkbox-${index}`}
        className="block h-6 overflow-hidden bg-gray-400 rounded-full cursor-pointer"
      ></label>
    </div>

    <span className="font-medium text-gray-500">{name}</span>
  </div>
);
