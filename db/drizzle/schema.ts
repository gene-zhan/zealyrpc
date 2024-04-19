import { pgTable, index, bigserial, timestamp, varchar } from "drizzle-orm/pg-core"
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