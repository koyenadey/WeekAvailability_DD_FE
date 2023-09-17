import React,{useState,useEffect} from 'react';
import WeekSlider from './WeekSlider';
import DayHome from './DayHome';
import { days } from './WeekSlider';
import './WeekHome.css';

type Week={
    id: number,
    weekNum: number,
    isActive: boolean,
    daysAvailable: number[]
}

export type Day={
    id:number,
    name: string,
    isActive: boolean,
    daysAvailable: number[]
}

type HttpOptions = {
    method: string;
    body: string;
    headers: {
        'Content-Type': string;
    };
}

const getDayNames = (daysRange:number[]):string[] =>{
    const daysToDisplay: string[] = [];
    for(let i = 0; i < daysRange.length; i += 2) {
        for(let j = daysRange[i]; j <= daysRange[i+1]; j++) {
            daysToDisplay.push(days[j].label);
        }
    }
    return daysToDisplay;
};

export const getUpdatedSortedData = (data:Day[]):Day[] =>{
    const currentDay: number = new Date().getDay();
    const currDayFromData = data.slice(currentDay);
    return currDayFromData.concat(data.slice(0,currentDay));
};

const WeekHome = () =>{
    const [weekAvailable,setWeekAvail] = useState<Week[]>([]);
    const [daysOfWeek, setDaysOfWeek] = useState<Day[]>([]);  
    useEffect(()=>{
        fetch('http://localhost:3001/api/weeks')
            .then((response)=>response.json())
            .then((data)=>setWeekAvail(data))
    },[]);

    useEffect(()=>{
        fetch('http://localhost:3001/api/days')
            .then((response)=>response.json())
            .then((data)=>setDaysOfWeek(data));
    },[]);

    const updateWeekAvailability = (week: Week, isActive: boolean, daysAvailable: number[]) => {
        const daysNotTobeUpdated = weekAvailable.filter(weekDay=>weekDay.id!==week.id);
        
        const newFinalDayAvail = [
            ...daysNotTobeUpdated,
            {
                id: week.id,
                weekNum: week.weekNum,
                isActive: isActive,
                daysAvailable: daysAvailable
            }
        ].sort((a,b)=>a.id - b.id);
        setWeekAvail(newFinalDayAvail);
    };

    const handleWeekChange = (week:Week, weekDaysSelected?:number[]) =>{
        const newDaysInWeekAvail = week.daysAvailable.length === 2?[...week.daysAvailable,5,6]:week.daysAvailable.slice(0,2);
        updateWeekAvailability(week, week.isActive, weekDaysSelected ?? newDaysInWeekAvail);
    };

    const handleAddAvailDays = (week:Week):void =>{
        updateWeekAvailability(week, !week.isActive, week.daysAvailable);
    };

    const handleDataSave = (e:React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();

        const weekOptions:HttpOptions = {
            method:'POST',
            body: JSON.stringify(weekAvailable),
            headers:{
                'Content-Type':'application/json'
            }
        };

        const dayOptions:HttpOptions = {
            method:'POST',
            body: JSON.stringify(daysOfWeek),
            headers:{
                'Content-Type':'application/json'
            }
        };

        fetch('http://localhost:3001/api/weeks/',weekOptions)
            .then((response)=>response.json())
            .then((data)=>{
                console.log(data);
                return fetch('http://localhost:3001/api/days',dayOptions);
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
    };

    return(
        <div className='week-Wrapper'>
            <div className='week-Header-Wrapper'>
                <h3 className='week-availableHeader'>MY AVAILABILITY FOR NEXT 7 WEEKS</h3>
            </div>
            <div>
                {weekAvailable.map((week)=>
                <div className='week-Slider-Body-Wrapper' key={week.id}>
                    <div className='week-Slider-Body-Left'>
                        <span className='week-Slider-Left-Label'>Week {week.weekNum}</span>
                        <div className='week-Slider-Left-Value'>
                            <input type="checkbox" 
                                className='week-Slider-Active'
                                value={week.weekNum} 
                                checked={week.isActive} 
                                onChange={()=>handleAddAvailDays(week)} 
                            />
                        </div>
                    </div>
                    <div className='week-Slider-Body-Center'>
                        <WeekSlider 
                            initialSlideValue={week.daysAvailable} 
                            isActive={week.isActive} 
                            onWeekChange={(weekDaysSelected)=>handleWeekChange(week, weekDaysSelected)} 
                        />
                        <div className='week-Slider-Body-Days'>
                            <DayHome 
                                isVisible={week.isActive?'block':'none'} 
                                daysToBeVisible={getDayNames(week.daysAvailable)} 
                                daysOfWeek = {daysOfWeek}
                                setDaysOfWeek = {(data) => {
                                    const sortedDays = getUpdatedSortedData(data);
                                    setDaysOfWeek(sortedDays);
                                }}
                             />
                        </div>
                    </div>
                    <div className='week-Slider-Body-Right'>
                        <div className="week-AddDays">
                            <button 
                                className="week-AddButton" 
                                disabled={!week.isActive} 
                                onClick={()=>handleWeekChange(week)}>{week.daysAvailable.length===2?'+':'-'}
                            </button>
                        </div>
                    </div>
                </div>
                )} 
                <div>
                    <button className='week-Data-Save' onClick={handleDataSave}>Save</button>
                </div>   
            </div>
            
        </div>
    );
}

export default WeekHome;