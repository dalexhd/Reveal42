<template>
	<div id="particles"></div>
</template>

<script>
import { tsParticles } from "tsparticles";
export default {
	mounted() {
		tsParticles.load("particles", {
			autoPlay: true,
			backgroundMask: {
				composite: "destination-out",
				cover: {
					color: {
						value: "#fff"
					},
					opacity: 1
				},
				enable: false
			},
			backgroundMode: {
				enable: false,
				zIndex: -1
			},
			detectRetina: true,
			fpsLimit: 30,
			infection: {
				cure: false,
				delay: 0,
				enable: false,
				infections: 0,
				stages: []
			},
			interactivity: {
				detectsOn: "canvas",
				events: {
					resize: true
				},
				modes: {
					attract: {
						distance: 200,
						duration: 0.4,
						speed: 1
					},
					bounce: {
						distance: 200
					},
					bubble: {
						distance: 250,
						duration: 2,
						opacity: 0,
						size: 0
					},
					grab: {
						distance: 400,
						links: {
							blink: false,
							consent: false,
							opacity: 1
						}
					},
					light: {
						area: {
							gradient: {
								start: {
									value: "#ffffff"
								},
								stop: {
									value: "#000000"
								}
							},
							radius: 1000
						},
						shadow: {
							color: {
								value: "#000000"
							},
							length: 2000
						}
					},
					push: {
						quantity: 4
					},
					remove: {
						quantity: 2
					},
					repulse: {
						distance: 400,
						duration: 0.4,
						speed: 1
					},
					slow: {
						factor: 3,
						radius: 200
					},
					trail: {
						delay: 1,
						quantity: 1
					}
				}
			},
			manualParticles: [],
			motion: {
				disable: false,
				reduce: {
					factor: 4,
					value: false
				}
			},
			particles: {
				bounce: {
					horizontal: {
						random: {
							enable: false,
							minimumValue: 0.1
						},
						value: 1
					},
					vertical: {
						random: {
							enable: false,
							minimumValue: 0.1
						},
						value: 1
					}
				},
				collisions: {
					bounce: {
						horizontal: {
							random: {
								enable: false,
								minimumValue: 0.1
							},
							value: 1
						},
						vertical: {
							random: {
								enable: false,
								minimumValue: 0.1
							},
							value: 1
						}
					},
					enable: false,
					mode: "bounce"
				},
				color: {
					value: "#ffffff",
					animation: {
						enable: false,
						speed: 1,
						sync: true
					}
				},
				life: {
					count: 0,
					delay: {
						random: {
							enable: false,
							minimumValue: 0
						},
						value: 0,
						sync: false
					},
					duration: {
						random: {
							enable: false,
							minimumValue: 0.0001
						},
						value: 0,
						sync: false
					}
				},
				move: {
					angle: {
						offset: 45,
						value: 90
					},
					direction: "none",
					distance: 0,
					enable: true,
					outModes: {
						default: "out",
						bottom: "out",
						left: "out",
						right: "out",
						top: "out"
					},
					random: true,
					size: false,
					speed: 1,
					straight: false,
					vibrate: false,
					warp: false
				},
				number: {
					density: {
						enable: true,
						area: 800,
						factor: 1000
					},
					limit: 0,
					value: 30
				},
				opacity: {
					random: {
						enable: true,
						minimumValue: 0.1
					},
					value: 1,
					animation: {
						enable: true,
						minimumValue: 0,
						speed: 1,
						sync: false
					}
				},
				reduceDuplicates: false,
				size: {
					random: {
						enable: true,
						minimumValue: 1
					},
					value: 1.5,
					animation: {
						destroy: "none",
						enable: false,
						minimumValue: 0.3,
						speed: 4,
						startValue: "max",
						sync: false
					}
				}
			},
			pauseOnBlur: true,
			pauseOnOutsideViewport: false,
			themes: []
		});
	}
};
</script>
