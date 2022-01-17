const images = require.context("@/store/images/solarBooster/", true, /\.png$/)

export default [
  { 
    uuid: "17302EE5-08AC-4E2C-882B-F30EA9536B07", 
    name: "BlueSolar 75|15", 
    imageSrc: images("./bluesolar_75_15.png"),
    operationHours: 4.5,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/32PDkgo",
        label: "Victron Energy BlueSolar MPPT 75/15 12V 24V 15A",
        lastKnownPrice: 91
      }
    ],
    data: {
      type: "MPPT",
      chargeSupport: ["LiFePO4", "Blei", "AGM"],
      nennladestrom: 15,
      spannung: 12,
      // Eingangsspannung muss GÖßER als die Leewrlaufspannung der Solarpanele sein
      eingangsspannung: 75,
      // Muß größer/gleich als die Watt Leistung von den Solarpanelen sein
      eingangswatt: 200,
      // Solarmodul Strom bis maximal...
      kurzschlussstrom: 15
    }
  }, 
  { 
    uuid: "F9AB426A-5166-4B4E-8FB5-ACB7687BE78E", 
    name: "BlueSolar 75|10", 
    imageSrc: images("./bluesolar_75_10.png"),
    operationHours: 4.5,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3sYrHyk",
        label: "Victron Energy BlueSolar MPPT 75/10 12V 24V 10A",
        lastKnownPrice: 81
      }
    ],
    data: {
      type: "MPPT",
      chargeSupport: ["LiFePO4", "Blei", "AGM"],
      nennladestrom: 10,
      spannung: 12,
      // Eingangsspannung muss GÖßER als die Leerlaufspannung der Solarpanele sein
      eingangsspannung: 75,
      // Muß größer/gleich als die Watt Leistung von den Solarpanelen sein
      eingangswatt: 130,
      // Solarmodul Strom bis maximal...
      kurzschlussstrom: 13
    }
  }, 
  { 
    uuid: "B5F979A2-5D7F-44F9-8BEE-BB1AE257D51F", 
    name: "Thlevel PWM", 
    imageSrc: images("./thlevel_30A_pwm.png"),
    operationHours: 4.5,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3n0xKi5",
        label: "Thlevel 30A 12V/24V Solar Laderegler",
        lastKnownPrice: 18.90
      }
    ],
    data: {
      type: "PWM",
      chargeSupport: ["Lithium", "Blei", "AGM"],
      nennladestrom: 30,
      spannung: 12,
      // Eingangsspannung muss GÖßER als die Leerlaufspannung der Solarpanele sein
      eingangsspannung: 50,
      // Muß größer/gleich als die Watt Leistung von den Solarpanelen sein
      eingangswatt: 130,
      // Solarmodul Strom bis maximal...
      kurzschlussstrom: 30
    }
  },
  { 
    uuid: "E9C5518A-B503-4C00-94F6-F16929A6DFDE", 
    name: "Büttner MPP 440", 
    imageSrc: images("./buettner_mpp_440.png"),
    operationHours: 4.5,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3n5pmOc",
        label: "Büttner MT-Solarregler MPP 440 inkl. Temperaturfühler",
        lastKnownPrice: 408
      }
    ],
    data: {
      type: "MPPT",
      chargeSupport: ["LiFePO4", "AGM", "Blei"],
      nennladestrom: 32,
      spannung: 12,
      // Eingangsspannung muss GÖßER als die Leerlaufspannung der Solarpanele sein
      eingangsspannung: 50,
      // Muß größer/gleich als die Watt Leistung von den Solarpanelen sein
      eingangswatt: 440,
      // Solarmodul Strom bis maximal...
      kurzschlussstrom: 26.5
    }
  },
  { 
    uuid: "CF70B8A2-B4EC-4639-BBD7-63D17D8BD39E", 
    name: "Büttner MPP 260", 
    imageSrc: images("./buettner_mpp_260.png"),
    operationHours: 4.5,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3qVYBNC",
        label: "Büttner MT-Solarregler MPP 260 inkl. Temperaturfühler",
        lastKnownPrice: 252
      }
    ],
    data: {
      type: "MPPT",
      chargeSupport: ["LiFePO4", "AGM", "Blei"],
      nennladestrom: 16,
      spannung: 12,
      // Eingangsspannung muss GÖßER als die Leerlaufspannung der Solarpanele sein
      eingangsspannung: 50,
      // Muß größer/gleich als die Watt Leistung von den Solarpanelen sein
      eingangswatt: 260,
      // Solarmodul Strom bis maximal...
      kurzschlussstrom: 18.5
    }
  },
  { 
    uuid: "0E276659-6695-4900-821B-A1D23D29B8AA", 
    name: "Büttner MPP 170", 
    imageSrc: images("./buettner_mpp_170.png"),
    operationHours: 4.5,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3n3xj6v",
        label: "Büttner MT-Solarregler MPP 170 inkl. Temperaturfühler",
        lastKnownPrice: 205
      }
    ],
    data: {
      type: "MPPT",
      chargeSupport: ["LiFePO4", "AGM", "Blei"],
      nennladestrom: 12.5,
      spannung: 12,
      // Eingangsspannung muss GÖßER als die Leerlaufspannung der Solarpanele sein
      eingangsspannung: 50,
      // Muß größer/gleich als die Watt Leistung von den Solarpanelen sein
      eingangswatt: 170,
      // Solarmodul Strom bis maximal...
      kurzschlussstrom: 10.5
    }
  },
  { 
    uuid: "5920A236-17F1-46FD-9B1B-CEE42CAD0472", 
    name: "Victron Energy MPPT 100/50", 
    imageSrc: images("./victron_100_50.png"),
    operationHours: 4.5,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3tjpw8E",
        label: "Victron Energy SCC10050210 SmartSolar MPPT Solar Charge Controller 100/50",
        lastKnownPrice: 313.60
      }
    ],
    data: {
      type: "MPPT",
      chargeSupport: ["LiFePO4", "AGM", "Blei"],
      nennladestrom: 50,
      spannung: 12,
      // Eingangsspannung muss GÖßER als die Leerlaufspannung der Solarpanele sein
      eingangsspannung: 100,
      // Muß größer/gleich als die Watt Leistung von den Solarpanelen sein
      eingangswatt: 700,
      // Solarmodul Strom bis maximal...
      kurzschlussstrom: 60
    }
  }
]
