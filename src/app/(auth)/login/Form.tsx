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
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { login } from "./action";

function LoginForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const form = useForm<loginValue>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: loginValue) {
    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) {
          toast({
            variant: "destructive",
            title: "Gagal",
            description: data.error,
          });
        } else if (data?.success) {
          if (data?.role === "GUEST") {
            window.location.replace("/");
          } else if (data?.role === "ADMIN") {
            window.location.replace("/admin");
          }
        }
      });
    });
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
        <Button variant="link" className="text-xs p-0">
          <Link href="/register">
            Sudah punya akun Klik disini untuk daftar
          </Link>
        </Button>
        <Button
          disabled={isPending}
          variant="default"
          className="h-[3rem] w-full text-lg"
        >
          <div className="mr-2">
            <LogIn className="size-5" />
          </div>
          {isPending ? "Proses..." : "Masuk"}
        </Button>
      </form>
    </Form>
  );
}
export default LoginForm;
