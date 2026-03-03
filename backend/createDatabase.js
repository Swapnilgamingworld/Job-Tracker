const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  password: 'Swapnil',
  host: 'localhost',
  port: 5432,
  database: 'postgres', // Connect to default postgres database first
});

async function createDatabase() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    // Check if database exists
    const result = await client.query(
      `SELECT datname FROM pg_database WHERE datname = 'job_tracker'`
    );

    if (result.rows.length > 0) {
      console.log('✓ Database "job_tracker" already exists');
    } else {
      await client.query('CREATE DATABASE job_tracker');
      console.log('✅ Database "job_tracker" created successfully');
    }

    await client.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createDatabase();
