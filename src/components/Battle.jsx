import React, { useEffect, useState } from 'react';
import StyledButton from './StyledButton';
import { useParams } from 'react-router-dom';
import MatchResults from './MatchResults';
import styled from 'styled-components';

const Wrapper = styled.div`
    @media (max-width: 991px){
        display: flex;
        align-items: center;
        flex-direction: column;
        & > div {
            display: flex;
            padding: 1em;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            background-color: rgba(255,255,255,0.5);
            transition: 0.3s;
            &:hover {
                box-shadow: 0px 0px 16px 0px rgba(0,0,0,0.75);
            }
            & > img {
                width: 10em;
                height: 10em;
                cursor: pointer;
                object-fit: cover;
            }
            & > div {
                & h1,h3 {
                    text-align: center;
                    max-width: 4.5em;
                }
            }
        }
    }
    @media (min-width: 992px){
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        & > h1 {
            font-size: 3em;
            margin-top: 0;
        }
        & > h3 {
            font-size: 2.2em;
        }
        & > :nth-child(2){
            align-self:flex-start;
            & > img {
                margin-right: 1em;
            }
        }
        & > :nth-child(4){
            align-self:flex-end;
            & > img {
                margin-left: 1em;
            }
        }
        & > div {
            cursor: pointer;
            display: flex;
            padding: 1em;
            justify-content: space-between;
            align-items: center;
            background-color: rgba(255,255,255,0.5);
            transition: 0.3s;
            width: 35em;
            &:hover {
                box-shadow: 0px 0px 16px 0px rgba(255,255,255,0.5);
                box-shadow: 0 0 16 0 rgba(255,255,255,1) inset;
            }
            & > img {
                width: 16em;
                height: 13em;
                object-fit: cover;
            }
            & > div {
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                width: 100%;
                & h1,h3 {
                    max-width: 4.5em;
                    text-align: center;
                    font-size: 3em;
                    margin: 0;
                }
            }
        }
    }
`

const Battle = () => {
    const [leftHamster, setLeftHamster] = useState(null);
    const [rightHamster, setRightHamster] = useState(null);
    const [battleFought, setBattleFought] = useState(false);
    const [winner, setWinner] = useState(null);
    const [loser, setLoser] = useState(null);
    const [newBattleTrigger, setNewBattleTrigger] = useState(0);

    let {id1,id2} = useParams();

    const loadNewHamsters = (id1,id2) => {
        setLeftHamster(null);
        setRightHamster(null);
        const headers = new Headers();
        headers.append("Authorization", "q7RY4dfQ59pzY8zA");

        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        fetch(`/hamsters/${id1}`, requestOptions)
            .then(res => res.text())
            .then(data => setLeftHamster(JSON.parse(data)))
            .catch(error => console.log('error', error));

        fetch(`/hamsters/${id2}`, requestOptions)
            .then(res => res.text())
            .then(data => setRightHamster(JSON.parse(data)))
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        if(id1 && id2){
            loadNewHamsters(id1,id2);
        }else{
            loadNewHamsters('random','random');
        }

    },[newBattleTrigger,id1,id2])

    const handleLeftWin = () => {
        console.log('handleLeftWin fired')
        updateHamsterStats(true, leftHamster.id);
        updateHamsterStats(false, rightHamster.id);
        saveGameResult(leftHamster,rightHamster,leftHamster);
        setBattleFought(true);
        setWinner(leftHamster);
        setLoser(rightHamster);
    }

    const handleRightWin = () => {
        console.log('handleRightWin fired')
        updateHamsterStats(false, leftHamster.id);
        updateHamsterStats(true, rightHamster.id);
        saveGameResult(leftHamster,rightHamster,rightHamster);
        setBattleFought(true);
        setWinner(rightHamster);
        setLoser(leftHamster);
    }

    const handleReset = () => {
        console.log('handleReset fired')
        setBattleFought(false);
        setWinner(null);
        setNewBattleTrigger(newBattleTrigger + 1);
    }
    if(leftHamster && rightHamster && leftHamster.id === rightHamster.id){
        loadNewHamsters(leftHamster.id,'random')
    }

    return (
        <section>
            
            {
                !battleFought && leftHamster && rightHamster
                ?   
                    <Wrapper>
                        <h1>FIGHT!</h1>

                        <div onClick={battleFought ? null : handleLeftWin}>
                            <></>
                            <img src={"/pics/" + leftHamster.imgName} alt={leftHamster.name} />
                            <div>
                                <h1>
                                    {leftHamster.name}
                                </h1>
                                <p>{leftHamster.wins} wins</p>
                                <p>{leftHamster.defeats} losses</p>
                                
                            </div>
                        </div>
                        <h3>VS</h3>
                        <div onClick={battleFought ? null : handleRightWin}>
                            <div>
                                <h1>
                                    {rightHamster.name}
                                </h1>
                                <p>{rightHamster.wins} wins</p>
                                <p>{rightHamster.defeats} losses</p>
                            </div>
                            <img src={"/pics/" + rightHamster.imgName} alt={rightHamster.name} />
                        </div>
                        <h3>Click on the cutest hamster!</h3>
                    </Wrapper>
                : 
                    null
            }
            
            {winner ? <MatchResults winner={winner.id} loser={loser.id} /> : null}
            <div className="centerer">
                {battleFought ? <StyledButton text="Play again?" handleClick={handleReset} bounce={true} /> : null}
            </div>
        </section>
    )
}

const updateHamsterStats = (win, id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "q7RY4dfQ59pzY8zA");
    myHeaders.append("Content-Type", "application/json");

    let raw = null;
    
    if(win){
        raw = JSON.stringify({"wins":1,"defeats":0});
    }else{
        raw = JSON.stringify({"wins":0,"defeats":1});
    }

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`/hamsters/${id}/result`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

const saveGameResult = (fighter1, fighter2, winner) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "q7RY4dfQ59pzY8zA");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"contestants":[fighter1,fighter2],"winner":winner});

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("/games", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

export default Battle;