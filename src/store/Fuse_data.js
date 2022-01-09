const images = require.context("@/store/images/fuse/", true, /\.png$/)

export default
[
  { 
    uuid: "FBB6A004-FDC3-4937-A08C-30DED8119B66", 
    type: "fuse", 
    name: "Red Wulf Fuse 40A", 
    description: "Automatic wear-free fuse for the motorhome electrical system. In case of overload or when you press the emergency stop button, the fuse switches off and can be switched on again manually when you press the latch again.",
    imageSrc: images("./redwulf-40A.png"),
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3zuCba8",
        label: "Red Wulf Fuse Switch 40A"
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
    type: "fuse", 
    name: "Red Wulf Fuse 50A", 
    description: "Automatic wear-free fuse for the motorhome electrical system. In case of overload or when you press the emergency stop button, the fuse switches off and can be switched on again manually when you press the latch again.",
    imageSrc: images("./redwulf-50A.png"),
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3mZ6yAi",
        label: "Red Wulf Fuse Switch 50A"
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
    type: "fuse", 
    name: "Red Wulf Fuse 70A", 
    description: "Automatic wear-free fuse for the motorhome electrical system. In case of overload or when you press the emergency stop button, the fuse switches off and can be switched on again manually when you press the latch again.",
    imageSrc: images("./redwulf-70A.png"),
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3EYBpmy",
        label: "Red Wulf Fuse Switch 70A"
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
    type: "fuse", 
    name: "Red Wulf Fuse 100A", 
    description: "Automatic wear-free fuse for the motorhome electrical system. In case of overload or when you press the emergency stop button, the fuse switches off and can be switched on again manually when you press the latch again.",
    imageSrc: images("./redwulf-100A.png"),
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3zpOh4d",
        label: "Red Wulf Fuse Switch 100A"
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
    type: "fuse", 
    name: "Red Wulf Fuse 200A", 
    description: "Automatic wear-free fuse for the motorhome electrical system. In case of overload or when you press the emergency stop button, the fuse switches off and can be switched on again manually when you press the latch again.",
    imageSrc: images("./redwulf-200A.png"),
    operationHours: 24,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3mXGeGQ",
        label: "Red Wulf Fuse Switch 200A"
      }
    ],
    data: {
      type: "Automatic",
      strom: 200,
      spannung: 12
    }
  }
]
