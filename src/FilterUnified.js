import React from 'react';

const FilterUnified = ({ filtro, setFiltro, opcoes }) => {
  const handleFiltroChange = (tipo) => {
    setFiltro(tipo);
  };

  return (
    <div className="filtro-container">
      <div className="filtros-unificados">
        <button 
          className={`filtro-botao ${filtro === 'Todos' ? 'ativo' : ''}`} 
          onClick={() => handleFiltroChange('Todos')}
        >
          Todos
        </button>
        
        <button 
          className={`filtro-botao ${filtro === 'Ações' ? 'ativo' : ''}`} 
          onClick={() => handleFiltroChange('Ações')}
        >
          Ações
        </button>
        
        <button 
          className={`filtro-botao ${filtro === 'FIIs' ? 'ativo' : ''}`} 
          onClick={() => handleFiltroChange('FIIs')}
        >
          FIIs
        </button>
        
        <button 
          className={`filtro-botao ${filtro === 'Dólar' ? 'ativo' : ''}`} 
          onClick={() => handleFiltroChange('Dólar')}
        >
          Dólar
        </button>
        
        <button 
          className={`filtro-botao ${filtro === 'Bitcoin' ? 'ativo' : ''}`} 
          onClick={() => handleFiltroChange('Bitcoin')}
        >
          Bitcoin
        </button>
      </div>
    </div>
  );
};

export default FilterUnified;