# PROTO - Suite do Contencioso

Autor: Centro de Excelência em Inteligência Artificial - CEIA
Equipe: Jorge Eduardo de Schoucair Jambeiro Filho, Willian Darwin Junior, Patrick Moreira Nogali

Processo de Trabalho:
Julgar impugnações e manifestação de inconformidade.

Descrição do Projeto:
Plataforma para integração de processos de trabalho do contencioso da RFB preparada para uso de aplicações inteligentes (IA).

Elementos do Projeto:
1.	Containers Docker
2.	Autenticação Keycloak
3.	Proxy reverso NGINX
4. 	Backend com FastAPI, Python, MotorAsyncIO
5. 	Frontend com Javascript, Vue.js, Vue.Router, Axios
6. 	Banco de Dados MongoDB (com transição a partir do MariaDB)
7. 	Jupyter Notebook para testes e execuções pontuais

Funcionalidades do Protótipo: 
1.	Rotulação de acórdãos do CARF
2.	Prospecção de uso de inteligência artificial no processo de trabalho do contencioso da RFB, incluindo tratamento de Linguagem Natural (PLN).

Requisitos Essenciais:
1.	Implementação de solução de segurança (autenticação e trilha de auditoria) pela área de tecnologia;
2.	Disponibilização institucional dos dados que serão usados como insumo para o projeto.

Justificativa:
O objetivo estruturante e abrangente é iniciar a formação de cultura, a capacitação de equipe e a preparação de ambiente e infraestrutura para os próximos projetos de racionalização dos processos do Contencioso da RFB com uso de abordagens não-determinísticas e da tecnologia de Inteligência Artificial (IA).
Futuramente, mas não integra a primeira parte do projeto, a plataforma irá receber as aplicações que implementarem processos de trabalho do Contencioso dentro da abordagem por ela proposta, tais como ferramentas de apoio ao julgamento (migração e implementação de julgamentos de baixa complexidade - JAP), às atividades associadas (por exemplo, triagem) e à gestão dos processos de trabalho.



Old version:

# ceiamin
Este é um repositório para exemplificação da estrutura de um projeto do mínimo do CEIA disponível via web

A Inteligência Artifical não flutua. Para ser útil ela tem que se ligar a outros sistemas. Aqui exemplificamos esta ligação usando frameworks típicos de 2020.

Para colocar esta exemplificação em funcionamento você precisa ter um ambiente que possua git e docker instalados.

Uso:

  Vá para o diretório que você deseja que seja o pai deste repositório em sua máquina.
  Digite
  
      git clone https://github.com/JorgeJambeiroFilho/ceiamin
  
  O repositório será clonado em sua máquina
  Digite 
  
      cd ceiamin
  para entrar no repositorio
  
  Para rodar localmente, edite o arquivo frontend/settings.toml e substitua o IP pelo seu IP local nas linhas de [testing]

