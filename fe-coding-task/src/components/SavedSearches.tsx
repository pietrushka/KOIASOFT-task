import { useState, useEffect } from "react"
import { Button, List, ListItem, ListItemText, TextField, Grid } from "@mui/material"
import { useSearchParams } from "react-router-dom"
import {
	getSavedStatistics,
	saveStatistic,
	deleteStatistic,
	clearPreferences,
} from "../localStorageUtils"
import { parseSearchId } from "../utils"

const SavedSearches = () => {
	const [, setSearchParams] = useSearchParams()
	const [saved, setSaved] = useState<{ queryId: string; comment: string }[]>([])

	useEffect(() => {
		const handleStorageChange = () => {
			setSaved(getSavedStatistics())
		}
		handleStorageChange()
		window.addEventListener("storage", handleStorageChange)

		return () => {
			window.removeEventListener("storage", handleStorageChange)
		}
	}, [])

	const handleSave = (queryId: string, comment?: string) => {
		saveStatistic(parseSearchId(queryId), comment)
		setSaved(getSavedStatistics())
	}

	const handleDelete = (queryId: string) => {
		deleteStatistic(queryId)
		setSaved(getSavedStatistics())
	}

	const handleLoad = (queryId: string) => {
		const data = parseSearchId(queryId)
		setSearchParams(new URLSearchParams(data))
		clearPreferences()
	}

	if (!saved.length) {
		return null
	}

	return (
		<List>
			{saved.map((item) => (
				<ListItem key={item.queryId} divider>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<ListItemText primary={item.queryId} />
						</Grid>
						<Grid item xs={6}>
							<TextField
								fullWidth
								value={item.comment}
								onChange={(e) => handleSave(item.queryId, e.target.value)}
							/>
						</Grid>
						<Grid item xs={4}>
							<Button onClick={() => handleDelete(item.queryId)}>Delete</Button>
						</Grid>
						<Grid item xs={4}>
							<Button onClick={() => handleLoad(item.queryId)}>Load</Button>
						</Grid>
					</Grid>
				</ListItem>
			))}
		</List>
	)
}

export default SavedSearches
