import Hashids from 'hashids'
export const hashids = new Hashids(import.meta.env.REACT_APP_SALT, import.meta.env.REACT_APP_SALT_LENGTH)
