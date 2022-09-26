import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ILogin, loginSchema } from "../common/validation/auth";
import { signIn } from "next-auth/react";

const Home: NextPage = () => {
  const { register, handleSubmit } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback(async (data: ILogin) => {
    await signIn("credentials", { ...data, callbackUrl: "/dashboard" });
  }, []);

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="description" content="next page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form
          className="flex items-center justify-center h-screen w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Welcome back!</h2>
              <input
                type="email"
                placeholder="Type your email..."
                className="input input-bordered w-full max-w-xs my-2"
                {...register("email")}
              />
              <input
                type="password"
                placeholder="Type your password..."
                className="input input-bordered w-full max-w-xs my-2"
                {...register("password")}
              />
              <div className="card-actions items-center flex justify-between">
                <Link href="/sign-up" className="link">
                  Go to sign up
                </Link>
                <button className="btn btn-secondary">Login</button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Home;
