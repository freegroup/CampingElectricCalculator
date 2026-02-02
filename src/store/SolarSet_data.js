const images = require.context("@/store/images/solarSet/", true, /\.png$/)

export default [
  { 
    uuid: "90ACB258-8AA6-41A9-8576-8368BD8C2102", 
    type: "solarSet", 
    name: "Panel+Controller 100 Watt", 
    imageSrc: images("./tp_solar_100w.png"),
    operationHours: 4.5,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/33X79wh",
        label: "100W 12V Solarpanel Solarmodul Solarpanel-Set",
        lastKnownPrice: 139.99
      }
    ],
    data: {
      // Panel data
      panel: {
        watt: 100, // Watt peak
        nennspannung: 18, // Nennspannung
        leerlaufspannung: 21.8,
        nennstrom: 5.56, // Nennstrom
        kurzschlussstrom: 5.98
      },

      // Controller Data
      controller: {
        type: "PWM",
        chargeSupport: ["Gel", "Blei", "AGM"],
        nennladestrom: 20,
        // Eingangsspannung muss GÖßER als die Leewrlaufspannung der Solarpanele sein
        eingangsspannung: 23,
        // Muß größer/gleich als die Watt Leistung von den Solarpanelen sein
        eingangswatt: 200,
        // Solarmodul Strom bis maximal...
        kurzschlussstrom: 15,
        spannung: 12
      }
    }
  }
  /* NEW_COMPONENT_PLACE */
]
