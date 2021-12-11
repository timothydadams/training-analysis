import React from 'react';
import tw, { styled } from 'twin.macro';

const Label = styled.label`
    ${tw`block mb-2 text-black`}
`;

export const InputField = styled.input`
    ${tw`w-full p-2 mb-6 text-black border-b-2 border-black outline-none bg-indigo-100`}
`;

export const InputWithLabel = ({id, label, ...rest}) => {
    return (
        <div>
            <Label htmlFor={id}>{label}</Label>
            <InputField id={id} {...rest} />
        </div>
    )
}

export const BigButton = styled.button`
    ${tw`w-full bg-indigo-600 disabled:opacity-50 hover:bg-indigo-700 text-white font-bold py-2 px-4 mb-6 rounded`}
`;

export const SmallTextButton = styled.button(({left, right}) => [
    tw`text-indigo-800 hover:text-black text-sm float-left duration-300`,
    left && tw`float-left`,
    right && tw`float-right`,
]);
