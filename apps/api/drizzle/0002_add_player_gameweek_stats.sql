CREATE TABLE "player_gameweeks_stats" (
	"player_id" integer NOT NULL,
	"gameweek_id" integer NOT NULL,
	"total_points" integer NOT NULL,
	"minutes" integer NOT NULL,
	"stats" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "player_gameweeks_stats_player_id_gameweek_id_pk" PRIMARY KEY("player_id","gameweek_id")
);
--> statement-breakpoint
ALTER TABLE "gameweeks" ADD COLUMN "stats_impoted_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "player_gameweeks_stats" ADD CONSTRAINT "player_gameweeks_stats_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_gameweeks_stats" ADD CONSTRAINT "player_gameweeks_stats_gameweek_id_gameweeks_id_fk" FOREIGN KEY ("gameweek_id") REFERENCES "public"."gameweeks"("id") ON DELETE no action ON UPDATE no action;