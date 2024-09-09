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
import { meetingsValue, meetingsSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import useSubmitMeetings from "./mutation";

function MeetingsForm() {
  const mutation = useSubmitMeetings();
  const form = useForm<meetingsValue>({
    resolver: zodResolver(meetingsSchema),
    defaultValues: {
      meeting_date: "",
      subject: "",
      description: "",
      status: "pending",
      photo: "",
    },
  });

  async function onSubmit(values: meetingsValue) {
    await mutation.mutateAsync(values);
    form.reset();
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="meeting_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal Pertemuan</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({}) => (
              <FormItem>
                <FormLabel>Kepada</FormLabel>
                <FormControl>
                  <Controller
                    name="subject"
                    control={form.control}
                    render={({ field: { onChange, value } }) => (
                      <Select value={value} onValueChange={onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih kepada siapa anda ingin bertamu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="IPDS">IPDS</SelectItem>
                          <SelectItem value="umum">Umum</SelectItem>
                          <SelectItem value="kepala kantor">
                            Kepala Kantor
                          </SelectItem>
                          <SelectItem value="pegawai">Pegawai</SelectItem>
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diskripsi</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Diskripsi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={mutation.isPending}
            variant="default"
            className="mt-5 h-[3rem] w-full text-lg"
          >
            {mutation.isPending ? "Sedang Proses..." : "Kirim"}
          </Button>
        </form>
      </Form>
    </>
  );
}
export default MeetingsForm;
