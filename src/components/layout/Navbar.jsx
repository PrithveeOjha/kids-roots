import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Navbar() {

  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  const styles = {

    navbar: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      padding: "20px 8%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      zIndex: 1000,

      /* glass transparent look */
      background: "rgba(255,255,255,0.08)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)"
    },

    logo: {
      fontSize: "24px",
      fontWeight: "700",
      color: "white",
      cursor: "pointer",
      letterSpacing: "1px"
    },

    navLinks: {
      display: "flex",
      gap: "30px",
      alignItems: "center"
    },

    link: {
      color: "white",
      fontSize: "16px",
      cursor: "pointer",
      fontWeight: "500",
      opacity: 0.9,
      transition: "opacity 0.3s"
    },

    authBtn: {
      padding: "10px 18px",
      borderRadius: "10px",
      border: "1px solid rgba(255,255,255,0.5)",
      color: "white",
      background: "transparent",
      cursor: "pointer",
      fontWeight: "600"
    },

    userName: {
      color: "white",
      fontSize: "14px",
      fontWeight: "500",
      opacity: 0.9
    }

  };

  return (

    <nav style={styles.navbar}>

      {/* LEFT LOGO */}
      <div style={styles.logo} onClick={() => navigate("/")}>
        KidRoots
      </div>

      {/* RIGHT NAVIGATION */}
      <div style={styles.navLinks}>

        <span style={styles.link}>
          Features/Services
        </span>

        <span style={styles.link} onClick={() => navigate("/parent")}>
          Dashboard
        </span>

        {currentUser ? (
          <>
            <span style={styles.userName}>
              {currentUser.displayName || currentUser.email}
            </span>
            <button style={styles.authBtn} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button
            style={styles.authBtn}
            onClick={() => navigate("/auth")}
          >
            Login / Signup
          </button>
        )}

        <span style={styles.link}>
          Help
        </span>

      </div>

    </nav>
  );
}

export default Navbar;
