import React from 'react';
import { Slider } from '@mui/material';
import './WeekSlider.css';

interface WeekSliderProp{
    isActive:boolean,
    initialSlideValue: number[],
    onWeekChange: (daySelected:number[]) => void
}

export const days =[
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    {
        value: 4,
        label: 'Thursday'
    },
    {
        value: 5,
        label: 'Friday'
    },
    {
        value: 6,
        label: 'Saturday'
    }
]

function valuetext(value: number) {
    const dayObj = days.find(d=>d.value === value);
    return dayObj?.label.substring(0,3) || "";
}

const WeekSlider = ({isActive,initialSlideValue,onWeekChange}:WeekSliderProp) =>{

    const startMark:number = 0;
    const endMark:number = 6;
    const step:number = 1;
    const trackMinPos1:number= ((initialSlideValue[0] - startMark)/(endMark - startMark)) * 100;
    const trackMaxPos1:number= ((initialSlideValue[1] - startMark)/(endMark - startMark)) * 100;
    const trackWidth1:number= trackMaxPos1 - trackMinPos1;
    const trackMinPos2:number= ((initialSlideValue[2] - startMark)/(endMark - startMark)) * 100;
    const trackMaxPos2:number = ((initialSlideValue[3] - startMark)/(endMark - startMark)) * 100;
    const trackWidth2:number= trackMaxPos2 - trackMinPos2;

    const handleChange = (event: Event, newValue: number | number[]) => {
      onWeekChange(newValue as number[]);
    };

    const sxVal = {
        height: '3px',
        color: '#dddd',
        pointerEvents: isActive? 'auto' : 'none',
        marginTop: '5%',
        '& .MuiSlider-track':{
            height: '3px',
            backgroundColor: isActive? '#1E556B' : '#ddd'
        },
        '& .MuiSlider-thumb':{
            height: '12px',
            width:'12px',
            backgroundColor: isActive? '#1E556B' : '#ddd'
        },
        '& .MuiSlider-mark':{
            height: '8px'
        },
        '& .MuiSlider-valueLabel': {
            lineHeight: 1.2,
            fontSize: 12,
            background: 'unset',
            padding: 0,
            width: 32,
            height: 32,
            borderRadius: '50% 50% 50% 0',
            backgroundColor:isActive? '#1E556B' : '#ddd',
            transformOrigin: 'bottom left',
            transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
            '&:before': { display: 'none' },
            '&.MuiSlider-valueLabelOpen': {
                transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
            },
            '& > *': {
                transform: 'rotate(45deg)',
            },
        },
    };

    return(
        <div style={{margin:'auto'}}>
            <Slider
            getAriaLabel={() => 'Day range'}
            value={initialSlideValue}
            getAriaValueText={valuetext}
            valueLabelFormat={valuetext}
            onChange={handleChange}
            valueLabelDisplay="on"
            min={startMark}
            max={endMark}
            step={step}
            marks={days}
            track={false}
            sx={sxVal}
            disableSwap={true}
        />
        <span className={isActive?'Track Slider1':'Slider1 disabledColor'} style={{left:`${trackMinPos1}%`, width:`${trackWidth1}%`}}></span>
        {initialSlideValue.length > 2 && <span className={isActive?'Track Slider2':'Slider2 disabledColor'} style={{left:`${trackMinPos2}%`, width:`${trackWidth2}%`}}></span>} 
        </div>
    );
}

export default WeekSlider;