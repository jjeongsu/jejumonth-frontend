import React from 'react';
import PropTypes from 'prop-types';
//import { Input, Form } from 'antd';

const FormInput = ({ props, errorMessage, label, inputGuide }) => {
  return (
    <div className="w-full flex flex-col gap-5 mb-20">
      {label && <label className="text-11 font-bold mb-4">{label}</label>}

      <input
        {...props}
        className="w-full border-solid border-[1px] rounded-3 border-slate-300 text-10 px-13 py-11 h-36 focus-within:border-orange-400 focus-within:outline focus-within:outline-orange-100 focus-within:outline-2 transition ease-in-out delay-150 "
      />
      <div className="flex flex-row gap-2 items-center">
        {inputGuide && <span className="text-8 font-semibold text-slate-600">{inputGuide}</span>}
        {errorMessage && (
          <span className="text-8 text-red-400 ">
            <em>{errorMessage}</em>
          </span>
        )}
      </div>
    </div>
  );
};

export default FormInput;

FormInput.propTypes = {
  props: PropTypes.object.isRequired,
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  inputGuide: PropTypes.string,
};
