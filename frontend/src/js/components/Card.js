import { React, useState, useRef, createRef } from "react";
import { Card } from "react-bootstrap"
import "../../App.css";
import global from '../../Global'
import CircleIcon from '@mui/icons-material/Circle';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// an individual insight on search results page
function App({id, insight, aid, typeSelected, clicked, handleClick}) {
  let style = {}
  // see whether user has clicked on card
  const [cardClicked, setClick] = useState()
  const ref = createRef()
  const cardHandleClick = (e, id, setParentState) => {
    e.preventDefault()
    ref.current?.scrollIntoView({behavior: 'smooth'})
    setClick(id)
    setParentState(e, id)
  }
  // hide insight if type not selected
  if (!typeSelected) {
    style = {display: 'none'}
  } else {  
    // set selected insight's background to grey
    style = clicked ?
    { background: '#f9f9f9', padding: '1.5em', margin: '1em', borderRadius: '20px', font: 'Inter' }
    : { background: 'white', padding: '1.5em', margin: '1em', borderRadius: '20px', font: 'Inter', cursor: 'pointer' }
  }

  const article = global.articles.find(a => a.id === aid)
  const quote = insight.includes(`"`) || insight.includes(`“`) ? 'Direct quotes' : 'Rephrase'
  const circleColor = quote === 'Rephrase' ? '#84CC82' : '#FFAC1C'

  return (
    <div>
      <Card
        style={style}
        onClick={e => cardHandleClick(e, id, handleClick)}
        ref={ref}>
      <Card.Body>
          <Card.Title style={{fontWeight: 500, marginBottom: '1em'}}>{insight}</Card.Title>
          <Card.Link style={{textDecoration: 'none', color: global.colors.blue, border: 'none', background: 'none', fontWeight: 700, fontSize: '.8em', padding: 0}} href={article.url}>
            {article.title}
            <OpenInNewIcon style={{marginLeft: '5px', fontSize: 'small'}} />
            </Card.Link>
          <Card.Text style={{margin: 0, color: '#595959', fontSize: '.8em', whiteSpace: 'pre-line' }}>
          {`${article.authors} (${article.date.slice(-4)})`}
          </Card.Text>
          <Card.Text style={{marginBottom: 0, color: '#595959', fontSize: '.8em', whiteSpace: 'pre-line' }}>
          <CircleIcon style={{paddingRight: '5px', color: circleColor, fontSize: 'small'}} />
          {quote}
          </Card.Text>
      </Card.Body>
      </Card>
    </div>
  )
}

export default App;