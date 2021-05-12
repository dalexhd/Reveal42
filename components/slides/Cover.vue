<template>
	<section>
		<section
			data-auto-animate
			data-auto-animate-easing="cubic-bezier(0.770, 0.000, 0.175, 1.000)"
		>
			<div data-id="box-42-logo-1">
				<a
					href="https://www.42madrid.com/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src="@/assets/img/42logo.png"
						alt="42 Madrid logo"
						class="demo-logo"
					/>
				</a>
			</div>
			<h3>
				Herramientas para ser un estudiante más productivo sin que nuestra
				cartera sufra ‍🎓
			</h3>
			<div class="r-hstack justify-center">
				<div data-id="box-music-widget-1" />
			</div>
			<p data-id="created-by">
				<small>
					Presentación creada por
					<a href="https://www.linkedin.com/in/alex-borbolla">aborboll</a>
					gracias a la tecnología
					<a href="https://revealjs.com/">reveal.js</a>
				</small>
			</p>
		</section>
		<section
			data-auto-animate
			data-auto-animate-easing="cubic-bezier(0.770, 0.000, 0.175, 1.000)"
			data-background-iframes="https://spotify-widget.herokuapp.com/canvas,https://spotify-widget.herokuapp.com/background"
			data-preload
			data-background-opacity="0.2"
		>
			<div data-id="box-42-logo-1" class="flex">
				<a
					href="https://www.42madrid.com/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						data-src="@/assets/img/42logo.png"
						alt="42 Madrid logo"
						height="80"
						style="margin: 0 auto 4rem auto; background: transparent"
						class="demo-logo"
					/>
				</a>
			</div>
			<h3>
				Herramientas para ser un estudiante más productivo sin que nuestra
				cartera sufra ‍🎓
			</h3>
			<div data-id="box-music-widget-1">
				<iframe
					data-src="https://spotify-widget.herokuapp.com/widget"
					title="Spotify widget"
					data-preload
					style="width: 100%"
				/>
			</div>
			<p style="margin: 0" data-id="created-by">
				<small>
					Presentación creada por
					<a
						href="https://www.linkedin.com/in/alex-borbolla"
						target="_blank"
						rel="noopener noreferrer"
					>
						aborboll
					</a>
					gracias a la tecnología
					<a
						href="https://revealjs.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						reveal.js
					</a>
				</small>
			</p>
			<a
				href="https://www.heroku.com/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img
					data-src="@/assets/img/built-on-heroku-light.svg"
					height="80"
					alt="Hecho en heroku"
					style="margin: 0"
				/>
			</a>
		</section>
	</section>
</template>
