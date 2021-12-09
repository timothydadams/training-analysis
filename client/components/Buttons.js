import React from 'react';

const styles = {
    solid: {
        danger:"mb-1 rounded-md px-4 py-2 bg-red-600 text-red-100 hover:bg-red-800 duration-300",
        secondary:"mb-1 rounded-md px-4 py-2 bg-gray-600 text-gray-100 hover:bg-gray-800 duration-300",
        primary: "mb-1 rounded-md px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-800 duration-300",
        success:"mb-1 rounded-md px-4 py-2 bg-green-500 text-green-100 hover:bg-green-600 duration-300",
        warning:"mb-1 rounded-md px-4 py-2 bg-yellow-400 hover:bg-yellow-500 duration-300",
        info: "mb-1 rounded-md px-4 py-2 bg-green-300 hover:bg-green-500 duration-300",
        light: "mb-1 rounded-md px-4 py-2 bg-gray-200 hover:bg-gray-400 duration-300",
        dark: "mb-1 rounded-md px-4 py-2 bg-gray-900 text-gray-100 hover:bg-black duration-300",
        link: "mb-1 rounded-md px-4 py-2 underline text-blue-500 hover:text-blue-700 duration-300",
    },
    outline: {
        danger:"mb-1 rounded-md px-4 py-2 bg-red-600 text-red-100 hover:bg-red-800 duration-300",
        secondary:"mb-1 rounded-md px-4 py-2 border-2 border-gray-600 text-gray-600 hover:bg-gray-800 hover:text-white duration-300",
        primary: "mb-1 rounded-md px-4 py-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-blue-100 duration-300",
        success:"mb-1 rounded-md px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300",
        warning:"mb-1 rounded-md px-4 py-2 bg-yellow-400 hover:bg-yellow-500 duration-300",
        info: "mb-1 rounded-md px-4 py-2 bg-green-300 hover:bg-green-500 duration-300",
        light: "mb-1 rounded-md px-4 py-2 bg-gray-200 hover:bg-gray-400 duration-300",
        dark: "mb-1 rounded-md px-4 py-2 bg-gray-900 text-gray-100 hover:bg-black duration-300",
        link: "mb-1 rounded-md px-4 py-2 underline text-blue-500 hover:text-blue-700 duration-300",
    },
};

const Button = ({type, text, disabled, onClick, style}) => (
    <button className={`${styles[style][type]}`} onClick={onClick} disabled={disabled} >
        {text}
    </button>
);

export default Button;