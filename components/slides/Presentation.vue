<template>
	<section>
		<section>
			<h2>Buenas tardes 😄</h2>
		</section>
		<section data-auto-animate>
			<h1>Antes de nada...</h1>
		</section>
		<section data-auto-animate>
			<h1>Antes de nada...</h1>
			<img
				class="r-frame"
				height="400"
				data-src="@/assets/img/los-payasos-de-la-tele.gif"
				alt="Payasos de la tele"
			/>
			<aside v-if="$auth.hasRole('presenter')" class="notes">
				Shhh, these are your private notes 📝
			</aside>
		</section>
		<section data-auto-animate>
			<h1>¿Quién soy?</h1>
		</section>
		<section data-auto-animate>
			<aside v-if="$auth.loggedIn" class="notes">Nombre, Años, Trabajo</aside>
			<h1>¿Quién soy?</h1>
			<img data-src="@/assets/img/avatar.jpeg" alt="Yo" height="150" />
			<p class="fragment fade-in-then-semi-out">Me llamo Alex Borbolla</p>
			<p class="fragment fade-in-then-semi-out">Tengo 21 años</p>
			<p class="fragment fade-in-then-semi-out">
				Trabajo como desarrollador web fullstack
			</p>
		</section>
		<section>
			<aside v-if="$store.state.intra.loggedIn" class="notes">
				Autodidacta, reddit, ❤️ Open source, nuevas tecnologías, rata
			</aside>
			<h1>¿Cosas sobre mi?</h1>
			<p class="fragment fade-in-then-semi-out">📚 Autodidacta 90%</p>
			<p class="fragment fade-in-then-semi-out">Amante de reddit 👀</p>
			<p class="fragment fade-in-then-semi-out">❤️ Open source</p>
			<p class="fragment fade-in-then-semi-out">
				Adicto a descubrir nuevas tecnologías 🤯
			</p>
			<p class="fragment fade-in">😂 No soy rata, pero si me gusta ahorrar</p>
		</section>
	</section>
</template>
