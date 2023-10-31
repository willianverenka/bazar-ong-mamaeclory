<script>
  import { onMount } from "svelte";
  import ModalCriarPost from "../ModalCriarPost.svelte";
  import ModalLogin from "../ModalLogin.svelte";
  import { sucesso, aviso, erro } from '../toasts';
  import { API_BASE_URL } from '../constants';
  import MdAddCircleOutline from 'svelte-icons/md/MdAddCircleOutline.svelte'
  import IoIosColorWand from 'svelte-icons/io/IoIosColorWand.svelte'

  let isAuthenticated = false;
  let showModal = false;
  let showModal2 = false;
  let posts = [];
  onMount(async () => {
      posts = await carregarPosts();
      localStorage.setItem("teste", JSON.stringify(posts))
      //console.log("posts", posts)
      //console.log(localStorage.getItem("teste"))
      if(localStorage.getItem('token')){
        isAuthenticated = true;
      }
      const toastr = localStorage.getItem('toastr')
      if(toastr){
        const { msg, tipo } = JSON.parse(toastr);
        switch(tipo){
          case "sucesso":
            sucesso(msg);
            break;
          case "erro":
            erro(msg);
            break;
          case "aviso":
            aviso(msg);
            break;
      }
      localStorage.removeItem('toastr');
  }
});

    const carregarPosts = async() => {
        const rest = await fetch(API_BASE_URL + '/posts');
        const posts = await rest.json();
        localStorage.setItem('fetchConteudo', posts);
        return posts;
    }
</script>

{#if isAuthenticated}
<div class="cont">
<button id="botao" on:click={() => (showModal2 = true)}><div class="icon"><MdAddCircleOutline /></div>Novo post</button>
<a href="/gerenciar"><button id="botao"><div class="icon"><IoIosColorWand /></div>Gerenciar posts</button></a>
</div>
  <ModalCriarPost bind:showModal2>
  </ModalCriarPost>
{/if}

{#if !isAuthenticated}
<button on:click={() => (showModal = true)}> ENTRAR </button>
<ModalLogin bind:showModal>
</ModalLogin>
{/if}

{#await carregarPosts()}
<p>Carregando postagens...</p>
{:then posts}
<div class="wrapper-grid">
    {#each posts as {titulo, valor, imagem_url, _id}}
    <div class="container">
      <h1 class="name">{titulo}</h1>
        <img src={imagem_url} class="profile-img" alt={titulo}>
      <p class="description">R${valor}</p>
    </div>
    {/each}
</div> 
{/await}

<style>
  :global(a){
    color: inherit;
    text-decoration: none;
  }
  :global(body){
    margin: 0;
  }
  .cont{
    width: 100%;
    display: flex;
    justify-content: center;
  }
  *{
    font-family: 'Poppins', sans-serif;
    box-sizing: border-box;
    padding: 0;
  }

  .wrapper-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 20rem);
  justify-content: center;
  gap: 2rem;
}

.icon{
  color: rgb(159, 14, 14);
  width: 2rem;
  height: 2rem;
}

#botao{
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  gap: .2rem;
  margin: 1rem;
}

#botao:hover{
  cursor: pointer;
  color: rgb(159, 14, 14);
}

.container {
  border: solid 3px;
  border-color: rgb(98, 30, 30);
  box-shadow: 12px 12px rgb(190, 74, 74);
  background-color: white;
  text-align: center;
  position: relative;
  margin: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profile-img {
  width: 80%;
  height: 60%;
  border-radius: .3rem;
}

.name {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-weight: bold;
  font-size: 1.5rem;
}

.description {
  padding: 8px;
  margin: 1rem 2rem;
  font-size: 1.3rem;
}

</style>