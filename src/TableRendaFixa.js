import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const TableRendaFixa = ({ rendaFixa, formatDate, formatCurrency, handleEdit, handleDelete, tipoFiltro }) => {
  const [expandedCardId, setExpandedCardId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  const filtrarRendaFixa = () => {
    if (tipoFiltro === 'Todos') {
      return rendaFixa;
    }
    return rendaFixa.filter(aplicacao => aplicacao.tipo === tipoFiltro);
  };

  const rendaFixaFiltrada = filtrarRendaFixa();

  return (
    <div className="cards-container-vertical">
      {rendaFixaFiltrada.map((aplicacao) => (
        <div key={aplicacao.id} className="card-vertical">
          <div className="card-header-vertical" onClick={() => toggleExpand(aplicacao.id)}>
            <div className="card-ticker">{aplicacao.tipo}</div>
            <div className="card-quantity">{aplicacao.percentual_cdi}% CDI</div>
            <div className="card-current-value">
              {formatCurrency(aplicacao.valor_atualizado)}
            </div>
            <div className={`card-lucro ${aplicacao.lucro >= 0 ? 'positive' : 'negative'}`}>
              {formatCurrency(aplicacao.lucro)}
            </div>
            <FontAwesomeIcon
              icon={expandedCardId === aplicacao.id ? faChevronUp : faChevronDown}
              className="card-expand-icon"
            />
          </div>

          {expandedCardId === aplicacao.id && (
            <div className="card-details-vertical">
              <div className="detail-item">
                <span>Instituição:</span>
                <span>{aplicacao.instituicao}</span>
              </div>
              <div className="detail-item">
                <span>Data de Aquisição:</span>
                <span>{formatDate(aplicacao.data_aquisicao)}</span>
              </div>
              <div className="detail-item">
                <span>Data de Vencimento:</span>
                <span>{formatDate(aplicacao.data_vencimento)}</span>
              </div>
              <div className="detail-item">
                <span>Valor Investido:</span>
                <span>{formatCurrency(aplicacao.valor)}</span>
              </div>
              <div className="card-actions">
                <button className="icon-button" onClick={() => handleEdit(aplicacao)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="icon-button" onClick={() => handleDelete(aplicacao.id)}>
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

export default TableRendaFixa;