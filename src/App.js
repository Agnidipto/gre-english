import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Components/Home";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' index element={<Home random={false}/>}>
          </Route>
          <Route path='/random' element={<Home random/>}>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
