<template>
  <section>
    <section
      data-background-iframe="https://www.polleverywhere.com/free_text_polls/Jup4V5cILH2DaTSK2VJSw?preview=true&controls=none"
      data-background-interactive="true"
      :data-metomic-placeholder="
        !$nuxt.context.isDev ? '@metomic/generic' : null
      "
      :data-metomic-micropolicy="!$nuxt.context.isDev ? 'embed-content' : null"
      data-metomic-placeholder-params="
        title = Este contenido está bloqueado
        text = Las cookies son necesarias para mostrarle este contenido
        buttonText = Activar
		  "
    ></section>
    <section
      data-background-iframe="https://www.polleverywhere.com/multiple_choice_polls/rwmL6NZMebaW8JtIXqe9G?preview=true&controls=none"
      data-background-interactive="true"
      :data-metomic-placeholder="
        !$nuxt.context.isDev ? '@metomic/generic' : null
      "
      :data-metomic-micropolicy="!$nuxt.context.isDev ? 'embed-content' : null"
      data-metomic-placeholder-params="
        title = Este contenido está bloqueado
        text = Las cookies son necesarias para mostrarle este contenido
        buttonText = Activar
		  "
    ></section>
  </section>
</template>
