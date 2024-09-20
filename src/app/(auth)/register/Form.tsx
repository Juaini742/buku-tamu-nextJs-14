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
import Link from "next/link";
import { useRouter } from "next/navigation";

function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<registerValue>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      role: "GUEST",
    },
  });

  async function onSubmit(values: registerValue) {
    startTransition(async () => {
      // const { error, role, success } = await register(values);
      // if (error) {
      //   toast({
      //     variant: "destructive",
      //     title: "Gagal",
      //     description: "Pendaftaran gagal dilakukan",
      //   });
      // } else {
      //   const result = await signIn("credentials", {
      //     email: values.email,
      //     password: values.password,
      //     redirect: false,
      //   });

      //   if (result?.error) {
      //     toast({
      //       variant: "destructive",
      //       title: "Login Gagal",
      //       description: "Gagal masuk setelah registrasi.",
      //     });
      //   } else if (result?.success) {
      //     window.location.replace("/");
      //   }
      // }
      register(values).then((data) => {
        if (data?.error) {
          toast({
            variant: "destructive",
            title: "Gagal",
            description: data.error,
          });
        } else {
          toast({
            variant: "default",
            title: "Sukses",
            description: data.success,
          });
          router.push("/login");
        }
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama anda" {...field} />
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
                <Input
                  type="email"
                  placeholder="Masukkan email anda"
                  {...field}
                />
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
                <PasswordInput placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="link" className="text-xs p-0">
          <Link href="/login">Sudah punya akun Klik disini untuk login</Link>
        </Button>
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
