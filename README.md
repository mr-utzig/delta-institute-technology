![1687925237053](https://file+.vscode-resource.vscode-cdn.net/home/luiz.utzig%40messem.local/Documents/dev/dit/image/README/1687925237053.png)

# DIT - Delta Institute of Technology (Cadastro de alunos)

[Acesse a Delta IT](http://deltait.lutzig.com/)

### Configuração do ambiente:

* Renomeie o arquivo dentro da pasta *backend* *.env-exemple* para *.env:* `$ mv backend/.env-exemple backend/.env`
* Execute os *containers*: `$ docker compose up -d`
* Acesse o *terminal* no container responsável pelo *backend*: `$ docker compose exec -it backend bash`
* Execute o seguite script: `$ cd backend && php spark migrate && mkdir public/assets/img/students && exit`
  * `cd backend`: Acessa a pasta com o código fonte do projeto backend.
  * `php spark migrate`: Executa as migrations no banco de dados.
  * `mkdir public/assets/img/students`: Cria a pasta onde será salvo as fotos dos alunos.
  * `exit`: Encerra o processo do bash no container.
* Após isso é só acessar o [Link](http://127.0.0.1/8080).

### Tomada de decisões:

* Arquitetura: Optei por um monolito por ser mais fácil de gerenciar (em projetos pequenos) e tambem por ser mais barato na hora do deploy.
* Ambiente: Escolhi criar tudo em container pois fica mais fácil a distribuição do projeto, além de não ter de se preocupar com questões como versão de linguagem ou framework.
* PNPM: Por ser mais rápido que yarn e npm.
* Vite: Por ter uma melhor performance que o CRA.
* Tailwindcss: Por ser extremamente fácil de usar.

### Melhorias:

* Melhorar o tratamento de erros tanto no back quanto no front.
* Automatizar o build dos containers.
* Tratamento e validação dos inputs.
