/**
 * string.replace can take a function as the replacement value.
 * In this example we are using a matched group to add a space before the first capital letter in a string.
 * The second replace is looking for the first lowercase letter in the string, then passes it to an anonymous
 * function that simply returns it after running .toUpperCase()
 */
export default function(str: string){
    return str.replace(/([A-Z])/g, " $1").replace(/(^[a-z])/, s => s.toUpperCase())
}