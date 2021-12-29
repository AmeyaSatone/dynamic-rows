import React from "react";
import { useForm } from "react-hook-form";
import metaData from "../../../templates/metaData.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AddContext } from "../../../AddComponet";

function Form({ template, onSubmit, watchFields, validate }) {
	let { register, handleSubmit, errors, watch, setError, clearErrors, reset } =
		useForm({
			defaultValues: {
				_id: "a",
				name: "s",
				input: {
					artifact: { flavour: "n", path: "v" },
					data: {
						table_type: "f",
						table: "g",
						context: [
							{ key: "j", value: "k" },
							{ key: "j", value: "k" },
						],
					},
				},
			},
		});

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
	const renderFields = (template) => {
		return (
			<form
				onSubmit={handleSubmit(onCreateMetaData)}
				className="header-section"
				id={"test"}
			>
				<div
					className="container"
					style={{
						width: 850,
						height: 550,
						overflow: "auto",
						marginTop: "20px",
					}}
				>
					<div>
						{template.sections.map((comment) => {
							return (
								<Accordion
									style={{ backgroundColor: "lightblue", marginBottom: "20px" }}
								>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1a-content"
										id="panel1a-header"
									>
										<Typography>{comment.title}</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<Typography>
											<RenderSection
												key={comment.id}
												comment={comment}
												sectionname={comment.title}
												ref={register}
											/>
										</Typography>
									</AccordionDetails>
								</Accordion>
							);
						})}
					</div>
				</div>
			</form>
		);
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit(onCreateMetaData)}
				className="header-section"
			>
				{renderFields(template)}
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
	function RenderSection({ comment }) {
		const nestedComments = (comment.fields || []).map((comment1) => {
			return comment1.type === "section" ? (
				<Accordion style={{ marginBottom: "20px" }}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography>{comment1.title}</Typography>
					</AccordionSummary>

					{RenderChildSection(RenderSection, comment1, register)}
				</Accordion>
			) : (
				<div className="row row-cols-2">
					{RenderChildSection(RenderSection, comment1, register)}
				</div>
			);
		});

		return (
			<div
				style={
					comment.isRoot
						? {
								marginLeft: "25px",
								backgroundColor: "white",
						  }
						: {}
				}
			>
				{comment.name === "context" && (
					<div>
						<AddContext register={register} data={template} />
					</div>
				)}
				{!comment.isRoot &&
					RenderFormFileds(
						comment.type,
						comment.name,
						comment.title,
						register,
						comment.sectionName
					)}
				{nestedComments}
			</div>
		);
	}

	function RenderFormFileds(type, name, title, register, sectionName) {
		switch (type) {
			case "text":
				return (
					<div key={name}>
						<label htmlFor={name}>{title}</label>
						<input
							type="text"
							name={name}
							id={name}
							{...register(
								sectionName === "" ? name : sectionName + "." + name
							)}
						/>
					</div>
				);
			case "email":
				return (
					<div key={name}>
						<label htmlFor={name}>{title}</label>
						<input type="email" name={name} id={name} />
					</div>
				);
			case "checkbox":
				return (
					<div key={name}>
						<label>
							<input type="checkbox" name={name} id={name} />
							<span>{title}</span>
						</label>
					</div>
				);
			case "url":
				return (
					<div key={name}>
						<label htmlFor={name}>{title}</label>
						<input type="url" name={name} id={name} />
					</div>
				);
			case "section":
				return <div key={name}></div>;
			default:
				return (
					<div key={name}>
						<span className="red-text">Invalid Field</span>
					</div>
				);
		}
	}
}

function RenderChildSection(Comment, comment1, register) {
	return (
		<AccordionDetails>
			<Typography>
				<Comment
					key={comment1.id}
					comment={comment1}
					ref={register()}
					type="child"
				/>
			</Typography>
		</AccordionDetails>
	);
}

export default Form;
