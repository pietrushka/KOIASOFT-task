import { useState, useEffect } from "react"
import { Button, List, ListItem, ListItemText, TextField, Grid, Typography } from "@mui/material"
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
		<>
			<Typography variant="h6">Saved searches:</Typography>
			<List>
				{saved.map((item) => (
					<ListItem key={item.queryId} divider>
						<Grid container spacing={2} alignItems="center">
							<Grid item xs={12} sm={3}>
								<ListItemText primary={item.queryId} />
							</Grid>
							<Grid item xs={12} sm={3}>
								<TextField
									fullWidth
									value={item.comment}
									onChange={(e) => handleSave(item.queryId, e.target.value)}
								/>
							</Grid>
							<Grid item xs={6} sm={3}>
								<Button fullWidth onClick={() => handleDelete(item.queryId)}>
									Delete
								</Button>
							</Grid>
							<Grid item xs={6} sm={3}>
								<Button fullWidth onClick={() => handleLoad(item.queryId)}>
									Load
								</Button>
							</Grid>
						</Grid>
					</ListItem>
				))}
			</List>
		</>
	)
}

export default SavedSearches
