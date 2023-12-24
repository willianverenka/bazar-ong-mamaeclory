<script lang="ts">
	import { API_BASE_URL } from "./constants";
    import { goto } from "$app/navigation";
	export let showModal3 : boolean; // boolean
    export let idSelecionado : string;

	let dialog : HTMLDialogElement; // HTMLDialogElement

	$: if (dialog && showModal3) dialog.showModal();

    const deletarPost = async () => {
        const token = localStorage.getItem('token');
        const header = {
            authorization: `Bearer ${token}`
        }
        const resposta = await fetch("https://bazar-mamaeclory.fly.dev/api" + "/posts/" + idSelecionado, {
            method: 'DELETE',
            headers: header,
        })
        if(resposta.status === 204){
            localStorage.setItem('toastr', JSON.stringify({ msg: "Post deletado com sucesso!", tipo: "sucesso" }));
            location.reload();
        }
        else if(resposta.status === 401){
            localStorage.setItem('toastr', JSON.stringify({ msg: "Sessão expirada. Favor entrar novamente", tipo: "erro" }))
            localStorage.removeItem('token');
            goto('/')
        }
        else{
            localStorage.setItem('toastr', JSON.stringify({ msg: "Erro ao deletar post.", tipo: "erro" }))
            location.reload();
        }
    }
</script>

<dialog
	bind:this={dialog}
	on:close={() => (showModal3 = false)}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation class="modal">
		<div id="direita">
			<button id="botao" autofocus on:click={() => dialog.close()}>X</button>
		</div>
		<slot name="header" />
		<h1>Tem certeza?</h1>
        <p id="desc">Nenhum post apagado poderá ser recuperado.</p>
		<slot />
			<div id="direita">
                <button on:click={() => (dialog.close())} id="botao3">CANCELAR</button>
				<button on:click={() => (deletarPost())} id="botao2">EXCLUIR</button>
			</div>

	</div>
</dialog>

<style>
    #desc{
        color: 'black';
    }
	#direita{
		display:flex;
		justify-content: flex-end;
        gap:.5rem;
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
    #botao3{
		background-color: rgb(179, 179, 179);
		color: whitesmoke;
		border-radius: .3rem;
		border: none;
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
