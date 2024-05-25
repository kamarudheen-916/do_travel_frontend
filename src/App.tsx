import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import MainRoute from "./routes/MainRoute";
import { BrowserRouter as Router } from "react-router-dom";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

function App() {
  return (
    <Router>
      <div>
        <MainRoute />
      </div>
    </Router>
  );
}

export default App;
