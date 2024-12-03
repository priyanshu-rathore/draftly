"use client";

import classNames from "classnames";
import { Poppins } from "next/font/google";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth, googleProvider } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,  signInWithPopup } from "firebase/auth"

const poppins = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"],
});

const Authentication: React.FC = () => {
  const [toggle, setToggle] = useState(false);

  const signInToggle = () => {
    setToggle(true);
  };

  const signUpToggle = () => {
    setToggle(false);
  };

  return (
    <div className={classNames(poppins.className, "w-screen h-screen flex items-center justify-center bg-white")}>
      <div className="border-2 border-gray-100 w-fit h-fit rounded-md">
        {toggle ? <SignUp choose={signUpToggle} /> : <SignIn choose={signInToggle} />}
      </div>
    </div>
  );
};

export default Authentication;

interface SignUpProps {
  choose?: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ choose }) => {
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await createUserWithEmailAndPassword(auth, values.email, values.password);
        alert("Signup successful!");
      } catch (error: any) {
        alert(`Signup failed: ${error.message}`);
      }
    },
  });

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      alert(`Welcome ${user.displayName || user.email}!`);
    } catch (error: any) {
      alert(`Google Sign-Up failed: ${error.message}`);
    }
  };


  return (
    <div className="p-5 flex flex-col gap-3 shadow-md">
      <h1 className={classNames("font-semibold text-black text-xl")}>Sign Up to Draftly</h1>
      <div className="w-full items-center justify-center flex my-4">
        <Button variant={"outline"} onClick={handleGoogleSignUp} className="px-20">
          <FcGoogle />
          <h4 className="font-medium">Sign up with Google</h4>
        </Button>
      </div>
      <h5 className="text-center">or sign up with</h5>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-xs">{formik.errors.password}</p>
          )}
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-500 text-xs">{formik.errors.confirmPassword}</p>
          )}
        </div>

        <Button type="submit" className="font-semibold rounded-full">
          Sign Up
        </Button>
      </form>
      <div>
        <p className="text-xs text-center">
          Already have an account?{" "}
          <span onClick={choose} className="underline cursor-pointer">
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

interface SignInProps {
  choose?: () => void;
}

const SignIn: React.FC<SignInProps> = ({ choose }) => {

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      alert(`Welcome back ${user.displayName || user.email}!`);
    } catch (error: any) {
      alert(`Google Sign-In failed: ${error.message}`);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        alert("Login successful!");
      } catch (error: any) {
        alert(`Login failed: ${error.message}`);
      }
    },
  });

  return (
    <div className="p-5 flex flex-col gap-3 shadow-md">
      <h1 className={classNames("font-semibold text-black text-xl")}>Sign In to Draftly</h1>
      <div className="w-full items-center justify-center flex my-4">
        <Button onClick={handleGoogleSignIn} variant={"outline"} className="px-20">
          <FcGoogle />
          <h4 className="font-medium">Sign in with Google</h4>
        </Button>
      </div>
      <h5 className="text-center">or sign in with</h5>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-xs">{formik.errors.password}</p>
          )}
        </div>

        <Button type="submit" className="font-semibold rounded-full">
          Sign In
        </Button>
      </form>
      <div>
        <p className="text-xs text-center">
          Don&apos;t have an account?{" "}
          <span onClick={choose} className="underline cursor-pointer">
            Create account
          </span>
        </p>
        <p className="text-xs text-center mt-3 underline cursor-pointer">Forgot?</p>
      </div>
    </div>
  );
};
