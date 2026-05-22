ALTER TABLE "links" RENAME COLUMN "linkEncutado" TO "linkEncurtado";--> statement-breakpoint
ALTER TABLE "links" DROP CONSTRAINT "links_linkEncutado_unique";--> statement-breakpoint
ALTER TABLE "links" ADD CONSTRAINT "links_linkEncurtado_unique" UNIQUE("linkEncurtado");