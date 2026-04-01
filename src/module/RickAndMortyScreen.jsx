import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Spinner,
  Button,
} from 'reactstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { CharacterCard } from './components/CharacterCard.jsx';
import { useDebounce } from './hooks/useDebounce.js';

// Ideally, this would be in a .env file
const API_URL = 'https://rickandmortyapi.com/api/character';

export function RickAndMortyScreen() {
  const { t } = useTranslation();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState({ count: 0, pages: 0 });
  const [error, setError] = useState(null);

  const fetchCharacters = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { page };
      if (debouncedSearch) params.name = debouncedSearch;
      const response = await axios.get(API_URL, { params });
      setCharacters(response.data.results);
      setInfo(response.data.info);
    } catch (e) {
      if (e.response?.status === 404) {
        setCharacters([]);
        setInfo({ count: 0, pages: 0 });
      } else {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch]);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <Container fluid className="h-100 py-3">
      {/* Header */}
      <div className="mb-4">
        <h2 className="mb-1">
          <i className="bi bi-stars me-2" />
          {t('Training|Rick and Morty Characters')}
        </h2>
        <p className="text-muted mb-0">
          {t('Training|Browse characters from the Rick and Morty universe')}
        </p>
      </div>

      {/* Search */}
      <Row className="mb-4">
        <Col md={4}>
          <InputGroup>
            <InputGroupText>
              <i className="bi bi-search" />
            </InputGroupText>
            <Input
              type="text"
              placeholder={t('Training|Search characters by name...')}
              value={search}
              onChange={handleSearch}
            />
          </InputGroup>
        </Col>
        <Col md={8} className="d-flex align-items-center">
          {!loading && !error && (
            <span className="text-muted small">
              {info.count} {t('Training|characters found')}
            </span>
          )}
        </Col>
      </Row>

      {/* Error */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Loading */}
      {loading && (
        <div className="d-flex justify-content-center py-5">
          <Spinner color="primary" />
        </div>
      )}

      {/* Characters Grid */}
      {!loading && characters.length > 0 && (
        <Row className="g-4 justify-content-center">
          {characters.map((character) => (
            <Col key={character.id} xs="auto">
              <div style={{ width: '280px' }}>
                <CharacterCard character={character} />
              </div>
            </Col>
          ))}
        </Row>
      )}

      {/* No results */}
      {!loading && characters.length === 0 && !error && (
        <div className="text-center py-5 text-muted">
          <i className="bi bi-emoji-frown d-block mb-2" style={{ fontSize: '2rem' }} />
          {t('Training|No characters found')}
        </div>
      )}

      {/* Pagination */}
      {info.pages > 1 && (
        <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
          <Button
            outline
            color="secondary"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || loading}
          >
            <i className="bi bi-chevron-left me-1" />
            {t('Training|Previous')}
          </Button>
          <span className="text-muted">
            {t('General|Page')} {page} / {info.pages}
          </span>
          <Button
            outline
            color="secondary"
            onClick={() => setPage((p) => Math.min(info.pages, p + 1))}
            disabled={page === info.pages || loading}
          >
            {t('Training|Next')}
            <i className="bi bi-chevron-right ms-1" />
          </Button>
        </div>
      )}
    </Container>
  );
}
