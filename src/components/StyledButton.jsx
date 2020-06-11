import React from 'react';

const StyledButton = ({text, handeClick}) => {

    return (
        <button onClick={handeClick}>
            {text}
        </button>
    )
}

export default StyledButton;