const images = require.context("@/store/images/killSwitch/", true, /\.png$/)

export default
[
  { 
    uuid: "CE4E06EA-2E15-4938-AFC5-0C7DA036E876", 
    type: "killSwitch", 
    name: "Kill Switch 300A", 
    description: "Battery Switch Disconnect 12V 24V 48V Battery Switch 1-2-Both-OFF, 300A Main Switch Waterproof Power Switch Battery Disconnect Master for Car Truck Boat Yacht...",
    imageSrc: images("./trennschalter_1_2_both_off.png"),
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3JVQVTX",
        label: "Battery Switch Disconnect 12V 24V 48V, Switch 1-2-Both-OFF, 300A"
      }
    ],
    data: {
      strom: 300,
      spannung: 12
    }
  }
]
