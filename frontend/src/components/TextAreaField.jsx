import React, { useId } from 'react';

const TextAreaField = React.forwardRef(function TextAreaField({
  label,
  name,
  className,
  ...props
}, ref) {
  const id = useId();
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-[#35344E] mt-2" htmlFor={id}>
        {label}
      </label>
      )}
      <textarea
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#673EE6] ${className}`}
        id={id}
        name={name}
        {...props}
        ref={ref}
      />
    </div>
  );
});

export default TextAreaField;