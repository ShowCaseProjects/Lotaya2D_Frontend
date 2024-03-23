import dayjs from 'dayjs'
import queryString from 'query-string';
export const getTimeStamp=()=>{
    let timestamp=dayjs().format('YYYYMMDDHHmmss')
    return timestamp;
}

export type SearchArg={[key:string]:string|Date|undefined|null}

export const parseQueryString=(args:SearchArg,append:string='?')=>{
  return queryString.stringify(
   args,{
    skipEmptyString:true,
    skipNull:true
   }
  ).length>0?
  append+queryString.stringify(
    args,{
     skipEmptyString:true,
     skipNull:true
    }
   ):'';
}

export const searchKeyDown=(event:any,callback:any)=>{
    if(event.key==='Enter' || event.key==='Return')
    callback();
}