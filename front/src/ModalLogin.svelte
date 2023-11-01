<script lang="ts">
	import { erro } from "./toasts"
	import { API_BASE_URL } from "./constants";

	export let showModal : boolean; // boolean

	let dialog : HTMLDialogElement; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();

	let username : string;
	let password : string;

	const tentarLogin = async () => {
		const resposta = await fetch(API_BASE_URL + "/login", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({
				username: username,
				password: password
			})
		})
		if(resposta.ok){
			const data = await resposta.json();
			localStorage.setItem('token', data.token)
			localStorage.setItem('toastr', JSON.stringify({ msg: "Logado com sucesso!", tipo: "sucesso" }))
			location.reload();
		}
		else{
			erro("Usuário ou senha inválidos.")
		}
	}
</script>

<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation class="modal">
		<div id="direita">
			<button id="botao" autofocus on:click={() => dialog.close()}>X</button>
		</div>
		<h1>Login</h1>
		<hr />
		<form on:submit={tentarLogin}>
			<div class="form">
			<input type="text" placeholder="Usuario" id="input" bind:value={username}>
			<input type="password" placeholder="Senha" id="input" bind:value={password}>
		</div>
		<hr />
			<div id="direita">
				<button id="botao2">ENTRAR</button>
			</div>
		</form>
	</div>
</dialog>

<style>
	#direita{
		display:flex;
		justify-content: flex-end;
	}
	#input{
		margin-top: 5px;
		margin-bottom: 5px;
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
