import React from "react"
import "./App.css"
import QueryForm from "./components/QueryForm"
import Chart from "./components/Chart"
import { BrowserRouter } from "react-router-dom"
import { DataProvider } from "./DataContext"

function App() {
	return (
		<BrowserRouter>
			<div>
				<DataProvider>
					<QueryForm />
					<Chart />
				</DataProvider>
			</div>
		</BrowserRouter>
	)
}

export default App
