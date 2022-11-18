import Hashids from 'hashids'
export const hashids = new Hashids(import.meta.env.VITE_APP_SALT, +import.meta.env.VITE_APP_SALT_LENGTH)
