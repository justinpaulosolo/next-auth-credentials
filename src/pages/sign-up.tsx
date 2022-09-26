import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ISignUp, signUpSchema } from "../common/validation/auth";
import { trpc } from "../common/client/trpc";

const SignUp: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
  });

  const { mutateAsync } = trpc.useMutation(["signup"]);

  const onSubmit = useCallback(
    async (data: ISignUp) => {
      const result = await mutateAsync(data);
      if (result.status === 201) {
        router.push("/");
      }
    },
    [mutateAsync, router]
  );

  return (
    <div>
      <Head>
        <title>Register</title>
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
              <h2 className="card-title">Create an account!</h2>
              <input
                type="text"
                placeholder="Type your username..."
                className="input input-bordered w-full max-w-xs my-2"
                {...register("username")}
              />
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
                <Link href="/" className="link">
                  Go to login
                </Link>
                <button className="btn btn-secondary">Sign up</button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignUp;
