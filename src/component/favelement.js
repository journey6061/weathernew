import React from 'react';

const Favelement = (props)=>{
    return(
        <div>
            {props.ele}
            <button 
            onClick={props.displaywea}
            >weather</button>
            <button onClick={props.delelement}>delete</button>
        </div>
    )

}

export default Favelement