import { QueryData } from "../types"
import { houseTypeOptions } from "../paramOptions"

export const createQueryId = (query: QueryData) => {
	return `${query.quartersRangeStart}-${query.quartersRangeEnd}-${query.houseType}`
}

export const parseQueryId = (queryId: string) => {
	const [quartersRangeStart, quartersRangeEnd, houseType] = queryId.split("-")
	return { quartersRangeStart, quartersRangeEnd, houseType }
}

