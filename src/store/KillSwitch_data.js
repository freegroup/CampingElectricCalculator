const images = require.context("@/store/images/killSwitch/", true, /\.png$/)

export default
[
  { 
    uuid: "custom", 
    name: "Generic Main Switch", 
    description: "Bettery disconnect switch",
    imageSrc: images("./custom.png"),
    exportable: true,
    shopping: [],
    data: {
      strom: 0,
      spannung: 0
    }
  },
  { 
    uuid: "CE4E06EA-2E15-4938-AFC5-0C7DA036E876", 
    name: "Kill Switch", 
    description: "Battery Switch Disconnect 12V 24V 48V Battery Switch 1-2-Both-OFF, 300A Main Switch Waterproof Power Switch Battery Disconnect Master for Car Truck Boat Yacht...",
    imageSrc: images("./trennschalter_1_2_both_off.png"),
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3JVQVTX",
        label: "Battery Switch Disconnect 12V 24V 48V, Switch 1-2-Both-OFF, 300A",
        lastKnownPrice: 20.29
      }
    ],
    data: {
      strom: 300,
      spannung: 12
    }
  },
  { 
    uuid: "13219DB7-D470-42F2-B326-BB981AAB9A7F", 
    name: "Kill Switch", 
    description: "Batteriehauptschalter Batterie Hauptschalter Batterieschalter, 12-36 V BEIDES/AUS Doppel Batterieschalter Batterie Wahlschalter",
    imageSrc: images("./dweekiy_300A.png"),
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3A5lSRh",
        label: "Batteriehauptschalter Batterie Hauptschalter 300A, 12-36 V BEIDES/AUS Doppel",
        lastKnownPrice: 62.99
      }
    ],
    data: {
      strom: 300,
      spannung: 12
    }
  },
  { 
    uuid: "DD36D098-7AC8-488A-BE4A-F944E9753F54", 
    name: "CoCar automatic Switch", 
    description: "Cocar Auto Kfz 12V Elektromagnetisch Batterietrennschalter",
    imageSrc: images("./cocar_100A.png"),
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/33gCeL3",
        label: "Cocar Auto Kfz 12V Elektromagnetisch Batterietrennschalter",
        lastKnownPrice: 55.99
      }
    ],
    data: {
      strom: 100,
      spannung: 12
    }
  },
  { 
    uuid: "74AC7D08-F937-4916-815F-09FD65A78960", 
    name: "WakAuto remote Switch", 
    description: "Wakauto Fernbedienung Batterietrennschalter Schnitt 12 V Auto Auto Fahrzeug Elektromagnetische Trennschalter",
    imageSrc: images("./wakauto_180A.png"),
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/33gCeL3",
        label: "Wakauto Fernbedienung Batterietrennschalter Schnitt 12 V Auto Auto Fahrzeug Elektromagnetische Trennschalter",
        lastKnownPrice: 56.99
      }
    ],
    data: {
      strom: 180,
      spannung: 12
    }
  },
  { 
    uuid: "6FA6B3A0-5E11-481D-BFB8-E12BB214F8B9", 
    name: "Hella Switch", 
    description: "HELLA 6EK 002 843-003 Hauptschalter, Batterie - S33 - Drehbetätigung",
    imageSrc: images("./hella_1000A.png"),
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3rmUg6j",
        label: "HELLA 6EK 002 843-003 Hauptschalter, Batterie - S33 - Drehbetätigung",
        lastKnownPrice: 20.91
      }
    ],
    data: {
      strom: 1000,
      spannung: 12
    }
  }
]
