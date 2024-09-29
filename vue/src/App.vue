<template>
  <v-app>
    <v-app-bar color="#00205B" dark flat clipped-left app>
      <v-app-bar-nav-icon>
        <v-btn :key="CaligrafiaView" icon to="CaligrafiaView">
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </v-app-bar-nav-icon>
      <v-row align="center">

        <v-toolbar-title color="white" class="ml-10">
          Suíte da Fiscalização

          <span v-if="conjuntoCorrente">
            \
            <span class="text-caption text-left font-weight-light hoverable" @click="mudarAba(0)">
              {{ conjuntoCorrente.nomeDoConjunto }}
            </span>
          </span>

          <span v-if="processoCorrente">
            \
            <span class="text-caption text-left font-weight-light hoverable" @click="mudarAba(1)">
              {{ processoCorrente.numeroDoProcesso }}
            </span>
          </span>

          <span v-if="documentoCorrente">
            \
            <span class="text-caption text-left font-weight-light hoverable" @click="mudarAba(2)">
              {{ documentoCorrente.uniqueID }}
            </span>
          </span>

          <span v-if="agrupamentoCorrente">
            \
            <span class="text-caption text-left font-weight-light hoverable" @click="mudarAba(4)">
              {{ agrupamentoCorrente.agrupamento_name }}
            </span>
          </span>

          <!-- <span v-if="parentNodeCorrente">
            \
            <span class="text-caption text-left font-weight-light">
              {{ parentNodeCorrente }}
            </span>
          </span> -->

        </v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- <div v-if="contador" class="text-caption text-left font-weight-light mx-5">
          <v-row align="center">
            {{ contador }} 
            | Mín: {{ (minTime / 1000).toFixed(3) }}s
            | Méd: {{ (avgTime / 1000).toFixed(3) }}s
            | Máx: {{ (maxTime / 1000).toFixed(3) }}s
            | Atual: {{ (lastTime / 1000).toFixed(3) }}s
          </v-row>
        </div> -->

        <!-- Aciona Contágil na Tabela -->
        <!-- <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon @click="confirmaContagil">
              <v-icon class="ml-5">
                mdi-swap-vertical-bold
              </v-icon>
            </v-btn>
          </template>
<span>Acionar Contágil para baixar PDFs</span>
</v-tooltip> -->

        <!-- DialgBox: Aciona Contágil no Menu -->
        <!-- <v-dialog v-model="contagilDialog" max-width="300px">
          <v-card>
            <v-card-title class="headline">
              Acionar o Contágil
            </v-card-title>
            <v-card-text>
              Quer acionar o Contágil para atualizar a base de dados?
            </v-card-text>
            <v-card-actions>
              <v-btn color="error" text @click="acionaContagil">Confirma</v-btn>
              <v-btn text @click="cancelaContagil">Cancela</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog> -->

        <!-- Upload -->
        <!-- <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" :key="UploadView" icon to="UploadView">
              <v-icon>
                mdi-upload-multiple
              </v-icon>
            </v-btn>
          </template>
          <span>Upload de Palavras-Chave e PDFs</span>
        </v-tooltip> -->

        <div class="ml-5">
          <v-btn :key="SobreView" icon to="SobreView">
            <v-icon class="gray--text">mdi-account</v-icon>
          </v-btn>
        </div>
        <div class="text-caption gray--text text-left font-weight-light mx-5">
          {{ usuario.nomeUsuario }}
      </v-row>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <router-view></router-view>
    </v-main>

  </v-app>
</template>

  <script>
  import { mapGetters } from 'vuex';
  // import axios from "axios";
  // const backprefix = process.env.VUE_APP_BACKPREFIX;
  // let url = backprefix + '/backend/config';

  export default {

    name: 'app',

    computed: {
      // Obtém as informações armazenadas na store
      ...mapGetters([
        'conjuntoCorrente',
        'processoCorrente',
        'documentoCorrente',
        'agrupamentoCorrente',
        'parentNodeCorrente',
        'usuario'
      ]),
    },
    data() {
      return {
        contador: 0,
        intervalId: null, // Usado para armazenar a referência do setInterval
        maxTime: 0,
        minTime: Infinity,
        avgTime: 0,
        lastTime: 0,
        totalResponses: 0,
        totalTime: 0,
      };
    },
    // mounted() {
    //   // Inicia a chamada automática quando o componente é montado
    //   // this.intervalId = setInterval(this.incrementCounter, 1000);
    // },
    created() {
      document.title = "CEIA";
      document.body.style.zoom = "67%";
    },
    // beforeDestroy() {
    //   if (this.intervalId) {
    //     clearInterval(this.intervalId);
    //   }
    // },
    methods: {
      acionaContagil() {
        window.location.href = "contagil://CEIA-upload-PDF/" +
          "?usuarioHash=" + this.usuario.usuarioHash +
          "&cpfHash=" + this.usuario.cpfHash;
        this.contagilDialog = false;
      },
      confirmaContagil() {
        this.contagilDialog = true;
      },
      cancelaContagil() {
        this.contagilDialog = false;
      },
      mudarAba(value) {
        this.$store.commit('setSelectedTabIndex', value);
      },
      // incrementCounter() {
      //   const startTime = Date.now();
      //   axios.get(url)
      //     .then(() => {
      //       const elapsedTime = Date.now() - startTime;
      //       this.contador++;
      //       this.lastTime = elapsedTime;
      //       this.totalResponses++;
      //       this.totalTime += elapsedTime;

      //       // Atualiza o tempo máximo e mínimo
      //       if (elapsedTime > this.maxTime) this.maxTime = elapsedTime;
      //       if (elapsedTime < this.minTime) this.minTime = elapsedTime;

      //       // Calcula o tempo médio
      //       this.avgTime = this.totalTime / this.totalResponses;

      //     })
      //     .catch(error => {
      //       console.error("Erro na chamada Axios:", error);
      //     });
      // },
    }
  }
</script>

  <style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap");
  @import url("https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css");
  @import "./assets/styles/main.scss";

  .hoverable:hover {
    text-decoration: underline;
    /* Adiciona sublinhado ao passar o mouse */
  }
</style>