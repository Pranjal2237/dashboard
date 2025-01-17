"use client"
import axios from "axios";
import { redirect } from "next/navigation";
import React,{useState} from "react";

export default function page() {
  const [user,setUser]=useState({email:"",password:""});
  const handleSubmit = async(e) => {
    e.preventDefault();
    let token=await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/login`,user)
    token=token.data;
    console.log(token?.token);
    localStorage.setItem("token",token?.token)
    setUser({email:"",password:""});
    redirect("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
              placeholder="Enter your email"
              onChange={(e)=>{setUser({...user,email:e.target.value})}}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
              placeholder="Enter your password"
              onChange={(e)=>{setUser({...user,password:e.target.value})}}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-4 font-bold text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
