import {  sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/firebase";
import {  useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [successPassword, setSuccessPassword] = useState("");
  const [loginError, setLoginError] = useState("")
  const emailRef = useRef(null)
 
    const handelSubmit = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email,password)

        //reset 
        setSuccessPassword("");
        setLoginError("")

        signInWithEmailAndPassword(auth,email,password)
        .then(result =>{
            console.log(result.user)
            if(result.user.emailVerified){
              setSuccessPassword('User login successful')
            }else{
              alert('Please verify your email')
            }
        }).catch(error =>{
            console.log(error)
            setLoginError(error.message)
        })
    }
    const handelForgetPassword = ()=>{
      const email = emailRef.current.value;
      if(!email){
        console.log('please provide a email', emailRef.current.value);
        return
      }else if(!/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(email)){
        console.log('please write a valid email')
      }
      sendPasswordResetEmail(auth,email)
      .then(()=>{
        alert('Please check your email')
      }).catch(error =>{
        console.log(error)
      })
    }
   
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handelSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                ref={emailRef}
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a onClick={handelForgetPassword} href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            {
            successPassword && <p className="text-green-600">{successPassword}</p>
          }
          {
            loginError && <p className="text-red-600">{loginError}</p>
          }
          <p>New to this website . Please <Link className="text-gray-500 font-bold" to="/register">Register</Link></p>
          </form>
         
        </div>
      </div>
    </div>
  );
};

export default Login;
