export const zeroPad = (value, order) =>{
    // This functions pads zeroes before a number and then returns the value as a string
    const val_str = ``+value
    return (``+(10**order)).substring(val_str.length)+val_str
}