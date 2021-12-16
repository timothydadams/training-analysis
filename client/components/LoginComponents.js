import React from 'react';
import tw, { styled } from 'twin.macro';

export const Container = styled.div`
  ${tw`max-w-lg w-full m-auto bg-indigo-100 rounded-md p-5`}
`;

const FlexContainer = styled.div`
  ${tw`min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8`}
`;

export const LoginContainer = ({ children }) => {
  return (
    <div className='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          {children}
        </div>
      </div>
    </div>
  );
};

export const Title = styled.p`
  ${tw`text-center text-xl font-bold mb-4`}
`;

export const Message = styled.p(({ error, success, center }) => [
  tw`mb-4 w-full p-2 rounded`,
  success && tw`bg-green-400`,
  error && tw`bg-red-300`,
  center && tw`text-center`,
]);
