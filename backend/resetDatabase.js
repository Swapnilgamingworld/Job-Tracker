const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  password: 'Swapnil',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
});

async function resetDatabase() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    // Terminate existing connections
    await client.query(
      `SELECT pg_terminate_backend(pg_stat_activity.pid)
       FROM pg_stat_activity
       WHERE pg_stat_activity.datname = 'job_tracker'
       AND pid <> pg_backend_pid()`
    );

    // Drop existing database
    try {
      await client.query('DROP DATABASE IF EXISTS job_tracker');
      console.log('✓ Dropped existing database');
    } catch (e) {
      console.log('Database drop skipped (may not exist)');
    }

    // Create new database
    await client.query('CREATE DATABASE job_tracker');
    console.log('✅ Database "job_tracker" created successfully');

    await client.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

resetDatabase();
