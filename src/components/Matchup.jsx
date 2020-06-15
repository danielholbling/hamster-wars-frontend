import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HamsterProfile from './HamsterProfile';
import MatchResults from './MatchResults';

const Matchup = () => {
    const [matches, setMatches] = useState(null);
    const [specificMatch, setSpecificMatch] = useState(null);

    useEffect(() => {
        getAllGames(setMatches)
    },[])

    let {id1,id2} = useParams()

    getSpecificMatch(Number(id1),Number(id2),matches,specificMatch,setSpecificMatch)

    return (
        <section>
            {specificMatch 
            ? 
                <>
                    <MatchResults winner={specificMatch.winner} loser={specificMatch.loser} />
                </>
            : null
            }
        </section>
    )
}

const getSpecificMatch = (id1,id2,matches,specificMatch,setSpecificMatch) => {
    const filterByHamsterId = match => {
        let matchId1 = match.contestants[0].id;
        let matchId2 = match.contestants[1].id;
        if((id1 === matchId1 && id2 === matchId2) || (id1 === matchId2 && id2 === matchId1)){
            return true;
        }
    }

    if(matches && specificMatch === null){
        const filteredMatches = matches.filter(filterByHamsterId);
        const sortedMatches = filteredMatches.sort((a,b) => {
            const aTime = a.timeStamp._seconds;
            const bTime = b.timeStamp._seconds;

            if(aTime > bTime){
                return -1;
            }
            if(aTime < bTime){
                return 1;
            }

            return 0;
        })

        let winner = sortedMatches[0].winner.id;
        let loser;
        if(winner === sortedMatches[0].contestants[0].id){
            loser = sortedMatches[0].contestants[1].id
        }else{
            loser = sortedMatches[0].contestants[0].id
        }


        setSpecificMatch({
            winner,
            loser
        });
    }
}

const getAllGames = async (setState) => {
    try{
        const headers = new Headers();
        headers.append('Authorization','q7RY4dfQ59pzY8zA');
    
        const options = {
            method: 'GET',
            headers,
            redirect: 'follow'
        }
    
        const resp = await fetch('/games', options);
        const data = await resp.json();
        setState(data);

    }catch(err){
        console.error(err);
    }

}

export default Matchup;