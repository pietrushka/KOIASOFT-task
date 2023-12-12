import Box from "@mui/material/Box"
import { LineChart } from "@mui/x-charts/LineChart"
import { useData } from "../DataContext"

const Chart = () => {
	const { data } = useData()

	if (!data) {
		return null
	}

	const xLabels = Object.keys(data.dimension.Tid.category.label)
	const values = data.value

	return (
		<Box>
			<LineChart
				xAxis={[{ scaleType: "point", data: xLabels }]}
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
