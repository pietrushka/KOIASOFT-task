import "./App.css"
import QueryForm from "./components/QueryForm"
import Chart from "./components/Chart"
import { BrowserRouter } from "react-router-dom"
import { DataProvider } from "./DataContext"
import SavedSearches from "./components/SavedSearches"

function App() {
	return (
		<BrowserRouter>
			<div>
				<DataProvider>
					<QueryForm />
					<Chart />
					<SavedSearches />
				</DataProvider>
			</div>
		</BrowserRouter>
	)
}

export default App
