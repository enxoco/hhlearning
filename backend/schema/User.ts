import { graphql } from "@graphql-ts/schema"
import { checkbox, password, relationship, text, virtual } from "@keystone-6/core/fields"
import { KeystoneContext } from "@keystone-6/core/types"
import Hashids from 'hashids'
let saltLength: number = 5;
if (process.env.REACT_APP_SALT_LENGTH) {
  saltLength = +process.env.REACT_APP_SALT_LENGTH
}
const hashids = new Hashids(process.env.REACT_APP_SALT, saltLength)

export default {
    access: {
      operation: {
        query: (context: KeystoneContext) => !!context.session.data,
        update: (context: KeystoneContext) => !!context.session?.data,
        delete: (context: KeystoneContext) => !!context.session?.data
      }
    },
    fields: {
      name: text({ validation: { isRequired: true }}),
      email: text({
        validation: { isRequired: true },
        isIndexed: "unique",
        isFilterable: true,
      }),
      firstName: text(),
      lastName: text(),
      street: text(),
      city: text(),
      state: text(),      
      phone: text({db: {isNullable: true}}),
      phoneMother: text({db: {isNullable: true}}),
      phoneFather: text({db: {isNullable: true}}),
      zipcode: text(),
      role: relationship({ref: 'Role', many: true}),
      isAdmin: checkbox(),
      isParent: checkbox({defaultValue: false}),
      hasPaidTuition: checkbox({ defaultValue: false}),
      password: password({ validation: { isRequired: true } }),
      courses: relationship({ ref: "Course.teacher", many: true}),
      portalId: virtual({
        field: graphql.field({
          type: graphql.String,
          async resolve(item, contenxt: any) {
          return await hashids.encode(+item.id)
         }
        })
      }),
      student: relationship({ref: 'Student.parent', many: true})
    },

    ui: {
      listView: {
        initialColumns: ["name", "lastName", "student", "courses", "email", "isParent"],
      },
    },
  }