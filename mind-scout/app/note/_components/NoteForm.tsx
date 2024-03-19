"use client";
import { ErrorMessage, Spinner } from "@/app/components";
import { NoteSchema } from "@/app/components/ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Page } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

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
      let noteId = "";
      if (note) {
        await axios.patch("/api/note/" + note?.id, data);
        noteId = note?.id;
      } else {
        const newNote = await axios.post("/api/note", data);
        noteId = newNote.data.id;
      }
      await axios.patch("/api/commit", {});
      router.push("/note/" + noteId);
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected Error occured !");
    }
  };

  return (
    <div className="max-w-5xl prose">
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
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextField.Root>
          <TextField.Input
            defaultValue={note?.description || ""}
            placeholder="Description"
            {...register("description")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Controller
          defaultValue={note?.content || ""}
          name="content"
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Content" {...field} />}
        />
        <ErrorMessage>{errors.content?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {!note
            ? isSubmitting
              ? "Submiting"
              : "Submit"
            : isSubmitting
            ? "Updating"
            : "Update"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NoteForm;
