import React from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

//MaterialUI
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
    confirmDiv: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
    }
  }

export const Confirm = (descOne,descTwo,buttonOne,color="green") => {
    confirmAlert({
        customUI: ({ onClose }) => {
        return (
            <div style={styles.confirmDiv} className='custom-ui'>
            {/* <h1 style={{fontSize:20,display:"block",justifyContent:"center",color:'red'}}>{descOne}</h1><br /><br /> */}
            <p style={{fontSize:30,display:"block",justifyContent:"center",color:color ,margin:30}}>{descTwo}</p>
            <div style={{display:"flex",justifyContent:"center",backgroundColor:'red',height:40,width:100,borderRadius:30,margin:'auto'}} onClick={onClose}>
                <p style={{fontSize:20,margin:'auto',cursor:'pointer'}}>TAMAM</p>
                {/* <button className="btn btn-danger" onClick={onClose}>{buttonOne}</button> */}
            </div>
            </div>
        );
        }
    });
}

export default withStyles(styles)(Confirm);