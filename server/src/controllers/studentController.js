import { pool } from "../db/index.js";

export const getAllStudents = async (req, res) => {
  try {
    const result = await pool.request().query(`SELECT * FROM Student`);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool
      .request()
      .input("id", id)
      .query(`SELECT * FROM Student WHERE StudentID = @id`);
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createStudent = async (req, res) => {
  const { FullName, ClassID, Contact, Address } = req.body;

  console.log("req.body", req.body);
  try {
    const result = await pool
      .request()
      .input("FullName", FullName)
      .input("ClassID", ClassID)
      .input("Contact", Contact)
      .input("Address", Address)
      .query(
        `INSERT INTO Student (FullName, ClassID, Contact, Address)
         VALUES (@FullName, @ClassID, @Contact, @Address)`
      );
    console.log("result", result);
    res.json({ message: "Student created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { FullName, ClassID, Contact, Address } = req.body;

  try {
    const result = await pool
      .request()
      .input("id", id)
      .input("FullName", FullName)
      .input("ClassID", ClassID)
      .input("Contact", Contact)
      .input("Address", Address)
      .query(
        `UPDATE Student
         SET FullName = @FullName,
             ClassID = @ClassID,
             Contact = @Contact,
             Address = @Address
         WHERE StudentID = @id`
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    console.log("result", result);

    res.json({ message: "Student updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool
      .request()
      .input("id", id)
      .query(`DELETE FROM Student WHERE StudentID = @id`);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStudentsWithFees = async (req, res) => {
  try {
    const result = await pool.request().query(`
      SELECT s.StudentID, s.FullName, c.ClassName, f.MonthlyFee
      FROM Student s
      JOIN Class c ON s.ClassID = c.ClassID
      JOIN FeeStructure f ON f.ClassID = c.ClassID
    `);
    console.log("result", result);
    res.json(result.recordset);
  } catch (err) {
    console.log("result", err);
    res.status(500).json({ error: err.message });
  }
};

export const getPaymentStatus = async (req, res) => {
  try {
    const result = await pool.request().query(`
      SELECT s.FullName, fp.PaymentDate, fp.PaymentType, fp.AmountPaid
      FROM Student s
      JOIN FeePayment fp ON s.StudentID = fp.StudentID
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
