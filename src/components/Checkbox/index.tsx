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
  <label className="mr-4">
    <input
      className="mr-1"
      type="checkbox"
      id={`pw-checkbox-${index}`}
      name={name}
      value={name}
      checked={isChecked}
      onChange={onCheckboxChange}
      disabled={disabled}
    />
    {name}
  </label>
);
