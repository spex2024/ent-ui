import React from 'react';
import {LoginForm} from "@/components/page-ui/sign-in";

const Login = () => {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center min-h-screen bg-white">
            <LoginForm/>
        </div>
    );
};

export default Login;