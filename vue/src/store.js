import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Defina o estado inicial aqui
    conjuntoCorrente: null,
    processoCorrente: null,
    documentoCorrente: null,
    agrupamentoCorrente: null,
    parentNodeCorrente: null,
    contador: null,
    selectedTabIndex: 0, // Mantém o índice da aba selecionada
    usuario: null, // Armazenará o nome do usuário e o CPF
  },
  mutations: {
    // Defina as mutações para alterar o estado aqui
    setConjuntoCorrente(state, conjunto) {
        state.documentoCorrente = null;
        state.processoCorrente = null;
        state.conjuntoCorrente = conjunto;
      },
    setProcessoCorrente(state, processo) {
        state.documentoCorrente = null;
        state.processoCorrente = processo;
      },
    setDocumentoCorrente(state, documento) {
        state.documentoCorrente = documento;
      },
    setAgrupamentoCorrente(state, documento) {
        state.agrupamentoCorrente = documento;
      },
    setParentNodeCorrente(state, documento) {
        state.parentNodeCorrente = documento;
      },
    setContador(state, documento) {
        state.contador = documento;
      },
    setSelectedTabIndex(state, index) {
        state.selectedTabIndex = index;
      },
    setUsuario(state, usuario) {
        state.usuario = usuario;
      },
  },
  actions: {
    async verificarHashes({ commit }, { usuario_hash, cpf_hash }) {
      try {
        var backprefix = process.env.VUE_APP_BACKPREFIX;
        const response = await axios.get(backprefix+`/backend/hashes/verificar-hash/`, { params: { usuario_hash, cpf_hash } });

        if (response.data.valido) {
          // Se os hashes forem válidos, salva os dados do usuário no estado
          commit('setUsuario', { 
            nomeUsuario: response.data.nome_usuario, 
            cpf: response.data.cpf,
            usuarioHash: usuario_hash,
            cpfHash: cpf_hash,
          });
        } else {
          throw new Error('Hashes inválidos');
        }
      } catch (error) {
        console.error('Erro na verificação dos hashes:', error);
        throw error; // Lança o erro para ser tratado mais tarde
      }
    }
  },
  getters: {
    // Getters para acessar o estado
    conjuntoCorrente: state => state.conjuntoCorrente,
    processoCorrente: state => state.processoCorrente,
    documentoCorrente: state => state.documentoCorrente,
    agrupamentoCorrente: state => state.agrupamentoCorrente,
    parentNodeCorrente: state => state.parentNodeCorrente,
    contador: state => state.contador,
    selectedTabIndex: (state) => state.selectedTabIndex,
    usuario: state => state.usuario
  }
});