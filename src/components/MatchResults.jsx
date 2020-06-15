import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    & > h1 {
        text-align: center;
        font-size: xx-large;
        margin: 0;
    }
`

const WinningHamsterCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;    
    background-color: rgba(255,255,255,0.5);
    justify-content: space-between;
    position: relative;
    margin-top: 1em;

    & > h2 {
        margin: 0;
    }

    & > img {
        width: 16em;
        height: 10em;
        object-fit: cover;
        margin: 1em;
        margin-top: 1em;
    }

    & > p {
        width: 16em;
    }
`
const LosingHamsterCard = styled.div`
    z-index: -1;
    display: flex;
    align-items: center;   
    justify-content: space-between;
    background-color: rgba(255,255,255,0.5);
    position: relative;
    opacity: 0.5;
    margin-top: 2em;
    margin-bottom: 2em;

    & > h2 {
        margin: 0.5em;
    }

    & > img {
        width: 6em;
        height: 5em;
        object-fit: cover;
        margin: 1em;
    }
`

const RedCross = styled.img`
    position:absolute;
    width: 7.5em !important;
    height: 7.5em !important;
    bottom: -1em;
    left: 10em;
`

const growAndShrink = keyframes`
    0% {
        transform: scale(1) rotate(-35deg);
        text-shadow: 0px 0px 4px rgba(0,0,0, 0.8);
    }

    50% {
        transform: scale(1.1) rotate(-32deg);
        text-shadow: 0px 0px 15px rgba(0,0,0, 0.8);
    }

    100% {
        transform: scale(1) rotate(-35deg);
        text-shadow: 0px 0px 4px rgba(0,0,0, 0.8);
    }
`

const WinnerTag = styled.h1`
    position: absolute;
    top: 0.5em;
    left: -0.3em;
    font-size: 3em;
    margin: 0;
    color: lightgoldenrodyellow;
    animation: ${growAndShrink} 0.6s ease-in-out infinite;
    
`



const MatchResults = ({winner, loser}) => {
    const [winningHamster, setWinningHamster] = useState(null);
    const [losingHamster, setLosingHamster] = useState(null);

    useEffect(() => {
        loadNewHamsters(winner,loser);
    },[winner, loser])

    const loadNewHamsters = (winner,loser) => {
        setWinningHamster(null);
        setLosingHamster(null);
        const headers = new Headers();
        headers.append("Authorization", "q7RY4dfQ59pzY8zA");

        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        fetch(`/hamsters/${winner}`, requestOptions)
            .then(res => res.text())
            .then(data => setWinningHamster(JSON.parse(data)))
            .catch(error => console.log('error', error));

        fetch(`/hamsters/${loser}`, requestOptions)
            .then(res => res.text())
            .then(data => setLosingHamster(JSON.parse(data)))
            .catch(error => console.log('error', error));
    }

    return (
        <Wrapper>
            {winningHamster && losingHamster
            ?   <>
                    <h1>Match Results</h1>
                    <WinningHamsterCard>
                        <WinnerTag>Winner!</WinnerTag>
                        <img src={"/pics/" + winningHamster.imgName} alt={winningHamster.name} />
                        <h2>{winningHamster.name}</h2>
                        <p>This {winningHamster.age}-year old cutie loves {winningHamster.loves.toLowerCase()} and eating {winningHamster.favFood}</p>
                    </WinningHamsterCard>
                    <LosingHamsterCard>
                        <h2>{losingHamster.name}</h2>
                        <RedCross src="/redcross.png"/>
                        <img src={"/pics/" + losingHamster.imgName} alt={losingHamster.name} />
                    </LosingHamsterCard>
                </>
            : null
            }
        </Wrapper>
    )
}



export default MatchResults;