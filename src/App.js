import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Form from './Form';
import Table from './Table';
import Chart from './Chart';
import FilterUnified from './FilterUnified';
import { formatCurrency, formatDate } from './utils';
import FormDolar from './FormDolar';
import TableDolar from './TableDolar';
import FormBitcoin from './FormBitcoin';
import TableBitcoin from './TableBitcoin';
import { fetchCarteira, fetchDolar, fetchBitcoin } from './apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TotalCard from './TotalCard';

function App() {

  const [carteira, setCarteira] = useState([]);
  const [form, setForm] = useState({ ticker: '', data_compra: '', valor_compra: '', quantidade: '' });
  const [editId, setEditId] = useState(null);
  const [showFormAcoes, setShowFormAcoes] = useState(false);
  
  const [dolarInvestments, setDolarInvestments] = useState([]);
  const [formDolar, setFormDolar] = useState({ data_compra: '', valor_compra: '', quantidade: '' });
  const [editIdDolar, setEditIdDolar] = useState(null);
  const [showFormDolar, setShowFormDolar] = useState(false);
  
  const [bitcoinInvestments, setBitcoinInvestments] = useState([]);
  const [formBitcoin, setFormBitcoin] = useState({ data_compra: '', valor_compra: '', quantidade: '' });
  const [editIdBitcoin, setEditIdBitcoin] = useState(null);
  const [showFormBitcoin, setShowFormBitcoin] = useState(false);
  
  const [filtro, setFiltro] = useState('Todos');

  useEffect(() => {
    const loadData = async () => {
      try {
        const carteiraData = await fetchCarteira();
        const dolarData = await fetchDolar();
        const bitcoinData = await fetchBitcoin();
        
        setCarteira(carteiraData);
        setDolarInvestments(dolarData);
        setBitcoinInvestments(bitcoinData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };
    loadData();
  }, []);

  const filtrarCarteira = () => {
    if (filtro === 'Todos') return carteira;
    if (filtro === 'Ações') return carteira.filter(acao => !acao.ticker.endsWith('11'));
    if (filtro === 'FIIs') return carteira.filter(acao => acao.ticker.endsWith('11'));
    return [];
  };

  const filtrarDolar = () => (filtro === 'Todos' || filtro === 'Dólar') ? dolarInvestments : [];
  const filtrarBitcoin = () => (filtro === 'Todos' || filtro === 'Bitcoin') ? bitcoinInvestments : [];

  const calcularTotal = (data, key) => data.reduce((total, item) => total + (item[key] || 0), 0);

  const dataBarChart = [
    ...filtrarCarteira().map(acao => ({ 
      name: acao.ticker, 
      valor: acao.valor_atualizado 
    })),
    ...(filtrarDolar().length > 0 ? [{
      name: 'USD',
      valor: calcularTotal(filtrarDolar(), 'valor_atual')
    }] : []),
    ...(filtrarBitcoin().length > 0 ? [{
      name: 'BTC',
      valor: calcularTotal(filtrarBitcoin(), 'valor_atual')
    }] : [])
  ];

  const handleChange = (e, setFormFunction) => {
    const { name, value } = e.target;
    setFormFunction(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id, apiEndpoint, fetchFunction, setFunction) => {
    const port = apiEndpoint === 'carteira' ? 3003 : 
                apiEndpoint === 'dolar' ? 3004 : 
                3005;
    try {
      await axios.delete(`http://localhost:${port}/api/${apiEndpoint}/${id}`);
      const updatedData = await fetchFunction();
      setFunction(updatedData);
      alert('Registro excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar:', error);
      alert(error.response?.data?.error || 'Falha ao excluir');
    }
  };

  const handleSubmit = async (e, formData, setFormFunction, editId, setEditIdFunction, 
                            fetchFunction, apiEndpoint, setShowFormFunction) => {
    e.preventDefault();
    try {
      const port = apiEndpoint === 'carteira' ? 3003 : 
                  apiEndpoint === 'dolar' ? 3004 : 
                  3005;
      const url = editId ? `http://localhost:${port}/api/${apiEndpoint}/${editId}`
                        : `http://localhost:${port}/api/${apiEndpoint}`;

      const formattedData = {
        ...formData,
        valor_compra: parseFloat(formData.valor_compra),
        quantidade: apiEndpoint === 'carteira' ? parseInt(formData.quantidade, 10)
                                             : parseFloat(formData.quantidade)
      };

      const method = editId ? 'put' : 'post';
      const response = await axios[method](url, formattedData);

      if (response.status === 200 || response.status === 201) {
        const updatedData = await fetchFunction();
        switch (apiEndpoint) {
          case 'carteira':
            setCarteira(updatedData);
            break;
          case 'dolar':
            setDolarInvestments(updatedData);
            break;
          case 'bitcoin':
            setBitcoinInvestments(updatedData);
            break;
          default: 
            break;
        }

        setFormFunction(apiEndpoint === 'carteira' 
          ? { ticker: '', data_compra: '', valor_compra: '', quantidade: '' }
          : { data_compra: '', valor_compra: '', quantidade: '' }
        );
        
        setEditIdFunction(null);
        setShowFormFunction(false);
        alert(editId ? 'Atualizado!' : 'Cadastrado!');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert(error.response?.data?.error || error.message);
    }
  };

  const handleEditAcoes = (acao) => {
    setForm({
      ticker: acao.ticker,
      data_compra: acao.data_compra,
      valor_compra: acao.valor_compra,
      quantidade: acao.quantidade
    });
    setEditId(acao.id);
    setShowFormAcoes(true);
  };

  const handleEditDolar = (investment) => {
    setFormDolar({
      data_compra: investment.data_compra,
      valor_compra: investment.valor_compra,
      quantidade: investment.quantidade
    });
    setEditIdDolar(investment.id);
    setShowFormDolar(true);
  };

  const handleEditBitcoin = (investment) => {
    setFormBitcoin({
      data_compra: investment.data_compra,
      valor_compra: investment.valor_compra,
      quantidade: investment.quantidade
    });
    setEditIdBitcoin(investment.id);
    setShowFormBitcoin(true);
  };

  const totalAcoes = calcularTotal(filtrarCarteira(), 'valor_atualizado');
  const totalDolar = calcularTotal(filtrarDolar(), 'valor_atual');
  const totalBitcoin = calcularTotal(filtrarBitcoin(), 'valor_atual');
  const totalGeral = totalAcoes + totalDolar + totalBitcoin;

  return (
    <div className="app-container">
      <h1 className="titulo-centralizado">Carteira de Investimentos</h1>
      
      <div className="filtros-container">
        <FilterUnified 
          filtro={filtro} 
          setFiltro={setFiltro}
          opcoes={['Todos', 'Ações', 'FIIs', 'Dólar', 'Bitcoin']}
        />
      </div>

      <div className="dashboard-container">
        <div className="cards-column">
          <div className="totais-cards">
            {totalAcoes > 0 && (
              <TotalCard
                titulo="Ações"
                valorAtualizado={formatCurrency(totalAcoes)}
                lucro={formatCurrency(calcularTotal(filtrarCarteira(), 'lucro'))}
                acoes={filtrarCarteira().map(acao => ({
                  ticker: acao.ticker,
                  valorAtualizado: formatCurrency(acao.valor_atualizado),
                  lucro: formatCurrency(acao.lucro)
                }))}
              />
            )}

            {totalDolar > 0 && (
              <TotalCard
                titulo="Dólar"
                valorAtualizado={formatCurrency(totalDolar)}
                lucro={formatCurrency(calcularTotal(filtrarDolar(), 'lucro'))}
                acoes={filtrarDolar().map(d => ({
                  ticker: 'USD',
                  valorAtualizado: formatCurrency(d.valor_atual),
                  lucro: formatCurrency(d.lucro)
                }))}
              />
            )}

            {totalBitcoin > 0 && (
              <TotalCard
                titulo="Bitcoin"
                valorAtualizado={formatCurrency(totalBitcoin)}
                lucro={formatCurrency(calcularTotal(filtrarBitcoin(), 'lucro'))}
                acoes={filtrarBitcoin().map(b => ({
                  ticker: 'BTC',
                  valorAtualizado: formatCurrency(b.valor_atual),
                  lucro: formatCurrency(b.lucro)
                }))}
              />
            )}

            <TotalCard
              titulo="Totais Gerais"
              valorAtualizado={formatCurrency(totalGeral)}
              lucro={formatCurrency(
                calcularTotal(filtrarCarteira(), 'lucro') + 
                calcularTotal(filtrarDolar(), 'lucro') +
                calcularTotal(filtrarBitcoin(), 'lucro')
              )}
              acoes={[{
                ticker: 'Total Investido',
                valorAtualizado: formatCurrency(
                  calcularTotal(filtrarCarteira(), 'valor_investido') + 
                  calcularTotal(filtrarDolar(), 'valor_compra') +
                  calcularTotal(filtrarBitcoin(), 'valor_compra')
                )
              }]}
            />
          </div>
        </div>

        <div className="grafico-container">
          <h2>Distribuição da Carteira</h2>
          <Chart dataBarChart={dataBarChart} />
        </div>
      </div>

      {/* Seção de Ações */}
      <h2>Renda Variável
        <button className="icon-button" onClick={() => setShowFormAcoes(!showFormAcoes)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </h2>
      {showFormAcoes && (
        <Form
          form={form}
          handleChange={(e) => handleChange(e, setForm)}
          handleSubmit={(e) => handleSubmit(
            e, form, setForm, editId, setEditId, fetchCarteira, 'carteira', setShowFormAcoes
          )}
          editId={editId}
        />
      )}
      <Table
        carteira={carteira}
        filtrarCarteira={filtrarCarteira}
        formatDate={formatDate}
        formatCurrency={formatCurrency}
        handleEdit={handleEditAcoes}
        handleDelete={(id) => handleDelete(id, 'carteira', fetchCarteira, setCarteira)}
      />

      {/* Seção de Dólar */}
      <h2>Investimentos em Dólar
        <button className="icon-button" onClick={() => setShowFormDolar(!showFormDolar)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </h2>
      {showFormDolar && (
        <FormDolar
          form={formDolar}
          handleChange={(e) => handleChange(e, setFormDolar)}
          handleSubmit={(e) => handleSubmit(
            e, formDolar, setFormDolar, editIdDolar, setEditIdDolar, fetchDolar, 'dolar', setShowFormDolar
          )}
          editId={editIdDolar}
        />
      )}
      <TableDolar
        investments={dolarInvestments}
        formatDate={formatDate}
        formatCurrency={formatCurrency}
        handleEdit={handleEditDolar}
        handleDelete={(id) => handleDelete(id, 'dolar', fetchDolar, setDolarInvestments)}
      />

      {/* Seção de Bitcoin */}
      <h2>Investimentos em Bitcoin
        <button className="icon-button" onClick={() => setShowFormBitcoin(!showFormBitcoin)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </h2>
      {showFormBitcoin && (
        <FormBitcoin
          form={formBitcoin}
          handleChange={(e) => handleChange(e, setFormBitcoin)}
          handleSubmit={(e) => handleSubmit(
            e, formBitcoin, setFormBitcoin, editIdBitcoin, setEditIdBitcoin, fetchBitcoin, 'bitcoin', setShowFormBitcoin
          )}
          editId={editIdBitcoin}
        />
      )}
      <TableBitcoin
        investments={bitcoinInvestments}
        formatDate={formatDate}
        formatCurrency={formatCurrency}
        handleEdit={handleEditBitcoin}
        handleDelete={(id) => handleDelete(id, 'bitcoin', fetchBitcoin, setBitcoinInvestments)}
      />
    </div>
  );
}

export default App;