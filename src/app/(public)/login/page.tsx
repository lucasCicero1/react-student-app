"use client";

import React from "react";
import { Button, Input, Checkbox, Link, Form, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { getUserFromDb } from "./actions";

import { ErrorToast } from "@/src/components/Toast";

export default function LoginPage() {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("admin@mail.com");
  const [password, setPassword] = React.useState<string>("admin");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const [userReponse] = await getUserFromDb(email);

    if (!userReponse) {
      ErrorToast({
        title: "Unregistered email",
        description: "You need to register the email !",
      });

      return;
    }

    if (!userReponse.active) {
      ErrorToast({
        title: "Unconfirmed email",
        description: "You need to confirm the email !",
      });

      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      if (result.status === 401) {
        ErrorToast({
          title: "Unauthorized",
          description: "User is not authorized !",
        });

        return;
      }
      ErrorToast({
        title: "Internal Server Error",
        description: "",
      });

      return;
    }

    router.replace("/");
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <div className="flex flex-col gap-1">
          <h1 className="text-large font-medium">Sign in to your account</h1>
        </div>

        <Form
          className="flex flex-col gap-3"
          validationBehavior="native"
          onSubmit={handleSubmit}
        >
          <Input
            isRequired
            classNames={{
              input:
                "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0 p-0",
            }}
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            value="admin@mail.com"
            variant="bordered"
            // onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            isRequired
            classNames={{
              input:
                "text-small focus:outline-none border-transparent focus:border-transparent focus:ring-0 p-0",
            }}
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            value="admin"
            variant="bordered"
            // onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex w-full items-center justify-between px-1 py-2">
            <Checkbox name="remember" size="sm">
              Remember me
            </Checkbox>
            <Link className="text-default-500" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
          <Button
            className="w-full"
            color="primary"
            // isDisabled={!email.length || !password.length}
            type="submit"
          >
            Sign In
          </Button>
        </Form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            startContent={<Icon icon="flat-color-icons:google" width={24} />}
            variant="bordered"
          >
            Continue with Google
          </Button>
        </div>
        <p className="text-center text-small">
          Need to create an account?&nbsp;
          <Link className="font-semibold" href="/register" size="sm">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
