CREATE TABLE "links" (
	"id" text PRIMARY KEY NOT NULL,
	"linkOriginal" text NOT NULL,
	"linkEncutado" text NOT NULL,
	CONSTRAINT "links_linkEncutado_unique" UNIQUE("linkEncutado")
);
