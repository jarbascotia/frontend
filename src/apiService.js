import axios from 'axios';

export const fetchCarteira = async () => {
  try {
    const response = await axios.get('http://localhost:3003/api/carteira');
    
    const carteiraCompleta = await Promise.all(response.data.map(async (acao) => {
      try {
        const quoteResponse = await axios.get(`http://localhost:3003/api/quote/${acao.ticker}`);
        
        if (!quoteResponse.data.results || quoteResponse.data.results.length === 0) {
          console.warn(`Ticker ${acao.ticker} não encontrado`);
          return {
            ...acao,
            nome: 'Ticker Inválido',
            cotacao_atual: 0,
            valor_investido: acao.quantidade * acao.valor_compra,
            valor_atualizado: 0,
            lucro: - (acao.quantidade * acao.valor_compra)
          };
        }

        const { shortName, regularMarketPrice } = quoteResponse.data.results[0];
        const valorInvestido = acao.quantidade * acao.valor_compra;
        const valorAtualizado = acao.quantidade * regularMarketPrice;
        const lucro = valorAtualizado - valorInvestido;
        
        return { 
          ...acao, 
          nome: shortName,
          cotacao_atual: regularMarketPrice,
          valor_investido: valorInvestido,
          valor_atualizado: valorAtualizado,
          lucro: lucro
        };
        
      } catch (error) {
        console.error(`Erro ao buscar ticker ${acao.ticker}:`, error);
        return {
          ...acao,
          nome: 'Erro na Cotação',
          cotacao_atual: 0,
          valor_investido: acao.quantidade * acao.valor_compra,
          valor_atualizado: 0,
          lucro: - (acao.quantidade * acao.valor_compra)
        };
      }
    }));
    
    return carteiraCompleta;
    
  } catch (error) {
    console.error('Erro ao buscar carteira:', error);
    return [];
  }
};


export const fetchDolar = async () => {
  try {
    const response = await axios.get('http://localhost:3004/api/dolar');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dólar:', error);
    return [];
  }
};

export const addDolar = async (data) => {
  try {
    const response = await axios.post('http://localhost:3004/api/dolar', data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Erro ao salvar');
  }
};

export const fetchBitcoin = async () => {
  try {
    const response = await axios.get('http://localhost:3005/api/bitcoin');
    return response.data; 
  } catch (error) {
    console.error('Erro ao buscar Bitcoin:', error);
    return [];
  }
};

export const addBitcoin = async (data) => {
  try {
    const response = await axios.post('http://localhost:3005/api/bitcoin', data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Erro ao salvar');
  }
};