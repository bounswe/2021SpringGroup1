import logo from './logo.svg';
import './App.css';
import Navigation from 'navigation/Navigation';
import { Provider } from "react-redux";
import { store } from 'store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

function App() {
  
  return (
    <>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </>
  );
}

export default App;
