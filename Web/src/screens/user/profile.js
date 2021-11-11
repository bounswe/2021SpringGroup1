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


const Profile = (props) => {

  return (

    <>
    <div style={styles.screen}>
        PROFILE SCREEN
    </div>
      </>
  );
}

export default Profile;