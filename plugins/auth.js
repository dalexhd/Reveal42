export default function (context, inject) {
	const auth = {
		hasRole: (role) => {
			return (
				context.store.state.intra.loggedIn &&
				context.store.state.intra.user?.role === role
			);
		},
		getRole: (role) => {
			switch (context.store.state.intra.user?.role) {
				case "presenter":
					return "presentador";
				case "viewer":
					return "espectador";
				case "broadcaster":
					return "staff";
				default:
			}
			return "invitado";
		},
		logout: (role) => {
			return new Promise((resolve) => {
				context.store.commit("logoutFromIntra");
				resolve(true);
			});
		}
	};
	inject("auth", auth);
	context.$auth = auth;
}
