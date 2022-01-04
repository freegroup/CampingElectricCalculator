import Node from './Node'

export default class SolarPanel extends Node {
  constructor() {
    super()
  }

  getChildCandidates () {
    return ["solarPanel"] 
  }

  getErrors () {
    const result = []
    // it is only allow to have one child panel. This must be the same kind. 
    // A child panel is interpreted as "Seriel" or "Reihenschaltung" of the panels
    //
    if ( this.children.length > 1 ) {
      result.push("Maximnal one child panel is allowed.")
    }

    if ( this.children.length === 1 ) {
      const child = this.children[0]
      if ( child.model.uuid !== this.model.uuid ) {
        result.push("It is only allowd to add panels in 'serial' mode of the same kind")
      }
    }
    return result
  }

  calculateCircuitData () {
    const result = JSON.parse(JSON.stringify(this.model.data)) // deep copy
    // It is only allowed, that this element has ONE direct child element
    //
    if ( this.children.length === 1) {
      const childData = this.children[0].calculateCircuitData()
      /* SolarPanel data struct
          data: {
            gewicht: 6000,
            watt: 80,
            zellen: 36,
            spannung: 18.20,
            leerlaufspannung: 21.50,
            strom: 4.40,
            kurzschlusstrom: 4.91
          }
      */
      result.gewicht += childData.gewicht
      result.watt += childData.watt
      result.spannung += childData.spannung
      result.leerlaufspannung += childData.leerlaufspannung
      // in "Reihe" geschaltet SolarPanel verdoppeln sich die SPannung und die Ströme bleiben gleich
      //
      // 'strom' und 'kurzschlusstrom' verändern sich somit nicht.
      // siehe: https://www.youtube.com/watch?v=xItbVw-IPzI
    }

    return result
  }
}
