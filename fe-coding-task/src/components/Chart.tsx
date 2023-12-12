import { LineChart } from "@mui/x-charts/LineChart"
import { useData } from "../DataContext"

const Chart = () => {
	const { chartData } = useData()

	if (!chartData) {
		return <div style={{ minHeight: 300 }} />
	}

	const { values, labels } = chartData

	return (
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
	)
}

export default Chart
