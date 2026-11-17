# ARCHITECTURE.md

## Visão geral

O projeto Minha Lista de Tarefas será uma aplicação web para organizar tarefas do dia a dia.

A aplicação permitirá cadastrar, visualizar, concluir e excluir tarefas.

## Estrutura do projeto

text
Minha-Lista-de-Tarefas/
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── STACK.md
│   ├── BUSINESS_RULES.md
│   └── SPEC.md
│
├── index.html
├── style.css
└── script.js


## Responsabilidades dos arquivos

- index.html: responsável pela estrutura da página.
- style.css: responsável pela aparência visual.
- script.js: responsável pelas funcionalidades e manipulação das tarefas.
- docs/: contém os documentos de especificação do projeto.

## Fluxo de funcionamento

1. O usuário acessa a aplicação pelo navegador.
2. O HTML apresenta a interface.
3. O CSS aplica os estilos visuais.
4. O JavaScript controla as tarefas.
5. O usuário pode cadastrar, concluir e excluir tarefas.

## Dependências e organização

- O HTML carrega o CSS e o JavaScript.
- O Bootstrap auxilia na construção da interface.
- O JavaScript controla as funcionalidades da aplicação.
- A aplicação será executada diretamente no navegador.

## Padrão arquitetural

Será utilizada uma arquitetura simples, com separação entre estrutura, apresentação e lógica da aplicação.