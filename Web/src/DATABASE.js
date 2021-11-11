const PORT = 8081;
const URL = "http://localhost:"+PORT;

export const urls = {

    //REACT
    'home':"/",
    'bootstrap':"/bootstrap",
    'profile':"/profile",
    
    //SPRINGBOOT
    'registration':URL+"/registration",
    'login':URL+"/login",
    
    
    
}


export const loginToken = "TVLoginTkn";

export default {
    urls,
    loginToken,
}