import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  const sql = neon(process.env.DATABASE_URL);

  if (req.method === 'GET') {
    try {
      const menus = await sql`SELECT * FROM menus ORDER BY id DESC`;
      return res.status(200).json(menus);
    } catch (error) {
      console.error("Error fetching menu:", error);
      return res.status(500).json({ error: "Failed to fetch menu" });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, price, category } = req.body;
      const result = await sql`
        INSERT INTO menus (name, price, category) 
        VALUES (${name}, ${price}, ${category}) 
        RETURNING *
      `;
      return res.status(200).json({ success: true, data: result[0] });
    } catch (error) {
      console.error("Error saving menu:", error);
      return res.status(500).json({ error: "Failed to save menu" });
    }
  }
}