const images = require.context("@/store/images/carSocket/", true, /\.png$/)

export default [
  { 
    uuid: "FEAA20DC-89D3-41E3-B632-87E54DDAB6E8", 
    type: "carSocket", 
    name: "KFZ Socket 10A", 
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
      buchsen: 1
    }
  }
]
