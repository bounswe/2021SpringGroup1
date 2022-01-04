//React Library
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { urls } from 'DATABASE';


//Pages

import home from 'screens/home';
import bootstrap from 'screens/bootstrap';
import landingPage from 'screens/landingPage';
import CreatePostTemplate from 'screens/createPostTemplate';
import CreatePostPage from 'screens/createPostPage';
import MyPosts from 'screens/myPosts';
import MyCommunitiesPage from 'screens/myCommunitiesPage';
import AllCommunitiesPage from 'screens/allCommunitiesPage';
import CommunityPage from 'screens/communityPage';
import createCommunity from 'screens/createCommunity';
import AdvancedSearchPage from 'screens/advancedSearchPage';
import ProfilePage from 'screens/user/profilePage';
import CommentPage from 'screens/commentPage';
import { isEmpty } from 'utils/methods';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN } from 'store/actions/authAction';


function withProps(Component, props) {
  return function (matchProps) {
    return <Component {...props} {...matchProps} />
  }
}

const styles = {
}

var idd = 0;
const Navigation = (props) => {
  {/* <Redirect to="/" /> */ }

  const {token} = useSelector(state => state.auth)
  const dispatch = useDispatch();
  if(isEmpty(token)) {
    let token2 = localStorage.getItem('token', token)
    if(!isEmpty(token2)) {
      dispatch({
        type: LOGIN,
        data: token2
      });
    }
  }

  var ROUTES = <Switch>
    <Route key={idd++} exact path={urls.profile} component={ProfilePage} />
    {/* <Route key={idd++} exact path={urls.auth} component={home} /> */}
    <Route key={idd++} exact path={urls.advancedSearchPage} component={AdvancedSearchPage} />
    <Route key={idd++} exact path={urls.commentPage} component={CommentPage} />
    <Route key={idd++} exact path={urls.bootstrap} component={bootstrap} />
    <Route key={idd++} exact path={urls.landingPage} component={landingPage} />
    <Route key={idd++} exact path={urls.createPostTemplate} component={CreatePostTemplate} />
    <Route key={idd++} exact path={urls.createPostPage} component={CreatePostPage} />
    <Route key={idd++} exact path={urls.myPosts} component={MyPosts} />
    <Route key={idd++} exact path={urls.createCommunity} component={createCommunity} />
    <Route key={idd++} exact path={urls.myCommunities} component={MyCommunitiesPage} />
    <Route key={idd++} exact path={urls.allCommunities} component={AllCommunitiesPage} />
    <Route key={idd++} exact path={urls.community} component={CommunityPage} />
    <Route key={idd++} exact path={urls.home} component={home} />

  </Switch>

  return (
    <Router>
      {ROUTES}
    </Router>
  );
}



export default Navigation;