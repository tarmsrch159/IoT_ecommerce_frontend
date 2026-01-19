export const useProducts = () => {
  // ข้อมูลสินค้า IoT ตัวอย่าง
  const products = ref([
    {
      id: 1,
      name: 'ESP32 DevKit V1',
      price: 250,
      image: 'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=400',
      category: 'Controllers',
      description: 'บอร์ดพัฒนา ESP32 รองรับ WiFi และ Bluetooth',
      stock: 50,
      sku: 'ESP32-DK-001',
      specs: ['WiFi 802.11 b/g/n', 'Bluetooth 4.2', 'Dual Core 240MHz', '520KB SRAM']
    },
    {
      id: 2,
      name: 'Arduino Uno R3',
      price: 350,
      image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400',
      category: 'Controllers',
      description: 'บอร์ด Arduino Uno R3 ของแท้ 100%',
      stock: 30,
      sku: 'ARD-UNO-R3',
      specs: ['ATmega328P', '16MHz', '32KB Flash', '14 Digital I/O']
    },
    {
      id: 3,
      name: 'Raspberry Pi 4 Model B 4GB',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400',
      category: 'Controllers',
      description: 'คอมพิวเตอร์ขนาดเล็ก Raspberry Pi 4 RAM 4GB',
      stock: 20,
      sku: 'RPI4-4GB',
      specs: ['Quad Core 1.5GHz', '4GB RAM', 'Dual 4K Display', 'Gigabit Ethernet']
    },
    {
      id: 4,
      name: 'DHT22 Temperature & Humidity Sensor',
      price: 180,
      image: 'https://images.unsplash.com/photo-1591489378430-4f9d0c6e5e5f?w=400',
      category: 'Sensors',
      description: 'เซ็นเซอร์วัดอุณหภูมิและความชื้น ความแม่นยำสูง',
      stock: 100,
      sku: 'DHT22-001',
      specs: ['Temperature: -40~80°C', 'Humidity: 0~100%RH', 'Accuracy: ±0.5°C', 'Digital Output']
    },
    {
      id: 5,
      name: 'HC-SR04 Ultrasonic Sensor',
      price: 45,
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400',
      category: 'Sensors',
      description: 'เซ็นเซอร์วัดระยะทางด้วยคลื่นอัลตราโซนิก',
      stock: 150,
      sku: 'HC-SR04',
      specs: ['Range: 2cm-400cm', 'Accuracy: 3mm', 'Angle: 15°', 'Working Voltage: 5V']
    },
    {
      id: 6,
      name: 'Smart WiFi Plug',
      price: 450,
      image: 'https://images.unsplash.com/photo-1558089687-e1c6e5e0e6c7?w=400',
      category: 'Smart Home',
      description: 'ปลั๊กไฟอัจฉริยะควบคุมผ่าน WiFi',
      stock: 40,
      sku: 'WIFI-PLUG-01',
      specs: ['WiFi 2.4GHz', 'Max Load: 10A', 'Voice Control', 'Timer Function']
    },
    {
      id: 7,
      name: 'PIR Motion Sensor',
      price: 65,
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400',
      category: 'Sensors',
      description: 'เซ็นเซอร์ตรวจจับการเคลื่อนไหว PIR',
      stock: 80,
      sku: 'PIR-HC-SR501',
      specs: ['Detection Range: 7m', 'Angle: 120°', 'Voltage: 5-20V', 'Delay Time: 0.3s-200s']
    },
    {
      id: 8,
      name: 'NodeMCU ESP8266',
      price: 150,
      image: 'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=400',
      category: 'Controllers',
      description: 'บอร์ดพัฒนา ESP8266 พร้อม WiFi ในตัว',
      stock: 60,
      sku: 'NODEMCU-ESP8266',
      specs: ['WiFi 802.11 b/g/n', '80MHz CPU', '4MB Flash', 'MicroUSB']
    },
    {
      id: 9,
      name: 'Smart LED Strip RGB 5M',
      price: 890,
      image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400',
      category: 'Smart Home',
      description: 'ไฟ LED เส้นอัจฉริยะ RGB ควบคุมผ่าน WiFi',
      stock: 25,
      sku: 'LED-RGB-5M',
      specs: ['Length: 5M', '300 LEDs', 'RGB Color', 'WiFi Control', 'Music Sync']
    },
    {
      id: 10,
      name: 'MQ-2 Gas Sensor',
      price: 85,
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400',
      category: 'Sensors',
      description: 'เซ็นเซอร์ตรวจจับก๊าซและควัน',
      stock: 70,
      sku: 'MQ2-GAS',
      specs: ['Detects: LPG, Propane, Methane', 'Voltage: 5V', 'Analog Output', 'Fast Response']
    },
    {
      id: 11,
      name: 'OLED Display 0.96" I2C',
      price: 120,
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400',
      category: 'Accessories',
      description: 'จอแสดงผล OLED ขนาด 0.96 นิ้ว',
      stock: 90,
      sku: 'OLED-096-I2C',
      specs: ['Size: 0.96"', 'Resolution: 128x64', 'Interface: I2C', 'Color: White/Blue']
    },
    {
      id: 12,
      name: 'Servo Motor SG90',
      price: 55,
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400',
      category: 'Accessories',
      description: 'มอเตอร์เซอร์โว SG90 ขนาดเล็ก',
      stock: 120,
      sku: 'SERVO-SG90',
      specs: ['Torque: 1.8kg/cm', 'Speed: 0.1s/60°', 'Voltage: 4.8-6V', 'Angle: 180°']
    }
  ])

  // หมวดหมู่สินค้า
  const categories = ref([
    { id: 'all', name: 'ทั้งหมด', count: 12 },
    { id: 'Controllers', name: 'บอร์ดควบคุม', count: 4 },
    { id: 'Sensors', name: 'เซ็นเซอร์', count: 4 },
    { id: 'Smart Home', name: 'Smart Home', count: 2 },
    { id: 'Accessories', name: 'อุปกรณ์เสริม', count: 2 }
  ])

  // ฟังก์ชันกรองสินค้าตามหมวดหมู่
  const filterByCategory = (category) => {
    if (category === 'all') {
      return products.value
    }
    return products.value.filter(product => product.category === category)
  }

  // ฟังก์ชันค้นหาสินค้า
  const searchProducts = (query) => {
    if (!query) return products.value
    
    const lowerQuery = query.toLowerCase()
    return products.value.filter(product => 
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
    )
  }

  // ฟังก์ชันหาสินค้าจาก ID
  const getProductById = (id) => {
    return products.value.find(product => product.id === parseInt(id))
  }

  return {
    products,
    categories,
    filterByCategory,
    searchProducts,
    getProductById
  }
}
