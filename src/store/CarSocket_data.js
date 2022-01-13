const images = require.context("@/store/images/carSocket/", true, /\.png$/)

export default [
  { 
    uuid: "0CE42416-7410-40B7-BCED-ACF4F154C108", 
    type: "usb", 
    name: "USB 3.6A", 
    imageSrc: images("./usb.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3t9eWkF",
        label: "ProCar 67341000 Power USB-C/A",
        lastKnownPrice: 16.99
      }
    ],
    data: {
      spannung: 12, 
      strom: 3.6, // I=P/U
      watt: 3.6 * 12,
      buchsen: 1
    }
  }
]
