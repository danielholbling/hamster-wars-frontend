import React, { useState, useEffect } from 'react';

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
        <section className="stats-component">
            {totalGames ? <h2>{totalGames.totalGames} battles fought</h2> : null}
            {topListJSX("Top 5",topFive)}
            {topListJSX("Bottom 5",bottomFive)}
        </section>
    )
}

const topListJSX = (title,hamsters) => (
    <ol className="top-list">
        <h2>{hamsters ? title : null}</h2>
        {
        hamsters 
        ? hamsters.map(h => {
            return (
                <li key={h.name + h.age + h.favFood} className="hamster-stat-container">
                    <div className="hamster-stat-header">
                        <img src={"/pics/" + h.imgName} alt={h.name} className="hamster-pic" />
                        <div className="hamster-stat-body">
                            <h3>{h.name} - {h.wins}W/{h.defeats}L</h3>
                            <p>{h.wins} wins / {h.defeats} losses. {h.games} battles.</p>
                        </div>
                    </div>
                </li>
            )
        }) 
        : null
        }
    </ol>
)


export default Stats;