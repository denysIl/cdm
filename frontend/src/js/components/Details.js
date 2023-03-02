import { React, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Card, Button } from "react-bootstrap"
import {IconButton} from '@primer/react'
import "../../App.css"
import global from '../../Global'
import { styled } from '@material-ui/core/styles';
import CircleIcon from '@mui/icons-material/Circle';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// show details on the right when insight is selected
function App({insight, results, list, type}) {
  const navigate = useNavigate()
  const [hidden, hideDetails] = useState(false)

  const quote = insight.text.includes(`"`) || insight.text.includes(`“`) ? 'Direct quotes' : 'Rephrase'
  // user closes out details panel
  const handleClick = (e) => {
    e.preventDefault()
    hideDetails(true)
    navigate('', {state: {results: results, list: list, clicked: null, from: 'Details'}})
  }
  const style = hidden ? {display: 'none'} : {background: 'white', minWidth: '30vw', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '1.5em', position: 'sticky', top: 0, overflow: 'scroll'}
  const circleColor = quote === 'Rephrase' ? '#84CC82' : '#FFAC1C'

  const article = global.articles.find(a => a.id === insight.aid)

  return (
    <div style={style}>
      <div style={{padding: '.5em'}}>
        <IconButton
          aria-label="Close"
          icon={CloseIcon}
          style={{border: 'none', background: 'none'}}
          onClick={e => handleClick(e)} />
        <div style={{padding: '.5em'}}>
          <p style={{fontWeight: 500, position: 'sticky'}}>{insight.text}</p>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <CircleIcon style={{paddingRight: '5px', color: circleColor, fontSize: 'small'}} />
            <p style={{color: '#595959', fontSize: '.8em' }}>{quote}</p>
          </div>
          <Grid container spacing={1}>
          {article.tags.map(t =>
            <Grid item>
                <div style={{padding: '.8em', background: '#f0f0f0', borderRadius: '6px', fontSize: 'small'}}>{t}</div>        
            </Grid>)}
          </Grid>
          <p style={{color: '#595959', fontSize: '.8em', marginTop: '2em'}}>Source</p>
          <div style={{color: global.colors.blue}}>
            <a href={article.url} style={{textDecoration: 'none', border: 'none', background: 'none', fontWeight: 700, fontSize: '.8em', padding: 0, color: global.colors.blue}}>{article.title}</a>
            <OpenInNewIcon style={{marginLeft: '5px', fontSize: 'small'}} />
          </div>
          <p style={{color: '#595959', fontSize: '.8em', marginTop: '2em'}}>Date of Publication</p>
          <p style={{fontSize: '.8em'}}>{article.date}</p>
          <p style={{color: '#595959', fontSize: '.8em', marginTop: '2em'}}>Location in Source</p>
          <p style={{fontSize: '.8em'}}>P.5</p>
          <p style={{color: '#595959', fontSize: '.8em', marginTop: '2em'}}>Source Authors</p>
          <p style={{fontSize: '.8em'}}>{article.authors}</p>
          <p style={{color: '#595959', fontSize: '.8em', marginTop: '2em'}}>Citation Unavailable</p>
        </div>
      </div>
    </div>
  )
}

const DIRECTQUOTES = 'Direct quotes'
const REPHRASED = 'Rephrased'

export default App;