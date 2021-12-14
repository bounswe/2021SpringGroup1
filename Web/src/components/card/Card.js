//React Library
import React, {useState,useEffect,} from 'react';


const styles = {
    screen: {
    position:"absolute",
    top:'50%',
    left: '50%',
    transform: "translate(-50%, -50%)",
    color:"red",
    fontSize:55,
  }
}


const Card = (props) => {

  return (

    <>
    <div style={styles.screen}>
    Card Component
    </div>
      </>
  );
}

export default Card;