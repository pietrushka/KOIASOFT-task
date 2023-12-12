import { QueryData } from "./types"
import { createQueryId } from "./utils"

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

export const getSavedStatistics = (): { queryId: string; comment: string }[] => {
	const savedStatisticsString = localStorage.getItem(LocalStorageKeys.SavedStatistics)
	if (savedStatisticsString) {
		return JSON.parse(savedStatisticsString)
	}
	return []
}

export const saveStatistic = (query: QueryData, comment: string = "") => {
	const savedStatistics = getSavedStatistics()
	const queryId = createQueryId(query)

	const existingIndex = savedStatistics.findIndex((x) => x.queryId === queryId)

	if (existingIndex !== -1) {
		savedStatistics[existingIndex].comment = comment
	} else {
		const newEntry = {
			queryId,
			comment,
		}
		savedStatistics.push(newEntry)
	}

	localStorage.setItem(LocalStorageKeys.SavedStatistics, JSON.stringify(savedStatistics))
	window.dispatchEvent(new Event("storage"))
}

export const deleteStatistic = (queryId: string) => {
	const savedStatistics = getSavedStatistics()
	const newStatistics = savedStatistics.filter((x) => x.queryId !== queryId)
	localStorage.setItem(LocalStorageKeys.SavedStatistics, JSON.stringify(newStatistics))
	window.dispatchEvent(new Event("storage"))
}
