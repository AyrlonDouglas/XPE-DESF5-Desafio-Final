ALTER TABLE "clientes" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_email_unique" UNIQUE("email");