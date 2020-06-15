import React, { useEffect, useState } from 'react';
import styled, {keyframes} from 'styled-components';

const HamsterPic = styled.img`
    width: 100%;
    height: 12em;
    object-fit: cover;
`

const HamsterCard = styled.div`
    margin: 2em;
    padding: 2em;
    background-color: rgba(255,255,255,0.5);
    position: relative;
    max-width: 15em;
    max-height: 25em;

    & > h2 {
        text-align: center;
    }
`

const growAndShrink = keyframes`
    0% {
        font-size: 2em;
        text-shadow: 0px 0px 4px rgba(0,0,0, 0.5);
    }

    50% {
        font-size: 2.5em;
        text-shadow: 0px 0px 15px rgba(0,0,0, 0.5);
    }

    100% {
        font-size: 2em;
        text-shadow: 0px 0px 4px rgba(0,0,0, 0.5);
    }
`

const WinnerTag = styled.h1`
    position: absolute;
    transform: rotateZ(-45deg);
    top: 1em;
    left: -1em;
    font-size: 3em;
    color: lightgoldenrodyellow;
    animation: ${growAndShrink} 2s ease-in-out infinite;
`

const StatsText = styled.p`

`


const HamsterProfile = ({id, winner, jumpingText}) => {
    const [hamster, setHamster] = useState(null);
    useEffect(() => {
        const headers = new Headers();
        headers.append("Authorization", "q7RY4dfQ59pzY8zA");

        const options = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        fetch(`/hamsters/${id}`, options)
            .then(response => response.text())
            .then(result => {
                setHamster(JSON.parse(result));
            })
            .catch(error => console.log('error', error));
    },[id])

    return (
        <>
            {hamster 
            ?   <HamsterCard>
                    {winner ? <WinnerTag>WINNER!</WinnerTag> : null}
                    {jumpingText ? <WinnerTag>{jumpingText}</WinnerTag> : null}
                    <HamsterPic src={"/pics/" + hamster.imgName} alt={hamster.name} />
                    <h2>{hamster.name}</h2>
                    <StatsText>
                        This cutie has won {hamster.wins} out of {hamster.games} games!<br/>
                        Outside of fighting for top cutie, hobbies include eating {hamster.favFood.toLowerCase()} and {hamster.loves.toLowerCase()}
                    </StatsText>
                </HamsterCard>
            : <></> }
        </>
    )
}



export default HamsterProfile;