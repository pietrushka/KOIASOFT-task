import { QueryData } from "./types"
import { createSearchId } from "./utils"

enum LocalStorageKeys {
	QuartersRangeStart = "quartersRangeStart",
	QuartersRangeEnd = "quartersRangeEnd",
	HouseType = "houseType",
	SavedStatistics = "savedStatistics",
}

export const saveUserPreferences = (preferences: QueryData) => {
	localStorage.setItem(LocalStorageKeys.QuartersRangeStart, preferences.quartersRangeStart)
	localStorage.setItem(LocalStorageKeys.QuartersRangeEnd, preferences.quartersRangeEnd)
	localStorage.setItem(LocalStorageKeys.HouseType, preferences.houseType)
}

export const getUserPreferences = () => {
	return {
		quartersRangeStart: localStorage.getItem(LocalStorageKeys.QuartersRangeStart) ?? "",
		quartersRangeEnd: localStorage.getItem("quartersRangeEnd") ?? "",
		houseType: localStorage.getItem(LocalStorageKeys.HouseType) ?? "",
	}
}

export const clearPreferences = () => {
	const preferenceKeys = [
		LocalStorageKeys.QuartersRangeStart,
		LocalStorageKeys.QuartersRangeEnd,
		LocalStorageKeys.HouseType,
	]
	preferenceKeys.forEach((key) => localStorage.removeItem(key))
}

export const getSavedStatistics = () => {
	const savedStatisticsString = localStorage.getItem(LocalStorageKeys.SavedStatistics)
	if (savedStatisticsString) {
		return JSON.parse(savedStatisticsString)
	}
	return {}
}

export const saveStatistics = (query: QueryData, comment: string = "") => {
	const savedStatistics = getSavedStatistics()
	const queryId = createSearchId(query)
	localStorage.setItem(
		LocalStorageKeys.SavedStatistics,
		JSON.stringify({
			...savedStatistics,
			[queryId]: comment,
		})
	)
}
