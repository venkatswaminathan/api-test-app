import axios from 'axios';

let baseUrl= "";

const config = {
    method: 'get',
    url: "",
    headers: {'X-Requested-With': 'XMLHttpRequest2',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
    //responseType: 'json'
    //withCredentials: true
  };
export async function getApiData(params){
  console.log(baseUrl);
  config.url=baseUrl;
    if(params!==null){      
      config.url= baseUrl+params;
    }
    console.log(config.url);
    return await axios.get(config.url);
}

export function setBaseUrl(param){
    baseUrl = param;
}