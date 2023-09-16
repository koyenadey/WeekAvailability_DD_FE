const initialDaysOfWeek = [
    {id:1,name:"Sunday",isActive:true,daysAvailable:[6,12]},
    {id:2,name:"Monday",isActive:true,daysAvailable:[12,14]},
    {id:3,name:"Tuesday",isActive:true,daysAvailable:[10,18]},
    {id:4,name:"Wednesday",isActive:true,daysAvailable:[8,12]},
    {id:5,name:"Thursday",isActive:true,daysAvailable:[14,18]},
    {id:6,name:"Friday",isActive:true,daysAvailable:[20,24]},
    {id:7,name:"Saturday",isActive:false,daysAvailable:[23,24]}
];

function getDays(){
    return initialDaysOfWeek;
};


export default{
    getDays
};
