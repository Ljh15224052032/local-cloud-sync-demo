const express = require("express");
const cors = require("cors");
const { query, run } = require("./db");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/products", async (req, res) => {
  try {
    const products = await query("SELECT * FROM products");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/products", async (req, res) => {
  const { id, name, stock } = req.body;
  if (!id || !name || stock === undefined)
    return res.status(400).json({ error: "缺少字段" });
  try {
    const existing = await query("SELECT id FROM products WHERE id = ?", [id]);
    if (existing.length > 0) return res.status(409).json({ error: "ID已存在" });
    await run("INSERT INTO products (id, name, stock) VALUES (?, ?, ?)", [
      id,
      name,
      stock,
    ]);
    res.status(201).json({ message: "添加成功" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/products/:id/stock", async (req, res) => {
  const id = parseInt(req.params.id);
  const { decrement = 1 } = req.body;
  try {
    const products = await query("SELECT stock FROM products WHERE id = ?", [
      id,
    ]);
    if (products.length === 0)
      return res.status(404).json({ error: "商品不存在" });
    if (products[0].stock < decrement)
      return res.status(400).json({ error: "库存不足" });
    await run("UPDATE products SET stock = stock - ? WHERE id = ?", [
      decrement,
      id,
    ]);
    res.json({ message: "扣减成功" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await run("DELETE FROM products WHERE id = ?", [id]);
    res.json({ message: "删除成功" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
