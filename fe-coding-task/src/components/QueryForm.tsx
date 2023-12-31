import { useEffect, useState } from "react"
import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import { Stack, Button, FormHelperText, Grid, useMediaQuery, useTheme } from "@mui/material"
import Dropdown from "./Dropdown"
import { useData } from "../DataContext"
import { QueryData } from "../types"
import { compareYearQuarterStrings } from "../utils/yearQuarterUtils"
import { quarterOptions, houseTypeOptions } from "../paramOptions"
import {
	saveUserPreferences,
	getUserPreferences,
	clearPreferences,
	saveStatistic,
} from "../utils/localStorageUtils"

const QueryForm = () => {
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
	const { fetchChartData } = useData()
	const [searchParams, setSearchParams] = useSearchParams()
	const methods = useForm<QueryData>({
		defaultValues: {
			quartersRangeStart: "",
			quartersRangeEnd: "",
			houseType: "",
		},
	})
	const [formError, setFormError] = useState("")

	useEffect(() => {
		const queryParams = Object.fromEntries(searchParams.entries())
		if (queryParams) {
			Object.entries(queryParams).forEach(([key, value]) => {
				if (key as keyof QueryData) {
					methods.setValue(key as keyof QueryData, value)
				}
			})
		}
		methods.clearErrors()
	}, [methods, searchParams])

	useEffect(() => {
		const isFormClear = !Object.values(methods.getValues()).some((x) => x.length > 0)
		if (!isFormClear) {
			return
		}

		const localStoragePreferences = getUserPreferences()

		if (Object.values(localStoragePreferences).includes("")) {
			return
		}

		Object.entries(localStoragePreferences).forEach(([key, value]) => {
			if ((key as keyof QueryData) && value) {
				methods.setValue(key as keyof QueryData, value)
			}
		})
		setSearchParams(new URLSearchParams(localStoragePreferences))
	}, [methods, setSearchParams])

	const customValidate = () => {
		setFormError("")

		const isEndGreaterThanStart = compareYearQuarterStrings(
			methods.getValues("quartersRangeEnd"),
			methods.getValues("quartersRangeStart")
		)
		if (!isEndGreaterThanStart) {
			setFormError("Start quarter can't be greater than end one")
			return false
		}
		return true
	}

	const isSubmitDisabled = methods.formState.isSubmitting
	const onSubmit: SubmitHandler<QueryData> = async (data) => {
		const isValid = customValidate()

		if (!isValid) {
			return
		}
		setSearchParams(new URLSearchParams(data))
		await fetchChartData(data)
		saveUserPreferences(data)
	}

	const isSaveDisabled = Object.values(methods.getValues()).includes("")
	const onSave = () => {
		const isValid = customValidate()
		if (!isValid) {
			return
		}
		const query = methods.getValues()
		saveStatistic(query)
	}

	const onClear = () => {
		methods.reset()
		setFormError("")
		clearPreferences()
		setSearchParams(new URLSearchParams())
	}

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={6}>
						<Dropdown
							label="From"
							options={quarterOptions}
							{...methods.register("quartersRangeStart", {
								required: "required",
							})}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<Dropdown
							label="To"
							options={quarterOptions}
							{...methods.register("quartersRangeEnd", { required: "required" })}
						/>
					</Grid>
					<Grid item xs={12}>
						<Dropdown
							label="House Type"
							options={houseTypeOptions}
							{...methods.register("houseType", {
								required: "House type is required",
							})}
						/>
					</Grid>
					<Grid item xs={12}>
						<Stack spacing={2} direction={isMobile ? "column" : "row"}>
							<Button type="submit" disabled={isSubmitDisabled} variant="contained">
								Submit
							</Button>
							<Button disabled={isSaveDisabled} variant="outlined" onClick={onSave}>
								Save
							</Button>
							<Button variant="text" onClick={onClear}>
								Clear
							</Button>
						</Stack>
					</Grid>
				</Grid>
				{formError.length ? (
					<FormHelperText sx={{ color: "red" }}>{formError}</FormHelperText>
				) : null}
			</form>
		</FormProvider>
	)
}

export default QueryForm
