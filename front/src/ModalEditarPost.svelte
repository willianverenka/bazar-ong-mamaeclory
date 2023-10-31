<script lang="ts">
	import { API_BASE_URL } from "./constants";
    import { erro, sucesso } from "./toasts"
	export let showModal2 : boolean; // boolean
    export let idSelecionado : string;

	let dialog : HTMLDialogElement; // HTMLDialogElement

	$: if (dialog && showModal2) dialog.showModal();
	let titulo = '';
    let valor = 0;

    const enviarPostEditado = async () => {
        console.log("enviarpost", titulo, valor)
        const token = localStorage.getItem('token');
        const header = {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        }
        const resposta = await fetch(API_BASE_URL + "/posts/" + idSelecionado, {
            method: 'PUT',
            body: JSON.stringify({
                titulo: titulo,
                valor: valor
            }),
            headers: header,
        })
        if(resposta.ok){
            sucesso("Post editado com sucesso! Recarregando em 3 segundos")
            dialog.close();
            setTimeout(() => {
                location.reload();
            }, 3000)
        }
        else{
			// localStorage.setItem('toastr', JSON.stringify({msg: "Sua sessão expirou. Favor entrar novamente.", tipo: "erro"}));
			// localStorage.removeItem('token');
			// location.reload();
        }
    }
</script>

<dialog
	bind:this={dialog}
	on:close={() => (showModal2 = false)}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation class="modal">
		<div id="direita">
			<button id="botao" autofocus on:click={() => dialog.close()}>X</button>
		</div>
		<slot name="header" />
		<h1>Editar post</h1>
		<hr />
		<form on:submit={enviarPostEditado}>
			<div class="form">
				<input type ="text" placeholder="Título" id="titulo" bind:value={titulo}>
				<input type ="number" placeholder="Valor" id="valor" bind:value={valor}>
			</div>
		<slot />
		<hr />
			<div id="direita">
				<button id="botao2">ENVIAR</button>
			</div>
		</form>
	</div>
</dialog>

<style>
	#direita{
		display:flex;
		justify-content: flex-end;
	}
	.form{
		display: flex;
		justify-content: center;
		flex-direction: column;
		max-width: 100%;
		gap:.4rem;
	}
	.modal{
		text-align: center;
		color: rgb(159, 14, 14);
	}
	*{
		font-family: 'Poppins', sans-serif;
	}
	#botao2{
		background-color: rgb(159, 14, 14);
		color: whitesmoke;
		border-radius: .3rem;
		border: none;
	}
	#botao{
		background-color: transparent;
		border: none;
		font-weight: bold;
		font-size: 1.5rem;
	}
	#botao:hover{
		cursor: pointer;
	}
	dialog {
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
