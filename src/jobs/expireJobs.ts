import pool from "../db/pool";

export async function expireJobs() {
  // console.log("here ia m");
  // const test = await pool.query(`
  //       INSERT INTO jobs (company_id, title, expires_at, status)
  //       VALUES (1, 'Test Job', NOW() - INTERVAL '1 hour', 'open');
  //       `);

  const result = await pool.query(`
        UPDATE jobs 
        SET status = 'closed' 
        WHERE expires_at < NOW() 
        AND status = 'open' 
        RETURNING *    
    `);

  console.log(`Job expired: JobID: ${result.rows[0].title}`);
}
