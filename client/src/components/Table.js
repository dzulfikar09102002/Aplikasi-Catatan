import React from 'react'

function Table({ headers = [], data = [] }) {
	return (
		<table className="table is-fullwidth">
			<thead>
				<tr>
					{headers.map((header) => (
						<th key={header.key}>{header.value}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.length === 0 && (
					<tr>
						<td colSpan={headers.length} className="has-text-centered">Tidak ada data.</td>
					</tr>
				)}
				{data.map((row, index) => (
					<tr key={index}>
						{Object.values(row).map((value, index) => (
							<td key={index}>{value}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default Table
