const images = require.context("@/assets/components/solar_booster/", true, /\.png$/)

const components = [
  { uuid: "4", type: "solarBooster", name: "BlueSolar 75|15", imageSrc: images("./bluesolar_75_15.png") }, 
  { uuid: "5", type: "solarBooster", name: "Booster 2", imageSrc: images("./bluesolar_75_15.png") }
]

export default components
