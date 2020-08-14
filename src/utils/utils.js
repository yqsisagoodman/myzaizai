

export let getChinatime = (utctime)=>{
     let date =(typeof utctime == 'string' ? new Date (utctime) : utctime)





return date.getFullYear() + '-' + (date.getMonth()+1)+ "-" +date.getDay() + ' ' + date.getHours()+ ':' +date.getMinutes()+ ":" +date.getSeconds()
}