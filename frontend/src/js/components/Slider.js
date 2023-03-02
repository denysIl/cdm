// import { Slider } from '@mui/material'
import RangeSlider from 'react-range-slider-input';
import { useNavigate } from "react-router-dom"
import 'react-range-slider-input/dist/style.css';
import { React, useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import global from '../../Global';

// slider component in the filtering section on search results page
function App({list, results, min, max, clicked}) {
const navigate = useNavigate()

const [minValue, set_minValue] = useState(1950);
const [maxValue, set_maxValue] = useState(2030);
const handleInput = (e) => {
	set_minValue(e.minValue);
	set_maxValue(e.maxValue);
  	const filtered = list.filter(l => l.year >= minValue && l.year <= maxValue)
  	if (minValue !== min || maxValue !== max) navigate('/results', {state:{list: list, filtered: filtered, min: minValue, max: maxValue, clicked: clicked}})
};

return (
	<div>
		<MultiRangeSlider
			min={1950}
			max={2030}
			step={10}
			minValue={minValue}
			maxValue={maxValue}
			onChange={(e) => handleInput(e)}
      style={{border:'none', boxShadow: 'none'}}
      barInnerColor={global.colors.grey}
      ruler='false'
		/>
	</div>
	);
}

export default App;