[OBS_1 do Darwin: vou inserir um script Python no setup.sh para alterar esse endereço automaticamente, mas é bom checar se alterou corretamente]
[OBS_2 do Darwin: se vc for usar dados externos ao docker no repositório clone da sua máquina local, é interessante que o diretório pai do repositório esteja no mesmo drive dos dados (eu ainda não consegui fazer o docker reconhecer drives distintos e a literatura é cética em relação a esse uso do docker; no meu caso, os dados estavam no divre externo E:, então eu clonei o ceiamin também no E:); para indicar no docker-compose.yml "bind mount" de diretório no mesmo drive do repositório, use "../../../" para ir subindo nos diretórios ancestrais até o ramo comum e depois complemente com o path até o diretório de dados (Ex: ../../../DADOS/FILES)]
[OBS_3 do Darwin: planeje a estrutura de dados da sua aplicação e reflita ela no arquivo de configuração "config.ceiamin", assim vc não precisará depois alterar os arquivos de configuração do docker, o script python inserido no setup.sh fará isso automaticamente; os dados internos ao docker (keycloak, bases de dados MariaDB, MongoDB, etc, por padrão ficam em bind mounts dentro da estrutura do docker (vc não precisa se preocupar com eles, basta copiar as bases de dados após a montagem do docker), mas vc pode alterar no docker-compose.yml para apontar para um diretório externo (no mesmo drive); já para os dados externos vc precisa indicar qual o diretório deles por meio da variável DATA_DIR no arquivo "config.ceiamin"; ou seja, se vc usar a configuração padrão, a única variável a ser informada será DATA_DIR no "config.ceiamin"]
  
  Execute o script 
  
      setup.sh    

   para preparar as imagens docker
   
   Execute 
   
        docker-compose up

   para executar a aplicação completa.

[OBS do Darwin: docker-compose up -d permite rodar detached, ou seja, sem prender ao terminal, vc pode sair do terminal que o docker permanece up; para ver as mensagens do "terminal" de cada container, use docker logs <container_name> ou para acessar o "terminal" docker exec -ti <container_name> bash]        
 
   A execuçao vai parar se bater CRTL-C, mas para limpar tudo e poder executar de novo sem problemas digite:

        docker-compose down

Você pode acessar a aplicação usando um navegador pelo endereço https://127.0.0.1/frontend, mas antes terá que criar um usuário e um cliente no esquema de Oauth2. Então leia a seção que fale sobre o Keycloack, nete documento. 

Neste momento, vários containers docker estarão em execução. Eles estao se comunicando como se fossem máquinas separadas.

Temos:

  Um container com o frontend em Python.

      Este container serve a página html inicial, um CSS para configuração do estilo da pagina e o código Javascript da aplicação cliente.
      Como são arquivos estáticos, poderíamos serví-los diretamente pelo container nginx que aparecerá a frente, mas poderíamos aproveitar este container para
      transformar as páginas usando templates. Então devemos deixar este recurso disponível.
      O front end atende a um usuário humano usando navegador.
      O Código Javascript se comunica com o backend e usa vue.js para gerar a interface com o usuário dinamicamente.
      
  Um container com o backend em Python
  
      Este container oferece uma API web. Ela é implementada e documentada com uso de FastAPI. Ele pode ser acessado por qualquer aplicação não relacionado com 
      o presente projeto, mas que decida usar seus serviços.
      Então é um container para atender a maquinas e não a humanos.
      O Javascript servidor pelo frontend e executado no navegador faz chamadas ao backend, geralmente, passando informações em formato JSON e recebendo
      informações em JSON.
      O backend, também tem o papel de broker, dividindo a carga das solicitações entre as instância de IA e comandando estas instâncias para que elas 
      se retreinem quando conveniente.
      
  Três containers com uma IA exemplo
  
      Estes containers são acessados via API pelo backend, ou seja, a comunicação ocorre diretamente entre contaners sem participação da máquina do usuário.
      Tods estes containers fazem a mesma coisa. Eles treinam quando são comandados e respondem a solicitação usuando os modelos treinados quando o backend
      assim o pede.
      A comunicação entre o backend e os container de IA também é feita com uso de FastAPI / JSON.
      Note que um container pode estar treinando enquanto outros atendem a solicitações. O atendimento nunca para.
      As IAs leêm os dados para treinamento acessando o container que tem o BD.
      Os dados processadosa (modelos treinados) são armazenados de modo diferente para cada IA. No exemplo são arquivos simples.
      
  Um container com nginx
  
      O frontend e o backend não devem ser expostos na web, pois não tem todos os recursos de segurança e escalabilidade.
      Em vez disto usamos o servidor nginx como proxy reverso e fazemos com que ele atenda aos usuários e redirecione os pedido para o frontend e o backend.
      O nginx também pode agir como balanceador de nível 4 (rede), por exemplo dividindo a carga entre várias instância do frontend e do backend.
      
      
  Não temos um container com balanceador nível 7, mas podemos ter    
      
      Como o balanceaor de nível 4 divide de solicitações vindas do mesmo usuário entre diferentes instâncias do backend, o backend não pode manter um estado 
      em memória. Tudo é carregado do bd a cada pedido.
      Se for preciso manter um estado em memória para ganhar velocidade no tratamento de pequenas solicitações, como ocorre com chatbots, então é
      preciso ter também um balanceador de nível 7 (aplicação), que lá foi implementado também em Python. O balanceador de nível 7 tem várias instâncias
      que são acionadas alternadamente pelo balanceador de nível 4. Elas redirecionam os pedidos lendo o conteúdo das mensagens para manda o mesmo usuário sempre
      para mesma instância do backend.
      Não colocamos isto no exemplo, mas é bom ter em mente esta possibilidade.
      
  Um container com MongoDB
  
      A medida em que os usuários vão interagindo com o frontend, eles vão gerando dados que precisam ser gurdados em algum lugar.
      Assim, já criamos um banco de dados para ser acessado por todos os outros containers.
      
  Um container com o Keycloak 
  
      O keycloak é um servidor de autenticação Oauth2 / OpenID. As aplicações reais da RFB deverão se autenticar usando o servidor
      da RFB que se chama MosEseley. Ver grupo de interoperabilidade no Teams.
      Para não depender de algo externo, coloquei um servidor de autentiação livre embutido no CEIAMIN, o Keycloak
      
      Antes de usar o CEIAMIN, é preciso fazer alguns cadastros KeyCloak. Acesse:
      
        https://127.0.0.1/auth
      
      e escolha "Administration Console".
            
      O usuário é "admin" e a senha também é "admin"
      
      Se o navegador disser que não é seguro, é porque o certificado é auto assinado. Clique em avançado e diga que assume o risco. Isto é só um exemplo.
      
      No canto superior esquerdo, a uma "combobox" onde está escrito "master". Mova o mouse para cima dela e aparecerá a opção de criar um "Realm".
      
      Crie o rearm "ceiamin".
      
      Dentro do realm "ceiamin", clique em "clients" (na coluna esquerda). Peça para adicionar um cliente e crie o cliente com
       
        name: "ceiamin" 
        root url: https://127.0.0.1/frontend
        
      Achei a aba de setting deste cliente e adicione uma "valid redirect url"
      
        https://127.0.0.1/frontend/*
        
      Clique em "save" na parete de baixo da página.
      
      De novo na coluna esqueda, clique em "users". Adicione um usuário para você. Escolha o nome que quiser e ponha no campo "user name".
      
      Clique em save.
      
      Acesse o ceiamion via 
      
        https://127.0.0.1/frontend      
