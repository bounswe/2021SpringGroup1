const PORT = 8081;
const URL = "http://localhost:" + PORT;

export const urls = {

    //REACT
    'auth': "/auth",
    'home': "/",
    'bootstrap': "/bootstrap",
    'profile': "/profile/:id",
    'landingPage': "/landingPage",
    'createPostTemplate': "/community/createPostTemplate/:id",
    'createPostPage': "/community/createPostPage/:id",
    'createCommunity': "/createCommunity",
    'myPosts': "/myPosts",
    'allCommunities':"/allCommunities",
    'myCommunities':"/myCommunities",
    'advancedSearchPage':"/community/advancedSearchPage/:id",
    'commentPage':"/community/:idd/post/:id",
    //SPRINGBOOT
    'registration': URL + "/registration",
    'login': URL + "/login",



}


export const loginToken = "TVLoginTkn";

export default {
    urls,
    loginToken,
}