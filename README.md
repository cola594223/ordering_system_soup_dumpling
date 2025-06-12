# 湯包訂單系統

這是一個包含前端訂單界面和後端API的訂單系統，支持熱敏印表機打印訂單。

## 系統需求

- Node.js 14.0 或更高版本
- 支持的熱敏印表機（如：EPSON TM-T88V、POS-58等）

## 安裝步驟

1. 安裝依賴：
   ```bash
   npm install
   ```

2. 配置印表機：
   - 在 `server.js` 中找到印表機配置部分
   - 修改 `interface` 參數為您的印表機名稱
   - 根據需要調整其他印表機參數

## 運行系統

1. 啟動API服務器：
   ```bash
   npm start
   ```
   服務器將在 http://localhost:3000 運行

2. 在瀏覽器中打開 `index.html` 訪問前端界面

## API文檔

### POST /api/orders

發送新訂單到服務器並打印。

請求體格式：
```json
{
    "orderNumber": "訂單編號",
    "items": [
        {
            "name": "商品名稱",
            "quantity": "數量",
            "price": "價格",
            "note": "備註（可選）"
        }
    ],
    "total": "總金額"
}
```

回應格式：
```json
{
    "success": true,
    "message": "訂單已接收並打印",
    "orderNumber": "訂單編號"
}
```

## 故障排除

1. 印表機連接問題：
   - 確保印表機已正確連接並開機
   - 檢查印表機驅動是否正確安裝
   - 確認 `server.js` 中的印表機配置是否正確

2. API連接問題：
   - 確保服務器正在運行
   - 檢查瀏覽器控制台是否有錯誤信息
   - 確認前端代碼中的API地址是否正確 