import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const FormBitcoin = ({ 
  form, 
  handleChange, 
  handleSubmit, 
  editId, 
  onSuccess 
}) => {
  const [localErrors, setLocalErrors] = useState({});

  const validateField = (name, value) => {
    const errors = {};
    const numericValue = parseFloat(value);
    
    if (name === 'valor_compra') {
      if (!value || isNaN(numericValue) || numericValue <= 0) {
        errors.valor_compra = 'Valor BRL inválido';
      }
    }
    
    if (name === 'quantidade') {
      if (!value || isNaN(numericValue) || numericValue <= 0) {
        errors.quantidade = 'Quantidade BTC inválida';
      }
    }
    
    if (name === 'data_compra') {
      if (!value) {
        errors.data_compra = 'Data obrigatória';
      } else if (new Date(value) > new Date()) {
        errors.data_compra = 'Data não pode ser futura';
      }
    }
    
    setLocalErrors(prev => ({ 
      ...prev, 
      ...errors,
      ...(Object.keys(prev).includes(name) && !errors[name] ? { [name]: undefined } : {})
    }));
    
    return Object.keys(errors).length === 0;
  };

  const handleLocalChange = (e) => {
    const { name, value } = e.target;
    handleChange(e);
    validateField(name, value);
  };

  const handleLocalSubmit = async (e) => {
    e.preventDefault();
    
    const isValid = Object.keys(form).every(field => 
      validateField(field, form[field])
    );

    if (!isValid) return;

    try {
      await handleSubmit(e);
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="form-container">
      <h3 className="form-title">
        {editId ? 'Editar Compra' : 'Nova Compra de Bitcoin'}
      </h3>
      
      <form onSubmit={handleLocalSubmit}>
        <div className="form-group">
          <label>Data da Compra</label>
          <input
            type="date"
            name="data_compra"
            value={form.data_compra}
            onChange={handleLocalChange}
            className={localErrors.data_compra ? 'input-error' : ''}
            max={new Date().toISOString().split('T')[0]}
          />
          {localErrors.data_compra && 
            <span className="error-message">{localErrors.data_compra}</span>}
        </div>

        <div className="form-group">
          <label>Valor Total (BRL)</label>
          <input
            type="number"
            step="0.01"
            name="valor_compra"
            value={form.valor_compra}
            onChange={handleLocalChange}
            placeholder="Ex: 50000.00"
            className={localErrors.valor_compra ? 'input-error' : ''}
          />
          {localErrors.valor_compra && 
            <span className="error-message">{localErrors.valor_compra}</span>}
        </div>

        <div className="form-group">
          <label>Quantidade (BTC)</label>
          <input
            type="number"
            step="0.00000001"
            name="quantidade"
            value={form.quantidade}
            onChange={handleLocalChange}
            placeholder="Ex: 0.5"
            className={localErrors.quantidade ? 'input-error' : ''}
            inputMode="decimal"
          />
          {localErrors.quantidade && 
            <span className="error-message">{localErrors.quantidade}</span>}
        </div>

        <div className="form-buttons">
          <button 
            type="submit"
            className="btn-primary"
            disabled={Object.keys(localErrors).some(error => localErrors[error])}
          >
            <FontAwesomeIcon icon={faSave} />
            {editId ? ' Atualizar' : ' Salvar'}
          </button>

          <button
            type="button"
            className="btn-cancel"
            onClick={onSuccess}
          >
            <FontAwesomeIcon icon={faTimesCircle} />
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormBitcoin;