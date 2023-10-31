const event = new Event("storageEvent");
export const dispatchEvent = ()=>{
    document.dispatchEvent(event);
}
