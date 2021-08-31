import RewardsProvider from "../Contexts/Rewards";
import "../styles.css";
import RewardsApp from "./Rewards";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import RewardsHistory from "../Components/History";

export default function App() {
  return (
    <div className="App">
      <RewardsProvider>
        <Router>
      <Switch>
          <Route path="/history">
            <RewardsHistory />
          </Route>
          <Route path="/">
            <RewardsApp />
          </Route>
        </Switch>
        </Router>
      </RewardsProvider>
    </div>
  );
}
