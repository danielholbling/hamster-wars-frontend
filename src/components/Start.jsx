import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em;
    align-items: center;
    & p {
        text-align: center;
    }
`


const Start = () => {
    return (
        <Wrapper>
            <h2>Welcome!</h2>
            <p>Here you can put hamsters against eachother in deadly (not really) battle.</p>
            <p>Choose <strong>Battle</strong> in the navbar to begin!</p>
        </Wrapper>
    )
}

export default Start;