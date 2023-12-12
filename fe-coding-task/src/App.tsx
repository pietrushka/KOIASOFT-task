import QueryForm from "./components/QueryForm"
import Chart from "./components/Chart"
import { BrowserRouter } from "react-router-dom"
import { DataProvider } from "./DataContext"
import SavedQueries from "./components/SavedQueries"
import { Container } from "@mui/material"

function App() {
	return (
		<BrowserRouter>
			<Container maxWidth="md" sx={{ mt: 4 }}>
				<DataProvider>
					<QueryForm />
					<Chart />
					<SavedQueries />
				</DataProvider>
			</Container>
		</BrowserRouter>
	)
}

export default App
