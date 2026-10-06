CREATE TABLE "gameweeks" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"deadline_time" timestamp with time zone NOT NULL,
	"finished" boolean NOT NULL,
	"data_checked" boolean NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
