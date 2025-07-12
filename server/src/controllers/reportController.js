import { pool } from "../db/index.js";

export const getMonthlyReport = async (req, res) => {
  try {
    const result = await pool.request().query(`
      SELECT s.FullName, c.ClassName, MONTH(fp.PaymentDate) AS Month,
             SUM(fp.AmountPaid) AS TotalPaid
      FROM FeePayment fp
      JOIN Student s ON s.StudentID = fp.StudentID
      JOIN Class c ON s.ClassID = c.ClassID
      WHERE MONTH(fp.PaymentDate) = MONTH(GETDATE())
        AND YEAR(fp.PaymentDate) = YEAR(GETDATE())
      GROUP BY s.FullName, c.ClassName, MONTH(fp.PaymentDate)
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getYearlyReport = async (req, res) => {
  try {
    const result = await pool.request().query(`
      SELECT s.FullName, c.ClassName, YEAR(fp.PaymentDate) AS Year,
             SUM(fp.AmountPaid) AS TotalPaid
      FROM FeePayment fp
      JOIN Student s ON s.StudentID = fp.StudentID
      JOIN Class c ON s.ClassID = c.ClassID
      WHERE YEAR(fp.PaymentDate) = YEAR(GETDATE())
      GROUP BY s.FullName, c.ClassName, YEAR(fp.PaymentDate)
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
