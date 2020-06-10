import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const HamsterPic = styled.img`
    width: 15em;
`

const HamsterProfile = ({id}) => {
    const [hamster, setHamster] = useState(null);
    
    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "q7RY4dfQ59pzY8zA");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`/hamsters/${id}`, requestOptions)
        .then(response => response.text())
        .then(result => setHamster(JSON.parse(result)))
        .catch(error => console.log('error', error));
    })

    return (
        <>
            {hamster 
            ? <div><HamsterPic src={"/pics/" + hamster.imgName} alt={hamster.name} /><h2>{hamster.name}</h2></div>
            : <></> }
        </>
    )
}


export default HamsterProfile;