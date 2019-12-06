const shared = {
    randomize: (array)=>{
         // Get the length of the array
         const arrLen = array.length;

         // If there is only 1 item in the array just return it
         if (arrLen < 2) return array[0];
         
         // If there is  more than one item in the array
         // pick a random item from the array
         const randI = Math.floor(Math.random() * arrLen);
         return array[randI];
    },
    reduceResultByAmt: (array, amt)=>{
        const arrLen = array.length;
        const output = [];

        for (let i = 0; i < amt; i++){
            const randI = Math.floor(Math.random() * arrLen);
            output.push(array[randI]);
        }
        return output;
    }
}