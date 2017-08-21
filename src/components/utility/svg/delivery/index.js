import React from 'react';

const Delevery = (props) => {
    return(
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={props.size} 
            height={props.size}
            viewBox="0 0 300 300">
            <defs>
                <linearGradient id="deliveryGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgb(81,82,84)" stopOpacity=".4"/>
                    <stop offset="100%" stopColor="rgb(81,82,84)" stopOpacity=".1"/>
                </linearGradient>
            </defs>
            <path
                fill="url(#deliveryGradient)"
                d="M272.5,232.053h-6.421a40.648,40.648,0,0,0-80.491,0H114.412a40.647,40.647,0,0,0-80.49,0H27.5A17.489,17.489,0,0,1,10,214.577V138.853A51.718,51.718,0,0,1,15.789,117.1l35.09-49.669c3.2-5.581,11.012-10.105,17.455-10.105H97.5A17.489,17.489,0,0,1,115,74.8v75.71H272.5A17.487,17.487,0,0,1,290,167.979v46.6A17.489,17.489,0,0,1,272.5,232.053ZM91.667,80.617H68.334l-35,58.236H91.667V80.617ZM272.5,138.853H144.167a17.484,17.484,0,0,1-17.5-17.468V51.494a17.483,17.483,0,0,1,17.5-17.473H272.5A17.483,17.483,0,0,1,290,51.494v69.891A17.484,17.484,0,0,1,272.5,138.853ZM74.167,208.75A29.124,29.124,0,1,1,45,237.874,29.148,29.148,0,0,1,74.167,208.75Zm151.666,0a29.124,29.124,0,1,1-29.166,29.124A29.148,29.148,0,0,1,225.833,208.75Z"/>
        </svg>
    )
}
Delevery.defaultProps = {
    size: 100,
    color: "#ffffff",
    secondColor: "#ffffff"
}

export default Delevery;