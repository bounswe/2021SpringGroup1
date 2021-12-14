import React from 'react';
//MaterialUI
// import withStyles from "@material-ui/core/styles/withStyles";


const styles = {
  loadingDiv: {
    position:"absolute",
    top:"50%",
    left:"50%",
    transform:"translate(-50%,-50%)",
    fontSize:"3rem",
    zIndex:9999
  },
  spin:{
    fontSize:"3rem"
  }

}


const LoadingSpinner = () => (
<div style={styles.loadingDiv} >
  <i style={styles.spin} className="fa fa-spinner fa-spin" /> Loading...
</div>
);



// export default withStyles(styles)(LoadingSpinner);
export default LoadingSpinner;