import axios from 'axios';

const baseUrl= "http://10.8.16.118:9000";

const config = {
    method: 'get',
    url: baseUrl,
    headers: {'X-Requested-With': 'XMLHttpRequest2',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
    //responseType: 'json'
    //withCredentials: true
  };
export async function getApiData(params){
    if(params!==null){      
      config.url= baseUrl+params;
    }
    else{
      config.url= baseUrl+"/specialties";
    }
    return await axios.get(config.url);
}

export async function getNetworks(params){
  if(params!==null){
      config.url= baseUrl+params;
    }
    else{
      config.url= baseUrl+"/networks";
    }
  return await axios.get(config.url);
}

const helpers = {
  async callApi(params)  {
    return await getApiData(params);
  },
  async getNetworks(params) {
    return await getNetworks(params);
  },
  getApiInfo() {
    console.log('inside get Api data');
    axios.all([getSpecialties(), getNetworks()])
      .then(arr => ({
      specialtyData: arr[0].data,
      networkData: arr[1].data
    }))
    .catch(err=>({
      specialtyData: err instanceof Error ? err.Message: err.data
    }));
  }
};
export default helpers;