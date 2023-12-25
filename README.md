# Projeto Bazar MamaeClory
Este foi um projeto desenvolvido para a [ONG Lar da Mamãe Clory](https://mamaeclory.org.br/), situada em São Bernardo do Campo, São Paulo. 

## [O SITE](https://bazar-mamaeclory.vercel.app/)

## Problema 
Após conversar com assistentes sociais e funcionários da ONG, foi possível mapear que um dos principais problemas que a instituição enfrenta é a dificuldade na obtenção de recursos. Com isso em mente, foi acordado o desenvolvimento de uma plataforma para a divulgação dos itens do bazar e do sebo local.

## A proposta
A princípio, o web app deveria ser construído em volta de dois pilares: a autonomia e a economia de recursos. 
- Autonomia:
    - A empresa não tem nenhum funcionário que opera na área de T.I, então deve ser um site simples e mantível por pessoas com pouco ou nenhum conhecimento ténico.
- Recursos:
    - Apesar de ter a opção de propor um plano com servidores pagos, o orçamento seria bem limitado.

## A solução
Pensando na autonomia, foi pensado em uma interface simples e intuitiva para um funcionário poder ser autenticado e gerenciar os posts, que devem conter um título descritivo do objeto que estão vendendo, assim como seu valor.
Em relação aos recursos, foram utilizados apenas serviços gratuitos para hospedar a aplicação, isentando o Lar de cobranças. 

## Stack
Dentro das limitações pro projeto, o stack escolhido foi:
- NodeJS (rodando no fly.io);
- Svelte (rodando no vercel);
- MongoDB Atlas;

### Dependências
- [Express](https://www.npmjs.com/package/express)
- [Imgur API (lib externa)](https://www.npmjs.com/package/imgur)
- [CORS](https://www.npmjs.com/package/cors)
- [Multer](https://www.npmjs.com/package/multer)
