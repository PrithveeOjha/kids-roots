import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function AuthPage() {
  const [isSignup, setIsSignup] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { signup, login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (isSignup && !name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);
    try {
      if (isSignup) {
        await signup(email, password, name.trim());
      } else {
        await login(email, password);
      }
      navigate("/parent");
    } catch (err) {
      const code = err.code;
      if (code === "auth/email-already-in-use") {
        setError("This email is already registered. Try signing in.");
      } else if (code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else if (code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else if (code === "auth/weak-password") {
        setError("Password is too weak.");
      } else {
        setError(err.message);
      }
    }
    setSubmitting(false);
  }

  async function handleGoogle() {
    setError("");
    try {
      await loginWithGoogle();
      navigate("/parent");
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        setError("Google sign-in failed. Please try again.");
      }
    }
  }

  const styles = {
    wrapper: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(120deg,#a6b8e9,#cbb7ea)"
    },
    card: {
      background: "white",
      padding: "40px",
      borderRadius: "20px",
      width: "400px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.12)"
    },
    title: {
      margin: "0 0 6px 0",
      fontSize: "26px",
      fontWeight: "700",
      color: "#2d2d2d"
    },
    subtitle: {
      margin: "0 0 24px 0",
      fontSize: "14px",
      color: "#888"
    },
    input: {
      width: "100%",
      padding: "12px",
      marginTop: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "15px",
      boxSizing: "border-box",
      outline: "none",
      transition: "border-color 0.2s"
    },
    button: {
      marginTop: "20px",
      width: "100%",
      padding: "14px",
      background: "#6b6bd6",
      color: "white",
      border: "none",
      borderRadius: "10px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      opacity: submitting ? 0.7 : 1
    },
    divider: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      margin: "20px 0",
      color: "#aaa",
      fontSize: "13px"
    },
    dividerLine: {
      flex: 1,
      height: "1px",
      background: "#ddd"
    },
    googleBtn: {
      width: "100%",
      padding: "12px",
      background: "white",
      color: "#333",
      border: "1px solid #ddd",
      borderRadius: "10px",
      fontSize: "15px",
      fontWeight: "500",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      transition: "background 0.2s"
    },
    toggle: {
      marginTop: "18px",
      cursor: "pointer",
      color: "#6b6bd6",
      fontSize: "14px",
      textAlign: "center"
    },
    error: {
      background: "#fee",
      color: "#c00",
      padding: "10px 14px",
      borderRadius: "8px",
      fontSize: "13px",
      marginTop: "12px"
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>
        <p style={styles.subtitle}>
          {isSignup
            ? "Join KidRoots to support your child's growth"
            : "Sign in to continue to KidRoots"}
        </p>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input
              placeholder="Full Name"
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            placeholder="Email"
            type="email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Password"
            type="password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <div style={styles.error}>{error}</div>}

          <button style={styles.button} type="submit" disabled={submitting}>
            {submitting
              ? "Please wait..."
              : isSignup
              ? "Sign Up"
              : "Sign In"}
          </button>
        </form>

        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span>or</span>
          <div style={styles.dividerLine} />
        </div>

        <button style={styles.googleBtn} onClick={handleGoogle} type="button">
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Continue with Google
        </button>

        <p
          style={styles.toggle}
          onClick={() => {
            setIsSignup(!isSignup);
            setError("");
          }}
        >
          {isSignup
            ? "Already have an account? Sign in"
            : "New here? Create account"}
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
