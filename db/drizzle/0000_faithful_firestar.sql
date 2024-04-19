-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "zealy_quiz_task" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"gmt_created" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"gmt_modified" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"user_id" varchar(255),
	"quest_id" varchar(255),
	"request_id" varchar(255),
	"email" varchar(255),
	"wallet" varchar(255),
	"discord_id" varchar(255),
	"discord_handle" varchar(512),
	"twitter_id" varchar(255),
	"twitter_uname" varchar(512),
	"memo" varchar(1024)
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "zealy_quiz_task_zealy_email_index" ON "zealy_quiz_task" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "zealy_quiz_task_quiz_email_address_index" ON "zealy_quiz_task" ("wallet");
*/