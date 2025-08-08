// DOM 元素
const menuContainer = document.getElementById('menu-container');
const cartContainer = document.getElementById('cart-container');
const cartPreview = document.getElementById('cart-preview');
const cartModal = document.getElementById('cart-modal');
const cartCount = document.getElementById('cart-count');
const totalAmountElement = document.getElementById('total-amount');
const modalTotalAmountElement = document.getElementById('modal-total-amount');
const submitOrderButton = document.getElementById('submit-order');
const viewCartButton = document.getElementById('view-cart');
const closeCartButton = document.getElementById('close-cart');
const categoriesContainer = document.getElementById('categories-container');
const orderNumberElement = document.getElementById('order-number');
const customerForm = document.getElementById('customer-form');

// 取得 Modal 元素
const orderSuccessModal = document.getElementById('order-success-modal');
const closeSuccessModal = document.getElementById('close-success-modal');
const successOrderNumber = document.getElementById('success-order-number');
const successCustomerName = document.getElementById('success-customer-name');
const successCustomerPhone = document.getElementById('success-customer-phone');
const successPickupTime = document.getElementById('success-pickup-time');

// 購物車數據
let cart = [];
let currentCategory = null;
let currentOrderNumber = 50;  // 從50開始的訂單編號

// 每日公告系統配置 - 獨立於週一公休系統
const dailyAnnouncementConfig = {
    targetDate: new Date(2025, 7, 8), // 2025年8月8日（月份從0開始）
    cutoffTime: { hours: 13, minutes: 40 },
    messages: {
        beforeCutoff: "今日線上點餐時間至下午13:40，感謝您的支持。",
        afterCutoff: "店家已打烊，天心坊湯包店將在明日營業時間為您服務～"
    },
    storageKey: "specialAnnouncement_2025_08_08",
    manualEnableKey: "manualAnnouncementEnabled",
    checkIntervalMs: 60000 // 每分鐘檢查
};

// 檢查是否為目標日期（2025年8月8日）
function isTargetDate() {
    const today = new Date();
    const target = dailyAnnouncementConfig.targetDate;
    return today.getFullYear() === target.getFullYear() &&
           today.getMonth() === target.getMonth() &&
           today.getDate() === target.getDate();
}

// 檢查是否手動啟用
function isManuallyEnabled() {
    return localStorage.getItem(dailyAnnouncementConfig.manualEnableKey) === 'true';
}

// 檢查是否應該顯示公告（目標日期或手動啟用）
function shouldShowDailyAnnouncement() {
    return isTargetDate() || isManuallyEnabled();
}

// 檢查是否已過截止時間
function isPastCutoffTime() {
    const now = new Date();
    const cutoff = new Date();
    cutoff.setHours(dailyAnnouncementConfig.cutoffTime.hours, dailyAnnouncementConfig.cutoffTime.minutes, 0, 0);
    return now >= cutoff;
}

// 檢查公告是否已被關閉
function isDailyAnnouncementClosed() {
    return localStorage.getItem(dailyAnnouncementConfig.storageKey) === 'closed';
}

// 手動啟用公告（供開發或管理使用）
function enableManualAnnouncement() {
    localStorage.setItem(dailyAnnouncementConfig.manualEnableKey, 'true');
    checkDailyAnnouncement();
}

// 手動停用公告
function disableManualAnnouncement() {
    localStorage.removeItem(dailyAnnouncementConfig.manualEnableKey);
    const overlay = document.getElementById('daily-announcement-overlay');
    if (overlay) overlay.style.display = 'none';
}

// 關閉每日公告
function closeDailyAnnouncement() {
    const overlay = document.getElementById('daily-announcement-overlay');
    overlay.style.display = 'none';
    
    // 僅在目標日期保存關閉狀態
    if (isTargetDate()) {
        localStorage.setItem(dailyAnnouncementConfig.storageKey, 'closed');
    }
}

// 顯示每日公告
function showDailyAnnouncement(message, isCloseable) {
    const overlay = document.getElementById('daily-announcement-overlay');
    const content = document.getElementById('daily-announcement-content');
    const closeButton = document.getElementById('daily-announcement-close');
    
    if (!overlay || !content || !closeButton) return;
    
    content.textContent = message;
    closeButton.style.display = isCloseable ? 'block' : 'none';
    overlay.style.display = 'flex';
}

// 主要檢查邏輯
function checkDailyAnnouncement() {
    // 如果不是目標日期且未手動啟用，不顯示
    if (!shouldShowDailyAnnouncement()) {
        return;
    }
    
    // 如果公告已關閉，不顯示
    if (isDailyAnnouncementClosed()) {
        return;
    }
    
    const isPastCutoff = isPastCutoffTime();
    const message = isPastCutoff 
        ? dailyAnnouncementConfig.messages.afterCutoff 
        : dailyAnnouncementConfig.messages.beforeCutoff;
    const isCloseable = !isPastCutoff;
    
    showDailyAnnouncement(message, isCloseable);
}

