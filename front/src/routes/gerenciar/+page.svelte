<script>
    import { API_BASE_URL } from "../../constants";
    import { onMount } from "svelte";
    import IoIosBuild from 'svelte-icons/io/IoIosBuild.svelte'
    import GoTrashcan from 'svelte-icons/go/GoTrashcan.svelte'
    import ModalEditarPost from "../../ModalEditarPost.svelte";
    import { erro } from "../../toasts"
    import { checarToast } from "../../checarToasts";
    import MdAddCircleOutline from "svelte-icons/md/MdAddCircleOutline.svelte";
    import ModalConfirmarDeletar from "../../ModalConfirmarDeletar.svelte";
    
    let showModal2 = false;
    let showModal3 = false;
    let idSelecionado = '';
    let operacao = '';

    let posts = [];
    onMount(async () => {
        posts = await carregarPosts();
        checarToast();
    });
      const carregarPosts = async() => {
          const rest = await fetch(API_BASE_URL + '/posts');
          const posts = await rest.json();
          return posts;
      }
</script>

{#await carregarPosts()}
<p>Carregando postagens...</p>
{:then posts}
<table>
    <tr>
        <th>Título</th>
        <th>Valor</th>
        <th>Editar</th>
        <th>Apagar</th>
    </tr>
    {#each posts as {titulo, valor, imagem_url, _id}}
    <tr>
        <td>{titulo}</td>
        <td>{valor}</td>
        <td>
            <button on:click={() => {
                showModal2 = true;
                idSelecionado = _id;
                operacao = 'e'
            }}>
                <div class="icon">
                    <IoIosBuild/>
                </div>
            </button>
        </td>
        <td><button on:click={() => {
            showModal3 = true;
            idSelecionado = _id;
            operacao = 'd'
        }}><div class="icon2"><GoTrashcan/></div></button></td>
    </tr>
    {/each}
</table>
{/await}

<ModalEditarPost bind:showModal2 bind:idSelecionado>

</ModalEditarPost>

<ModalConfirmarDeletar bind:showModal3 bind:idSelecionado>

</ModalConfirmarDeletar>

<style>
    button{
        background-color: transparent;
        border: none;
    }
    button:hover{
        cursor: pointer;
    }
    td{
        white-space: nowrap;       /* Prevent text from wrapping */
        overflow: hidden;         /* Hide the overflow */
        text-overflow: ellipsis;  /* Display an ellipsis when text overflows */
        max-width: 47vw;
    }
    table{
        text-align: center;
        width: 50vw;
        margin: 0 auto;
        margin-top: 2vw;
        font-family: 'Poppins', sans-serif;
    }
    td, th{
        border: solid 1px #8a8a8a;
        border-radius: 10px;
        padding: 2px;
    }
    th{
        background-color: #b01b1b;
        color: white;
    }
    .icon{
        width: 1.5rem;
        height: 1.5rem;
        margin: 0 auto;
    }
    .icon:hover{
        color: rgb(211, 211, 24);
    }
    .icon2{
        width: 1.5rem;
        height: 1.5rem;
        margin: 0 auto;
    }
    .icon2:hover{
        color: red;
    }
    a{
        text-decoration: none;
        color: inherit;
    }
</style>

