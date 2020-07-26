import { read } from './Cookie'

export const limitAccess = ()=>{
  let bt = read('backend-token')
  if (bt===''){
    return true;
  }
  if (bt.length < 100){
    return true;
  }
  if (!bt.match(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)){
    return true;
  }
  return false;
}