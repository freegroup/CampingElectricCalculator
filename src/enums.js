export default {
  usbConsumer: {
    spannung: {
      type: "number",
      editable: false
    }
  },
  accu: {
    type: {
      values: ["LiFePO4", "Blei", "Gel", "AGM"],
      type: "string"
    },
    bms: {
      values: ["intern", "none"],
      type: "string"
    }
  },
  starterBooster: {
    chargeSupport: {
      values: ["LiFePO4", "Blei", "Gel", "AGM"],
      type: "array"
    }
  },
  shoreBooster: {
    chargeSupport: {
      values: ["LiFePO4", "Blei", "Gel", "AGM"],
      type: "array"
    }
  },
  fuse: {
    type: {
      values: ["automatic", "meld"],
      type: "string"
    }
  },
  solarBooster: {
    type: {
      values: ["MPPT", "PWM"],
      type: "string"
    },
    chargeSupport: {
      values: ["LiFePO4", "Blei", "Gel", "AGM"],
      type: "array"
    }
  }
}