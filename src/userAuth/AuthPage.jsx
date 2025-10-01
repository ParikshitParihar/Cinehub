import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../userAuth/firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bg_image.webp";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  // const [isLogin, setIsLogin] = useState(mode === "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        //  Login
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        //  Signup
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          createdAt: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (err) {
      console.error(err.code);
      switch (err.code) {
        case "auth/invalid-credential":
          setError("❌ Invalid email or password. Please try again.");
          break;
        case "auth/user-not-found":
          setError("⚠️ No account found with this email.");
          break;
        case "auth/wrong-password":
          setError("❌ Wrong password entered.");
          break;
        case "auth/email-already-in-use":
          setError("⚠️ This email is already registered.");
          break;
        case "auth/weak-password":
          setError("⚠️ Password should be at least 6 characters.");
          break;
        default:
          setError("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen w-screen flex justify-center items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Auth Card */}
      <div className="relative bg-gray-900/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-96 text-white z-10">
        <h1 className="text-4xl font-extrabold text-yellow-400 text-center mb-4 font-serif">
          CINEHUB
        </h1>

        <h2 className="text-2xl font-bold mb-1 text-center">
          {isLogin ? "Welcome back" : "Join Cinehub"}
        </h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          {isLogin ? "Sign in to your account" : "Create an account to get started"}
        </p>

        <form onSubmit={handleAuth} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full"></span>
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-300">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-yellow-400 cursor-pointer font-medium hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}


// export default AuthPage;