// 營業時間檢測函數
function checkBusinessStatus() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0=週日, 1=週一, ..., 6=週六
    const announcementOverlay = document.getElementById('announcement-overlay');
    
    if (dayOfWeek === 1) { // 週一
        // 顯示公告
        announcementOverlay.style.display = 'flex';
        // 禁用所有訂購功能
        document.body.style.pointerEvents = 'none';
        announcementOverlay.style.pointerEvents = 'all';
    } else {
        // 隱藏公告
        announcementOverlay.style.display = 'none';
        // 確保頁面可以正常操作
        document.body.style.pointerEvents = 'auto';
    }
}

// 渲染分類標籤
function renderCategories() {
    categoriesContainer.innerHTML = menuData.categories.map(category => `
        <button
            class="category-tag ${currentCategory === category.id ? 'active' : 'bg-gray-200'}"
            onclick="filterByCategory('${category.id}')"
        >
            ${category.name}
        </button>
    `).join('');
}

// 過濾菜單項目
function filterByCategory(categoryId) {
    currentCategory = categoryId;
    renderCategories();
    renderMenu();
}

// 渲染菜單
function renderMenu() {
    const items = currentCategory
        ? menuData.items.filter(item => item.category === currentCategory)
        : menuData.items;

    menuContainer.innerHTML = items.map(item => `
        <div class="menu-item bg-white p-4 rounded-lg shadow-sm">
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <h4 class="font-medium text-lg">${item.name}</h4>
                    <p class="text-red-500 font-medium">$${item.price}</p>
                    ${item.description ? `<p class="text-sm text-gray-500">${item.description}</p>` : ''}
                </div>
                <button
                    onclick="addToCart('${item.id}')"
                    class="ml-4 bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600"
                >
                    加入
                </button>
            </div>
        </div>
    `).join('');
}

// 添加商品到購物車
function addToCart(itemId) {
    const item = menuData.items.find(item => item.id === itemId);
    if (!item) return;

    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1, note: '' });
    }

    renderCart();
}

