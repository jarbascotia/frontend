import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const TableBitcoin = ({ 
  investments, 
  formatDate, 
  formatCurrency, 
  handleEdit, 
  handleDelete 
}) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const safeCalculation = (investment) => {
    const valorCompra = parseFloat(investment?.valor_compra) || 0;
    const quantidade = parseFloat(investment?.quantidade) || 0;
    const cotacaoAtual = parseFloat(investment?.cotacao_atual) || 0;
    
    return {
      valorAtual: quantidade * cotacaoAtual,
      lucro: (quantidade * cotacaoAtual) - valorCompra,
      taxaCompra: quantidade > 0 ? valorCompra / quantidade : 0
    };
  };

  return (
    <div className="cards-container-vertical">
      {investments?.map((investment) => {
        const {
          valorAtual,
          lucro,
          taxaCompra
        } = safeCalculation(investment);

        return (
          <div key={investment.id} className="card-vertical">
            <div className="card-header-vertical" onClick={() => toggleExpand(investment.id)}>
              <div className="card-ticker">BTC</div>
              <div className="card-quantity">
                {investment.quantidade?.toFixed(8) || '0.00000000'} BTC
              </div>
              <div className="card-current-value">
                {formatCurrency(valorAtual)}
              </div>
              <div className={`card-lucro ${lucro >= 0 ? 'positive' : 'negative'}`}>
                {formatCurrency(lucro)}
              </div>
              <FontAwesomeIcon
                icon={expandedId === investment.id ? faChevronUp : faChevronDown}
                className="card-expand-icon"
              />
            </div>

            {expandedId === investment.id && (
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
                  <span>1 BTC = {formatCurrency(taxaCompra)}</span>
                </div>
                <div className="detail-item">
                  <span>Cotação Atual:</span>
                  <span>{formatCurrency(investment.cotacao_atual)}</span>
                </div>
                <div className="card-actions">
                  <button 
                    className="icon-button"
                    onClick={() => handleEdit(investment)}
                    aria-label="Editar"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="icon-button"
                    onClick={() => handleDelete(investment.id)}
                    aria-label="Excluir"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TableBitcoin;