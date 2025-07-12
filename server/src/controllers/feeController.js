import { pool } from "../db/index.js";

export const getFees = async (req, res) => {
  try {
    const result = await pool.request().query(`SELECT * FROM FeeStructure`);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFeeByClass = async (req, res) => {
  const { classId } = req.params;
  try {
    const result = await pool
      .request()
      .input("classId", classId)
      .query(`SELECT * FROM FeeStructure WHERE ClassID = @classId`);
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createFee = async (req, res) => {
  const { ClassID, MonthlyFee } = req.body;

  try {
    await pool
      .request()
      .input("ClassID", ClassID)
      .input("MonthlyFee", MonthlyFee)
      .query(
        `INSERT INTO FeeStructure (ClassID, MonthlyFee)
         VALUES (@ClassID, @MonthlyFee)`
      );
    res.json({ message: "Fee structure created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateFee = async (req, res) => {
  const { classId } = req.params;
  const { MonthlyFee } = req.body;
  try {
    await pool
      .request()
      .input("classId", classId)
      .input("MonthlyFee", MonthlyFee)
      .query(
        `UPDATE FeeStructure SET MonthlyFee = @MonthlyFee WHERE ClassID = @classId`
      );
    res.json({ message: "Fee structure updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteFee = async (req, res) => {
  const { classId } = req.params;
  try {
    await pool
      .request()
      .input("classId", classId)
      .query(`DELETE FROM FeeStructure WHERE ClassID = @classId`);
    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ message: "Fee structure not found" });
    } else {
      res.json({ message: "Fee structure deleted" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
