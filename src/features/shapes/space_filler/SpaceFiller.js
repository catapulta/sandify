import Shape from "../Shape"
import {
  lsystem,
  lsystemPath,
  onSubtypeChange,
  onMinIterations,
  onMaxIterations,
} from "@/common/lindenmayer"
import { resizeVertices } from "@/common/geometry"
import { subtypes } from "./subtypes"

const options = {
  fillerSubtype: {
    title: "Type",
    type: "dropdown",
    choices: Object.keys(subtypes),
    onChange: (model, changes, state) => {
      return onSubtypeChange(subtypes[changes.fillerSubtype], changes, state)
    },
  },
  iterations: {
    title: "Iterations",
    min: (state) => {
      return onMinIterations(subtypes[state.fillerSubtype], state)
    },
    max: (state) => {
      return onMaxIterations(subtypes[state.fillerSubtype], state)
    },
  },
}

export default class SpaceFiller extends Shape {
  constructor() {
    super("spaceFiller")
    this.label = "Space Filler"
    this.usesMachine = true
    this.autosize = false
    this.selectGroup = "Erasers"
    this.linkText = "Fractal charm: space filling curves"
    this.link = "https://www.youtube.com/watch?v=RU0wScIj36o"
  }

  canMove(state) {
    return false
  }

  canChangeSize(state) {
    return false
  }

  canRotate(state) {
    return false
  }

  getInitialState() {
    return {
      ...super.getInitialState(),
      ...{
        iterations: 6,
        fillerSubtype: "Hilbert",
      },
    }
  }

  getVertices(state) {
    const machine = state.machine
    const iterations = state.shape.iterations || 1

    let sizeX, sizeY
    if (machine.rectangular) {
      sizeX = machine.maxX - machine.minX
      sizeY = machine.maxY - machine.minY
    } else {
      sizeX = sizeY = machine.maxRadius * 2.0
    }

    // generate our vertices using a set of l-system rules
    let config = subtypes[state.shape.fillerSubtype]
    config.iterations = iterations

    if (config.side === undefined) {
      config.side = 5
    }
    if (config.angle === undefined) {
      config.angle = Math.PI / 2
    }

    let curve = lsystemPath(lsystem(config), config)
    let scale = 1

    if (config.iterationsGrow) {
      scale =
        typeof config.iterationsGrow === "function"
          ? config.iterationsGrow(config)
          : config.iterationsGrow
    }

    return resizeVertices(curve, sizeX * scale, sizeY * scale)
  }

  getOptions() {
    return options
  }
}
