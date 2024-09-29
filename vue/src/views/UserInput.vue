<template>
    <div>
      <h1>Entrar com Usuário e CPF</h1>
      <form @submit.prevent="submitForm">
        <input v-model="nomeUsuario" placeholder="Nome do Usuário" />
        <input v-model="cpf" placeholder="CPF" />
        <button type="submit">Enviar</button>
      </form>
    </div>
  </template>
  
  <script>
    export default {
    data() {
      return {
        nomeUsuario: '',
        cpf: '',
      };
    },
    methods: {
      async submitForm() {
        const backprefix = process.env.VUE_APP_BACKPREFIX;
        const urlBackend = backprefix + '/backend/hashes/obter-url-por-hash/';
  
        try {
          const response = await fetch(urlBackend, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nomeUsuario: this.nomeUsuario, cpf: this.cpf }),
          });
  
          if (!response.ok) throw new Error('Erro ao processar a requisição');
  
          const data = await response.json();
  
          // Redireciona o usuário para a URL com os hashes
          window.location.href = data.url;
        } catch (error) {
          console.error('Erro ao enviar dados:', error);
          alert('Falha ao obter URL. Por favor, tente novamente.');
        }
      },
    },
  };
  </script>
  