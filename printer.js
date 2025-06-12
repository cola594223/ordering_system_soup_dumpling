const ThermalPrinter = require('node-thermal-printer').printer;
const Types = require('node-thermal-printer').types;
const path = require('path');
const { exec } = require('child_process');
const iconv = require('iconv-lite');

class ReceiptPrinter {
    constructor() {
        this.printerName = 'EPSON TM-T70II Receipt';
        this.lineWidth = 16;
    }

    center(text, width) {
        const padding = Math.max(0, width - this.getStringWidth(text));
        const leftPadding = Math.floor(padding / 2);
        return ' '.repeat(leftPadding) + text;
    }

    getStringWidth(text) {
        let width = 0;
        for (let char of text) {
            width += char.match(/[\u4e00-\u9fa5]/) ? 2 : 1;
        }
        return width;
    }

    formatPrice(price) {
        return price.toString().padStart(5, ' ');
    }

    async printReceipt(orderData) {
        try {
            const content = [
                this.center('天心坊湯包（北斗店）', this.lineWidth),
                '',
                this.center(`-${orderData.orderType} #${orderData.orderNumber}-`, this.lineWidth),
                this.center(`日期:${new Date().toLocaleString('zh-TW', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour12: false
                })}`, this.lineWidth),
                this.center(`時間:${new Date().toLocaleString('zh-TW', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                })}`, 14),
                '='.repeat(14),
                '',
                ...orderData.items.flatMap(item => {
                    // 先打印品項和價格
                    const quantity = item.quantity.toString() + 'x';
                    const price = this.formatPrice(item.price);
                    const nameWidth = this.lineWidth - quantity.length - price.length - 2;
                    const itemLine = `${quantity} ${item.name.padEnd(nameWidth)} ${price}`;
                    
                    // 如果有備註且備註不為空，則添加備註行
                    if (item.note && item.note.trim() !== '') {
                        return [
                            itemLine,
                            `  備註:${item.note}`,  // 縮短"備註"為"註"以節省空間
                            ''  // 空行
                        ];
                    } else {
                        return [
                            itemLine,
                            ''  // 空行
                        ];
                    }
                }),
                '-'.repeat(14),
                '',
                `共 ${orderData.items.length} 項`,
                `合計:${this.formatPrice(orderData.subtotal)} 元`,
                '',
                '\n\n\n\n\n\n\n'
            ].filter(Boolean).join('\n');

            console.log('打印內容預覽：\n', content);  // 添加這行來檢查生成的內容

            const tempFile = path.join(__dirname, 'temp_receipt.txt');
            const buffer = iconv.encode(content, 'Big5');
            const fs = require('fs');
            fs.writeFileSync(tempFile, buffer);

            const command = `powershell -Command "Get-Content -Encoding Default '${tempFile}' | Out-Printer '${this.printerName}'"`;
            console.log('執行列印命令:', command);

            return new Promise((resolve, reject) => {
                exec(command, (error, stdout, stderr) => {
                    fs.unlinkSync(tempFile);

                    if (error) {
                        console.error('列印錯誤:', error);
                        reject(error);
                        return;
                    }
                    console.log('列印完成');
                    resolve(true);
                });
            });
        } catch (error) {
            console.error("列印錯誤:", error);
            return false;
        }
    }
}

module.exports = new ReceiptPrinter();