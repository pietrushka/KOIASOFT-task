import { QueryData } from "../types"
import { houseTypeOptions } from "../paramOptions"

export const createQueryId = (query: QueryData) => {
	return `${query.quartersRangeStart}-${query.quartersRangeEnd}-${query.houseType}`
}

export const parseQueryId = (queryId: string) => {
	const [quartersRangeStart, quartersRangeEnd, houseType] = queryId.split("-")
	return { quartersRangeStart, quartersRangeEnd, houseType }
}

export const makeQueryIdReadable = (queryId: string) => {
	const { quartersRangeStart, quartersRangeEnd, houseType } = parseQueryId(queryId)
	const houseTypeReadable = houseTypeOptions.find((x) => x.value === houseType)?.label
	return `From: ${quartersRangeStart}; To: ${quartersRangeEnd}; House Type: ${houseTypeReadable}`
}
