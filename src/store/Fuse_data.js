const images = require.context("@/store/images/fuse/", true, /\.png$/)

export default
[
  { 
    uuid: "FBB6A004-FDC3-4937-A08C-30DED8119B66", 
    name: "Red Wulf", 
    description: "Automatic wear-free fuse for the motorhome electrical system. In case of overload or when you press the emergency stop button, the fuse switches off and can be switched on again manually when you press the latch again.",
    imageSrc: images("./redwulf-40A.png"),
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3zuCba8",
        label: "Red Wulf Fuse Switch 40A",
        lastKnownPrice: 23
      }
    ],
    data: {
      type: "Automatic",
      strom: 40,
      spannung: 12
    }
  },
  { 
    uuid: "C9A6897A-A19C-4CBD-A05B-F93ED56CF65A", 
    name: "Red Wulf", 
    description: "Automatic wear-free fuse for the motorhome electrical system. In case of overload or when you press the emergency stop button, the fuse switches off and can be switched on again manually when you press the latch again.",
    imageSrc: images("./redwulf-50A.png"),
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3mZ6yAi",
        label: "Red Wulf Fuse Switch 50A",
        lastKnownPrice: 15.99
      }
    ],
    data: {
      type: "Automatic",
      strom: 50,
      spannung: 12
    }
  },
  { 
    uuid: "0441223A-0331-4490-AA30-49C180F5323F", 
    name: "Red Wulf", 
    description: "Automatic wear-free fuse for the motorhome electrical system. In case of overload or when you press the emergency stop button, the fuse switches off and can be switched on again manually when you press the latch again.",
    imageSrc: images("./redwulf-70A.png"),
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3EYBpmy",
        label: "Red Wulf Fuse Switch 70A",
        lastKnownPrice: 24
      }
    ],
    data: {
      type: "Automatic",
      strom: 70,
      spannung: 12
    }
  },
  { 
    uuid: "EAB2F71E-4DD7-4DAF-9E64-34E746E495C5", 
    name: "Red Wulf", 
    description: "Automatic wear-free fuse for the motorhome electrical system. In case of overload or when you press the emergency stop button, the fuse switches off and can be switched on again manually when you press the latch again.",
    imageSrc: images("./redwulf-100A.png"),
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3zpOh4d",
        label: "Red Wulf Fuse Switch 100A",
        lastKnownPrice: 16
      }
    ],
    data: {
      type: "Automatic",
      strom: 100,
      spannung: 12
    }
  },
  { 
    uuid: "1943CC13-AC53-4EA3-9014-D936170FD203", 
    name: "Red Wulf", 
    description: "Automatic wear-free fuse for the motorhome electrical system. In case of overload or when you press the emergency stop button, the fuse switches off and can be switched on again manually when you press the latch again.",
    imageSrc: images("./redwulf-200A.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3mXGeGQ",
        label: "Red Wulf Fuse Switch 200A",
        lastKnownPrice: 16
      }
    ],
    data: {
      type: "Automatic",
      strom: 200,
      spannung: 12
    }
  }
]
