ALTER TABLE "pedidos" RENAME COLUMN "clienteId" TO "cliente_id";--> statement-breakpoint
ALTER TABLE "pedidos" DROP CONSTRAINT "pedidos_clienteId_clientes_id_fk";
--> statement-breakpoint
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_cliente_id_clientes_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientes"("id") ON DELETE no action ON UPDATE no action;