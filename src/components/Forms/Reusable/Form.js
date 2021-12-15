import React from "react";
import { useForm } from "react-hook-form";
import metaData from "../../../templates/metaData.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Reusable Form Component
function Form({ template, onSubmit, watchFields, validate }) {
	let { register, handleSubmit, errors, watch, setError, clearErrors, reset } =
		useForm({ defaultValues: {} });
	let { title, sections, ...rest } = template;

	let watchValues = watch(watchFields);
	validate(watchValues, { errors, setError, clearErrors });
	const onCreateMetaData = (data) => {
		onSubmit(data);
		reset();

		return toast("Metadata Created !!!", {
			position: "top-center",
			autoClose: 5000,
			closeOnClick: true,
			progress: false,
		});
	};
	const renderFields = (sections) => {
		return sections.map((section, index) => {
			let { title, fields } = section;
			return (
				<div className="accordion accordion-section" id="accordionExample">
					<div className="accordion-item">
						<h2 className="accordion-header" id={title}>
							<button
								className="accordion-button"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target={`#collapse${title}`}
								aria-expanded="true"
								aria-controls={title}
							>
								{title}
							</button>
						</h2>
						<div
							id={`collapse${title}`}
							className="accordion-collapse collapse show"
							aria-labelledby={title}
							data-bs-parent="#accordionExample"
						>
							<div className="accordion-body" id={title}>
								<div className="row row-cols-2">
									{fields.map((field) => {
										let { title, type, name, validationProps, dynamic } = field;

										switch (type) {
											case "text":
												return (
													<div key={name}>
														<label htmlFor={name}>{title}</label>
														<input
															type="text"
															name={name}
															id={name}
															ref={register(validationProps)}
														/>
														{errors[name] && (
															<span className="red-text">
																{errors[name]["message"]}
															</span>
														)}
													</div>
												);
											case "email":
												return (
													<div key={name}>
														<label htmlFor={name}>{title}</label>
														<input
															type="email"
															name={name}
															id={name}
															ref={register(validationProps)}
														/>
														{errors[name] && (
															<span className="red-text">
																{errors[name]["message"]}
															</span>
														)}
													</div>
												);
											case "checkbox":
												return (
													<div key={name}>
														<label>
															<input
																type="checkbox"
																name={name}
																id={name}
																ref={register(validationProps)}
															/>
															<span>{title}</span>
															{errors[name] && (
																<span className="red-text">
																	{errors[name]["message"]}
																</span>
															)}
														</label>
													</div>
												);
											case "url":
												return (
													<div key={name}>
														<label htmlFor={name}>{title}</label>
														<input
															type="url"
															name={name}
															id={name}
															ref={register(validationProps)}
														/>
														{errors[name] && (
															<span className="red-text">
																{errors[name]["message"]}
															</span>
														)}
													</div>
												);
											default:
												return (
													<div key={name}>
														<span className="red-text">Invalid Field</span>
													</div>
												);
										}
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		});
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit(onCreateMetaData)}
				className="header-section"
			>
				<h4 className="header-section">{title}</h4>
				{renderFields(sections)}
				<br />
				<button type="submit" className="btn">
					Create
				</button>
				<button
					type="button"
					className="btn button-margin"
					onClick={() => reset()}
				>
					Clear
				</button>
			</form>
			<ToastContainer
				position="top-center"
				autoClose={5000}
				closeOnClick
				hideProgressBar={true}
			/>
		</div>
	);
}

export default Form;
