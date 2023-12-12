import { useEffect } from "react"
import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Dropdown from "./Dropdown"
import { useData } from "../DataContext"
import { QueryData } from "../types"
import { compareYearQuarterStrings } from "../utils"
import { quarterOptions, houseTypeOptions } from "../paramOptions"
import { saveUserPreferences, getUserPreferences, clearPreferences } from "../localStorageUtils"

const QueryForm = () => {
	const { fetchChartData } = useData()
	const [searchParams, setSearchParams] = useSearchParams()
	const methods = useForm<QueryData>({
		defaultValues: {
			quartersRangeStart: "",
			quartersRangeEnd: "",
			houseType: "",
		},
	})

	useEffect(() => {
		const queryParams = Object.fromEntries(searchParams.entries())
		if (queryParams) {
			Object.entries(queryParams).forEach(([key, value]) => {
				if (key as keyof QueryData) {
					methods.setValue(key as keyof QueryData, value)
				}
			})
		}
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

	const onSubmit: SubmitHandler<QueryData> = async (data) => {
		setSearchParams(new URLSearchParams(data))
		await fetchChartData(data)
		saveUserPreferences(data)
	}

	const onClear = () => {
		methods.reset()
		clearPreferences()
	}

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				<p>Quarter Range</p>
				<Dropdown
					label="From"
					options={quarterOptions}
					{...methods.register("quartersRangeStart", {
						required: "required",
						validate: (quartersRangeStart) => {
							// TODO this probably should be form level error
							const quartersRangeEnd = methods.getValues("quartersRangeEnd")
							const isEndGreaterThanStart = compareYearQuarterStrings(
								quartersRangeEnd,
								quartersRangeStart
							)
							return (
								isEndGreaterThanStart ||
								"Start quarter can't be greater than end one"
							)
						},
					})}
				/>
				<Dropdown
					label="To"
					options={quarterOptions}
					{...methods.register("quartersRangeEnd", {
						required: "required",
					})}
				/>
				<Dropdown
					label="House Type"
					options={houseTypeOptions}
					{...methods.register("houseType", {
						required: "House type is required",
					})}
				/>

				<Stack spacing={2} direction="row">
					<Button
						type="submit"
						disabled={methods.formState.isSubmitting}
						variant="contained"
					>
						Submit
					</Button>
					<Button variant="text" onClick={onClear}>
						Clear
					</Button>
				</Stack>
			</form>
		</FormProvider>
	)
}

export default QueryForm
