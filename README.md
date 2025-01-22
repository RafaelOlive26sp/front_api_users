# Documentação do Front-End

## 📋 Visão Geral

**Nome do Projeto:** [DashBoard - Admin]  
**Descrição:** [O Administrador e os Atendentes, terão acesso ao DashBoard, onde podem alterar contas registradas, visualizar informações sobre usuários e demais funcionalidades administrativas]  
**Tecnologias Utilizadas:**
- [Vue.js (3)]
- [Vuex (4.0.2)]
- [Axios (1.7.9)]
- [js-cookie (3.0.5)]
- [Bootstrap (5.3.3)]
- [Bootstrap-icons (1.11.3)]

## 🚀 Configuração do Ambiente

### Pré-requisitos

- **Node.js** (versão recomendada: [v22.11.0])
- **Gerenciador de pacotes:** [NPM]

### Passos para Instalação

1. Clone o repositório:
    ```bash
    git clone [https://github.com/RafaelOlive26sp/front_api_users.git]
    ```

2. Acesse o diretório do projeto:
    ```bash
    cd [nome-do-diretório]
    ```

3. Instale as dependências:
    ```bash
    npm install
    ```

4. Execute o projeto:
    ```bash
    npm run dev
    ```

## 📂 Estrutura de Pastas

```
src/
├── assets/        # Arquivos estáticos como imagens, ícones, etc.
├── components/    # Componentes reutilizáveis
│   ├── Card/      # Componentes de Card
│   ├── icons/     # Componentes de Ícones
│   ├── menuNavBars/ # Componentes de Menu e Nav-Bars
│   ├── Paginas    # Componentes de Páginas de cada sessão da aplicação 
│   ├── PlaceHoldersLoading # Componentes de PlaceHolder para as páginas
│   ├── CollapesView.vue
│   └── ModalView.vue
├── directives/    # Diretivas personalizadas do Vue.js
│   └── tooltips.js # Diretiva para tooltips do Bootstrap
├── router/        # Configuração de rotas
│   └── index.js   # Arquivo principal de configuração de rotas
├── services/      # Comunicação com APIs
│   └── api.js     # Arquivo de configuração das chamadas de API
├── store/         # Configuração do Vuex
│   ├── modules/   # Módulos do Vuex
│   │   ├── auth.js # Módulo de autenticação
│   │   └── user.js # Módulo de usuário
│   └── index.js   # Arquivo principal de configuração do Vuex
├── views/         # Páginas completas (ex.: Home, Login, etc.)
│   ├── DashboardView.vue/  # Página inicial do DashBoard
│   └── loginView/ # Página de login

```

## 🛠️ Funcionalidades Implementadas

- [Descreva cada funcionalidade principal]
- **Exemplo:**
    - Autenticação: Login, Logout, Registro de Usuários
    - Painel de Controle: Exibição de estatísticas e gráficos
    - Sistema de Tickets: Criação e gerenciamento de tickets

