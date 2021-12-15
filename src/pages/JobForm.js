import React from "react";
import Form from "../components/Forms/Reusable/Form";

function JobForm(props) {
	let template = {
		title: "Create Model Metadata",
		projectID: "test projectID",
		version: "test version",
		sections: [
			{
				title: "Model",
				fields: [
					{
						title: "Model Type",
						type: "text",
						name: "modelType",
					},
				],
			},
			{
				title: "Study",
				fields: [
					{
						title: "Study Id",
						type: "text",
						name: "studyId",
					},
					{
						title: "Study Version",
						type: "text",
						name: "studyVersion",
					},
				],
			},
			{
				title: "Entity",
				fields: [
					{
						title: "Entity Id",
						type: "text",
						name: "entityId",
					},
					{
						title: "Entity Version",
						type: "text",
						name: "entityVersion",
					},
				],
			},
		],
		resultTable: "restult table",
		study_completes: "",
	};

	return (
		<Form
			template={template}
			watchFields={["firstname", "include_portfolio"]}
			validate={validate}
			onSubmit={onSubmit}
		/>
	);
}

function onSubmit(values) {
	console.log(values);
}

function validate(watchValues, errorMethods) {
	let { errors, setError, clearErrors } = errorMethods;

	// Firstname validation
	// if(watchValues['firstname'] === 'Admin'){
	//     if(!errors['firstname']){
	//         setError('firstname', {
	//             type: 'manual',
	//             message: 'You cannot use this first name'
	//         })
	//     }
	// }else{
	//     if(errors['firstname'] && errors['firstname']['type'] === 'manual'){
	//         clearErrors('firstname');
	//     }
	// }
}

export default JobForm;
