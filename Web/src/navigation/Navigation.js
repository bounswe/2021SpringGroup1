//React Library
import React from 'react';
import {BrowserRouter as Router, Route, Switch,Redirect} from 'react-router-dom';
import {urls} from 'DATABASE';


//Pages

import home from 'screens/home';
import bootstrap from 'screens/bootstrap';
import SideBar from 'components/navbar/SiderBar';


function withProps(Component, props) {
  return function(matchProps) {
    return <Component {...props} {...matchProps} />
  }
}

const styles = {
}

var idd = 0;
const Navigation = (props) => {
  {/* <Redirect to="/" /> */}

  var ROUTES = <Switch>
                    <Route key={idd++} exact path={urls.home} component={home} />
                    <Route key={idd++} exact path={urls.anasayfa} component={bootstrap} />
                    <Route key={idd++} path='/' component={home} />
                </Switch>
    
    return (
            <Router>
                <SideBar />  
                  {ROUTES}
          </Router>
    );
}



export default Navigation;