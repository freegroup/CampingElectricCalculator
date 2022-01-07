const images = require.context("@/store/images/solarBooster/", true, /\.png$/)

export default [
  { 
    uuid: "17302EE5-08AC-4E2C-882B-F30EA9536B07", 
    type: "solarBooster", 
    name: "BlueSolar 75|15", 
    imageSrc: images("./bluesolar_75_15.png"),
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/32PDkgo",
        label: "Victron Energy BlueSolar MPPT 75/15 12V 24V 15A"
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
      eingangswatt: 200
    }
  }, 
  { 
    uuid: "F9AB426A-5166-4B4E-8FB5-ACB7687BE78E", 
    type: "solarBooster", 
    name: "BlueSolar 75|10", 
    imageSrc: images("./bluesolar_75_10.png"),
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3sYrHyk",
        label: "Victron Energy BlueSolar MPPT 75/10 12V 24V 10A"
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
      eingangswatt: 130
    }
  }, 
  { 
    uuid: "B5F979A2-5D7F-44F9-8BEE-BB1AE257D51F", 
    type: "solarBooster", 
    name: "Thlevel 30A PWM", 
    imageSrc: images("./thlevel_30A_pwm.png"),
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3n0xKi5",
        label: "Thlevel 30A 12V/24V Solar Laderegler"
      }
    ],
    data: {
      type: "PWM",
      chargeSupport: ["LiFePO4", "Blei", "AGM"],
      nennladestrom: 30,
      spannung: 12,
      // Eingangsspannung muss GÖßER als die Leerlaufspannung der Solarpanele sein
      eingangsspannung: 50,
      // Muß größer/gleich als die Watt Leistung von den Solarpanelen sein
      eingangswatt: 130
    }
  }
]
