import React from "react";
import styled from "@emotion/styled";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "semantic-ui-react";

export const AddContext = (prop) => {
	const { control } = useForm({
		defaultValues: {
			// _id: "a",
			// name: "s",
			// input: {
			// 	artifact: { flavour: "n", path: "v" },
			// 	data: {
			// 		table_type: "f",
			// 		table: "g",
			// 		context: [
			// 			{ key: "j", value: "k" },
			// 			{ key: "j", value: "k" },
			// 		],
			// 	},
			// },
		},
	});
	const { register } = prop;
	const { fields, append, remove } = useFieldArray({
		name: "input.data.context",
		control,
	});

	return (
		<div>
			{fields.map((field, index) => {
				return (
					<Row key={field.id}>
						<label htmlFor={`input.data.context[${index}]`}>Key</label>
						<input
							type="text"
							{...register(`input.data.context[${index}].key`)}
							name={`input.data.context[${index}].key`}
							id={`input.data.context[${index}].key`}
							defaultValue={""}
						/>

						<label htmlFor={`input.data.context[${index}].value`}>Value</label>
						<input
							type="text"
							{...register(`input.data.context[${index}].value`)}
							name={`input.data.context[${index}].value`}
							id={`input.data.context[${index}].value`}
							defaultValue={field.value}
						/>

						<Button type="button" className="btn" onClick={() => remove(index)}>
							Delete
						</Button>
					</Row>
				);
			})}
			<Button
				type="button"
				className="btn"
				onClick={() => append({ key: "", value: "" })}
			>
				Add New
			</Button>
		</div>
	);
};

const ErrorMessage = styled.span`
	font-size: 12px;
	color: red;
`;

const Row = styled.div`
	display: flex;
	align-items: center;

	& > * {
		margin-right: 20px !important;
	}

	.ui.button {
		margin: 10px 0 0 8px;
	}
`;

ErrorMessage.defaultProps = { role: "alert" };
