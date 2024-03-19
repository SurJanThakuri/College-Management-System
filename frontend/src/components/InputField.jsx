import React, { useId } from 'react';

const InputField = React.forwardRef(function InputField({
  type,
  label,
  placeholder,
  className,
  options,
  ...props
}, ref) {
  const id = useId();

  if (type === 'select') {
    return (
      <div>
        {label && (
          <label
            className='block text-[#35344E] mt-2'
            htmlFor={id}>
            {label}
          </label>
        )}
        <select
          id={id}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#673EE6] ${className}`}
          {...props}
          ref={ref}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div>
      {label && (
        <label
          className='block text-[#35344E] mt-2'
          htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#673EE6] ${className}`}
        {...props}
        ref={ref}
      />
    </div>
  );
});

export default InputField;
