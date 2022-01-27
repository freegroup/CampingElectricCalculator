const images = require.context("@/store/images/accu/", true, /\.png$/)

export default [
  { 
    uuid: "custom", 
    name: "Generic",
    description: "Generic Battery with user defined properties",
    imageSrc: images("./custom.png"),
    shopping: [],
    data: {
      amperestunden: 0,
      effective_amperestunden: 0, // es können die vollen 100Ah entnommen werden
      bms: "internal",
      spannung: 0,
      type: "LiFePO4"
    }
  },
  { 
    uuid: "6473ECD0-5189-4DB0-8E31-480975998729", 
    name: "LIONTRON",
    description: "LIONTRON LiFePO4 12,8V 100Ah LX Smart BMS mit Bluetooth",
    imageSrc: images("./liotron_100ah.png"),
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3t0bMQc",
        label: "LIONTRON LiFePO4 12,8V 100Ah",
        lastKnownPrice: 994
      }
    ],
    data: {
      amperestunden: 100,
      effective_amperestunden: 100, // es können die vollen 100Ah entnommen werden
      bms: "internal",
      spannung: 12,
      type: "LiFePO4"
    }
  },
  { 
    uuid: "BD79BE1F-AEF9-467E-A0B7-7270080AF600", 
    name: "LIONTRON",
    description: "LIONTRON LiFePO4 12,8V 200Ah LX Smart BMS mit Bluetooth",
    imageSrc: images("./liotron_200ah.png"),
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3mUKjeY",
        label: "LIONTRON LiFePO4 12,8V 200Ah",
        lastKnownPrice: 1796
      }
    ],
    data: {
      bms: "internal",
      amperestunden: 200,
      spannung: 12,
      type: "LiFePO4",
      effective_amperestunden: 200 // es können die vollen 200Ah entnommen werden
    }
  },
  { 
    uuid: "FFF2A576-2AB2-4C0D-8982-C2053E83DC73", 
    name: "LIONTRON",
    description: "LIONTRON LiFePO4 12,8V 150Ah LX Smart BMS mit Bluetooth",
    imageSrc: images("./liotron_150ah.png"),
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3sX9xNx",
        label: "LIONTRON LiFePO4 12,8V 150Ah",
        lastKnownPrice: 1386
      }
    ],
    data: {
      bms: "internal",
      amperestunden: 150,
      spannung: 12,
      type: "LiFePO4",
      effective_amperestunden: 150 // es können die vollen 150Ah entnommen werden
    }
  },
  { 
    uuid: "10A62DB5-3195-47CC-9DCE-E249DD8F7789", 
    name: "ECO-WORTHY",
    description: "ECO-WORTHY 12V 30Ah LiFePO4 with BMS",
    imageSrc: images("./eco_worthy_30Ah.png"),
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3tc7Uvq",
        label: "ECO-WORTHY 12V 30Ah LiFePO4 Akku wiederaufladbare Lithiumbatterie",
        lastKnownPrice: 115
      }
    ],
    data: {
      bms: "internal",
      amperestunden: 30,
      spannung: 12,
      type: "LiFePO4",
      effective_amperestunden: 30 // es können die vollen 30Ah entnommen werden
    }
  },
  { 
    uuid: "00DB77EB-C014-43BE-890F-251BE9F9859E", 
    name: "ECO-WORTHY",
    description: "ECO-WORTHY 12V 50Ah LiFePO4 with BMS",
    imageSrc: images("./eco_worthy_50Ah.png"),
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3qb8kQP",
        label: "ECO-WORTHY 12V 50Ah LiFePO4 Akku wiederaufladbare Lithiumbatterie",
        lastKnownPrice: 219
      }
    ],
    data: {
      bms: "internal",
      amperestunden: 50,
      spannung: 12,
      type: "LiFePO4",
      effective_amperestunden: 50 // es können die vollen 50Ah entnommen werden
    }
  },
  { 
    uuid: "A1DBFC5E-8900-4AD4-8ED7-392B0F470AE0", 
    name: "ECO-WORTHY ",
    description: "ECO-WORTHY 12V 100Ah LiFePO4 with BMS",
    imageSrc: images("./eco_worthy_100Ah.png"),
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3qcaGz2",
        label: "ECO-WORTHY 12V 100Ah LiFePO4 Akku wiederaufladbare Lithiumbatterie",
        lastKnownPrice: 429
      }
    ],
    data: {
      bms: "internal",
      amperestunden: 100,
      spannung: 12,
      type: "LiFePO4",
      effective_amperestunden: 100 // es können die vollen 100Ah entnommen werden
    }
  },
  { 
    uuid: "42C116CF-4380-4B27-9450-3E027A9393A1", 
    name: "ECTIVE",
    description: "ECTIVE 230Ah 12V AGM Versorgungsbatterie DC 230s mit LCD-Display VRLA Solar-Batterie mit integrierten Nachfüllpacks",
    imageSrc: images("./ective_230Ah.png"),
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3tg4urq",
        label: "ECTIVE 230Ah 12V AGM Versorgungsbatterie DC 230s mit LCD-Display VRLA Solar-Batterie mit integrierten Nachfüllpacks",
        lastKnownPrice: 354
      }
    ],
    data: {
      bms: "none",
      amperestunden: 230,
      spannung: 12,
      type: "AGM",
      effective_amperestunden: 230 * 0.6 // es können nur 60% der vollen Energie entnommen werden
    }
  },
  { 
    uuid: "A8996B36-C868-4B87-9498-31701E559E1B", 
    name: "ECTIVE",
    description: "ECTIVE 70Ah 12V AGM Batterie DC 70 VRLA Versorgungsbatterie",
    imageSrc: images("./ective_70Ah.png"),
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3tr5klo",
        label: "ECTIVE 70Ah 12V AGM Batterie DC 70 VRLA Versorgungsbatterie",
        lastKnownPrice: 130.82
      }
    ],
    data: {
      bms: "none",
      amperestunden: 70,
      spannung: 12,
      type: "AGM",
      effective_amperestunden: 70 * 0.6 // es können nur 60% der vollen Energie entnommen werden
    }
  },
  { 
    uuid: "662CD3C1-DB78-4FE2-A65F-2122E879BA5C", 
    name: "ECTIVE",
    description: "ECTIVE 100Ah 12V AGM Batterie DC 70 VRLA Versorgungsbatterie",
    imageSrc: images("./ective_100Ah.png"),
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3tr5klo",
        label: "ECTIVE 100Ah 12V AGM Batterie DC 70 VRLA Versorgungsbatterie",
        lastKnownPrice: 169.82
      }
    ],
    data: {
      bms: "none",
      amperestunden: 100,
      spannung: 12,
      type: "AGM",
      effective_amperestunden: 100 * 0.6 // es können nur 60% der vollen Energie entnommen werden
    }
  },
  { 
    uuid: "35F28D76-AB51-4C6F-87D0-EA42D940EF9D", 
    name: "ECTIVE",
    description: "ECTIVE LC300L BT 12V 300Ah 3840Wh LiFePO4-Batterie mit Bluetooth-Funktion Lithium-Eisenphosphat Versorgungs-Batterie",
    imageSrc: images("./ective_300Ah.png"),
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3HR5Uge",
        label: "ECTIVE LC300L BT 12V 300Ah 3840Wh LiFePO4-Batterie mit Bluetooth-Funktion Lithium-Eisenphosphat Versorgungs-Batterie",
        lastKnownPrice: 2525.50
      }
    ],
    data: {
      bms: "internal",
      amperestunden: 300,
      spannung: 12,
      type: "LiFePO4",
      effective_amperestunden: 300 // es können nur 60% der vollen Energie entnommen werden
    }
  },
  { 
    uuid: "B7CF51D7-CD05-4F11-85C5-A58036DA5FB3", 
    name: "ECTIVE",
    description: "ECTIVE 230Ah 12V Gel Frontterminal-Batterie DC230 Slim Gel Deep Cycle schmale Versorgungsbatterie",
    imageSrc: images("./ective_slim_230Ah.png"),
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3FhieEG",
        label: "ECTIVE 230Ah 12V Gel Frontterminal-Batterie DC230 Slim Gel Deep Cycle schmale Versorgungsbatterie",
        lastKnownPrice: 392.62
      }
    ],
    data: {
      bms: "none",
      amperestunden: 230,
      spannung: 12,
      type: "Gel",
      effective_amperestunden: 230 * 0.6 // es können nur 60% der vollen Energie entnommen werden
    }
  },
  { 
    uuid: "30DB5D21-B21D-441F-B398-CECBFB7627AD", 
    name: "Victron Energy",
    description: "Victron Energy AGM 12V 220Ah Deep Cycle",
    imageSrc: images("./victron_220_agm.png"),
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3FldXAh",
        label: "Victron Energy AGM 12V 220Ah Deep Cycle",
        lastKnownPrice: 525.90
      }
    ],
    data: {
      bms: "none",
      amperestunden: 220,
      spannung: 12,
      type: "AGM",
      effective_amperestunden: 220 * 0.6 // es können nur 60% der vollen Energie entnommen werden
    }
  }
]
