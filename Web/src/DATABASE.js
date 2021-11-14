const PORT = 8081;
const URL = "http://localhost:" + PORT;

export const urls = {

    //REACT
    'home': "/",
    'bootstrap': "/bootstrap",
    'profile': "/profile",
    'landingPage': "/landingPage",
    'createPostTemplate': "/createPostTemplate",
    'createPostPage': "/createPostPage",
    'myPosts': "/myPosts",

    
    //SPRINGBOOT
    'registration': URL + "/registration",
    'login': URL + "/login",



}


export const loginToken = "TVLoginTkn";

export default {
    urls,
    loginToken,
}