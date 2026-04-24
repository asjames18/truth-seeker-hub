import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Real & Raw Gospel" },
      { name: "description", content: "Reach out to the Real & Raw Gospel team. Questions, prayer requests, partnership — we'd love to hear from you." },
      { property: "og:title", content: "Contact — Real & Raw Gospel" },
      { property: "og:description", content: "Get in touch with Real & Raw Gospel." },
      { property: "og:image", content: "/rrg-logo.jpg" },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

type FormValues = z.infer<typeof schema>;

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    const { error } = await supabase.from("contact_messages").insert({
      name: values.name,
      email: values.email,
      subject: values.subject || null,
      message: values.message,
    });
    if (error) {
      toast.error("Could not send message. Please try again.");
      return;
    }
    toast.success("Message sent. We'll be in touch.");
    reset();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center">
        <Mail className="mx-auto h-10 w-10 text-primary mb-3" />
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight">Get in Touch</h1>
        <p className="mt-4 text-muted-foreground">
          Questions, prayer requests, partnership, or feedback — we read every message.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-5 rounded-2xl border border-border/60 bg-card p-7 sm:p-9">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} className="mt-1.5" autoComplete="name" />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} className="mt-1.5" autoComplete="email" />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="subject">Subject <span className="text-muted-foreground">(optional)</span></Label>
          <Input id="subject" {...register("subject")} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" {...register("message")} className="mt-1.5 min-h-[140px]" />
          {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
        </div>
        <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
          {isSubmitting ? "Sending…" : submitted ? "Send another" : "Send message"}
        </Button>
      </form>
    </div>
  );
}
