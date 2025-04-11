"use client";

import React from "react";
import { Button, Input, Checkbox, Link, Form, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

import { registerUser } from "./actions";

export default function RegisterPage() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [user, setUser] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userResponse = await registerUser(user, email, password);

    if (userResponse?.length) {
      return "User already exists";
    } else {
      router.replace("/login");
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <div className="flex flex-col gap-1">
          <h1 className="text-large font-medium">Sign Up</h1>
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
            label="Username"
            name="username"
            placeholder="Enter your username"
            type="text"
            variant="bordered"
            onChange={(e) => setUser(e.target.value)}
          />
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
            variant="bordered"
            onChange={(e) => setEmail(e.target.value)}
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
            variant="bordered"
            onChange={(e) => setPassword(e.target.value)}
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
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="flex w-full items-center justify-between px-1 py-2">
            <Checkbox isRequired className="py-4" size="sm">
              I agree with the&nbsp;
              <Link className="relative z-[1]" href="#" size="sm">
                Terms
              </Link>
              &nbsp; and&nbsp;
              <Link className="relative z-[1]" href="#" size="sm">
                Privacy Policy
              </Link>
            </Checkbox>
          </div>
          <Button className="w-full" color="primary" type="submit">
            Sign Up
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
            Sign Up with Google
          </Button>
        </div>
        <p className="text-center text-small">
          Already have an account?&nbsp;
          <Link className="font-semibold" href="/login" size="sm">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
