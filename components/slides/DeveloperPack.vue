<template>
  <section data-transition="zoom-in fade-out">
    <section data-background-color="rgba(127, 255, 212, 0.5)" data-auto-animate>
      <img
        data-src="@/assets/img/student-developer-pack-logo.png"
        height="400"
        alt="GitHub developer pack"
      />
    </section>
    <section data-background-color="rgba(3, 223, 252, 0.5)" data-auto-animate>
      <img
        data-src="@/assets/img/student-developer-pack-logo.png"
        height="150"
        alt="GitHub developer pack"
      />
      <img
        data-src="@/assets/img/github_dev_pack_partners.png"
        height="400"
        alt="GitHub developer pack partners"
      />
    </section>
    <section
      data-background-color="rgba(127, 255, 212, 0.5)"
      data-transition="concave-out"
      data-auto-animate
    >
      <img
        src="@/assets/img/student-developer-pack-logo.png"
        height="150"
        alt="GitHub developer pack"
      />
      <div class="flex items-center">
        <div class="w-1/2">
          <div class="r-stack">
            <div class="fragment fade-out" data-fragment-index="0">
              <img
                data-src="@/assets/img/github_dev_pack_partners.png"
                height="250"
                alt="GitHub developer partners"
              />
            </div>
            <div class="fragment fade-in" data-fragment-index="0">
              <img
                data-src="@/assets/img/persona-cohete.gif"
                alt="Persona en cohete"
              />
            </div>
          </div>
        </div>
        <div class="w-1/2">
          <div class="r-stack">
            <div class="fragment fade-out" data-fragment-index="0">
              <span class="text-6xl text-white animate-pulse">🤑 $45000</span>
            </div>
            <div class="fragment fade-in" data-fragment-index="0">
              <a
                href="https://github-portal.42.fr"
                target="_blank"
                rel="noopener noreferrer"
              >
                github-portal.42.fr
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>
