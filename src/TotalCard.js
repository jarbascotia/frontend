import React, { useState } from 'react';

const TotalCard = ({ titulo, valorAtualizado, lucro, acoes }) => {
  const [mostrarAcoes, setMostrarAcoes] = useState(false);

  return (
    <div className="totais-card" onClick={() => setMostrarAcoes(!mostrarAcoes)}>
      <h3>{titulo}</h3>
      <p>Valor Atualizado: {valorAtualizado}</p>
      <p>Lucro: {lucro}</p>
      {mostrarAcoes && (
        <div className="lista-acoes">
          {acoes.map((acao, index) => (
            <div key={index}>
              <p>{acao.ticker}: {acao.valorAtualizado} (Lucro: {acao.lucro})</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TotalCard;