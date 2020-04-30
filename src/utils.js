export const monthNames = Array.from({length:12},(x,i)=>{
    const str = new Date(0, i+1,0).toLocaleDateString('pl-PL',{month:'long'});
    return str.charAt(0).toUpperCase() + str.slice(1)
});

export const randCol = ['D56717', 'D52217', '48D517', '17B2D5', 'D5C217'];
