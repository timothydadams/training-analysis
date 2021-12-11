import React from 'react';
import tw, { styled } from 'twin.macro';

export const Container = styled.div`
    ${tw`max-w-lg w-full m-auto bg-indigo-100 rounded-md p-5`}
`;

const FlexContainer = styled.div`
    ${tw`flex flex-col h-screen`}
`;

export const LoginContainer = ({children}) => {
    return (
        <FlexContainer>
            <Container>
                {children}
            </Container>
        </FlexContainer>
    )
}

export const Title = styled.p`
    ${tw`text-center text-xl font-bold mb-2`}
`;

export const Message = styled.p(({error, success, center}) => [
    tw`mb-4 w-full p-2 rounded`,
    success && tw`bg-green-400`,
    error && tw`bg-red-300`,
    center && tw`text-center`,
]);
