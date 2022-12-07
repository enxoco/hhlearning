import Hashids from 'hashids'
console.log("meta", import.meta.env.VITE_APP_SALT)
export const hashids = new Hashids(import.meta.env.VITE_APP_SALT, +import.meta.env.VITE_APP_SALT_LENGTH)
