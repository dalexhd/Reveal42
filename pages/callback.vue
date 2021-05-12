<template>
	<v-app id="inspire">
		<v-main>
			<v-container fill-height justify-center>
				<div class="max-w-md w-full py-12 px-4 text-center animate-pulse">
					<i class="fas fa-lock pr-3 pb-4 fa-3x"></i>
					<h1 class="text-subtitle-1">Wait... Authentication is processing!</h1>
				</div>
			</v-container>
		</v-main>
	</v-app>
</template>
<script>
export default {
	layout: "admin"
};
</script>
<style scoped>
.auth-message {
	font-family: "Source Sans Pro", helvetica, sans-serif;
	font-weight: normal;
}
</style>
