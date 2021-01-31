export default async (netwrokGetCall , cacheGetCall , cacheSaveCall , messageIfDataFromCache) => {
    //check whether the browser supports indexeddb or not 
    let isIndexeDBExist =  true;
    if(!indexedDB) {
        isIndexeDBExist = false;
    }
    //Doing network call
    const networkResult = await netwrokGetCall()

    const isNetworkResultError = networkResult instanceof Error


    //Bila index db ada
    if(isIndexeDBExist){
        let message = messageIfDataFromCache || ""
        if(!isNetworkResultError){
            //Save to DB
            await cacheSaveCall(networkResult.data)
            //Get the cuccess message
            message = networkResult.message
        }
        const cacheResult = await cacheGetCall()
        return {
            message : message,
            data : cacheResult
        }
    }else{
        if(isNetworkResultError){
            throw networkResult
        }
        return networkResult
    }

}