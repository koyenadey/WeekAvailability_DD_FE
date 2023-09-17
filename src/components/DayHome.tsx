import React from "react";
import DaySlider from "./DaySlider";
import {Day} from './WeekHome';
import './DayHome.css';

interface DayHomeProp{
  isVisible: string;
  daysToBeVisible: string[];
  daysOfWeek: Day[];
  setDaysOfWeek: (days:Day[])=>void;
}

const DayHome = ({isVisible,daysToBeVisible,daysOfWeek,setDaysOfWeek}:DayHomeProp) =>{

    const DaysToDisplay = daysOfWeek.filter(d=>daysToBeVisible.includes(d.name));

    const updateDaysOfWeek = (day: Day, isActive: boolean, daysAvailable: number[]) => {
        const daysNotUpdated = daysOfWeek.filter(d => d.id !== day.id);
        const updatedFinalDays = [
          ...daysNotUpdated,
          {
              id: day.id,
              name: day.name,
              isActive: isActive,
              daysAvailable: daysAvailable
          }
        ].sort((a,b)=>a.id - b.id);
        setDaysOfWeek(updatedFinalDays);
      };

    const handledaysChecked = (day:Day):void =>{
        updateDaysOfWeek(day, !day.isActive, day.daysAvailable); 
    };

    const handleAddDays = (day:Day,newValue?:number[]) =>{
        const newDaysAvailable = day.daysAvailable.length === 2?[...day.daysAvailable,22,24]:day.daysAvailable.splice(0,2); 
        updateDaysOfWeek(day, day.isActive, newValue ?? newDaysAvailable);
    };
   
    return (
        <div style={{display:`${isVisible}`}}>
          {DaysToDisplay.map((day) => (
            <div key={day.id} className="dayBody">
              <div className="dayName-Wrapper">
                <span className="dayName">{day.name.substring(0,3)}</span>
                <input className="dayIsActive" type="checkbox" value={day.name} 
                  checked={day.isActive} 
                  onChange={()=>handledaysChecked(day)} 
                />
              </div>
              <DaySlider 
                  isActive={day.isActive} 
                  initialSlideValue={day.daysAvailable}
                  onDayChange={(newValue)=>handleAddDays(day,newValue)} 
              />
              <div className="addDays">
                <button className="addButton" 
                  disabled={!day.isActive} 
                  onClick={()=>handleAddDays(day)}>{day.daysAvailable.length===2?'+':'-'}
                </button>
              </div>
            </div>
          ))}
        </div>
    );
}

export default DayHome;