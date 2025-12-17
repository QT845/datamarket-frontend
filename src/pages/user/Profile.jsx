import { useNavigate } from "react-router-dom";
import useAuthMe from "../../hooks/useAuthMe";
import useLogout from "../../hooks/useLogout";

function Profile() {
  const { user, loading, error } = useAuthMe();
  const navigate = useNavigate();
  const { logout } = useLogout();

  if (loading) {
    return <p>Loading Profile...</p>;
  }

  if (error) {
    return (
      <div>
        <p>You are not logged in.</p>
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>
        <b>Email: </b> {user.email}
      </p>
      <p>
        <b>Full Name: </b> {user.full_name}
      </p>
      <p>
        <b>Role: </b> {user.role}
      </p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Profile;
