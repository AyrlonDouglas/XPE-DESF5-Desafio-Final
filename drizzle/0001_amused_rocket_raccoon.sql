ALTER TABLE "pedidos_produtos" DROP CONSTRAINT "pedidos_produtos_pedido_id_pedidos_id_fk";
--> statement-breakpoint
ALTER TABLE "pedidos_produtos" ADD CONSTRAINT "pedidos_produtos_pedido_id_pedidos_id_fk" FOREIGN KEY ("pedido_id") REFERENCES "public"."pedidos"("id") ON DELETE cascade ON UPDATE no action;