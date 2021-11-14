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

  var ROUTES = <Switch>
    <Route key={idd++} exact path={urls.home} component={home} />
    <Route key={idd++} exact path={urls.bootstrap} component={bootstrap} />
    <Route key={idd++} exact path={urls.landingPage} component={landingPage} />
    <Route key={idd++} exact path={urls.createPostTemplate} component={CreatePostTemplate} />
    <Route key={idd++} exact path={urls.createPostPage} component={CreatePostPage} />
    <Route key={idd++} path='/' component={home} />
  </Switch>

  return (
    <Router>
      {ROUTES}
    </Router>
  );
}



export default Navigation;