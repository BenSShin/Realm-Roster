import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const [errors, setErrors] = useState([]);
  let navigate = useNavigate();
  let path = "/login";

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("/users.json", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        navigate(path); // Change this to hide a modal, redirect to a specific page, etc.
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div id="signup">
      <p className="pt-20 pb-5 text-5xl font-bold font-title">Begin Your Adventure!</p>
      <h1 className="pb-10 text-3xl font-bold">Signup</h1>
      <div className="flex justify-center">
        <div className="grid grid-cols-1">
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
            <div className="border-2 border-white rounded-t-lg mt-2">
              <p className="px-3 pt-1 bg-[#F4BF96] rounded-t-lg">Username:</p>
              <div className="w-80 max-w-80 h-8 flex justify-end rounded">
                <input
                  className="w-full bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none text-center"
                  name="username"
                  type="text"
                />
              </div>
            </div>
            <div className="border-2 border-white rounded-t-lg mt-2">
              <p className="px-3 pt-1 bg-[#F4BF96] rounded-t-lg">Email:</p>
              <div className="w-80 max-w-80 h-8 flex justify-end rounded">
                <input
                  className="w-full bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none text-center"
                  name="email"
                  type="email"
                />
              </div>
            </div>
            <div className="border-2 border-white rounded-t-lg mt-2">
              <p className="px-3 pt-1 bg-[#F4BF96] rounded-t-lg ">Password:</p>
              <div className="w-80 max-w-80 h-8 flex justify-end rounded">
                <input
                  className="w-full bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none text-center"
                  name="password"
                  type="password"
                />
              </div>
            </div>
            <div className="border-2 border-white rounded-t-lg mt-2">
              <p className="px-3 pt-1 bg-[#F4BF96] rounded-t-lg">Password_confirmation:</p>
              <div className="w-80 max-w-80 h-8 flex justify-end rounded">
                <input
                  className="w-full bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none text-center"
                  name="password_confirmation"
                  type="password"
                />
              </div>
            </div>
            <button
              className="mt-10 text-[#FF6969] text-lg px-2 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200 mr-1"
              type="submit"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
<div className="flex justify-center">
  <div className="w-80 max-w-80 h-8 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
    <p className="px-3 pt-1">Email:</p>
    <input className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none " name="email" type="email" />
  </div>
</div>;
