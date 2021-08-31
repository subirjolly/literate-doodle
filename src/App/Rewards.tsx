import { useContext } from "react";
import Checkout from "../Components/Checkout";
import { RewardsContext } from "../Contexts/Rewards";

export default function RewardsApp() {
  const { getPoints, clearPoints } = useContext(RewardsContext);

  return (
    <div className="RewardsApp">
      <div className="RewardPoints" data-testid="RewardPoints">Total Points: {getPoints()}</div>
      <Checkout />
      <a href='/history'>View History</a>
      <br />
      <br />
      <br />
      <br />
      <input type="button" value="DANGER: CLEAR POINTS" onClick={clearPoints} data-testid="ClearStorage" />
    </div>
  );
}
