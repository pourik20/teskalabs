import React, { useState, useEffect, useCallback } from 'react';
import { Container, Card, CardHeader, CardBody, Row, Col, Spinner } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router';
import { DateTime } from 'asab_webui_components';
import axios from 'axios';

// Ideally, this would be in a .env file
const API_URL = 'https://devtest.teskalabs.com';

export function DetailScreen() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetail = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/detail/${id}`);
      setData(response.data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  if (loading) {
    return (
      <Container className="h-100 d-flex justify-content-center align-items-center">
        <Spinner color="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="h-100 py-3">
        <div className="alert alert-danger">{error}</div>
      </Container>
    );
  }

  return (
    <Container fluid className="h-100 py-3">
      <button className="btn btn-outline-secondary mb-3" onClick={() => navigate('/')}>
        <i className="bi bi-arrow-left me-1" />
        {t('General|Back')}
      </button>

      <Card>
        <CardHeader>
          <i className="bi bi-person-badge me-2" />
          {t('Training|User detail')}: {data.username}
        </CardHeader>
        <CardBody>
          <Row className="mb-3">
            <Col sm={3} className="fw-bold">
              <i className="bi bi-key me-1" />
              ID
            </Col>
            <Col sm={9}>{data.id}</Col>
          </Row>
          <Row className="mb-3">
            <Col sm={3} className="fw-bold">
              <i className="bi bi-person me-1" />
              {t('Training|Username')}
            </Col>
            <Col sm={9}>{data.username}</Col>
          </Row>
          <Row className="mb-3">
            <Col sm={3} className="fw-bold">
              <i className="bi bi-envelope me-1" />
              {t('Training|Email')}
            </Col>
            <Col sm={9}>{data.email}</Col>
          </Row>
          <Row className="mb-3">
            <Col sm={3} className="fw-bold">
              <i className="bi bi-geo-alt me-1" />
              {t('Training|Address')}
            </Col>
            <Col sm={9}>{data.address}</Col>
          </Row>
          <Row className="mb-3">
            <Col sm={3} className="fw-bold">
              <i className="bi bi-calendar-plus me-1" />
              {t('Training|Created')}
            </Col>
            <Col sm={9}>
              <DateTime value={data.created} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm={3} className="fw-bold">
              <i className="bi bi-box-arrow-in-right me-1" />
              {t('Training|Last sign in')}
            </Col>
            <Col sm={9}>
              <DateTime value={data.last_sign_in} />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}
