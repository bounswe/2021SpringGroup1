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


export const Sure = (methodOfDeletion,idOfObject,descOne,descTwo,buttonOne,buttonTwo) => {
    confirmAlert({
        customUI: ({ onClose }) => {
        return (
            <div style={styles.confirmDiv} className='custom-ui'>
            <h1 style={{display:"flex",justifyContent:"center"}}>{descOne}</h1>
            <div style={{display:"flex",justifyContent:"center"}}>{descTwo}</div>
            <div style={{display:"flex",justifyContent:"center"}}>
        <button className="btn btn-danger" onClick={onClose}>{buttonOne}</button>
                <button className="btn btn-danger"
                    onClick={() => {
                        methodOfDeletion(idOfObject);
                    onClose();
                    }}
                    style={{marginLeft:"1rem"}}
                >
                    {buttonTwo}
                </button>
            </div>
            </div>
        );
        }
    });
}

export default withStyles(styles)(Sure);