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
import { registerSchema, registerValue } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { register } from "./action";
import { useTransition } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

function RegisterForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const form = useForm<registerValue>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      role: "GUEST",
    },
  });

  async function onSubmit(values: registerValue) {
    startTransition(async () => {
      const { error } = await register(values);
      if (error) {
        toast({
          variant: "destructive",
          title: "Gagal",
          description: "Pendaftaran gagal dilakukan",
        });
      } else {
        const result = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (result?.error) {
          toast({
            variant: "destructive",
            title: "Login Gagal",
            description: "Gagal masuk setelah registrasi.",
          });
          return;
        }
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          <Link href="/login"> Klik disini untuk login</Link>
        </div>
        <Button
          disabled={isPending}
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

export default RegisterForm;
