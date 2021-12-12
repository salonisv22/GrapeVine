import { Routes } from "react-router";
import { Route} from "react-router-dom";
import "./index.scss";
import LoginRegister from "./login";

const App = () => {
	return <>
		<Routes>
			<Route path="/" element={<LoginRegister/>}></Route>
		</Routes>
	</>;
};

export default App;
