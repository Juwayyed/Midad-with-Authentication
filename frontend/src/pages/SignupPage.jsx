import { motion } from "framer-motion";
import { User, Mail, Lock } from "lucide-react";
import Input from "../components/Input.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import PasswordStrengthIndicator from "../components/PasswordStrengthIndicator.jsx";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignup = (e) => {
    e.preventDefault();
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-indigo-950/50 backdrop-blur-xl rounded-2xl shadow-xl shadow-indigo-950/30 border border-indigo-500/20 overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center bg-linear-to-r from-indigo-400 via-violet-400 to-violet-500 text-transparent bg-clip-text">
            Create Account
          </h2>

          <form onSubmit={handleSignup}>
            <Input
              icon={User}
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              icon={Mail}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <PasswordStrengthIndicator password={password} />

            <motion.button
              type="submit"
              className="mt-5 w-full py-3 px-4 bg-linear-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-lg shadow-lg shadow-indigo-500/20 hover:from-indigo-700 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-950 transition duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Signup
            </motion.button>
          </form>
        </div>
        <div className="px-8 py-4 bg-indigo-950/60 border-t border-indigo-500/20 flex justify-center">
          <p className="text-sm text-indigo-200">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-violet-400 hover:text-violet-300 hover:underline transition-colors duration-200"
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
export default Signup;
