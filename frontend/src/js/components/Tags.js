import {React, useState} from 'react';
import { useNavigate } from "react-router-dom"
import { withStyles } from '@material-ui/core/styles';
// import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Button} from '@mui/material'
// import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@material-ui/icons/CheckBox';
// import Favorite from '@material-ui/icons/Favorite';
// import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import global from '../../Global'

// checkbox in customized blue color
const BlueCheckbox = withStyles({
    root: {
      color: global.colors.blue,
      '&$checked': {
        color: global.colors.blue,
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

// display tags as checkboxes
export default function Tags({tags, allResults}) {
    const navigate = useNavigate()
    const [checked, setChecked] = useState(false)
    const [selected, setSelected] = useState([])

    const initStatus = {}
    tags.forEach(t => initStatus[t] = false)
    const [status, setStatus] = useState({})

    const handleChange = (tag) => {
        setChecked(!checked)
        status[tag] = !status[tag]
        setStatus(status)
        console.log('statu', status)
        setSelected(Object.keys(status).filter(k => status[k]))
    }
  
    return (
        <FormGroup column>
        {/* <FormControlLabel
        control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
        label="Secondary"
        /> */}
            {tags.map(t =>
                <FormControlLabel
                control={
                    <BlueCheckbox
                    checked={checked.t}
                    onChange={() => handleChange(t)}
                    // name="checkedB"
                    size="small"
                    // color="primary"
                    />
                }
                label={<span style={{ fontSize: '.9em' }}>{t}</span>}
                />
            )}
            <Button
                variant="outlined"
                style={{height: '2.5em', width: '7em', marginTop: 30, fontSize: 'medium', textTransform: 'capitalize', color: 'white', background: global.colors.blue, borderRadius: '10px'}}
                onClick={() => navigate('', {state: {tags: selected, allResults: allResults, from: 'Tags'}})}
                >Apply</Button>
        </FormGroup>
    );
}