const images = require.context("@/assets/components/starter_booster/", true, /\.png$/)

const components = [
  { uuid: "6", type: "starterBooster", name: "Schaudt WA121525", imageSrc: images("./schaudt_wa121525.png") }
]

export default components
