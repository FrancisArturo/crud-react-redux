import Example from "./components/ListOfUser";
import "./index.css";
import "./App.css";
import { Toaster } from "sonner";
import { CreateNewUser } from "./components/CreateNewUser";

function App() {
	return (
		<>
			<Example />
			<CreateNewUser />
			<Toaster richColors />
		</>
	);
}

export default App;
