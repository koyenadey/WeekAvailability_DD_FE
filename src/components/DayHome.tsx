import React from "react";
import DaySlider from "./DaySlider";
import {Day} from './WeekHome';
import './DayHome.css';

interface DayHomeProp{
  isVisible: string;
  daysToBeVisible: string[];
  daysOfWeek: Day[];
  setDaysOfWeek: (days:Day[])=>void;
  //isSelected: boolean;
}

const getUpdatedSortedData = (data:Day[],currentDay:number):Day[] =>{
  const currDayFromData = data.slice(currentDay);
  return currDayFromData.concat(data.slice(0,currentDay));
}

const DayHome = ({isVisible,daysToBeVisible,daysOfWeek,setDaysOfWeek}:DayHomeProp) =>{
  //const initialDaysOfWeek:Day[] = Days.getDays();
  //const [daysOfWeek, setDaysOfWeek] = useState<Day[]>([]); 
  const currentDay:number = new Date().getDay();
  
  const newInitialDays = getUpdatedSortedData(daysOfWeek,currentDay);
  const DaysToDisplay = newInitialDays.filter(d=>daysToBeVisible.includes(d.name));


    const handledaysChecked = (day:Day):void =>{
            const daysNotUpdated = daysOfWeek.filter(d => d.id !== day.id);
            const updatedFinalDays = [
                ...daysNotUpdated,
                {
                    id: day.id,
                    name: day.name,
                    isActive: !day.isActive,
                    daysAvailable: day.daysAvailable
                }
            ].sort((a,b)=>a.id - b.id);
            const newUpdatedFinalDays = getUpdatedSortedData(updatedFinalDays,currentDay);
            //console.log(newUpdatedFinalDays);
            setDaysOfWeek(newUpdatedFinalDays);         
    }

    const handleAddDays = (day:Day,newValue?:number[]) =>{
            const daysNotUpdated = daysOfWeek.filter(d => d.id !== day.id);
            const newDaysAvailable = day.daysAvailable.length === 2?[...day.daysAvailable,22,24]:day.daysAvailable.splice(0,2); 
            const updatedFinalDays = [
                ...daysNotUpdated,
                {
                    id: day.id,
                    name: day.name,
                    isActive: day.isActive,
                    daysAvailable: newValue ?? newDaysAvailable
                }
            ].sort((a,b)=>a.id - b.id);
            const newUpdatedFinalDays = getUpdatedSortedData(updatedFinalDays,currentDay);
            setDaysOfWeek(newUpdatedFinalDays);
    }
   
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
                   /*onDayChange={(newValue:number[])=>handleAddDays(day,newValue)}*/ 
                 />
              <div className="addDays">
                <button className="addButton" disabled={!day.isActive} onClick={()=>handleAddDays(day)}>{day.daysAvailable.length===2?'+':'-'}</button>
              </div>
            </div>
          ))}
        </div>
    );
}

export default DayHome;