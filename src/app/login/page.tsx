"use client";
import { useState } from "react";
import { FaEyeSlash, FaEye, FaSpinner } from "react-icons/fa";
import { useAuthStore } from "@/store/AuthStore";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const login = useAuthStore((state) => state.login);
    const loading = useAuthStore((state) => state.loading);

    const toggleShowPassword = () => setShowPassword(!showPassword);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        if (!formData.email.includes("@")) {
            setError("Please enter a valid email.");
            return false;
        }
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (loading || !validateForm()) return;

        login(formData.email, formData.password);
        
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex flex-col items-center justify-center w-screen h-screen bg-white rounded-md shadow-lg px-10 py-6 sm:h-auto sm:w-96">
                <h2 className="text-3xl font-bold">Task Flow</h2>
                <h4 className="font-medium">Login to continue</h4>
                <form className="w-full mt-8" onSubmit={handleSubmit}>
                    <input
                        onChange={handleInputChange}
                        value={formData.email}
                        type="text"
                        name="email"
                        className="w-full py-2 pl-2 border-2 rounded-md border-gray-300 text-gray-900 focus:outline-none"
                        placeholder="Email"
                    />
                    <div className="relative mt-4">
                        <input
                            onChange={handleInputChange}
                            value={formData.password}
                            name="password"
                            type={showPassword ? "text" : "password"}
                            className="w-full py-2 pl-2 border-2 rounded-md border-gray-300 text-gray-900 focus:outline-none"
                            placeholder="Password"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3"
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                        </button>
                    </div>
                    {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`flex items-center justify-center w-full min-h-[40px] mt-6 py-2 text-white bg-indigo-500 rounded-md ${
                            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-600"
                        }`}
                    >
                        {loading ? <FaSpinner className="animate-spin text-xl" /> : "Login"}
                    </button>
                </form>
                <p className="mt-4 text-sm text-gray-600">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-indigo-500 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
