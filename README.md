
![SushiFamily](src/assets/logo2.svg)

# Sushi Family ![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
#### POC Delivery com scroll e todos componentes tratados pelo gesto do usuário.

Sushi Family ainda é uma base de aplicação em desenvolvimento, consome uma API REST rodando NodeJs e base de dados MongoDB.  
Os usuários e requisições são tratadas usando express no backend com uma rota estática para imagens.
Podendo o dono da aplicação atualizar seus pratos, preços e acompanhar o fluxo de pedidos numa aplicação de administrador no Website da cozinha.

### Bibliotecas utilizadas:

- @react-native-community/async-storage: ^1.5.1
- axios: ^0.19.0
- react: 16.8.3
- react-native: 0.59.5
- react-native-gesture-handler: ^1.3.0
- react-native-svg: ^9.5.1
- react-native-svg-transformer: ^0.13.0
- styled-components: ^4.3.1

Nos Gifs eu não apresento a tela de cadastro mas existe a lógica de cadastro de um novo usuário, rotas na API para criar usuário, excluir usuário, alterar usuário, como também as rotas de novo prato, excluir... etc.  

## Chegando agora
### No cart fica uma tela de bem vindo com alguma mensagem ou informação a ser passada ao cliente

![](assets/readme/BemVindo.gif)

Essa tela é tratada pra quando houver nenhum pedido não ter elementos vazios na tela e informações desnecessárias.  
No scroll de pedidos controlados pelo gesto do usuário tem animações do cart vermelho atrás e também nas imagens, por motivos de desempenho são carregadas apenas 3 imagens por iteração nos itens da lista, no caso é carregado apenas o item **anterior** < **atual** > **próximo** fazendo a animação mais leve e deixando uma sensação de paginação, trazendo pro usuário um conforto maior não tendo necessidade de alinhar os itens a tela e dando tempo dos componentes serem atualizados com novas iterações e estado da aplicação.
>Componentes que não teve alterações no seu estado não são renderizados novamente usando **shouldComponentUpdate** na construção da classe.

Importante dizer que dentro do contêiner branco no cart de pedidos feitos, tem um resumo por categorias e seus preços referente como:
#### Sushi
- Hossomaki
- HotRoll
- Joy
- Niguiri
- Temaki
- Uramaki
#### Pratos Especiais
- Carpaccio
- Seviche
- Massa
- Sashimi
- Sunomono
- TarTar
#### Combinados
- 20 peças
- 30 peças
- 40 peças
- 50 peças
- 60 peças
#### Bebidas
- Cerveja
- Refrigerante
- Suco
- Água  

E dentro dessas categorias tem um moooonte de pratos, e pode ter infinitos pratos, o scroll ta preparado para saber onde deve começar e onde deve parar fazendo uma contagem de itens recebidos da API, o usuário vai estar sempre atualizados com pratos novos, aliás, já existe 62 itens no Banco de Dados remoto.

## Realizando alguns pedidos e conhecendo o **Super Rolador Blastoso Poderoso**

###### Apelidei ele assim, mas ok, vamos lá

![](assets/readme/AdcPedido.gif)

Como deu pra perceber o scroll também "sabe" quando acontece um acidente e retorna pra sua posição, tem um limite pra engatilhar a animação, digamos que ele cancela a iteração e intende que o usuário não queria ter rolado a página.

Itens novos são acumulados em outro scroll não menos inteligente, ele "intende" que os itens estão saindo pra fora da tela mas opa, como eu vou acompanhar o que eu esto pedindo?! Ainda bem que o Componente sabe me intender e antecipa isso pra min kk.

![](assets/readme/ScrollAdc.gif)

Observem o scroll com seus pedidos te ajudando a comer Sushi. E o **Super Rolador Blastoso Poderoso** não fica atrás não, ele sabe quantos itens você já rolou pela tela e volta ao inicio do scroll quando você mudar a categoria de pratos, pensa que chato mudar de categorias e ficar perdido não sabendo onde está?! Melhor começar do começo não é mesmo?

Pros amantes de cerveja infelizmente não tenho aqui **Cervejas artesanais** indicadas pra Sushi, mas a API está preparada pra receber novos pratos, e o usuário não precisa fazer nada, abriu o aplicativo viu o novo prato.
>Se por necessidade o cliente quiser ordenar essas categorias e controlar o que vai ser apresentado primeiro e o que por último, pode ser implementado no servidor, já existe um algorítimo com regras que une esses pratos em categorias antes de entregar pro usuário.

![](assets/readme/AdcCerveja.gif)

A eu amei quando a cerveja deu esse efeito 3D, nas garrafas principalmente. E se depois de pedir tanto Sushi, tanta cerveja vem um parente querendo mudar o pedido, e agora, pede pro garçom cancelar e começa pedir tudo de novo? Faz aquela bagunça da cabeça dele? Nãão, da pra excluir os itens do carrinho de um jeito facilzinho, da tempo de resolver tranquilo com aquele tio que não sabe o que quer comer com tanto tipo de Sushi na frente dele.

Só apertar no botão de diminuir na lista de pedidos, se tiver mais de um items daquele tipo, vai apenas diminuir na contagem, quando chegar em zero o item é excluído do carrinho.

![](assets/readme/RemCarr.gif)

Mesmo excluindo o scroll não deixa o ultimo item de fora da tela, você não pode esquecer que tem mais itens no carrinho, depois que ele diminui a um tamanho que caiba na tela ele não toma mais nenhuma decisão por você.

No resumo de pedidos da pra saber quantas cervejas, quantos de quais tipos de Sushi, talvez não precise de taaanto niguiri, então vamos tirar alguns niguiri de peixe branco, e esse tanto de cerveja, muito ou pouco em? Olha aqui! Não tem refrigerante, não esquecer das crianças!

## Indo um pouco mais avançado
Quero mostrar o **Super Rolador Blastoso Poderoso** no inicio e no final da lista.
Depois de uma contagem de itens, cálculos de tamanhos, items rolados e uma vontade de ter mais Sushi pra pedir kk o scroll "sabe" que infelizmente acabou, você pediu todos que tinha, e dá nisso!

![](assets/readme/TratScroll.gif)

##### Querer nunca é poder né!

Esse foi o aplicativo de Sushi ainda não acabado, só precisa de funções básicas pra ele como **alterar meu endereço**, **excluir minha conta** entre outros. São funções básicas que podem ser implementadas a qualquer momento, já fiz pensando e preparado pra isso, por enquanto é uma **Prova de Conceito**, se um cliente se interessar e achar bacana essa abordagem é a hora de finalizar o projeto com mais algumas exigências e preferências do cliente.  

Bruno França

# Contatos
[**Facebook**](https://www.facebook.com/BrunoFrancaM)  
[**Github**](https://www.github.com/Tesse-rato)  
[**Linkedin**](https://www.linkedin.com/in/bruno-frança-2799b1166)  
[**Instagram**](https://www.instagram.com/salve_franca/)
