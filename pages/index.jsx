import React, { useState, useEffect, useRef } from "react"
import { ReactReader, ReactReaderStyle} from "react-reader"
import Head from 'next/head'

import { TextField, Button } from "@mui/material"

const App = () => {
  const [location, setLocation] = useState(5)
  const [lPage, setLPage] = useState("")
  const [locationDefault, setLocationDefault] = useState(null)
  const [page, setPage] = useState('')
  const renditionRef = useRef(null)
  const locationChanged = (epubcify) => {
    setLocation(epubcify)
    if (renditionRef.current) {
      const { displayed } = renditionRef.current.location.start
      setPage(`Page ${displayed.page} of ${displayed.total}`)
      setLPage(`${displayed.page}`)
      localStorage.setItem('lPage', displayed.page)
    }
  }
  
  const [ hide, setHide ] = useState(true)

  const hidePage = () => {
    hide  === false ? (setHide(true)) : (setHide(false))
  }
  
  useEffect(() => {
    setLocationDefault(localStorage.getItem("location"))
    setLPage(localStorage.getItem("lPage"))
    setLocation(localStorage.getItem("location"))
  }, [])
  
  useEffect( () => {
    document.addEventListener('keydown', (e) => {
      if (e.key === "h") {
        hidePage()
      }
    })
  }, [hidePage])

  const styles = {
    ...ReactReaderStyle,
  readerArea: {
    ...ReactReaderStyle.readerArea,
    backgroundColor: "white"
  }
  }

  return (
    <div>
      <Head>
        <title>Nova guia</title>
      </Head>
        <div style={{ height: "100vh", backgroundColor: "transparent"}}>
          <ReactReader
            locationChanged={locationChanged}
            url="/assets/hg-sor.epub"
            location={location}
            styles={styles}
            getRendition={(rendition) => {
                renditionRef.current = rendition
            }}
          />
          <div style={{ position: 'absolute', color:"black", whiteSpace: "nowrap", bottom: '0rem', right: '1rem', left: '1rem', textAlign: 'center', zIndex: 1, backgroundColor: "transparent !important" }}>
            {page}
          </div>
          <div style={{ position: 'absolute', bottom: '-5rem', right: '1rem', left: '1rem', textAlign: 'center', zIndex: 1 }}>
            <TextField inputProps={{
              style: {
                textAlign: "center"
              }
            }} defaultValue={locationDefault} sx={{ width: "80px", marginBottom: "35px"}} variant="standard" autoComplete="off" onBlur={({target}) => {
              const val = target.value
              localStorage.setItem('location', val)
              setLocation(val)  
          }} onKeyUp={({target}) => {
                const val = target.value
                localStorage.setItem('location', val)
                setLocation(val)  
            }}/>
          </div>
          <div style={{  position: 'absolute', bottom: '-5rem', right: '1rem', left: '1rem', textAlign: 'center', zIndex: 1 }}>
            <div>Last page: {lPage}</div>
          </div>
        </div>
    </div>
  )
}

export default App