// 更新購物車項目備註
function updateNote(itemIndex) {
    const item = cart[itemIndex];
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 class="text-lg font-semibold mb-4">${item.name} - 備註</h3>
            <div class="mb-4">
                <textarea
                    id="edit-note"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="請輸入備註（例如：不要辣、少鹽等）"
                    rows="3"
                >${item.note || ''}</textarea>
            </div>
            <div class="flex justify-end space-x-2">
                <button
                    onclick="this.closest('.fixed').remove()"
                    class="px-4 py-2 text-gray-500 hover:text-gray-700"
                >
                    取消
                </button>
                <button
                    onclick="saveNote(${itemIndex})"
                    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    確定
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// 保存備註
function saveNote(itemIndex) {
    const noteElement = document.getElementById('edit-note');
    if (!noteElement) return;

    const newNote = noteElement.value.trim();
    cart[itemIndex].note = newNote;

    // 關閉模態框
    noteElement.closest('.fixed').remove();
    renderCart();
}

// 渲染購物車
function renderCart() {
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="text-gray-500 text-center py-4">購物車是空的</p>';
        cartCount.textContent = '購物車';
    } else {
        cartCount.textContent = `購物車 (${cart.length})`;
        cartContainer.innerHTML = cart.map((item, index) => `
            <div class="mb-4 bg-gray-50 p-4 rounded-lg">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <div class="flex justify-between items-start mb-2">
                            <h4 class="font-medium">${item.name}</h4>
                            <p class="text-gray-600 ml-2">$${item.price * item.quantity}</p>
                        </div>
                        <div class="flex items-center mb-2">
                            <div class="flex items-center space-x-3">
                                <button
                                    onclick="updateQuantity(${index}, ${item.quantity - 1})"
                                    class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
                                >
                                    -
                                </button>
                                <span class="w-8 text-center">${item.quantity}</span>
                                <button
                                    onclick="updateQuantity(${index}, ${item.quantity + 1})"
                                    class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div class="flex items-center text-sm">
                            <button
                                onclick="updateNote(${index})"
                                class="text-blue-500 hover:text-blue-600 flex items-center"
                            >
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                ${item.note ? '修改備註' : '添加備註'}
                            </button>
                            ${item.note ? `
                                <span class="ml-2 text-gray-500">備註：${item.note}</span>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateTotal();
}

// 更新商品數量
function updateQuantity(itemIndex, quantity) {
    if (quantity <= 0) {
        cart.splice(itemIndex, 1);
    } else {
        cart[itemIndex].quantity = quantity;
    }

    renderCart();
}

// 更新總金額
function updateTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalAmountElement.textContent = `$${total}`;
    modalTotalAmountElement.textContent = `$${total}`;
}

// 更新訂單編號
function updateOrderNumber() {
    if (orderNumberElement) {
        orderNumberElement.textContent = currentOrderNumber;
    }
}

// 產生取餐時間選項
function generatePickupTimes() {
    const select = document.getElementById('pickup-time');
    if (!select) return;

    // 取得現在時間，加20分鐘
    const now = new Date();
    now.setMinutes(now.getMinutes() + 20);

    // 設定最晚時間 20:00
    const latest = new Date();
    latest.setHours(20, 0, 0, 0);

    // 每10分鐘一格
    select.innerHTML = '';
    while (now <= latest) {
        const hour = now.getHours().toString().padStart(2, '0');
        const min = now.getMinutes().toString().padStart(2, '0');
        const label = `${hour}:${min}`;
        const option = document.createElement('option');
        option.value = label;
        option.textContent = label;
        select.appendChild(option);
        now.setMinutes(now.getMinutes() + 10);
    }
}

// 購物車開關
viewCartButton.addEventListener('click', () => {
    cartModal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    updateOrderNumber();  // 顯示購物車時更新訂單編號
    generatePickupTimes(); // 開啟購物車時產生取餐時間
});

closeCartButton.addEventListener('click', () => {
    cartModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
});

// 送出訂單
submitOrderButton.addEventListener('click', async () => {
    if (cart.length === 0) {
        alert('購物車是空的！');
        return;
    }

    // 獲取訂購人資訊
    const customerName = document.getElementById('customer-name').value.trim();
    const customerPhone = document.getElementById('customer-phone').value.trim();
    const pickupTime = document.getElementById('pickup-time').value;

    // 驗證訂購人資訊
    if (!customerName) {
        alert('請填寫訂購人姓名！');
        document.getElementById('customer-name').focus();
        return;
    }
    if (!customerPhone) {
        alert('請填寫聯絡電話！');
        document.getElementById('customer-phone').focus();
        return;
    }

    // 驗證電話格式（台灣手機格式）
    const phonePattern = /^09\d{8}$/;
    if (!phonePattern.test(customerPhone)) {
        alert('請填寫正確的手機號碼格式（例如：0912345678）！');
        document.getElementById('customer-phone').focus();
        return;
    }

    // 驗證取餐時間
    if (!pickupTime) {
        alert('請選擇取餐時間！');
        document.getElementById('pickup-time').focus();
        return;
    }

    // 送出前 disable 按鈕
    submitOrderButton.disabled = true;
    submitOrderButton.textContent = '送出中...';

    const orderData = {
        orderNumber: currentOrderNumber,
        customerName,
        customerPhone,
        pickupTime, // 新增
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };

    try {
        // 發送訂單到後端 API
        const response = await fetch('https://704cc99b9c63.ngrok-free.app/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });

        const result = await response.json();

        if (response.ok) {
            // 填入資訊
            successOrderNumber.textContent = result.orderNumber;
            successCustomerName.textContent = customerName;
            successCustomerPhone.textContent = customerPhone;
            successPickupTime.textContent = pickupTime;
            closeSuccessModal.addEventListener('click', () => {
                orderSuccessModal.classList.add('hidden');
                document.body.classList.remove('modal-open');
            });

            // 顯示 Modal
            orderSuccessModal.classList.remove('hidden');

            cart = [];  // 清空購物車
            currentOrderNumber = result.orderNumber + 1;  // 讓前端編號與後端同步
            // 清空表單
            document.getElementById('customer-name').value = '';
            document.getElementById('customer-phone').value = '';
            renderCart();
            cartModal.classList.add('hidden');
            document.body.classList.remove('modal-open');
            submitOrderButton.disabled = false;
            submitOrderButton.textContent = '送出訂單';
        } else {
            throw new Error(result.error || '訂單發送失敗');
        }
    } catch (error) {
        console.error('送出訂單時發生錯誤：', error);
        alert('送出訂單時發生錯誤，請稍後再試！');
        // 發生錯誤時恢復按鈕
        submitOrderButton.disabled = false;
        submitOrderButton.textContent = '送出訂單';
    }
});

// 初始化頁面
renderCategories();
renderMenu();
generatePickupTimes();

// 頁面載入時立即檢查營業狀態
checkBusinessStatus();

// 每分鐘檢查一次（處理跨日情況）
setInterval(checkBusinessStatus, 60000);

// 每日公告系統初始化
document.addEventListener('DOMContentLoaded', function() {
    // 綁定每日公告關閉事件
    const dailyCloseButton = document.getElementById('daily-announcement-close');
    if (dailyCloseButton) {
        dailyCloseButton.addEventListener('click', closeDailyAnnouncement);
    }
    
    // 頁面載入時立即檢查每日公告
    checkDailyAnnouncement();
});

// 每分鐘檢查每日公告（處理跨時間點切換）
setInterval(checkDailyAnnouncement, dailyAnnouncementConfig.checkIntervalMs);

// 開發者工具：手動控制函數（可在瀏覽器 console 使用）
// enableManualAnnouncement() - 手動啟用公告
// disableManualAnnouncement() - 手動停用公告