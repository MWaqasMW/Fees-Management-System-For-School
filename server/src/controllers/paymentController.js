import { pool } from "../db/index.js";

export const getPayments = async (req, res) => {
  try {
    const result = await pool.request().query(`SELECT * FROM FeePayment`);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPayment = async (req, res) => {
  const { StudentID, PaymentDate, PaymentType, AmountPaid } = req.body;

  try {
    const result = await pool
      .request()
      .input("StudentID", StudentID)
      .input(
        "PaymentDate",
        PaymentDate || new Date().toISOString().split("T")[0]
      )
      .input("PaymentType", PaymentType)
      .input("AmountPaid", AmountPaid).query(`
        INSERT INTO FeePayment (StudentID, PaymentDate, PaymentType, AmountPaid)
        VALUES (@StudentID, @PaymentDate, @PaymentType, @AmountPaid)
      `);

    res.json({ message: "Payment recorded successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePayment = async (req, res) => {
  const { id } = req.params;
  const { PaymentDate, PaymentType, AmountPaid } = req.body;
  try {
    const result = await pool
      .request()
      .input("id", id)
      .input("PaymentDate", PaymentDate)
      .input("PaymentType", PaymentType)
      .input("AmountPaid", AmountPaid)
      .query(
        `UPDATE FeePayment
         SET PaymentDate = @PaymentDate, PaymentType = @PaymentType, AmountPaid = @AmountPaid
         WHERE PaymentID = @id`
      );
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Payment not found" });
    }
    console.log("result", result);
    res.json({ message: "Payment updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePayment = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool
      .request()
      .input("id", id)
      .query(`DELETE FROM FeePayment WHERE PaymentID = @id`);
    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ message: "Payment not found" });
    } else {
      res.json({ message: "Payment deleted" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
