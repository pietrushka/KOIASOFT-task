import { MIN_QUARTER_YEAR } from "./constants"
import { populateQuarterRange, getPreviousYearQuarterString } from "./utils/yearQuarterUtils"

export const quarterOptions = populateQuarterRange(
	MIN_QUARTER_YEAR,
	getPreviousYearQuarterString()
).map((value) => ({
	value,
}))

export const houseTypeOptions = [
	{ label: "Boliger i alt", value: "00" },
	{ label: "Småhus", value: "02" },
	{ label: "Blokkleiligheter", value: "03" },
]
