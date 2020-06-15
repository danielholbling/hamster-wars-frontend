import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HamsterProfile from './HamsterProfile';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em;
    align-items: center;
    & p {
        text-align: center;
        margin: 0.5em;
        margin-top: 0;
    }
`


const Start = () => {
    const [cutest,setCutest] = useState(null);

    useEffect(() => {
        const headers = new Headers();
        headers.append("Authorization", "q7RY4dfQ59pzY8zA");

        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        fetch("/charts/tophamster", requestOptions)
            .then(response => response.text())
            .then(result => setCutest(JSON.parse(result)))
            .catch(error => console.log('error', error));
    },[])

    return (
        <Wrapper>
            <p>Here you can put hamsters against eachother in deadly (not really) battle.</p>
            <p>Choose <strong>Battle</strong> in the navbar to begin!</p>
            {cutest
            ? 
                <HamsterProfile id={cutest[0].id} jumpingText="Top hamster!" />
            : null
            }
        </Wrapper>
    )
}

export default Start;