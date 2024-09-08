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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { userProfileValue, userProfileSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import postBio from "./action";

function BioForm({ user_id }: { user_id: string | undefined }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const form = useForm<userProfileValue>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      user_id: user_id,
      full_name: "",
      gender: "",
      age: "",
      born: "",
      ktp: "",
      phone: "",
      address: "",
      educate: "",
    },
  });

  async function onSubmit(values: userProfileValue) {
    console.log(values);

    startTransition(async () => {
      try {
        const { error } = await postBio(values);

        if (error) {
          toast({
            variant: "destructive",
            title: "Gagal",
            description: "Silah coba lagi",
          });
          return;
        }

        toast({
          title: "Suksess",
          description: "Profile berhasil diisi",
        });
        window.location.replace("/");
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Terjadi kesalahan: ",
        });
      }
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Nama Lengkap" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({}) => (
            <FormItem>
              <FormLabel>Jenis Kelamin</FormLabel>
              <FormControl>
                <Controller
                  name="gender"
                  control={form.control}
                  render={({ field: { onChange, value } }) => (
                    <Select value={value} onValueChange={onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Jenis Kelamin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Laki-Laki</SelectItem>
                        <SelectItem value="female">Perempuan</SelectItem>
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
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Umur</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Umur" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="born"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tanggal Lahir</FormLabel>
              <FormControl>
                <Input type="date" placeholder="Tanggal Lahir" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Np.Telp</FormLabel>
              <FormControl>
                <Input type="number" placeholder="No.Telp" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ktp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>KTP</FormLabel>
              <FormControl>
                <Input type="number" placeholder="KTP" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="educate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pendidikan</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Pendidikan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat Lengkap</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Alamat" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isPending}
          variant="default"
          className={`mt-5 h-[3rem] w-full text-lg ${
            isPending && "animate-pulse"
          }`}
        >
          Simpan
        </Button>
      </form>
    </Form>
  );
}

export default BioForm;
