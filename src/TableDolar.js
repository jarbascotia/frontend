import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const TableDolar = ({ investments, formatDate, formatCurrency, handleEdit, handleDelete }) => {
  const [expandedCardId, setExpandedCardId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  return (
    <div className="cards-container-vertical">
      {investments.map((investment) => (
        <div key={investment.id} className="card-vertical">
          <div className="card-header-vertical" onClick={() => toggleExpand(investment.id)}>
            <div className="card-ticker">USD Compra</div>
            <div className="card-quantity">{investment.quantidade} USD</div>
            <div className="card-current-value">
              {formatCurrency(investment.valor_atual)}
            </div>
            <div className={`card-lucro ${investment.lucro >= 0 ? 'positive' : 'negative'}`}>
              {formatCurrency(investment.lucro)}
            </div>
            <FontAwesomeIcon
              icon={expandedCardId === investment.id ? faChevronUp : faChevronDown}
              className="card-expand-icon"
            />
          </div>

          {expandedCardId === investment.id && (
            <div className="card-details-vertical">
              <div className="detail-item">
                <span>Data da Compra:</span>
                <span>{formatDate(investment.data_compra)}</span>
              </div>
              <div className="detail-item">
                <span>Valor Investido:</span>
                <span>{formatCurrency(investment.valor_compra)}</span>
              </div>
              <div className="detail-item">
                <span>Taxa de Câmbio:</span>
                <span>1 USD = {formatCurrency(investment.taxa_compra)} BRL</span>
              </div>
              <div className="detail-item">
                <span>Cotação Atual:</span>
                <span>1 USD = {formatCurrency(investment.cotacao_atual)} BRL</span>
              </div>
              <div className="card-actions">
                <button className="icon-button" onClick={() => handleEdit(investment)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="icon-button" onClick={() => handleDelete(investment.id)}>
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

export default TableDolar;