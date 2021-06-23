import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import SignUp from './Components/SignUp'
import MovieList from './Components/MovieList'
import Edit from "./Components/Edit";
import './Styles/App.css'
function App() {
  return (
    <div className="App">
      <h1><i className="film icon"></i> Minha Lista de Filmes Para Assistir <i className="film icon"></i></h1>
      <Router>
        <div>
          <nav className="ui two item menu">
              <span className="item">
                <Link to="/">Cadastro</Link>
              </span>
              <span className="item">
                <Link to="/movielist">Lista de Filmes</Link>
              </span>
          </nav>
          <Switch>
            <Route exact={true} path="/">
              <SignUp />
            </Route>
            <Route path="/movielist">
              <MovieList />
            </Route>
            <Route path="/edit"
              render={(props) => (
                <Edit {...props}/>
              )}
            />
          </Switch>
        </div>
      </Router>
    </div>  
  )
}

export default App
