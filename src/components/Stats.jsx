import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
    & > h2 {
        text-align: center;
        margin: 0;
    }
`

const HamsterStatDiv = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;

    & img {
        width: 2em;
        height: 2em;
        border-radius: 50%;
        border: 2px dotted white;
    }
    & div {
        margin: 0 0 0 1em;
        

        & h3 {
            margin: 0;
            font-size: 0.8em;
            &:before {
                content: "#" counter(item) " - ";
                font-weight: bolder;
                font-size: 1.2em;
            }
        }

        & p {
            font-size: 0.8em;
            margin: 0;
        }
    }
`

const TopList = styled.ol`
    list-style: none;
    counter-reset: item;
    padding: 0;
    margin:0;
    & li {
        counter-increment: item;
        background-color: rgba(255,255,255,0.5);
        border-radius: 0.3em;
        margin: 0.5em;
        padding: 0.4em;
        width: 15em;
    }
` 

const Stats = () => {
    const [topFive, setTopFive] = useState(null);
    const [bottomFive, setBottomFive] = useState(null);
    const [totalGames, setTotalGames] = useState(null);

    useEffect(() => {
        const headers = new Headers();
        headers.append("Authorization", "q7RY4dfQ59pzY8zA");

        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        fetch("/charts/top", requestOptions)
            .then(response => response.text())
            .then(result => setTopFive(JSON.parse(result)))
            .catch(error => console.log('error', error));
        
        fetch("/charts/bottom", requestOptions)
            .then(response => response.text())
            .then(result => setBottomFive(JSON.parse(result)))
            .catch(error => console.log('error', error));
        
        fetch("/stats/total", requestOptions)
            .then(response => response.text())
            .then(result => setTotalGames(JSON.parse(result)))
            .catch(error => console.log('error', error));

        
    },[])

    return (
        <Wrapper>
            {totalGames ? <h2>{totalGames.totalGames} battles fought</h2> : null}
            {topListJSX("Top 5",topFive)}
            {topListJSX("Bottom 5",bottomFive)}
        </Wrapper>
    )
}

const topListJSX = (title,hamsters) => (
    <TopList>
        <h2>{hamsters ? title : null}</h2>
        {
        hamsters 
        ? hamsters.map(h => {
            return (
                <li key={h.id}>
                    <HamsterStatDiv>
                        <img src={"/pics/" + h.imgName} alt={h.name} className="hamster-pic" />
                        <div className="hamster-stat-body">
                            <h3>{h.name} - {h.wins}W/{h.defeats}L</h3>
                            <p>{h.wins} wins / {h.defeats} losses. {h.games} battles.</p>
                        </div>
                    </HamsterStatDiv>
                </li>
            )
        }) 
        : null
        }
    </TopList>
)


export default Stats;