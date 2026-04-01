import React from 'react';
import { Badge } from 'reactstrap';

export function StatusBadge({ status }) {
	const colors = {
		Alive: 'success',
		Dead: 'danger',
		unknown: 'secondary',
	};
	return (
		<Badge color={colors[status] || 'secondary'} pill>
			{status}
		</Badge>
	);
}
