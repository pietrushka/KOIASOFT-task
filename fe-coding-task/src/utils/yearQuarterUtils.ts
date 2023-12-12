import { YearQuarter } from "../types"
import { QUARTERS_IN_YEAR } from "../constants"

export const parseQuarterString = (quarterString: string) => quarterString.split("K").map(Number)

export const createQuarterString = (data: YearQuarter) => {
	return `${data.year}K${data.quarter}`
}

export const populateQuarterRange = (min: string, max: string) => {
	const [minYear, minQuarter] = parseQuarterString(min)

	let quarters: YearQuarter[] = [{ year: minYear, quarter: minQuarter }]

	while (createQuarterString(quarters[quarters.length - 1]) !== max) {
		const { year, quarter } = quarters[quarters.length - 1]
		const isNewQuarterExceded = quarter + 1 > QUARTERS_IN_YEAR
		const newQuarter = isNewQuarterExceded ? 1 : quarter + 1
		const newYear = isNewQuarterExceded ? year + 1 : year
		quarters.push({ year: newYear, quarter: newQuarter })
	}

	return quarters.map(createQuarterString)
}

export const getPreviousYearQuarterString = (): string => {
	const date = new Date()
	const month = date.getMonth() + 1 // month is 0-indexed

	let quarter
	let year = date.getFullYear()

	if (month <= 3) {
		quarter = 4
		year = year - 1 // Previous year if current quarter is Q1
	} else if (month <= 6) {
		quarter = 1
	} else if (month <= 9) {
		quarter = 2
	} else {
		quarter = 3
	}

	return createQuarterString({ year, quarter })
}

// condition quarterString1 >= quarterString2
export const compareYearQuarterStrings = (
	quarterString1: string,
	quarterString2: string
): boolean => {
	if (quarterString1 === quarterString2) {
		return true
	}
	const [year1, quarter1] = parseQuarterString(quarterString1)
	const [year2, quarter2] = parseQuarterString(quarterString2)

	if (year1 > year2) {
		return true
	} else if (year1 === year2) {
		return quarter1 > quarter2
	}
	return false
}
