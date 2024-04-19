const {db} = require('@vercel/postgres');

async function seedUsers(client) {
    try {
        // Create the "users" table if it doesn't exist
        await client.sql`drop table if exists zealy_quiz_task; `
        const createTable = await client.sql`
          create table zealy_quiz_task
          (
              id bigserial primary key,
              gmt_created timestamp not null default current_timestamp,
              gmt_modified timestamp not null default current_timestamp,
              user_id           varchar(255),
              quest_id          varchar(255),
              request_id        varchar(255),
              email             varchar(255),
              wallet            varchar(255),
              discord_id        varchar(255),
              discord_handle    varchar(512),
              twitter_id        varchar(255),
              twitter_uname     varchar(512),
              memo              varchar(1024)
          );
          create index zealy_quiz_task_zealy_email_index on zealy_quiz_task (email);
          create index zealy_quiz_task_quiz_email_address_index on zealy_quiz_task (wallet);
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
