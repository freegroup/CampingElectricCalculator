import LeftNode from './LeftNode'

export default class SolarPanel extends LeftNode {
  constructor() {
    super()
  }

  getChildCandidates () {
    return ["solarPanel"] 
  }

  getErrorMessages () {
    const result = []
    // it is only allow to have one child panel. This must be the same kind. 
    // A child panel is interpreted as "Seriel" or "Reihenschaltung" of the panels
    //
    if ( this.children.length > 1 ) {
      result.push({ type: "Error", text: "Maximnal one child panel is allowed." } )
    }

    if ( this.children.length === 1 ) {
      const child = this.children[0]
      if ( child.model.uuid !== this.model.uuid ) {
        result.push({ type: "Error", text: "It is only allowd to add panels in 'serial' mode of the same kind" })
      }
    }
    return result
  }

  calculateInputData () {
    return null
  }

  calculateOutputData () {
    const result = JSON.parse(JSON.stringify(this.model.data)) // deep copy
    // It is only allowed, that this element has ONE direct child element
    //
    if ( this.children.length === 1) {
      const childData = this.children[0].calculateOutputData()
      /* SolarPanel data struct
          data: {
            watt: 80,
            nennspannung: 18.20,
            leerlaufspannung: 21.50,
            nennstrom: 4.40,
            kurzschlusstrom: 4.91
          }
      */
      result.watt += childData.watt
      result.nennspannung += childData.nennspannung
      result.leerlaufspannung += childData.leerlaufspannung
      // in "Reihe" geschaltet SolarPanel addieren sich die Spannung und die Ströme bleiben gleich
      //
      // 'nennstrom' und 'kurzschlusstrom' verändern sich somit nicht.
      // siehe: https://www.youtube.com/watch?v=xItbVw-IPzI
    }

    return result
  }
}
