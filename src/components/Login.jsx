import { use, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { signIn, signUp } from "../services/authService";
import { checkValidData } from "../utils/validate";
import Header from "./Header";
import BG from "../assets/Netflix-BG.jpg";
import { useDispatch } from "react-redux";

export default function Login() {
  const [isSignInForm, setSignInForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const email = useRef(null);
  const fullName = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let message;
    if (isSignInForm) {
      message = checkValidData(
        email.current.value,
        password.current.value,
        fullName.current?.value || null
      );
    } else {
      message = checkValidData(
        email.current.value,
        password.current.value,
        null
      );
    }

    setErrorMessage(message);
    if (message) return;

    if (isSignInForm) {
      const result = await signUp(
        email.current.value,
        password.current.value,
        fullName.current.value,
        dispatch
      );
      if (result?.error) {
        setErrorMessage(result.error.message);
        return;
      }
      console.log("User created:", result);
    } else {
      const result = await signIn(email.current.value, password.current.value);
      if (result?.error) {
        setErrorMessage(result.error.message);
        return;
      }
    }
  };

  return (
    <>
      <Header />

      <div className="absolute inset-0 z-0">
        <img className="h-full w-full object-cover" src={BG} alt="Background" />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded bg-black/60 p-8 sm:p-14 shadow-lg"
        >
          <h1 className="text-3xl font-bold text-white mb-8">
            {isSignInForm ? "Sign Up" : "Sign In"}
          </h1>

          {isSignInForm && (
            <input
              type="text"
              placeholder="Full Name"
              ref={fullName}
              className="p-4 my-3 w-full rounded bg-[#333] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          <input
            type="text"
            placeholder="Email Address"
            ref={email}
            className="p-4 my-3 w-full rounded bg-[#333] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            ref={password}
            className="p-4 my-3 w-full rounded bg-[#333] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errorMessage && (
            <p className="text-red-500 font-bold text-base py-2">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className="p-4 my-6 w-full rounded bg-red-600 text-white font-bold hover:bg-red-700 transition duration-300"
          >
            {isSignInForm ? "Sign Up" : "Sign In"}
          </button>

          <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="form-checkbox bg-[#333] text-gray-500 border-none rounded focus:ring-0"
              />
              <label htmlFor="rememberMe" className="ml-2 text-white/70">
                Remember me
              </label>
            </div>
            <a href="#" className="hover:underline">
              Need help?
            </a>
          </div>

          <div className="text-gray-500 text-base mt-10">
            {isSignInForm ? "Already a User? " : "New to Netflix? "}
            <Link
              onClick={toggleSignInForm}
              className="text-white hover:underline"
            >
              {isSignInForm ? "Sign In now" : "Sign Up Now"}
            </Link>
          </div>

          <div className="text-gray-500 text-xs mt-3">
            This page is protected by Google reCAPTCHA to ensure you're not a
            robot.{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Learn more.
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
