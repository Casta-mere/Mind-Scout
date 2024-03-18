"use client";
import { NoteSchema } from "@/app/components/ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Page } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { Spinner } from "@/app/components";

type NoteFormData = z.infer<typeof NoteSchema>;

const NoteForm = ({ note }: { note?: Page }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteFormData>({
    resolver: zodResolver(NoteSchema),
  });

  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setSubmitting(true);
      await axios.patch("/api/note/" + note?.id, data);
      router.push("/note/" + note?.id);
      router.refresh();
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      setError("An unexpected Error occured !");
    }
  };

  return (
    <div className="max-w-xl prose">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root>
          <TextField.Input
            defaultValue={note?.title || ""}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        <TextField.Root>
          <TextField.Input
            defaultValue={note?.description || ""}
            placeholder="Description"
            {...register("description")}
          />
        </TextField.Root>
        <Controller
          defaultValue={note?.content || ""}
          name="content"
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Content" {...field} />}
        />
        <Button disabled={isSubmitting}>
          {isSubmitting ? "Updating" : "Update"} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NoteForm;
