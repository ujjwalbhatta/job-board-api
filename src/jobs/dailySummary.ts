import pool from "../db/pool";

export async function dailySummary() {
  const result = await pool.query(`
        SELECT j.title, COUNT(a.id) AS count
        FROM applications a 
        JOIN jobs j ON j.id = a.job_id
        WHERE DATE(a.applied_at) = CURRENT_DATE
        GROUP BY j.title
        ORDER BY count DESC
    `);

  console.log(`[${new Date().toISOString()}] Daily application summary:`);

  result.rows.forEach(row => {
    console.log(`${row.title}: ${row.count} applications`)
  })
}
