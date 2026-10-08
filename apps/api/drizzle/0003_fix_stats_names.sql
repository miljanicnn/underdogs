ALTER TABLE "player_gameweeks_stats" RENAME TO "player_gameweek_stats";--> statement-breakpoint
ALTER TABLE "gameweeks" RENAME COLUMN "stats_impoted_at" TO "stats_imported_at";--> statement-breakpoint
ALTER TABLE "player_gameweek_stats" DROP CONSTRAINT "player_gameweeks_stats_player_id_players_id_fk";
--> statement-breakpoint
ALTER TABLE "player_gameweek_stats" DROP CONSTRAINT "player_gameweeks_stats_gameweek_id_gameweeks_id_fk";
--> statement-breakpoint
ALTER TABLE "player_gameweek_stats" DROP CONSTRAINT "player_gameweeks_stats_player_id_gameweek_id_pk";--> statement-breakpoint
ALTER TABLE "player_gameweek_stats" ADD CONSTRAINT "player_gameweek_stats_player_id_gameweek_id_pk" PRIMARY KEY("player_id","gameweek_id");--> statement-breakpoint
ALTER TABLE "player_gameweek_stats" ADD CONSTRAINT "player_gameweek_stats_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_gameweek_stats" ADD CONSTRAINT "player_gameweek_stats_gameweek_id_gameweeks_id_fk" FOREIGN KEY ("gameweek_id") REFERENCES "public"."gameweeks"("id") ON DELETE no action ON UPDATE no action;