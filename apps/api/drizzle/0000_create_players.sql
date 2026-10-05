CREATE TYPE "public"."position" AS ENUM('GKP', 'DEF', 'MID', 'FWD');--> statement-breakpoint
CREATE TABLE "players" (
	"id" integer PRIMARY KEY NOT NULL,
	"web_name" text NOT NULL,
	"first_name" text NOT NULL,
	"second_name" text NOT NULL,
	"team_id" integer NOT NULL,
	"position" "position" NOT NULL,
	"selected_by_percent" numeric(4, 1) NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
