import React from 'react'

function Button({ name, className, children }) {
	const buttonClassName = className ? `button is-link is-fullwidth ${className}` : 'button is-link is-fullwidth';

	if (name) {
		return (
			<button className={buttonClassName}>{name}</button>
		)
	}
	return (
		<button className={buttonClassName}>{children}</button>
	)
}

export default Button