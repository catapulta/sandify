import React, { useEffect } from "react"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import { useDispatch, useSelector } from "react-redux"
import MachineSettings from "@/features/machines/MachineSettings"
import LayerManager from "@/features/layers/LayerManager"
import PreviewStats from "@/features/preview/PreviewStats"
import { selectSelectedLayer } from "@/features/layers/layersSlice"
import { loadFont, supportedFonts } from "@/features/fonts/fontsSlice"

const Sidebar = () => {
  const dispatch = useDispatch()
  const layer = useSelector(selectSelectedLayer)

  useEffect(() => {
    Object.keys(supportedFonts).forEach((url) => dispatch(loadFont(url)))
  }, [dispatch])

  if (layer) {
    return (
      <Tabs defaultActiveKey="draw">
        <Tab
          eventKey="draw"
          title="Layers"
          className="full-page-tab"
        >
          <LayerManager />
        </Tab>

        <Tab
          eventKey="machine"
          title="Machine"
          className="full-page-tab"
        >
          <MachineSettings />
        </Tab>

        <Tab
          eventKey="stats"
          title="Stats"
          className="full-page-tab"
        >
          <PreviewStats />
        </Tab>
      </Tabs>
    )
  } else {
    return <div></div>
  }
}

export default React.memo(Sidebar)
