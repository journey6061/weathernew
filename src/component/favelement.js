import React from 'react';

const Favelement = (props)=>{
    return(
        <button onClick={props.delelement}>
            {props.ele}
        </button>
    )

}

export default Favelement