import React from "react";
import Form from "../components/Forms/Reusable/Form";
import { commentData } from "../templates/metadataTemplate";
function JobForm() {
	return (
		<Form
			template={commentData}
			watchFields={["firstname", "include_portfolio"]}
			validate={validate}
			onSubmit={onSubmit}
		/>
	);
}

function onSubmit(values) {
	// alert(values);
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
