"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useToast } from "@/hooks/use-toast";
import { loginSchema, loginValue } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import Link from "next/link";
// import { useTransition } from "react";
import { useForm } from "react-hook-form";
// import { login } from "./action";
import { getSession, signIn } from "next-auth/react";

function LoginForm() {
  const { toast } = useToast();
  // const [isPending, startTransition] = useTransition();
  const form = useForm<loginValue>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: loginValue) {
    // startTransition(async () => {
    //   const { error, role } = await login(values);
    //   if (error) {
    //     toast({
    //       variant: "destructive",
    //       title: "Gagal",
    //       description: "Login gagal dilakukan",
    //     });
    //   } else {
    //     const result = await signIn("credentials", {
    //       email: values.email,
    //       password: values.password,
    //       redirect: false,
    //     });

    //     if (result?.error) {
    //       toast({
    //         variant: "destructive",
    //         title: "Gagal",
    //         description: "Login gagal dilakukan",
    //       });
    //     } else {
    //       if (role === "GUEST") {
    //         window.location.replace("/");
    //       } else if (role === "ADMIN") {
    //         window.location.replace("/admin");
    //       }
    //     }
    //   }
    // });
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (result?.error) {
      toast({
        variant: "destructive",
        title: "Gagal",
        description: "Login gagal dilakukan",
      });
    } else if (result?.ok) {
      const session = await getSession();
      const role = session?.user?.role;
      if (role === "GUEST") {
        window.location.replace("/");
      } else if (role === "ADMIN") {
        window.location.replace("/admin");
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-xs underline my-3">
          Sudah punya akun
          <Link href="/register"> Klik disini untuk daftar</Link>
        </div>
        <Button
          // disabled={isPending}
          variant="default"
          className="h-[3rem] w-full text-lg"
        >
          <div className="mr-2">
            <LogIn className="size-5" />
          </div>
          Daftar
        </Button>
      </form>
    </Form>
  );
}
export default LoginForm;
