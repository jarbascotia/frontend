# Dashboard Financeiro

![Diagrama de Arquitetura](./arquitetura.png)

Dashboard para gestão de investimentos em ações, dólar, bitcoin e renda fixa, com visualização de gráficos e totais consolidados.

---

## 📋 Descrição do Projeto
Sistema completo para monitoramento de investimentos, contendo:
- **Ações e FIIs**: Registro de transações e cálculo de rentabilidade
- **Dólar e Bitcoin**: Acompanhamento de cotações em tempo real
- **Dashboard Unificado**: Visualização gráfica da distribuição da carteira
- **API RESTful**: Integração com serviços externos para cotações

---

## 🛠️ Pré-requisitos
- Docker versão 20.10+ 
- Docker Compose versão 2.12+


---

## 🚀 Instalação via Docker

### 1. Clone os repositórios
```bash
git clone https://github.com/jarbascotia/frontend.git
git clone https://github.com/jarbascotia/acoes.git
git clone https://github.com/jarbascotia/dolar.git
git clone https://github.com/jarbascotia/bitcoin.git



---

##  Execute o projeto

cd frontend
docker-compose up --build
