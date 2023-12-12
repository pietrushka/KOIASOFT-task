export type YearQuarter = {
	year: number
	quarter: number
}

export type QueryData = {
	quartersRangeStart: string
	quartersRangeEnd: string
	houseType: string
}

export type ApiResponse = {
	data: {
		dimension: {
			Tid: {
				category: {
					index: Record<string, string>
					label: Record<string, string>
				}
			}
		}
		value: number[]
	}
}

export type ChartData = {
	values: number[]
	labels: string[]
}

export type DataContextType = {
	chartData: ChartData | null
	fetchChartData: (queryParams: QueryData) => Promise<void>
}

export type SavedQuery = {
	queryId: string
	comment: string
}
