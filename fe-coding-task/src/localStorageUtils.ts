import { QueryData } from "./types"

export const saveUserPreferences = (preferences: QueryData) => {
	localStorage.setItem("quartersRangeStart", preferences.quartersRangeStart)
	localStorage.setItem("quartersRangeEnd", preferences.quartersRangeEnd)
	localStorage.setItem("houseType", preferences.houseType)
}

export const getUserPreferences = () => {
	return {
		quartersRangeStart: localStorage.getItem("quartersRangeStart"),
		quartersRangeEnd: localStorage.getItem("quartersRangeEnd"),
		houseType: localStorage.getItem("houseType"),
	}
}

export const clearPreferences = () => {
	const preferenceKeys = ["quartersRangeStart", "quartersRangeEnd", "houseType"]
	preferenceKeys.forEach((key) => localStorage.removeItem(key))
}
