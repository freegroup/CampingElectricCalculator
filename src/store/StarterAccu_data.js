const images = require.context("@/store/images/starterAccu/", true, /\.png$/)

export default [
  { 
    uuid: "custom", 
    name: "Generic Starter Battery", 
    imageSrc: images("./custom.png"),
    exportable: false,
    shopping: [
    ],
    data: {
      spannung: 0, 
      strom: 0
    }
  },
  { 
    uuid: "1w3453245", 
    name: "Starter Battery", 
    imageSrc: images("./starter.png"),
    exportable: false,
    shopping: [
    ],
    data: {
      spannung: 12, 
      strom: 400
    }
  },
  /* NEW_COMPONENT_PLACE */
]
