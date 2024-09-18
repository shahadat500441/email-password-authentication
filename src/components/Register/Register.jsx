import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/firebase";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");

  const handelRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const checked = e.target.check.checked;
    //reset error
    setRegisterError("");
    setSuccess("");

    if (password.length < 6) {
      setRegisterError("Password  must be at least 6 characters or longer");
      return;
    } else if (
      !/(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/.test(
        password
      )
    ) {
      setRegisterError(
        "Password must be at least one character uppercase , lowercase , number and special characters"
      );
      return;
    } else if (!checked) {
      setRegisterError("You must agree with the terms and conditions");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("User created successfully");
      })
      .catch((error) => {
        console.log(error);
        setRegisterError(error.message);
      });
  };
  return (
    <div className="w-1/2 mx-auto">
      <h2 className="text-3xl mb-4 font-bold">Register form</h2>
      <form onSubmit={handelRegister}>
        <input
          className="w-full px-2 py-2 mb-4 border rounded-md"
          type="email"
          name="email"
          placeholder="Email address"
          id=""
          required
        />{" "}
        <br />
        <div className="relative">
          <input
            className="w-full px-2 py-2 mb-4 border rounded-md"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Your password"
            id=""
            required
          />
          <span
            className="absolute top-3 right-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaRegEye></FaRegEye>
            ) : (
              <FaRegEyeSlash></FaRegEyeSlash>
            )}
          </span>
          <br />
        </div>

        <div className="mb-4">
          <input type="checkbox" name="check" id="check" />
          <label className="ml-2 " htmlFor="check">
            You must agree with the terms and conditions
          </label>
        </div>
        <input
          className="w-full px-2 py-2 mb-4 btn btn-secondary border rounded-md"
          type="submit"
          value="Submit"
        />
        {success && <p className="text-green-600">{success}</p>}
        {registerError && <p className="text-red-600">{registerError}</p>}
        <p>Already have an account . Please <Link className="text-gray-500 fond-bold" to="/login" >Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
