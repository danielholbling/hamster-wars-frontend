import React, { useEffect, useState } from 'react';
import StyledButton from './StyledButton';
import { useParams } from 'react-router-dom';
import MatchResults from './MatchResults';

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

    return (
        <section className="battle-container">
            
            {
                !battleFought && leftHamster && rightHamster
                ?   
                    <div className="battle-pics">
                        <div className="left-hamster">
                            <img src={"/pics/" + leftHamster.imgName} alt={leftHamster.name} onClick={battleFought ? null : handleLeftWin} />
                            <h1>{leftHamster.name}</h1>
                        </div>
                        <h3>VS</h3>
                        <div className="right-hamster">
                            <h1>{rightHamster.name}</h1>
                            <img src={"/pics/" + rightHamster.imgName} alt={rightHamster.name} onClick={battleFought ? null : handleRightWin} />
                        </div>
                        <h3>Click on the cutest hamster!</h3>
                    </div>
                : 
                    null
            }
            
            {winner ? <MatchResults winner={winner.id} loser={loser.id} /> : null}
            {battleFought ? <StyledButton text="Play again?" handleClick={handleReset} bounce={true} /> : null}
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