import React, { FC } from "react";

interface InputProps {
    label: string,
    type: string,
    placeholder: string,
    value: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

const Input: FC<InputProps> = ({ label, type, placeholder, value, onChange }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor={label.toLowerCase()}>
                {label}
            </label>
            <input
                className="shadow appearance-none bg-transparent border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default Input;