import React from 'react';



const Form = ({ form, handleChange, handleBlur, handleSubmit, editId }) => (
  <form onSubmit={handleSubmit} className="form-container">
    <div className="form-group">
      <label htmlFor="ticker">Ticker:</label>
      <input
        type="text"
        id="ticker"
        name="ticker"
        placeholder="Ex: PETR4"
        value={form.ticker}
        onChange={handleChange}
        required
        className="input-field"
      />
    </div>

    <div className="form-group">
      <label htmlFor="data_compra">Data de Compra:</label>
      <input
        type="date"
        id="data_compra"
        name="data_compra"
        value={form.data_compra}
        onChange={handleChange}
        required
        className="input-field"
      />
    </div>

    <div className="form-group">
      <label htmlFor="valor_compra">Valor de Compra:</label>
      <input
        type="text"
        id="valor_compra"
        name="valor_compra"
        placeholder="Ex: 25,50"
        value={form.valor_compra}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        className="input-field"
        autoComplete="off"
      />
    </div>

    <div className="form-group">
      <label htmlFor="quantidade">Quantidade:</label>
      <input
        type="number"
        id="quantidade"
        name="quantidade"
        placeholder="Ex: 100"
        value={form.quantidade}
        onChange={handleChange}
        required
        className="input-field"
      />
    </div>

    <button type="submit" className="form-button">
      {editId ? 'Atualizar' : 'Adicionar'}
    </button>
  </form>
);

export default Form;