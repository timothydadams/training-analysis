import React from 'react';
import tw, { styled } from 'twin.macro';

const Label = styled.label`
  ${tw`absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900`}
`;

const DarkLabel = styled.label`
  ${tw`absolute -top-2 left-2 -mt-px inline-block px-1 bg-gray-700 text-xs font-medium text-gray-50`}
`;

export const InputField = styled.input`
  ${tw`block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm`}
`;

export const DarkInputField = styled.input`
  ${tw`block w-full border-0 p-0 text-gray-50 bg-gray-700 placeholder-gray-500 focus:ring-0 sm:text-sm`}
`;

export const InputWithLabel = ({ id, label, ...rest }) => {
  return (
    <div tw='relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600 mb-3'>
      <Label htmlFor={id}>{label}</Label>
      <InputField id={id} {...rest} />
    </div>
  );
};

export const InputWithLabelDark = ({ id, label, ...rest }) => {
  return (
    <div tw='relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-electric focus-within:border-electric mb-3'>
      <DarkLabel htmlFor={id}>{label}</DarkLabel>
      <DarkInputField id={id} {...rest} />
    </div>
  );
};

export const BigButton = styled.button`
  ${tw`w-full bg-indigo-500 text-white hover:bg-indigo-400 focus:ring focus:ring-offset-1 focus:ring-indigo-300 focus:outline-none disabled:bg-indigo-300 disabled:text-gray-500 px-4 py-2 rounded-md uppercase text-sm tracking-wider font-semibold`}
`;

export const SmallTextButton = styled.button(({ left, right }) => [
  tw`text-indigo-800 hover:text-black text-sm float-left duration-300`,
  left && tw`float-left`,
  right && tw`float-right`,
]);

export const SmallTextButtonDark = styled.button(({ left, right }) => [
  tw`text-electric hover:text-cyan-300 text-sm float-left duration-300`,
  left && tw`float-left`,
  right && tw`float-right`,
]);
