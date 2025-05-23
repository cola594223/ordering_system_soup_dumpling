const menuData = {
    categories: [
        {
            id: "soup_bun",
            name: "湯包系列"
        },
        {
            id: "dumpling",
            name: "蒸餃系列"
        },
        {
            id: "soup",
            name: "湯品/湯餃系列"
        },
        {
            id: "vegetarian",
            name: "素食系列"
        },
        {
            id: "noodle",
            name: "炒泡麵系列"
        },
        {
            id: "side_drink",
            name: "小菜/飲料系列"
        }
    ],
    items: [
        // 湯包系列
        {
            id: "sb1",
            name: "鮮肉湯包 7顆",
            price: 65,
            description: "傳統口味",
            category: "soup_bun"
        },
        {
            id: "sb1_10",
            name: "鮮肉湯包 10顆",
            price: 90,
            description: "傳統口味",
            category: "soup_bun"
        },
        {
            id: "sb2",
            name: "麻辣湯包 7顆",
            price: 75,
            description: "麻辣風味",
            category: "soup_bun"
        },
        {
            id: "sb2_10",
            name: "麻辣湯包 10顆",
            price: 100,
            description: "麻辣風味",
            category: "soup_bun"
        },
        {
            id: "sb3",
            name: "綠咖喱湯包 7顆",
            price: 75,
            description: "泰式風味",
            category: "soup_bun"
        },
        {
            id: "sb3_10",
            name: "綠咖喱湯包 10顆",
            price: 100,
            description: "泰式風味",
            category: "soup_bun"
        },
        {
            id: "sb4",
            name: "南洋叻沙湯包 7顆",
            price: 75,
            description: "南洋風味",
            category: "soup_bun"
        },
        {
            id: "sb4_10",
            name: "南洋叻沙湯包 10顆",
            price: 100,
            description: "南洋風味",
            category: "soup_bun"
        },
        {
            id: "sb5",
            name: "瓜子雞湯包 7顆",
            price: 90,
            description: "雞肉風味",
            category: "soup_bun"
        },
        {
            id: "sb5_10",
            name: "瓜子雞湯包 10顆",
            price: 120,
            description: "雞肉風味",
            category: "soup_bun"
        },
        {
            id: "sb6",
            name: "牛肉湯包 7顆",
            price: 100,
            description: "牛肉風味",
            category: "soup_bun"
        },
        {
            id: "sb6_10",
            name: "牛肉湯包 10顆",
            price: 135,
            description: "牛肉風味",
            category: "soup_bun"
        },
        {
            id: "sb7",
            name: "綜合湯包 10顆",
            price: 105,
            description: "鮮肉*4、咖哩*2、叻沙*2、牛肉*2",
            category: "soup_bun"
        },

        // 蒸餃系列
        {
            id: "d1",
            name: "豬肉蒸餃 7顆",
            price: 65,
            description: "傳統口味",
            category: "dumpling"
        },
        {
            id: "d1_10",
            name: "豬肉蒸餃 10顆",
            price: 90,
            description: "傳統口味",
            category: "dumpling"
        },
        {
            id: "d2",
            name: "韭菜蒸餃 7顆",
            price: 65,
            description: "韭菜口味",
            category: "dumpling"
        },
        {
            id: "d2_10",
            name: "韭菜蒸餃 10顆",
            price: 90,
            description: "韭菜口味",
            category: "dumpling"
        },
        {
            id: "d3",
            name: "蝦肉蒸餃 7顆",
            price: 80,
            description: "鮮蝦口味",
            category: "dumpling"
        },
        {
            id: "d3_10",
            name: "蝦肉蒸餃 10顆",
            price: 110,
            description: "鮮蝦口味",
            category: "dumpling"
        },
        {
            id: "d4",
            name: "牛肉蒸餃 7顆",
            price: 80,
            description: "牛肉口味",
            category: "dumpling"
        },
        {
            id: "d4_10",
            name: "牛肉蒸餃 10顆",
            price: 110,
            description: "牛肉口味",
            category: "dumpling"
        },
        {
            id: "d5",
            name: "綜合蒸餃 10顆",
            price: 105,
            description: "豬肉*4、蝦肉*2、牛肉*2、韭菜*2",
            category: "dumpling"
        },

        // 湯品/湯餃系列
        {
            id: "s1",
            name: "玉米濃湯",
            price: 40,
            category: "soup"
        },
        {
            id: "s2",
            name: "酸辣湯",
            price: 40,
            category: "soup"
        },
        {
            id: "s3",
            name: "玉米濃湯餃 7顆",
            price: 90,
            category: "soup"
        },
        {
            id: "s4",
            name: "酸辣湯餃 7顆",
            price: 90,
            category: "soup"
        },

        // 素食系列
        {
            id: "v1",
            name: "塔香菇湯包 7顆",
            price: 85,
            description: "素食",
            category: "vegetarian"
        },
        {
            id: "v1_10",
            name: "塔香菇湯包 10顆",
            price: 115,
            description: "素食",
            category: "vegetarian"
        },
        {
            id: "v2",
            name: "翡翠蒸餃 7顆",
            price: 90,
            description: "素食",
            category: "vegetarian"
        },
        {
            id: "v2_10",
            name: "翡翠蒸餃 10顆",
            price: 120,
            description: "素食",
            category: "vegetarian"
        },

        // 炒泡麵系列
        {
            id: "n1",
            name: "經典肉燥炒泡麵",
            price: 55,
            category: "noodle"
        },
        {
            id: "n2",
            name: "沙茶炒泡麵",
            price: 55,
            category: "noodle"
        },
        {
            id: "n3",
            name: "韓式泡菜炒泡麵",
            price: 65,
            category: "noodle"
        },
        {
            id: "n4",
            name: "麻辣沙嗲炒泡麵",
            price: 65,
            category: "noodle"
        },
        {
            id: "n5",
            name: "椒鹽雞排炒泡麵",
            price: 90,
            category: "noodle"
        },
        {
            id: "n6",
            name: "香酥豬排炒泡麵",
            price: 90,
            category: "noodle"
        },

        // 小菜/飲料系列
        {
            id: "sd1",
            name: "煙燻豬耳朵",
            price: 40,
            category: "side_drink"
        },
        {
            id: "sd2",
            name: "炸雞排",
            price: 35,
            category: "side_drink"
        },
        {
            id: "sd3",
            name: "炸豬排",
            price: 35,
            category: "side_drink"
        },
        {
            id: "sd4",
            name: "紅茶",
            price: 15,
            category: "side_drink"
        },
        {
            id: "sd5",
            name: "奶茶",
            price: 20,
            category: "side_drink"
        },
        {
            id: "sd6",
            name: "豆漿",
            price: 20,
            category: "side_drink"
        }
    ]
}; 