import { useState, useEffect } from "react"
import { Button, List, ListItem, ListItemText, TextField, Grid, Typography } from "@mui/material"
import { useSearchParams } from "react-router-dom"
import {
	getSavedStatistics,
	saveStatistic,
	deleteStatistic,
	clearPreferences,
} from "../utils/localStorageUtils"
import { parseQueryId, makeQueryIdReadable } from "../utils/queryIdUtils"
import { SavedQuery } from "../types"

const SavedQueries = () => {
	const [, setSearchParams] = useSearchParams()
	const [saved, setSaved] = useState<SavedQuery[]>([])

	// TODO alternatively move savedQueries handling to another context
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
		saveStatistic(parseQueryId(queryId), comment)
		setSaved(getSavedStatistics())
	}

	const handleDelete = (queryId: string) => {
		deleteStatistic(queryId)
		setSaved(getSavedStatistics())
	}

	const handleLoad = (queryId: string) => {
		const data = parseQueryId(queryId)
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
								<ListItemText primary={makeQueryIdReadable(item.queryId)} />
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

export default SavedQueries
