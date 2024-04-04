import React from 'react';

const TextAreaField = ({ label, name, ...rest }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2" htmlFor={name}>
        {label}
      </label>
      <textarea
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        name={name}
        {...rest}
      />
    </div>
  );
};

export default TextAreaField;