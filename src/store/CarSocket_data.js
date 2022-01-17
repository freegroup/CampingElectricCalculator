const images = require.context("@/store/images/carSocket/", true, /\.png$/)

export default [
  { 
    uuid: "FEAA20DC-89D3-41E3-B632-87E54DDAB6E8", 
    name: "KFZ Socket", 
    imageSrc: images("./dodolar.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3K9xJCt",
        label: "Zigarettenanzünder Verteiler 12V Kfz zigarettenanzünder Adapter",
        lastKnownPrice: 8.38
      }
    ],
    data: {
      spannung: 12, 
      strom: 10, // I=P/U
      watt: 10 * 12,
      strom_je_anschluss: 10,
      buchsen: 1
    }
  },
  { 
    uuid: "71349955-D0FC-4BBB-A418-B85D5D84674E", 
    name: "KFZ Socket", 
    imageSrc: images("./enisina_dual.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3FxdP0O",
        label: "Zigarettenanzünder-Verteiler,12V/24V DoppelSteckdose,Wasserdicht",
        lastKnownPrice: 9.99
      }
    ],
    data: {
      spannung: 12, 
      strom: 2 * 10,
      watt: 2 * 10 * 12,
      strom_je_anschluss: 10,
      buchsen: 2
    }
  }
]
