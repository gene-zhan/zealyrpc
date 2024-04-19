import { pgTable, index, bigserial, timestamp, varchar, bigint } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const zealyQuizTask = pgTable("zealy_quiz_task", {
	id: bigserial("id", { mode: "bigint" }).primaryKey().notNull(),
	gmtCreated: timestamp("gmt_created", { mode: 'string' }).defaultNow().notNull(),
	gmtModified: timestamp("gmt_modified", { mode: 'string' }).defaultNow().notNull(),
	userId: varchar("user_id", { length: 255 }),
	questId: varchar("quest_id", { length: 255 }),
	requestId: varchar("request_id", { length: 255 }),
	email: varchar("email", { length: 255 }),
	wallet: varchar("wallet", { length: 255 }),
	discordId: varchar("discord_id", { length: 255 }),
	discordHandle: varchar("discord_handle", { length: 512 }),
	twitterId: varchar("twitter_id", { length: 255 }),
	twitterUname: varchar("twitter_uname", { length: 512 }),
	memo: varchar("memo", { length: 1024 }),
},
(table) => {
	return {
		zealyEmailIdx: index("zealy_quiz_task_zealy_email_index").on(table.email),
		quizEmailAddressIdx: index("zealy_quiz_task_quiz_email_address_index").on(table.wallet),
	}
});

export const flexiQuizTask = pgTable("flexi_quiz_task", {
	id: bigserial("id", { mode: "bigint" }).primaryKey().notNull(),
	gmtCreated: timestamp("gmt_created", { mode: 'string' }).defaultNow().notNull(),
	gmtModified: timestamp("gmt_modified", { mode: 'string' }).defaultNow().notNull(),
	eventId: varchar("event_id", { length: 128 }),
	responseId: varchar("response_id", { length: 128 }),
	questId: varchar("quest_id", { length: 128 }),
	firstName: varchar("first_name", { length: 128 }),
	lastName: varchar("last_name", { length: 128 }),
	emailAddress: varchar("email_address", { length: 255 }),
	userId: varchar("user_id", { length: 128 }),
	points: varchar("points", { length: 64 }),
	availablePoints: varchar("available_points", { length: 64 }),
	percentageScore: varchar("percentage_score", { length: 64 }),
	grade: varchar("grade", { length: 8 }),
	pass: varchar("pass", { length: 512 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	duration: bigint("duration", { mode: "number" }),
},
(table) => {
	return {
		zealyEmailIdx: index("flexi_quiz_task_zealy_email_index").on(table.emailAddress),
	}
});