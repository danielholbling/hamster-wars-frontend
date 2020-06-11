import React from 'react';
import styled, {keyframes} from 'styled-components';

const HamsterPic = styled.img`
    width: 100%;
    height: 12em;
    object-fit: cover;
`

const HamsterCard = styled.div`
    margin: 2em;
    padding: 2em;
    background-color: white;
    border: 1px solid var(--color-4);
    position: relative;
    max-width: 15em;
    max-height: 25em;
`

const growAndShrink = keyframes`
    0% {
        font-size: 2em
    }

    50% {
        font-size: 3em
    }

    100% {
        font-size: 2em
    }
`

const WinnerTag = styled.h1`
    position: absolute;
    transform: rotateZ(-45deg);
    top: -0.5em;
    left: -1em;
    font-size: 3em;
    color: var(--color-2);
    text-shadow: 0px 0px 7px rgba(255,255,255, 1);
    animation: ${growAndShrink} 2s ease-in-out infinite;
`



const StatsText = styled.p`

`


const HamsterProfile = ({hamster, winner}) => {

    return (
        <>
            {hamster 
            ?   <HamsterCard>
                    {winner ? <WinnerTag>WINNER!</WinnerTag> : null}
                    <HamsterPic src={"/pics/" + hamster.imgName} alt={hamster.name} />
                    <h2>{hamster.name}</h2>
                    <StatsText>
                        This cutie has won {hamster.wins} out of {hamster.games} games!<br/>
                        Outside of fighting for top cutie, hobbies include eating {hamster.favFood} and {hamster.loves.toLowerCase()}
                    </StatsText>
                </HamsterCard>
            : <></> }
        </>
    )
}


export default HamsterProfile;