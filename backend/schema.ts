import { Lists } from ".keystone/types"
import { graphql } from "@graphql-ts/schema"
import { list } from "@keystone-6/core"
import { relationship, text, virtual } from "@keystone-6/core/fields"
import { KeystoneContext } from "@keystone-6/core/types"
import User from "./schema/User"
import Hashids from 'hashids'
const hashids = new Hashids(process.env.REACT_APP_SALT, +process.env.REACT_APP_SALT_LENGTH)

const filterStudents = ({ context }: { context: KeystoneContext }) => {
  if (context.session?.data.name) return true
  return false
}

const isPersonOrAdmin = ({ session }: { session: Session }) => {}
export const lists: Lists = {
  Role: list({
    fields: {
      name: text({}),
    },
  }),
  Setting: list({
    fields: {
      name: text({}),
      value: text({})
    }
  }),
  User: list(User),
  Student: list({
    access: {
      operation: {
        query: filterStudents,
      },
    },
    fields: {
      parent: relationship({ ref: "User.student", many: false }),
      myCourses: virtual({
        field: graphql.field({
          type: graphql.String,
          async resolve(item, args, context) {
            const courses = await context.query.Course.findMany({
              where: { student: { id: { equals: item.id } }, teacher: { id: { equals: context.session.itemId } } },
              query: `name`,
            })
            const courseNames: String[] = []
            courses.map((course) => {
              courseNames.push(course.name)
            })
            return courseNames.join(",")
          },
        }),
      }),

      name: virtual({
        isFilterable: true,
        field: graphql.field({
          type: graphql.String,
          resolve(item) {
            return `${item.firstName} ${item.lastName}`
          },
        }),
      }),
      firstName: text({ isFilterable: true, isOrderable: true }),
      lastName: text({ isFilterable: true, isOrderable: true }),
      portalId: virtual({
        field: graphql.field({
          type: graphql.String,
          async resolve(item, contenxt: any) {
          return await hashids.encode(+item.id)
         }
        })
      }),
      courses: relationship({
        ref: "Course.student",
        many: true,
      }),
    },
  }),
  Course: list({
    access: {
      operation: {
        query: (context) => !!context.session?.data,
        update: (context) => !!context.session?.data,
        delete: (context) => !!context.session?.data,
      },
    },
    fields: {
      name: text(),
      grade: text({ db: { isNullable: true } }),
      feedback: text(),
      feedbackLength: virtual({
        field: graphql.field({
          type: graphql.String,
          resolve(item) {
            return item.feedback.trim().length
          },
        }),
      }),
      student: relationship({
        ref: "Student.courses",
      }),
      teacher: relationship({
        ref: "User.courses",
        hooks: {
          resolveInput: async ({ operation, resolvedData, context }) => {
            console.log('variables', context?.req?.body)
            return { connect: { id: parseInt(context?.req?.body?.variables?.teacher) } }
            // return resolvedData.company;
          },
        },
      }),
    },
  }),
  Semester: list({
    fields: {
      name: text(),
    },
  }),
  ReportCardSetting: list({
    fields: {
      title: text(),
      address: text({
        ui: { displayMode: "textarea" },
      }),
      semester: relationship({
        ref: "Semester",
      }),
    },
  }),
}
