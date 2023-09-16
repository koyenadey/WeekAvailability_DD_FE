const availableDaysOfWeek = [
    {id:1,weekNum:1,isActive:true,daysAvailable:[1,2]},
    {id:2,weekNum:2,isActive:false,daysAvailable:[5,6]},
    {id:3,weekNum:3,isActive:true,daysAvailable:[0,4]},
    {id:4,weekNum:4,isActive:true,daysAvailable:[0,1]},
    {id:5,weekNum:5,isActive:true,daysAvailable:[0,6]},
    {id:6,weekNum:6,isActive:true,daysAvailable:[2,6]},
    {id:7,weekNum:7,isActive:true,daysAvailable:[3,4]}
];

function getAvailableDays(){
    return availableDaysOfWeek;
};

export default{
    getAvailableDays
};
