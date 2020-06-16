import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HamsterProfile from './HamsterProfile';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em;
    align-items: center;
    & > article > p {
        text-align: center;
        margin: 0.5em;
        margin-top: 0;
    }
    @media (min-width: 992px) {
        flex-direction: row-reverse;
        justify-content: space-between;
        & > article {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
        }
        & > article > p {
            width: 20em;
            font-size: 2em;

        }
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
            <article>
                <p>Here you can put hamsters against eachother in deadly (not really) battle.</p>
                <p>Choose <strong>Battle</strong> in the navbar to begin!</p>
            </article>
            {cutest
            ? 
                <HamsterProfile id={cutest[0].id} jumpingText="Top hamster!" />
            : null
            }
        </Wrapper>
    )
}

export default Start;