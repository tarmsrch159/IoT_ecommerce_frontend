# IoT E-commerce Website

ระบบขายสินค้าและอุปกรณ์ IoT ที่พัฒนาด้วย **Nuxt.js 3**, **Tailwind CSS** และ **Pinia Store** ในสไตล์ **Modern Minimalist** พร้อมธีม Dark Mode ที่ได้แรงบันดาลใจจาก InvoiceFlow

## คุณสมบัติหลัก

### ฟีเจอร์ระบบ
- ✅ **Responsive Design** - รองรับทั้ง Desktop, Tablet และ Mobile
- ✅ **Modern Dark Theme** - ธีมสีเข้มสไตล์ modern minimalist
- ✅ **Shopping Cart System** - ระบบตะกร้าสินค้าด้วย Pinia Store พร้อม LocalStorage
- ✅ **Product Management** - จัดการสินค้า 12 รายการใน 4 หมวดหมู่
- ✅ **Category Filter** - กรองสินค้าตามหมวดหมู่
- ✅ **Search Functionality** - ค้นหาสินค้าด้วยชื่อ, SKU, หมวดหมู่
- ✅ **Product Sorting** - เรียงลำดับสินค้าตามราคา, ชื่อ
- ✅ **Product Detail Page** - หน้ารายละเอียดสินค้าแบบครบถ้วน

### การออกแบบ UI/UX
- **Rounded Components** - ทุก component มีความโค้งมน (rounded-xl, rounded-2xl)
- **Gradient Colors** - ใช้ gradient สีสวยงามตามธีม
- **Hover Effects** - เอฟเฟกต์ hover และ transition ที่ลื่นไหล
- **Glow Effects** - เอฟเฟกต์เรืองแสงสำหรับปุ่มและการ์ด
- **Badge System** - แสดงหมวดหมู่และสถานะสินค้าด้วย badge สีสัน

## เทคโนโลยีที่ใช้

- **Nuxt.js 3** - Framework สำหรับ Vue.js
- **Vue 3** - JavaScript Framework
- **Tailwind CSS** - Utility-first CSS Framework
- **Pinia** - State Management สำหรับ Vue 3
- **Vite** - Build Tool
- **npm** - Package Manager

## การติดตั้งและรัน

### ติดตั้ง Dependencies

```bash
npm install
```

### รันโหมด Development

```bash
npm run dev
```

เว็บไซต์จะรันที่ `http://localhost:3000`

### Build สำหรับ Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## โครงสร้างโปรเจกต์

```
iot-ecommerce/
├── assets/css/           # Tailwind CSS และ custom styles
├── components/           # Vue Components
│   ├── Navbar.vue
│   ├── ProductCard.vue
│   ├── CategoryFilter.vue
│   └── Footer.vue
├── composables/          # Composables
│   └── useProducts.js
├── pages/                # Pages (Auto-routing)
│   ├── index.vue
│   ├── cart.vue
│   └── products/
├── stores/               # Pinia Stores
│   └── cart.js
└── nuxt.config.ts        # Nuxt Configuration
```

## หน้าเว็บไซต์

- **หน้าแรก (/)** - Hero Section, สินค้าแนะนำ, หมวดหมู่
- **สินค้าทั้งหมด (/products)** - รายการสินค้า, กรองหมวดหมู่, เรียงลำดับ
- **รายละเอียดสินค้า (/products/[id])** - ข้อมูลสินค้า, คุณสมบัติ, เพิ่มลงตะกร้า
- **ตะกร้าสินค้า (/cart)** - จัดการสินค้า, สรุปยอด, ชำระเงิน

## สีและธีม

- **พื้นหลัง**: Dark Navy/Black (#0f1419, #1a1f2e)
- **สีเน้น**: Bright Blue (#3b82f6, #2563eb)
- **สีเขียว**: Emerald (#10b981, #059669)
- **สีม่วง**: Purple/Pink Gradient (#8b5cf6, #ec4899)

## ผู้พัฒนา

สร้างด้วย ❤️ โดยใช้ Nuxt.js และ Tailwind CSS
