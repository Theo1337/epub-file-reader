import React, { useState, useEffect, useRef } from "react"
import { ReactReader } from "react-reader"
import Head from 'next/head'

import { Button, TextField } from "@mui/material"

const App = () => {
  const [location, setLocation] = useState(5)
  const [locationDefault, setLocationDefault] = useState(null)
  const [page, setPage] = useState('')
  const renditionRef = useRef(null)
  const locationChanged = (epubcify) => {
    setLocation(epubcify)
    if (renditionRef.current) {
      const { displayed } = renditionRef.current.location.start
      setPage(`Page ${displayed.page} of ${displayed.total}`)
    }
  }
  
  const [ hide, setHide ] = useState(true)

  const hidePage = () => {
    hide  === false ? (setHide(true)) : (setHide(false))
  }
  
  useEffect(() => {
    setLocationDefault(localStorage.getItem("location"))
    document.addEventListener('keydown', (event) => {
      if (event.key == 'h') {
          hidePage()
      }
   });
  })

  return (
    <>
      <Head>
        <title>Nova guia</title>
      </Head>
      {
      hide ? 
        <div style={{ backgroundColor: "#323639", width: "100vw", height: "100vh", textAlign: "center",  display: "flex", alignItems: "center", alignContent: "center", minHeight: "100vh", justifyContent: "center"}}>
          <div style={{ backgroundColor: "transparent", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <img style={{ backgroundColor: "transparent" }} src="assets/logo.svg"/>
            <p />
            <input 
              style={{ width: "561px", border: "none",marginTop: "5%", borderRadius: "30px", height: "44px", backgroundColor: "white", outline: "none", fontSize: "16px", padding: "20px"}} 
              placeholder="Pesquise no Google ou digite um URL"
              id="icon"
              disabled={true}
              >
              </input>
            <div style={{ backgroundColor: "black", marginTop: "5%", padding: "20px", display: "flex", flexDirection: "row"}}>
              <div
              onClick={() => {
                window.location.href = "https://login.plurall.net/"
              }}
              style={{ backgroundColor: "transparent", borderRadius: "5px", cursor: "pointer", width: "100px", height: "100%", display: "flex", alignItems: "center", flexDirection: "column", padding: "15px"}}>
                <div style={{backgroundColor: "#323232", borderRadius: "50%", padding: "10px",  display: "flex", alignItems: "center",}}>
                  <img style={{ width: "30px", height: "30px", backgroundColor: "transparent" }} src="https://assets.cdn.plurall.net/static/elo/plurall-favicon.png"/>
                </div>
                  <div style={{ backgroundColor: "transparent", marginTop: "10px", fontWeight: "light"}}>
                    Plurall
                  </div>
              </div>
              <div
              onClick={hidePage}
              style={{ backgroundColor: "transparent", cursor: "pointer", borderRadius: "5px", width: "100px", height: "100%", display: "flex", alignItems: "center", flexDirection: "column", padding: "15px"}}>
                <div style={{backgroundColor: "#323232", borderRadius: "50%", padding: "10px",  display: "flex", alignItems: "center", fontWeight: "bolder", fontSize: "20px"}}>
                <img style={{ width: "30px", height: "30px", backgroundColor: "transparent"}} src="assets/add.svg"/>
                </div>
                  <div style={{ backgroundColor: "transparent", marginTop: "10px", fontWeight: "light", whiteSpace: "nowrap" }}>
                    Novo atalho
                  </div>
              </div>
            </div>
          </div>
        </div>
      
      :
      
        <div style={{ height: "100vh", backgroundColor: "transparent"}}>
          <ReactReader
            locationChanged={locationChanged}
            url="/assets/book.epub"
            id="black"
            class="black"
            location={location}
            getRendition={(rendition) => {
                renditionRef.current = rendition
            }}
          />
          <div style={{ position: 'absolute', whiteSpace: "nowrap", bottom: '0rem', right: '1rem', left: '1rem', textAlign: 'center', zIndex: 1, backgroundColor: "transparent !important" }}>
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
            }}/>
          </div>
        </div>
      }
    </>
  )
}

export default App
