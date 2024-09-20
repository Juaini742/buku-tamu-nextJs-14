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
import { Controller, useForm } from "react-hook-form";
import { register } from "./action";
import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function AddingUserForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const form = useForm<registerValue>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      role: undefined,
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
        return;
      }

      toast({
        title: "Suksess",
        description: "User baru berhasil ditambahkan",
      });
      form.reset();
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
          name="role"
          render={({}) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Controller
                  name="role"
                  control={form.control}
                  render={({ field: { onChange, value } }) => (
                    <Select value={value} onValueChange={onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ADMIN">admin</SelectItem>
                        <SelectItem value="GUEST">guest</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
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
        <Button
          disabled={isPending}
          variant="default"
          className="h-[3rem] w-full text-lg mt-4"
        >
          Tambah
        </Button>
      </form>
    </Form>
  );
}

export default AddingUserForm;
