import React from 'react'
import { upperCaseFirstLetter } from '../utils/formatter';

function Input({ className, textArea, ...props }) {
	const customClassName = className ? `input ${className}` : 'input';

	if (textArea) {
		return (
			<div className="field mt-5">
				{props.name && <label className="label">{upperCaseFirstLetter(props.name)}</label>}
				<div className="controls">
					<textarea className={customClassName} {...props} />
				</div>
			</div>
		)
	}

	return (
		<div className="field mt-5">
			{props.name && <label className="label">{upperCaseFirstLetter(props.name)}</label>}
			<div className="controls">
				<input type={props.type ? props.type : "text"} className={customClassName} {...props} />
			</div>
		</div>
	)
}

export default Input
