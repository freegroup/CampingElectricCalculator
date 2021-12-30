const images = require.context("@/assets/components/accu/", true, /\.png$/)

const components = [
  { uuid: "1", type: "accu", name: "Akku 1", imageSrc: images("./liotron_artic.png") },
  { uuid: "2", type: "accu", name: "Akku 2", imageSrc: images("./liotron_artic.png") },
  { uuid: "3", type: "accu", name: "Akku 3", imageSrc: images("./liotron_artic.png") }
]

export default components
