import RightNode from './RightNode'
import { toFixed } from "@/utils/Wire.js"

export default class DCDCBooster extends RightNode {
  constructor() {
    super()
  }

  getChildCandidates () {
    return ["switchPanel", "pressurePump", "fridge", "usb", "light", "heater", "carSocket"] 
  }

  getBaseVoltage () {
    return this.model?.data.spannung_out
  }

  getErrorMessages () {
    const result = []

    // if more than one child exists, each of them must have the same "spannung". It is not allowed 
    // to mix up the voltage
    //
    if ( this.children.length > 1 ) {
      // all direct children must have the same voltage
      //
      const firstSpannung = this.children[0].calculateConsumptionData().spannung
      if ( this.children.find( child => child.calculateConsumptionData().spannung !== firstSpannung) ) {
        result.push({ type: "Error", text: `It is not allowed to mix different voltages on the fuse.` })
      }
    }
    
    // Calculate if the accumulated "strom"
    //
    if ( this.children.length > 0 ) {
      const data = this.children[0].calculateConsumptionData()
      // skip the first element, because we have already the data of the first element in charge
      // ( slice(1) )
      this.children.slice(1).forEach( child => {
        data.strom += child.calculateConsumptionData().strom 
      })
      // the "leerlaufspannung" must be smaller than the max input of the charger
      //
      if ( data.strom > this.model.data.strom ) {
        result.push({ type: "Error", text: `The current <b>[${toFixed(data.strom)} A]</b> of the input sources are bigger than the maximum power which the fuse can handle <b>[${this.model.data.strom} A]</b>` })
      }
    }

    if ( this.parent ) {
      // Spannungen müssen passen
      const base = this.parent.getBaseVoltage()
      if ( this.model.data.spannung_min > base || this.model.data.spannung_max < base ) {
        if ( this.model.data.spannung_min !== this.model.data.spannung_max ) {
          result.push({ type: "Error", text: `The fuse operates with a supply voltage of <b>[${this.model.data.spannung_min}-${this.model.data.spannung_max} V]</b>. Input voltage of <b>[${this.parent.getBaseVoltage()} V]</b> is not supported.` })
        } else {
          result.push({ type: "Error", text: `The fuse operates with a supply voltage of <b>[${this.model.data.spannung_min} V]</b>. Input voltage of <b>[${this.parent.getBaseVoltage()} V]</b> is not supported.` })
        }
      }            
    }
 
    return result
  }

  calculateConsumptionData () {
    const result = { strom: 0, spannung: this.model.data.spannung_in, watt: 0, amperestunden: 0 }
    if ( this.children.length > 0 ) {
      // check that the attributes "strom" and "spannung" are in place
      result.strom = this.children[0].calculateConsumptionData().strom
      result.amperestunden = this.children[0].calculateConsumptionData().amperestunden
      this.children.slice(1).forEach( child => {
        result.strom += child.calculateConsumptionData().strom 
        result.amperestunden += child.calculateConsumptionData().amperestunden 
      })
    }
    // Umrechnen von der Ausgangsspannung zu der Eingangsspannung. Da ändert sich der Strom
    //
    result.strom = toFixed( (result.strom * this.model.data.spannung_out ) / this.model.data.spannung_in )
    result.amperestunden = toFixed( (result.amperestunden * this.model.data.spannung_out ) / this.model.data.spannung_in )
    
    result.watt = (result.strom * result.spannung)
    return result
  }
}
