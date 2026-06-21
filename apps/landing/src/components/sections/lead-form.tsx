"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button, Input, Label, Textarea } from "@landing/ui";

import type { Variant } from "@/lib/db";
import { leadSchema, type LeadFormValues } from "@/lib/validation";

interface LeadFormProps {
  variant: Variant;
}

/** Formulario de captura de leads con validación en vivo y feedback por toast. */
export function LeadForm({ variant }: LeadFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    mode: "onTouched",
    defaultValues: { variant },
  });

  async function onSubmit(values: LeadFormValues) {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...values, variant }),
    });

    if (!res.ok) {
      toast.error("No se pudo enviar. Inténtalo de nuevo en un momento.");
      return;
    }

    toast.success("¡Gracias! Te hemos enviado un email de bienvenida.");
    reset({ variant });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mx-auto max-w-md text-left">
      <div className="grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            placeholder="Tu nombre"
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
          {errors.name ? (
            <p className="text-xs text-destructive" role="alert">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="tu@empresa.com"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          {errors.email ? (
            <p className="text-xs text-destructive" role="alert">
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="company">
            Empresa <span className="text-muted-foreground">(opcional)</span>
          </Label>
          <Input
            id="company"
            placeholder="Tu empresa"
            aria-invalid={Boolean(errors.company)}
            {...register("company")}
          />
          {errors.company ? (
            <p className="text-xs text-destructive" role="alert">
              {errors.company.message}
            </p>
          ) : null}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="message">
            Mensaje <span className="text-muted-foreground">(opcional)</span>
          </Label>
          <Textarea
            id="message"
            placeholder="¿En qué podemos ayudarte?"
            aria-invalid={Boolean(errors.message)}
            {...register("message")}
          />
          {errors.message ? (
            <p className="text-xs text-destructive" role="alert">
              {errors.message.message}
            </p>
          ) : null}
        </div>

        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Enviando…" : "Crear cuenta gratis"}
        </Button>
      </div>
    </form>
  );
}
