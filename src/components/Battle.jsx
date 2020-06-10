import React, { useEffect, useState } from 'react';

const Battle = () => {
    const [leftHamster, setLeftHamster] = useState(null);
    const [rightHamster, setRightHamster] = useState(null);

    useEffect(() => {
        const headers = new Headers();
        headers.append("Authorization", "q7RY4dfQ59pzY8zA");

        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        fetch("/hamsters/random", requestOptions)
            .then(res => res.text())
            .then(data => setLeftHamster(JSON.parse(data)))
            .catch(error => console.log('error', error));

        fetch("/hamsters/random", requestOptions)
            .then(res => res.text())
            .then(data => setRightHamster(JSON.parse(data)))
            .catch(error => console.log('error', error));
    },[])

    const handleLeftWin = () => {
        console.log('handleLeftWin fired')
    }
    const handleRightWin = () => {
        console.log('handleRightWin fired')
    }

    return (
        <section className="battle-container">
            { leftHamster && rightHamster
                ? <h1>{leftHamster.name} vs {rightHamster.name}</h1>
                : null
            }
            <div className="battle-pics">
                {leftHamster 
                ? <img src={"/pics/" + leftHamster.imgName} alt={leftHamster.name} onClick={handleLeftWin} />
                : null}
                {rightHamster 
                ? <img src={"/pics/" + rightHamster.imgName} alt={rightHamster.name} onClick={handleRightWin} />
                : null}
            </div>
            <h3>Click on the cutest hamster!</h3>
        </section>
    )
}

export default Battle;