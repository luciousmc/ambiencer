const shared = {
    randomize: (array)=>{
         // Get the length of the array
         const arrLen = array.length;

         // If there is only 1 item in the array just return it
         if (arrLen < 2) return array[0];
         
         // If there is  more than one item in the array
         // pick a random item from it
         const randI = Math.floor(Math.random() * arrLen);

         // Return the item
         return array[randI];
    },
    reduceResultByAmt: (array, amt)=>{ // Reduce the given array by the amount given
        // Get the length of the given array
        let arrLen = array.length;

        // Empty array to return  result of reduction
        const output = [];

        for (let i = 0; i < amt; i++, arrLen--){
            const randI = Math.floor(Math.random() * arrLen);
            output.push(array.splice(randI,1)[0]);
        }
        if (output.length === 1){
            return output[0];
        } 
        return output;
    }
}