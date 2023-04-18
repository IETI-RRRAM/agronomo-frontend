async function putService(url:string, data:{}){
    const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
    const response = await fetch(url, options);
    if (response.ok) {
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
    }else{
        const errorReason = await response.json()
        return errorReason;
    }
};
export {putService};