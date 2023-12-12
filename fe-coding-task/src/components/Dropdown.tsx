import React from "react"
import { useFormContext, Controller } from "react-hook-form"
import { InputLabel, FormControl, Select, MenuItem, FormHelperText } from "@mui/material"
import Box from "@mui/material/Box"

type Option = {
	value: string
	label?: string
}

interface RangeInputProps {
	options: Option[]
	name: string
	label: string
}

const Dropdown: React.FC<RangeInputProps> = ({ options, name, label }) => {
	const {
		control,
		formState: { errors },
	} = useFormContext()

	return (
		<Box>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<FormControl fullWidth error={!!errors[name]}>
						<InputLabel>{label}</InputLabel>
						<Select {...field}>
							{options.map(({ value, label }) => (
								<MenuItem key={value} value={value}>
									{label || value}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				)}
			/>
			{errors[name] && <FormHelperText>{errors[name].message}</FormHelperText>}
		</Box>
	)
}

export default Dropdown
