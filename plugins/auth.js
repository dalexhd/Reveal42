export default function ({ $auth }) {
  $auth.hasRole = function (role) {
    return $auth.loggedIn && $auth.user.role === role;
  };
}
