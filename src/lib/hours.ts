/** Calculate public opening status only after the pharmacy approves its schedule. */
export type Weekday = "Mon"|"Tue"|"Wed"|"Thu"|"Fri"|"Sat"|"Sun";
export type DayHours = { open:string; close:string };
export type OpeningSchedule = Partial<Record<Weekday,DayHours|null>>;
export type OpeningStatus = { state:"unknown"|"open"|"closed"; text:string };
const days:Weekday[]=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const formatter = new Intl.DateTimeFormat("en-GB", {timeZone:"Africa/Windhoek",weekday:"short",hour:"2-digit",minute:"2-digit",hourCycle:"h23"});
const clock=(value:string)=>{
 if(!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value))return null;
 const [h,m]=value.split(":").map(Number);
 if(h===undefined||m===undefined)return null;
 return h*60+m;
};
export function getWindhoekStatus(date:Date,schedule?:OpeningSchedule):OpeningStatus {
 if(!schedule||Number.isNaN(date.getTime()))return {state:"unknown",text:"Opening hours not confirmed"};
 const parts=Object.fromEntries(formatter.formatToParts(date).filter(x=>x.type==="weekday"||x.type==="hour"||x.type==="minute").map(x=>[x.type,x.value]));
 const day=parts.weekday as Weekday;
 const current=Number(parts.hour)*60+Number(parts.minute);
 const today=schedule[day];
 if(today){
  const start=clock(today.open),end=clock(today.close);
  if(start===null||end===null||end<=start)return {state:"unknown",text:"Please confirm hours by phone"};
  if(current>=start&&current<end)return {state:"open",text:"Open now • Closes at "+today.close};
  if(current<start)return {state:"closed",text:"Closed • Opens today at "+today.open};
 }
 const d=days.indexOf(day);
 for(let offset=1;offset<=7;offset++){
  const next=days[(d+offset)%7];
  if(!next)continue;
  const nextHours=schedule[next];
  if(nextHours&&clock(nextHours.open)!==null){
   return {state:"closed",text:"Closed • Reopens "+(offset===1?"tomorrow":"on "+next)+" at "+nextHours.open};
  }
 }
 return {state:"closed",text:"Closed • Call to confirm next opening"};
}
