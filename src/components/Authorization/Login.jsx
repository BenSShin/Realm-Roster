import axios from "axios";
import { useState } from "react";

const jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export function Login() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/sessions.json", params)
      .then((response) => {
        console.log(response.data);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("user_id", response.data.user_id);
        event.target.reset();
        window.location.href = "/"; // Change this to hide a modal, redirect to a specific page, etc.
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Invalid email or password"]);
      });
  };

  return (
    <div id="login" className="flex justify-center">
      <div className="absolute bg-black opacity-10 w-screen h-screen"></div>
      <div className="mt-[4em] bg-[center] bg-[url('/public/home1.jpeg')] object-contain bg-no-repeat w-[600px] h-[616px] border-[5px] border-black rounded-md flex justify-center z-0">
        <div className="w-[600px] h-[600px]">
          <div className=" h-[608px] w-[600px] bg-black opacity-50 rounded-sm z-20"></div>
          <div className="absolute top-12 pt-[3em] pl-[5em] z-30">
            <div>
              <h1 className="pt-[130px] pb-[70px] text-white text-2xl font-bold flex justify-center z-40">Login</h1>
            </div>
            <ul>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-8">
                <div className="flex justify-center">
                  <div className="w-80 max-w-80 h-8 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
                    <p className="px-3 pt-1">Email:</p>
                    <input
                      className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none "
                      name="email"
                      type="email"
                    />
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-80 max-w-80 h-8 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
                    <p className="px-3 pt-1">Password:</p>
                    <input
                      className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none "
                      name="password"
                      type="password"
                    />
                  </div>
                </div>
              </div>
              <button
                className="mt-10 text-[#FF6969] px-2 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200 mr-1"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
