const {db} = require('@vercel/postgres');

async function seedUsers(client) {
    try {
        // Create the "users" table if it doesn't exist
        const createTable = await client.sql`
          create table zealy_quiz_task
          (
              id bigserial primary key,
              zealy_userid          varchar(255),
              zealy_email           varchar(255),
              zealy_wallet          varchar(255),
              zealy_twitter_id      varchar(255),
              zealy_twitter_uname   varchar(512),
              quiz_id               varchar(255),
              quiz_grade            varchar(8),
              quiz_percentage_score varchar(32),
              quiz_points           varchar(32),
              quiz_available_points varchar(32),
              quiz_date_submitted   varchar(64),
              quiz_email_address    varchar(512),
              quiz_first_name       varchar(128),
              quiz_last_name        varchar(128)
          );
          create index zealy_quiz_task_zealy_email_index on zealy_quiz_task (zealy_email);
          create index zealy_quiz_task_quiz_email_address_index on zealy_quiz_task (quiz_email_address);
        `;

        console.log(`Created "zealy_quiz_task" table`);

        return {
            createTable
        };
    } catch (error) {
        console.error('Error seeding zealy_quiz_task:', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    await seedUsers(client);

    await client.end();
}

main().catch((err) => {
    console.error('An error occurred while attempting to seed the database:', err,);
});
