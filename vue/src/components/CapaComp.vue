<template>
    <v-container class="bg pl-10 pt-10">
      <div class="text-h5 font-weight-medium">
        Bem-vindo à Suíte da Fiscalização
      </div>
      <div class="grey--text text-body-2 font-weight-light my-5">
        <div>A Suíte da Fiscalização é uma plataforma integradora da Fiscalização da Receita Federal do Brasil</div>
        <div>baseada em interoperabilidade com uso de inteligência artificial para fiscalização aprimorada de contribuintes</div>
      </div>
      <div class="text-h6 font-weight-medium">
        Escolha a Aplicação que quer utilizar:
      </div>
      <v-row>
        <div class="d-flex justify-start ma-5">          
          <v-card max-width="400" flat to="SecondaryView">
            <!--<v-img :src="require('/src/assets/botao-1.png')" height="150px"></v-img>-->
            <v-card-title>
              SecondaryView
            </v-card-title>
            <v-card-subtitle class="caption">
              Tabela de EFRAUS
            </v-card-subtitle>
          </v-card>
        </div>
      </v-row>
    </v-container>
</template>


<style>
.bg {
  background: url('https://img.freepik.com/fotos-gratis/fundo-branco-elegante-com-linhas-de-ondas-azuis_1017-32741.jpg?w=1060&t=st=1678479362~exp=1678479962~hmac=132a4d19a5d06e5ae31014b50c9b67cb9111f67259e6f5d55b263ec90c128e1a') no-repeat right top;
  background-size: cover;
  background-color: blue;
}

.gray-scale {
  filter: grayscale(100%);
}
</style>