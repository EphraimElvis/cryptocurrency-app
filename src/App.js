import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SelectCurrency from "./SelectCurrency";
import DetailPage from "./DetailPage";
function App() {
  return (
    <div className="App container">
      <Router>
        <Switch>
          <Route path="/detail/:id" component={DetailPage} />
          <Route path="/">
            <SelectCurrency />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
