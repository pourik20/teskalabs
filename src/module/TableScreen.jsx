import React, { useCallback, useMemo } from 'react';
import { Container } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { DataTableCard2, DateTime } from 'asab_webui_components';
import axios from 'axios';

// Ideally, this would be in a .env file
const API_URL = 'https://devtest.teskalabs.com';

export function TableScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const loader = useCallback(async ({ params }) => {
    const response = await axios.get(`${API_URL}/data`, { params });
    return { count: response.data.count, rows: response.data.data };
  }, []);

  const columns = useMemo(
    () => [
      {
        title: (
          <>
            <i className="bi bi-person me-1" />
            {t('Training|Username')}
          </>
        ),
        render: ({ row }) => (
          <span title={row.id} className="text-decoration-underline" style={{ cursor: 'pointer' }}>
            {row.username}
          </span>
        ),
      },
      {
        title: (
          <>
            <i className="bi bi-envelope me-1" />
            {t('Training|Email')}
          </>
        ),
        render: ({ row }) => row.email,
      },
      {
        title: (
          <>
            <i className="bi bi-geo-alt me-1" />
            {t('Training|Address')}
          </>
        ),
        render: ({ row }) => row.address,
      },
      {
        title: (
          <>
            <i className="bi bi-calendar-plus me-1" />
            {t('Training|Created')}
          </>
        ),
        render: ({ row }) => <DateTime value={row.created} />,
      },
      {
        title: (
          <>
            <i className="bi bi-box-arrow-in-right me-1" />
            {t('Training|Last sign in')}
          </>
        ),
        render: ({ row }) => <DateTime value={row.last_sign_in} />,
      },
      {
        title: '',
        colStyle: { width: '50px' },
        render: ({ row }) => (
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => navigate(`/detail/${row.id}`)}
            title={t('Training|View detail')}
          >
            <i className="bi bi-eye" />
          </button>
        ),
      },
    ],
    [t, navigate],
  );

  const header = useMemo(
    () => (
      <>
        <i className="bi bi-people me-2" />
        {t('Training|Users')}
      </>
    ),
    [t],
  );

  return (
    <Container fluid className="h-100 py-3">
      <DataTableCard2 columns={columns} loader={loader} header={header} />
    </Container>
  );
}
