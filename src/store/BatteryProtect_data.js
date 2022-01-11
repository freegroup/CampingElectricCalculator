const images = require.context("@/store/images/batteryProtect/", true, /\.png$/)

export default
[
  { 
    uuid: "7FA1FD36-70DE-4364-AAD7-5CE44D1953EC", 
    type: "batteryProtect", 
    name: "Victron Battery Protect 65A", 
    description: "The BatteryProtect function disconnects the battery from the (less important) consumers before it is completely discharged, which would damage it.",
    imageSrc: images("./victron_65A.png"),
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3nbmm2P",
        label: "Victron Battery Protect 12/24V 65A programmierbar für Wohnmobil und Yacht",
        lastKnownPrice: 41.47
      }
    ],
    data: {
      strom: 65,
      spannung: 12
    }
  }
]
