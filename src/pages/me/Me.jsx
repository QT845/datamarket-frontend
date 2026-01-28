import { useAuth } from "../../auth/useAuth";
import useLogout from "../../hooks/useLogout";

export default function Profile() {
  const { user, loading } = useAuth();
  const { logout } = useLogout();

  if (loading) return <p>Loading...</p>;

  if (!user) return <p>Not logged in</p>;

  return (
    <div>
      <h2>Me</h2>
      <p>
        <b>Email: </b> {user.email}
      </p>
      <p>
        <b>Full Name: </b> {user.fullName}
      </p>
      <p>
        <b>Role: </b> {user.role}
      </p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
