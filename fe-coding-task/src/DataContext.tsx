import { createContext, useState, useContext } from "react"
import axios from "axios"
import { populateQuarterRange } from "./utils"
import { ApiResponse, QueryData, ChartData, DataContextType } from "./types"
import { SSB_TABLE_URL } from "./constants"

export const useData = () => {
	const context = useContext(DataContext)
	if (!context) {
		throw new Error("useData must be used within a DataProvider")
	}
	return context
}

export const DataContext = createContext<DataContextType | null>(null)

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [chartData, setChartData] = useState<ChartData | null>(null)
	const fetchChartData = async (queryParams: QueryData) => {
		const postData = {
			query: [
				{
					code: "Boligtype",
					selection: {
						filter: "item",
						values: [queryParams.houseType],
					},
				},
				{
					code: "ContentsCode",
					selection: {
						filter: "item",
						values: ["KvPris"],
					},
				},
				{
					code: "Tid",
					selection: {
						filter: "item",
						values: populateQuarterRange(
							queryParams.quartersRangeStart,
							queryParams.quartersRangeEnd
						),
					},
				},
			],
			response: {
				format: "json-stat2",
			},
		}

		try {
			const response = (await axios.post(SSB_TABLE_URL, postData, {
				headers: {
					"Content-Type": "application/json",
				},
			})) as ApiResponse

			const newChartData = {
				values: response.data.value,
				labels: Object.keys(response.data.dimension.Tid.category.label),
			}

			setChartData(newChartData)
		} catch (error) {
			console.error("Error fetching data:", error)
		}
	}

	return (
		<DataContext.Provider value={{ chartData, fetchChartData }}>
			{children}
		</DataContext.Provider>
	)
}
