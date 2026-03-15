// common.js - 共享数据操作和同步逻辑

// 从 localStorage 读取商品列表
function getProducts() {
  const data = localStorage.getItem("products");
  return data ? JSON.parse(data) : [];
}

// 保存商品列表到 localStorage，并触发重新渲染
function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
  // 调用当前页面的渲染函数（由各页面定义）
  if (typeof window.renderProducts === "function") {
    window.renderProducts();
  }
}

// 监听其他标签页对 localStorage 的修改
window.addEventListener("storage", function (event) {
  if (event.key === "products") {
    // 数据已变化，重新渲染当前页面
    if (typeof window.renderProducts === "function") {
      window.renderProducts();
    }
  }
});
