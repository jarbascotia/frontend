import React from 'react';

const FormRendaFixa = ({ form, handleChange, handleSubmit, editId }) => (
  <form onSubmit={handleSubmit} className="form-container">
    <div className="form-group">
      <label htmlFor="tipo">Tipo:</label>
      <select
        id="tipo"
        name="tipo"
        value={form.tipo}
        onChange={handleChange}
        required
        className="input-field"
      >
        <option value="">Selecione o tipo</option>
        <option value="LCI">LCI</option>
        <option value="LCA">LCA</option>
        <option value="CDB">CDB</option>
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="data_aquisicao">Data de Aquisição:</label>
      <input
        type="date"
        id="data_aquisicao"
        name="data_aquisicao"
        value={form.data_aquisicao}
        onChange={handleChange}
        required
        className="input-field"
      />
    </div>

    <div className="form-group">
      <label htmlFor="percentual_cdi">% do CDI:</label>
      <input
        type="number"
        id="percentual_cdi"
        name="percentual_cdi"
        placeholder="Ex: 120"
        value={form.percentual_cdi}
        onChange={handleChange}
        required
        className="input-field"
      />
    </div>

    <div className="form-group">
      <label htmlFor="instituicao">Instituição:</label>
      <input
        type="text"
        id="instituicao"
        name="instituicao"
        placeholder="Ex: Banco XYZ"
        value={form.instituicao}
        onChange={handleChange}
        required
        className="input-field"
      />
    </div>

    <div className="form-group">
      <label htmlFor="valor">Valor:</label>
      <input
        type="number"
        id="valor"
        name="valor"
        placeholder="Ex: 1000"
        value={form.valor}
        onChange={handleChange}
        required
        className="input-field"
      />
    </div>

    <div className="form-group">
      <label htmlFor="data_vencimento">Data de Vencimento:</label>
      <input
        type="date"
        id="data_vencimento"
        name="data_vencimento"
        value={form.data_vencimento}
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

export default FormRendaFixa;