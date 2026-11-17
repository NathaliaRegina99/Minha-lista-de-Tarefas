
# BUSINESS_RULES.md

## Regras de negócio das tarefas

1. Toda tarefa deve possuir um título.
2. O título da tarefa é obrigatório.
3. A descrição da tarefa é opcional.
4. Toda tarefa deve possuir uma prioridade.
5. As prioridades permitidas são: Baixa, Média e Alta.
6. Toda tarefa deve iniciar com o status Pendente.
7. O usuário pode alterar o status para Concluída.
8. O usuário pode excluir uma tarefa cadastrada.
9. Uma tarefa concluída pode voltar para o status Pendente.
10. As tarefas devem permanecer salvas no navegador utilizando LocalStorage.

## Validações

- Não permitir cadastrar tarefas com título vazio.
- Não permitir prioridades diferentes das opções disponíveis.
- Exibir uma mensagem de confirmação ao cadastrar uma tarefa.
- Exibir uma confirmação antes de excluir uma tarefa.

## Status permitidos

- Pendente
- Concluída

## Resultado esperado

O sistema deve permitir que o usuário organize suas tarefas de maneira simples, mantendo os dados salvos no navegador mesmo após fechar a página.
