import React from 'react';
import { useTimer } from 'react-timer-hook';

function MyTimer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });


  return (
    <div style={{display: "flex", justifyContent: 'center'}}>
      <div style={{fontSize: '30px', color: "#057dcd"}} >
        <span>Logout in: </span><span>{minutes}</span>m<span> {seconds}</span>s
      </div>
    </div>
  );
}

export default MyTimer;