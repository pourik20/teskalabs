import React from 'react';
import { Card, CardBody, CardImg } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { StatusBadge } from './StatusBadge.jsx';

export function CharacterCard({ character }) {
	const { t } = useTranslation();

	return (
		<Card className="h-100 shadow-sm border-0 overflow-hidden">
			<CardImg top src={character.image} alt={character.name} style={{ height: '200px', objectFit: 'cover' }} />
			<CardBody>
				<div className="d-flex justify-content-between align-items-start mb-2">
					<h5 className="mb-0 text-truncate me-2">{character.name}</h5>
					<StatusBadge status={character.status} />
				</div>
				<div className="text-muted small">
					<p className="mb-1"><i className="bi bi-gender-ambiguous me-1" /><strong>{t('Training|Species')}:</strong> {character.species}</p>
					<p className="mb-1"><i className="bi bi-person me-1" /><strong>{t('Training|Gender')}:</strong> {character.gender}</p>
					<p className="mb-1"><i className="bi bi-globe me-1" /><strong>{t('Training|Origin')}:</strong> {character.origin?.name}</p>
					<p className="mb-0"><i className="bi bi-geo-alt me-1" /><strong>{t('Training|Location')}:</strong> {character.location?.name}</p>
				</div>
			</CardBody>
		</Card>
	);
}
