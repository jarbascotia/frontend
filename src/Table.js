import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const Table = ({ carteira, filtrarCarteira, formatDate, formatCurrency, handleEdit, handleDelete }) => {
  const [expandedCardId, setExpandedCardId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  return (
    <div className="cards-container-vertical">
      {filtrarCarteira().map((acao) => (
        <div key={acao.id} className="card-vertical">
          <div className="card-header-vertical" onClick={() => toggleExpand(acao.id)}>
            <div className="card-ticker">{acao.ticker.toUpperCase()}</div>
            <div className="card-quantity">{acao.quantidade} un.</div>
            <div className="card-current-value">
              {formatCurrency(acao.cotacao_atual)}
            </div>
            <div className="card-total-value">
              {formatCurrency(acao.valor_atualizado)}
            </div>
            <div className={`card-lucro ${acao.lucro >= 0 ? 'positive' : 'negative'}`}>
              {formatCurrency(acao.lucro)}
            </div>
            <FontAwesomeIcon
              icon={expandedCardId === acao.id ? faChevronUp : faChevronDown}
              className="card-expand-icon"
            />
          </div>

          {expandedCardId === acao.id && (
            <div className="card-details-vertical">
              <div className="detail-item">
                <span>Nome:</span>
                <span>{acao.nome}</span>
              </div>
              <div className="detail-item">
                <span>Data de Compra:</span>
                <span>{formatDate(acao.data_compra)}</span>
              </div>
              <div className="detail-item">
                <span>Valor de Compra:</span>
                <span>{formatCurrency(acao.valor_compra)}</span>
              </div>
              <div className="detail-item">
                <span>Valor Investido:</span>
                <span>{formatCurrency(acao.valor_investido)}</span>
              </div>
              <div className="detail-item">
                <span>% da Carteira:</span>
                <span>
                  {((acao.valor_atualizado / carteira.reduce((total, a) => total + a.valor_atualizado, 0)) * 100).toFixed(2)}%
                </span>
              </div>
              <div className="card-actions">
                <button className="icon-button" onClick={() => handleEdit(acao)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="icon-button" onClick={() => handleDelete(acao.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Table;