import Box from "@mui/material/Box"
import { LineChart } from "@mui/x-charts/LineChart"
import { useData } from "../DataContext"

const Chart = () => {
	const { chartData } = useData()

	if (!chartData) {
		return null
	}

	const { values, labels } = chartData

	return (
		<Box>
			<LineChart
				xAxis={[{ scaleType: "point", data: labels }]}
				series={[{ data: values }]}
				height={300}
				sx={{
					// TODO the blues should be global variables
					".MuiLineElement-root": {
						stroke: "blue",
					},
					".MuiMarkElement-root": {
						stroke: "blue",
						fill: "blue",
					},
				}}
			/>
		</Box>
	)
}

export default Chart
