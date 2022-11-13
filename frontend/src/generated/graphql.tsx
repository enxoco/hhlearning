import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
};

export type AuthenticatedItem = User;

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<BooleanFilter>;
};

export type Course = {
  __typename?: 'Course';
  feedback?: Maybe<Scalars['String']>;
  feedbackLength?: Maybe<Scalars['String']>;
  grade?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  student?: Maybe<Student>;
  teacher?: Maybe<User>;
};

export type CourseCreateInput = {
  feedback?: InputMaybe<Scalars['String']>;
  grade?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  student?: InputMaybe<StudentRelateToOneForCreateInput>;
  teacher?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type CourseManyRelationFilter = {
  every?: InputMaybe<CourseWhereInput>;
  none?: InputMaybe<CourseWhereInput>;
  some?: InputMaybe<CourseWhereInput>;
};

export type CourseOrderByInput = {
  feedback?: InputMaybe<OrderDirection>;
  grade?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type CourseRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CourseWhereUniqueInput>>;
  create?: InputMaybe<Array<CourseCreateInput>>;
};

export type CourseRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CourseWhereUniqueInput>>;
  create?: InputMaybe<Array<CourseCreateInput>>;
  disconnect?: InputMaybe<Array<CourseWhereUniqueInput>>;
  set?: InputMaybe<Array<CourseWhereUniqueInput>>;
};

export type CourseUpdateArgs = {
  data: CourseUpdateInput;
  where: CourseWhereUniqueInput;
};

export type CourseUpdateInput = {
  feedback?: InputMaybe<Scalars['String']>;
  grade?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  student?: InputMaybe<StudentRelateToOneForUpdateInput>;
  teacher?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type CourseWhereInput = {
  AND?: InputMaybe<Array<CourseWhereInput>>;
  NOT?: InputMaybe<Array<CourseWhereInput>>;
  OR?: InputMaybe<Array<CourseWhereInput>>;
  feedback?: InputMaybe<StringFilter>;
  grade?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  student?: InputMaybe<StudentWhereInput>;
  teacher?: InputMaybe<UserWhereInput>;
};

export type CourseWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type CreateInitialUserInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<DateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type IdFilter = {
  equals?: InputMaybe<Scalars['ID']>;
  gt?: InputMaybe<Scalars['ID']>;
  gte?: InputMaybe<Scalars['ID']>;
  in?: InputMaybe<Array<Scalars['ID']>>;
  lt?: InputMaybe<Scalars['ID']>;
  lte?: InputMaybe<Scalars['ID']>;
  not?: InputMaybe<IdFilter>;
  notIn?: InputMaybe<Array<Scalars['ID']>>;
};

export type KeystoneAdminMeta = {
  __typename?: 'KeystoneAdminMeta';
  enableSessionItem: Scalars['Boolean'];
  enableSignout: Scalars['Boolean'];
  list?: Maybe<KeystoneAdminUiListMeta>;
  lists: Array<KeystoneAdminUiListMeta>;
};


export type KeystoneAdminMetaListArgs = {
  key: Scalars['String'];
};

export type KeystoneAdminUiFieldMeta = {
  __typename?: 'KeystoneAdminUIFieldMeta';
  createView: KeystoneAdminUiFieldMetaCreateView;
  customViewsIndex?: Maybe<Scalars['Int']>;
  fieldMeta?: Maybe<Scalars['JSON']>;
  isFilterable: Scalars['Boolean'];
  isOrderable: Scalars['Boolean'];
  itemView?: Maybe<KeystoneAdminUiFieldMetaItemView>;
  label: Scalars['String'];
  listView: KeystoneAdminUiFieldMetaListView;
  path: Scalars['String'];
  search?: Maybe<QueryMode>;
  viewsIndex: Scalars['Int'];
};


export type KeystoneAdminUiFieldMetaItemViewArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type KeystoneAdminUiFieldMetaCreateView = {
  __typename?: 'KeystoneAdminUIFieldMetaCreateView';
  fieldMode: KeystoneAdminUiFieldMetaCreateViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaCreateViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden'
}

export type KeystoneAdminUiFieldMetaItemView = {
  __typename?: 'KeystoneAdminUIFieldMetaItemView';
  fieldMode?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldMode>;
};

export enum KeystoneAdminUiFieldMetaItemViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden',
  Read = 'read'
}

export type KeystoneAdminUiFieldMetaListView = {
  __typename?: 'KeystoneAdminUIFieldMetaListView';
  fieldMode: KeystoneAdminUiFieldMetaListViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaListViewFieldMode {
  Hidden = 'hidden',
  Read = 'read'
}

export type KeystoneAdminUiListMeta = {
  __typename?: 'KeystoneAdminUIListMeta';
  description?: Maybe<Scalars['String']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  hideCreate: Scalars['Boolean'];
  hideDelete: Scalars['Boolean'];
  initialColumns: Array<Scalars['String']>;
  initialSort?: Maybe<KeystoneAdminUiSort>;
  isHidden: Scalars['Boolean'];
  itemQueryName: Scalars['String'];
  key: Scalars['String'];
  label: Scalars['String'];
  labelField: Scalars['String'];
  listQueryName: Scalars['String'];
  pageSize: Scalars['Int'];
  path: Scalars['String'];
  plural: Scalars['String'];
  singular: Scalars['String'];
};

export type KeystoneAdminUiSort = {
  __typename?: 'KeystoneAdminUISort';
  direction: KeystoneAdminUiSortDirection;
  field: Scalars['String'];
};

export enum KeystoneAdminUiSortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type KeystoneMeta = {
  __typename?: 'KeystoneMeta';
  adminMeta: KeystoneAdminMeta;
};

export enum MagicLinkRedemptionErrorCode {
  Failure = 'FAILURE',
  TokenExpired = 'TOKEN_EXPIRED',
  TokenRedeemed = 'TOKEN_REDEEMED'
}

export type Mutation = {
  __typename?: 'Mutation';
  authenticateUserWithPassword?: Maybe<UserAuthenticationWithPasswordResult>;
  createCourse?: Maybe<Course>;
  createCourses?: Maybe<Array<Maybe<Course>>>;
  createInitialUser: UserAuthenticationWithPasswordSuccess;
  createReportCardSetting?: Maybe<ReportCardSetting>;
  createReportCardSettings?: Maybe<Array<Maybe<ReportCardSetting>>>;
  createRole?: Maybe<Role>;
  createRoles?: Maybe<Array<Maybe<Role>>>;
  createSemester?: Maybe<Semester>;
  createSemesters?: Maybe<Array<Maybe<Semester>>>;
  createSetting?: Maybe<Setting>;
  createSettings?: Maybe<Array<Maybe<Setting>>>;
  createStudent?: Maybe<Student>;
  createStudents?: Maybe<Array<Maybe<Student>>>;
  createUser?: Maybe<User>;
  createUsers?: Maybe<Array<Maybe<User>>>;
  deleteCourse?: Maybe<Course>;
  deleteCourses?: Maybe<Array<Maybe<Course>>>;
  deleteReportCardSetting?: Maybe<ReportCardSetting>;
  deleteReportCardSettings?: Maybe<Array<Maybe<ReportCardSetting>>>;
  deleteRole?: Maybe<Role>;
  deleteRoles?: Maybe<Array<Maybe<Role>>>;
  deleteSemester?: Maybe<Semester>;
  deleteSemesters?: Maybe<Array<Maybe<Semester>>>;
  deleteSetting?: Maybe<Setting>;
  deleteSettings?: Maybe<Array<Maybe<Setting>>>;
  deleteStudent?: Maybe<Student>;
  deleteStudents?: Maybe<Array<Maybe<Student>>>;
  deleteUser?: Maybe<User>;
  deleteUsers?: Maybe<Array<Maybe<User>>>;
  endSession: Scalars['Boolean'];
  redeemUserMagicAuthToken: RedeemUserMagicAuthTokenResult;
  redeemUserPasswordResetToken?: Maybe<RedeemUserPasswordResetTokenResult>;
  sendUserMagicAuthLink: Scalars['Boolean'];
  sendUserPasswordResetLink: Scalars['Boolean'];
  updateCourse?: Maybe<Course>;
  updateCourses?: Maybe<Array<Maybe<Course>>>;
  updateReportCardSetting?: Maybe<ReportCardSetting>;
  updateReportCardSettings?: Maybe<Array<Maybe<ReportCardSetting>>>;
  updateRole?: Maybe<Role>;
  updateRoles?: Maybe<Array<Maybe<Role>>>;
  updateSemester?: Maybe<Semester>;
  updateSemesters?: Maybe<Array<Maybe<Semester>>>;
  updateSetting?: Maybe<Setting>;
  updateSettings?: Maybe<Array<Maybe<Setting>>>;
  updateStudent?: Maybe<Student>;
  updateStudents?: Maybe<Array<Maybe<Student>>>;
  updateUser?: Maybe<User>;
  updateUsers?: Maybe<Array<Maybe<User>>>;
};


export type MutationAuthenticateUserWithPasswordArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateCourseArgs = {
  data: CourseCreateInput;
};


export type MutationCreateCoursesArgs = {
  data: Array<CourseCreateInput>;
};


export type MutationCreateInitialUserArgs = {
  data: CreateInitialUserInput;
};


export type MutationCreateReportCardSettingArgs = {
  data: ReportCardSettingCreateInput;
};


export type MutationCreateReportCardSettingsArgs = {
  data: Array<ReportCardSettingCreateInput>;
};


export type MutationCreateRoleArgs = {
  data: RoleCreateInput;
};


export type MutationCreateRolesArgs = {
  data: Array<RoleCreateInput>;
};


export type MutationCreateSemesterArgs = {
  data: SemesterCreateInput;
};


export type MutationCreateSemestersArgs = {
  data: Array<SemesterCreateInput>;
};


export type MutationCreateSettingArgs = {
  data: SettingCreateInput;
};


export type MutationCreateSettingsArgs = {
  data: Array<SettingCreateInput>;
};


export type MutationCreateStudentArgs = {
  data: StudentCreateInput;
};


export type MutationCreateStudentsArgs = {
  data: Array<StudentCreateInput>;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationCreateUsersArgs = {
  data: Array<UserCreateInput>;
};


export type MutationDeleteCourseArgs = {
  where: CourseWhereUniqueInput;
};


export type MutationDeleteCoursesArgs = {
  where: Array<CourseWhereUniqueInput>;
};


export type MutationDeleteReportCardSettingArgs = {
  where: ReportCardSettingWhereUniqueInput;
};


export type MutationDeleteReportCardSettingsArgs = {
  where: Array<ReportCardSettingWhereUniqueInput>;
};


export type MutationDeleteRoleArgs = {
  where: RoleWhereUniqueInput;
};


export type MutationDeleteRolesArgs = {
  where: Array<RoleWhereUniqueInput>;
};


export type MutationDeleteSemesterArgs = {
  where: SemesterWhereUniqueInput;
};


export type MutationDeleteSemestersArgs = {
  where: Array<SemesterWhereUniqueInput>;
};


export type MutationDeleteSettingArgs = {
  where: SettingWhereUniqueInput;
};


export type MutationDeleteSettingsArgs = {
  where: Array<SettingWhereUniqueInput>;
};


export type MutationDeleteStudentArgs = {
  where: StudentWhereUniqueInput;
};


export type MutationDeleteStudentsArgs = {
  where: Array<StudentWhereUniqueInput>;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteUsersArgs = {
  where: Array<UserWhereUniqueInput>;
};


export type MutationRedeemUserMagicAuthTokenArgs = {
  email: Scalars['String'];
  token: Scalars['String'];
};


export type MutationRedeemUserPasswordResetTokenArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationSendUserMagicAuthLinkArgs = {
  email: Scalars['String'];
};


export type MutationSendUserPasswordResetLinkArgs = {
  email: Scalars['String'];
};


export type MutationUpdateCourseArgs = {
  data: CourseUpdateInput;
  where: CourseWhereUniqueInput;
};


export type MutationUpdateCoursesArgs = {
  data: Array<CourseUpdateArgs>;
};


export type MutationUpdateReportCardSettingArgs = {
  data: ReportCardSettingUpdateInput;
  where: ReportCardSettingWhereUniqueInput;
};


export type MutationUpdateReportCardSettingsArgs = {
  data: Array<ReportCardSettingUpdateArgs>;
};


export type MutationUpdateRoleArgs = {
  data: RoleUpdateInput;
  where: RoleWhereUniqueInput;
};


export type MutationUpdateRolesArgs = {
  data: Array<RoleUpdateArgs>;
};


export type MutationUpdateSemesterArgs = {
  data: SemesterUpdateInput;
  where: SemesterWhereUniqueInput;
};


export type MutationUpdateSemestersArgs = {
  data: Array<SemesterUpdateArgs>;
};


export type MutationUpdateSettingArgs = {
  data: SettingUpdateInput;
  where: SettingWhereUniqueInput;
};


export type MutationUpdateSettingsArgs = {
  data: Array<SettingUpdateArgs>;
};


export type MutationUpdateStudentArgs = {
  data: StudentUpdateInput;
  where: StudentWhereUniqueInput;
};


export type MutationUpdateStudentsArgs = {
  data: Array<StudentUpdateArgs>;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateUsersArgs = {
  data: Array<UserUpdateArgs>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type PasswordFilter = {
  isSet: Scalars['Boolean'];
};

export enum PasswordResetRedemptionErrorCode {
  Failure = 'FAILURE',
  TokenExpired = 'TOKEN_EXPIRED',
  TokenRedeemed = 'TOKEN_REDEEMED'
}

export type PasswordState = {
  __typename?: 'PasswordState';
  isSet: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  authenticatedItem?: Maybe<AuthenticatedItem>;
  course?: Maybe<Course>;
  courses?: Maybe<Array<Course>>;
  coursesCount?: Maybe<Scalars['Int']>;
  keystone: KeystoneMeta;
  reportCardSetting?: Maybe<ReportCardSetting>;
  reportCardSettings?: Maybe<Array<ReportCardSetting>>;
  reportCardSettingsCount?: Maybe<Scalars['Int']>;
  role?: Maybe<Role>;
  roles?: Maybe<Array<Role>>;
  rolesCount?: Maybe<Scalars['Int']>;
  semester?: Maybe<Semester>;
  semesters?: Maybe<Array<Semester>>;
  semestersCount?: Maybe<Scalars['Int']>;
  setting?: Maybe<Setting>;
  settings?: Maybe<Array<Setting>>;
  settingsCount?: Maybe<Scalars['Int']>;
  student?: Maybe<Student>;
  students?: Maybe<Array<Student>>;
  studentsCount?: Maybe<Scalars['Int']>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']>;
  validateUserPasswordResetToken?: Maybe<ValidateUserPasswordResetTokenResult>;
};


export type QueryCourseArgs = {
  where: CourseWhereUniqueInput;
};


export type QueryCoursesArgs = {
  orderBy?: Array<CourseOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CourseWhereInput;
};


export type QueryCoursesCountArgs = {
  where?: CourseWhereInput;
};


export type QueryReportCardSettingArgs = {
  where: ReportCardSettingWhereUniqueInput;
};


export type QueryReportCardSettingsArgs = {
  orderBy?: Array<ReportCardSettingOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: ReportCardSettingWhereInput;
};


export type QueryReportCardSettingsCountArgs = {
  where?: ReportCardSettingWhereInput;
};


export type QueryRoleArgs = {
  where: RoleWhereUniqueInput;
};


export type QueryRolesArgs = {
  orderBy?: Array<RoleOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: RoleWhereInput;
};


export type QueryRolesCountArgs = {
  where?: RoleWhereInput;
};


export type QuerySemesterArgs = {
  where: SemesterWhereUniqueInput;
};


export type QuerySemestersArgs = {
  orderBy?: Array<SemesterOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: SemesterWhereInput;
};


export type QuerySemestersCountArgs = {
  where?: SemesterWhereInput;
};


export type QuerySettingArgs = {
  where: SettingWhereUniqueInput;
};


export type QuerySettingsArgs = {
  orderBy?: Array<SettingOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: SettingWhereInput;
};


export type QuerySettingsCountArgs = {
  where?: SettingWhereInput;
};


export type QueryStudentArgs = {
  where: StudentWhereUniqueInput;
};


export type QueryStudentsArgs = {
  orderBy?: Array<StudentOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: StudentWhereInput;
};


export type QueryStudentsCountArgs = {
  where?: StudentWhereInput;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: UserWhereInput;
};


export type QueryUsersCountArgs = {
  where?: UserWhereInput;
};


export type QueryValidateUserPasswordResetTokenArgs = {
  email: Scalars['String'];
  token: Scalars['String'];
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type RedeemUserMagicAuthTokenFailure = {
  __typename?: 'RedeemUserMagicAuthTokenFailure';
  code: MagicLinkRedemptionErrorCode;
  message: Scalars['String'];
};

export type RedeemUserMagicAuthTokenResult = RedeemUserMagicAuthTokenFailure | RedeemUserMagicAuthTokenSuccess;

export type RedeemUserMagicAuthTokenSuccess = {
  __typename?: 'RedeemUserMagicAuthTokenSuccess';
  item: User;
  token: Scalars['String'];
};

export type RedeemUserPasswordResetTokenResult = {
  __typename?: 'RedeemUserPasswordResetTokenResult';
  code: PasswordResetRedemptionErrorCode;
  message: Scalars['String'];
};

export type ReportCardSetting = {
  __typename?: 'ReportCardSetting';
  address?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  semester?: Maybe<Semester>;
  title?: Maybe<Scalars['String']>;
};

export type ReportCardSettingCreateInput = {
  address?: InputMaybe<Scalars['String']>;
  semester?: InputMaybe<SemesterRelateToOneForCreateInput>;
  title?: InputMaybe<Scalars['String']>;
};

export type ReportCardSettingOrderByInput = {
  address?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type ReportCardSettingUpdateArgs = {
  data: ReportCardSettingUpdateInput;
  where: ReportCardSettingWhereUniqueInput;
};

export type ReportCardSettingUpdateInput = {
  address?: InputMaybe<Scalars['String']>;
  semester?: InputMaybe<SemesterRelateToOneForUpdateInput>;
  title?: InputMaybe<Scalars['String']>;
};

export type ReportCardSettingWhereInput = {
  AND?: InputMaybe<Array<ReportCardSettingWhereInput>>;
  NOT?: InputMaybe<Array<ReportCardSettingWhereInput>>;
  OR?: InputMaybe<Array<ReportCardSettingWhereInput>>;
  address?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  semester?: InputMaybe<SemesterWhereInput>;
  title?: InputMaybe<StringFilter>;
};

export type ReportCardSettingWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type RoleCreateInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type RoleManyRelationFilter = {
  every?: InputMaybe<RoleWhereInput>;
  none?: InputMaybe<RoleWhereInput>;
  some?: InputMaybe<RoleWhereInput>;
};

export type RoleOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type RoleRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<RoleWhereUniqueInput>>;
  create?: InputMaybe<Array<RoleCreateInput>>;
};

export type RoleRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<RoleWhereUniqueInput>>;
  create?: InputMaybe<Array<RoleCreateInput>>;
  disconnect?: InputMaybe<Array<RoleWhereUniqueInput>>;
  set?: InputMaybe<Array<RoleWhereUniqueInput>>;
};

export type RoleUpdateArgs = {
  data: RoleUpdateInput;
  where: RoleWhereUniqueInput;
};

export type RoleUpdateInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type RoleWhereInput = {
  AND?: InputMaybe<Array<RoleWhereInput>>;
  NOT?: InputMaybe<Array<RoleWhereInput>>;
  OR?: InputMaybe<Array<RoleWhereInput>>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
};

export type RoleWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Semester = {
  __typename?: 'Semester';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type SemesterCreateInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type SemesterOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type SemesterRelateToOneForCreateInput = {
  connect?: InputMaybe<SemesterWhereUniqueInput>;
  create?: InputMaybe<SemesterCreateInput>;
};

export type SemesterRelateToOneForUpdateInput = {
  connect?: InputMaybe<SemesterWhereUniqueInput>;
  create?: InputMaybe<SemesterCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type SemesterUpdateArgs = {
  data: SemesterUpdateInput;
  where: SemesterWhereUniqueInput;
};

export type SemesterUpdateInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type SemesterWhereInput = {
  AND?: InputMaybe<Array<SemesterWhereInput>>;
  NOT?: InputMaybe<Array<SemesterWhereInput>>;
  OR?: InputMaybe<Array<SemesterWhereInput>>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
};

export type SemesterWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Setting = {
  __typename?: 'Setting';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type SettingCreateInput = {
  name?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type SettingOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  value?: InputMaybe<OrderDirection>;
};

export type SettingUpdateArgs = {
  data: SettingUpdateInput;
  where: SettingWhereUniqueInput;
};

export type SettingUpdateInput = {
  name?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type SettingWhereInput = {
  AND?: InputMaybe<Array<SettingWhereInput>>;
  NOT?: InputMaybe<Array<SettingWhereInput>>;
  OR?: InputMaybe<Array<SettingWhereInput>>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  value?: InputMaybe<StringFilter>;
};

export type SettingWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Student = {
  __typename?: 'Student';
  courses?: Maybe<Array<Course>>;
  coursesCount?: Maybe<Scalars['Int']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  myCourses?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parent?: Maybe<User>;
  portalId?: Maybe<Scalars['String']>;
};


export type StudentCoursesArgs = {
  orderBy?: Array<CourseOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CourseWhereInput;
};


export type StudentCoursesCountArgs = {
  where?: CourseWhereInput;
};

export type StudentCreateInput = {
  courses?: InputMaybe<CourseRelateToManyForCreateInput>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type StudentManyRelationFilter = {
  every?: InputMaybe<StudentWhereInput>;
  none?: InputMaybe<StudentWhereInput>;
  some?: InputMaybe<StudentWhereInput>;
};

export type StudentOrderByInput = {
  firstName?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  lastName?: InputMaybe<OrderDirection>;
};

export type StudentRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<StudentWhereUniqueInput>>;
  create?: InputMaybe<Array<StudentCreateInput>>;
};

export type StudentRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<StudentWhereUniqueInput>>;
  create?: InputMaybe<Array<StudentCreateInput>>;
  disconnect?: InputMaybe<Array<StudentWhereUniqueInput>>;
  set?: InputMaybe<Array<StudentWhereUniqueInput>>;
};

export type StudentRelateToOneForCreateInput = {
  connect?: InputMaybe<StudentWhereUniqueInput>;
  create?: InputMaybe<StudentCreateInput>;
};

export type StudentRelateToOneForUpdateInput = {
  connect?: InputMaybe<StudentWhereUniqueInput>;
  create?: InputMaybe<StudentCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type StudentUpdateArgs = {
  data: StudentUpdateInput;
  where: StudentWhereUniqueInput;
};

export type StudentUpdateInput = {
  courses?: InputMaybe<CourseRelateToManyForUpdateInput>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type StudentWhereInput = {
  AND?: InputMaybe<Array<StudentWhereInput>>;
  NOT?: InputMaybe<Array<StudentWhereInput>>;
  OR?: InputMaybe<Array<StudentWhereInput>>;
  courses?: InputMaybe<CourseManyRelationFilter>;
  firstName?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  lastName?: InputMaybe<StringFilter>;
  parent?: InputMaybe<UserWhereInput>;
};

export type StudentWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type User = {
  __typename?: 'User';
  city?: Maybe<Scalars['String']>;
  courses?: Maybe<Array<Course>>;
  coursesCount?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  hasPaidTuition?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  isAdmin?: Maybe<Scalars['Boolean']>;
  isParent?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  magicAuthIssuedAt?: Maybe<Scalars['DateTime']>;
  magicAuthRedeemedAt?: Maybe<Scalars['DateTime']>;
  magicAuthToken?: Maybe<PasswordState>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<PasswordState>;
  passwordResetIssuedAt?: Maybe<Scalars['DateTime']>;
  passwordResetRedeemedAt?: Maybe<Scalars['DateTime']>;
  passwordResetToken?: Maybe<PasswordState>;
  phone?: Maybe<Scalars['String']>;
  phoneFather?: Maybe<Scalars['String']>;
  phoneMother?: Maybe<Scalars['String']>;
  portalId?: Maybe<Scalars['String']>;
  role?: Maybe<Array<Role>>;
  roleCount?: Maybe<Scalars['Int']>;
  state?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  student?: Maybe<Array<Student>>;
  studentCount?: Maybe<Scalars['Int']>;
  students?: Maybe<Scalars['String']>;
  zipcode?: Maybe<Scalars['String']>;
};


export type UserCoursesArgs = {
  orderBy?: Array<CourseOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CourseWhereInput;
};


export type UserCoursesCountArgs = {
  where?: CourseWhereInput;
};


export type UserRoleArgs = {
  orderBy?: Array<RoleOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: RoleWhereInput;
};


export type UserRoleCountArgs = {
  where?: RoleWhereInput;
};


export type UserStudentArgs = {
  orderBy?: Array<StudentOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: StudentWhereInput;
};


export type UserStudentCountArgs = {
  where?: StudentWhereInput;
};

export type UserAuthenticationWithPasswordFailure = {
  __typename?: 'UserAuthenticationWithPasswordFailure';
  message: Scalars['String'];
};

export type UserAuthenticationWithPasswordResult = UserAuthenticationWithPasswordFailure | UserAuthenticationWithPasswordSuccess;

export type UserAuthenticationWithPasswordSuccess = {
  __typename?: 'UserAuthenticationWithPasswordSuccess';
  item: User;
  sessionToken: Scalars['String'];
};

export type UserCreateInput = {
  city?: InputMaybe<Scalars['String']>;
  courses?: InputMaybe<CourseRelateToManyForCreateInput>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  hasPaidTuition?: InputMaybe<Scalars['Boolean']>;
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  isParent?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
  magicAuthIssuedAt?: InputMaybe<Scalars['DateTime']>;
  magicAuthRedeemedAt?: InputMaybe<Scalars['DateTime']>;
  magicAuthToken?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  passwordResetIssuedAt?: InputMaybe<Scalars['DateTime']>;
  passwordResetRedeemedAt?: InputMaybe<Scalars['DateTime']>;
  passwordResetToken?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  phoneFather?: InputMaybe<Scalars['String']>;
  phoneMother?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleRelateToManyForCreateInput>;
  state?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
  student?: InputMaybe<StudentRelateToManyForCreateInput>;
  zipcode?: InputMaybe<Scalars['String']>;
};

export type UserOrderByInput = {
  city?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  firstName?: InputMaybe<OrderDirection>;
  hasPaidTuition?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isAdmin?: InputMaybe<OrderDirection>;
  isParent?: InputMaybe<OrderDirection>;
  lastName?: InputMaybe<OrderDirection>;
  magicAuthIssuedAt?: InputMaybe<OrderDirection>;
  magicAuthRedeemedAt?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  passwordResetIssuedAt?: InputMaybe<OrderDirection>;
  passwordResetRedeemedAt?: InputMaybe<OrderDirection>;
  phone?: InputMaybe<OrderDirection>;
  phoneFather?: InputMaybe<OrderDirection>;
  phoneMother?: InputMaybe<OrderDirection>;
  state?: InputMaybe<OrderDirection>;
  street?: InputMaybe<OrderDirection>;
  zipcode?: InputMaybe<OrderDirection>;
};

export type UserRelateToOneForCreateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
};

export type UserRelateToOneForUpdateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type UserUpdateArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateInput = {
  city?: InputMaybe<Scalars['String']>;
  courses?: InputMaybe<CourseRelateToManyForUpdateInput>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  hasPaidTuition?: InputMaybe<Scalars['Boolean']>;
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  isParent?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
  magicAuthIssuedAt?: InputMaybe<Scalars['DateTime']>;
  magicAuthRedeemedAt?: InputMaybe<Scalars['DateTime']>;
  magicAuthToken?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  passwordResetIssuedAt?: InputMaybe<Scalars['DateTime']>;
  passwordResetRedeemedAt?: InputMaybe<Scalars['DateTime']>;
  passwordResetToken?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  phoneFather?: InputMaybe<Scalars['String']>;
  phoneMother?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleRelateToManyForUpdateInput>;
  state?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
  student?: InputMaybe<StudentRelateToManyForUpdateInput>;
  zipcode?: InputMaybe<Scalars['String']>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  city?: InputMaybe<StringFilter>;
  courses?: InputMaybe<CourseManyRelationFilter>;
  email?: InputMaybe<StringFilter>;
  firstName?: InputMaybe<StringFilter>;
  hasPaidTuition?: InputMaybe<BooleanFilter>;
  id?: InputMaybe<IdFilter>;
  isAdmin?: InputMaybe<BooleanFilter>;
  isParent?: InputMaybe<BooleanFilter>;
  lastName?: InputMaybe<StringFilter>;
  magicAuthIssuedAt?: InputMaybe<DateTimeNullableFilter>;
  magicAuthRedeemedAt?: InputMaybe<DateTimeNullableFilter>;
  magicAuthToken?: InputMaybe<PasswordFilter>;
  name?: InputMaybe<StringFilter>;
  passwordResetIssuedAt?: InputMaybe<DateTimeNullableFilter>;
  passwordResetRedeemedAt?: InputMaybe<DateTimeNullableFilter>;
  passwordResetToken?: InputMaybe<PasswordFilter>;
  phone?: InputMaybe<StringNullableFilter>;
  phoneFather?: InputMaybe<StringNullableFilter>;
  phoneMother?: InputMaybe<StringNullableFilter>;
  role?: InputMaybe<RoleManyRelationFilter>;
  state?: InputMaybe<StringFilter>;
  street?: InputMaybe<StringFilter>;
  student?: InputMaybe<StudentManyRelationFilter>;
  zipcode?: InputMaybe<StringFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type ValidateUserPasswordResetTokenResult = {
  __typename?: 'ValidateUserPasswordResetTokenResult';
  code: PasswordResetRedemptionErrorCode;
  message: Scalars['String'];
};

export type CreateStudentMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type CreateStudentMutation = { __typename?: 'Mutation', createStudent?: { __typename: 'Student', id: string } | null };

export type CreateTeacherMutationVariables = Exact<{
  name: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  admin: Scalars['Boolean'];
}>;


export type CreateTeacherMutation = { __typename?: 'Mutation', createUser?: { __typename: 'User', id: string } | null };

export type BulkAddStudentsMutationVariables = Exact<{
  data: Array<StudentCreateInput> | StudentCreateInput;
}>;


export type BulkAddStudentsMutation = { __typename?: 'Mutation', createStudents?: Array<{ __typename: 'Student', id: string } | null> | null };

export type CreateCourseMutationVariables = Exact<{
  grade: Scalars['String'];
  name: Scalars['String'];
  feedback: Scalars['String'];
  student?: InputMaybe<Scalars['ID']>;
  teacher?: InputMaybe<Scalars['ID']>;
}>;


export type CreateCourseMutation = { __typename?: 'Mutation', createCourse?: { __typename: 'Course', id: string } | null };

export type DeleteCourseMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteCourseMutation = { __typename?: 'Mutation', deleteCourse?: { __typename: 'Course' } | null };

export type DeleteStudentMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteStudentMutation = { __typename?: 'Mutation', deleteStudent?: { __typename: 'Student' } | null };

export type DeleteTeacherMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTeacherMutation = { __typename?: 'Mutation', deleteUser?: { __typename: 'User' } | null };

export type UpdateStudentInfoMutationVariables = Exact<{
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type UpdateStudentInfoMutation = { __typename?: 'Mutation', updateStudent?: { __typename: 'Student', id: string } | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', authenticateUserWithPassword?: { __typename: 'UserAuthenticationWithPasswordFailure', message: string } | { __typename: 'UserAuthenticationWithPasswordSuccess', item: { __typename?: 'User', email?: string | null, isAdmin?: boolean | null } } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename: 'Mutation', endSession: boolean };

export type RedeemMagicAuthTokenMutationVariables = Exact<{
  email: Scalars['String'];
  token: Scalars['String'];
}>;


export type RedeemMagicAuthTokenMutation = { __typename?: 'Mutation', redeemUserMagicAuthToken: { __typename: 'RedeemUserMagicAuthTokenFailure', code: MagicLinkRedemptionErrorCode, message: string } | { __typename: 'RedeemUserMagicAuthTokenSuccess', item: { __typename?: 'User', id: string, isParent?: boolean | null, isAdmin?: boolean | null, firstName?: string | null } } };

export type RedeemPasswordResetTokenMutationVariables = Exact<{
  email: Scalars['String'];
  token: Scalars['String'];
  password: Scalars['String'];
}>;


export type RedeemPasswordResetTokenMutation = { __typename?: 'Mutation', redeemUserPasswordResetToken?: { __typename: 'RedeemUserPasswordResetTokenResult', message: string, code: PasswordResetRedemptionErrorCode } | null };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', createUser?: { __typename: 'User', id: string, email?: string | null } | null };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', sendUserPasswordResetLink: boolean };

export type ToggleAdminMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  isAdmin: Scalars['Boolean'];
}>;


export type ToggleAdminMutation = { __typename?: 'Mutation', updateUser?: { __typename: 'User', id: string } | null };

export type TogglePaidTuitionMutationVariables = Exact<{
  id: Scalars['ID'];
  hasPaid: Scalars['Boolean'];
}>;


export type TogglePaidTuitionMutation = { __typename?: 'Mutation', updateUser?: { __typename: 'User', id: string } | null };

export type UpdateCourseMutationVariables = Exact<{
  name: Scalars['String'];
  grade: Scalars['String'];
  id?: InputMaybe<Scalars['ID']>;
  feedback: Scalars['String'];
}>;


export type UpdateCourseMutation = { __typename?: 'Mutation', updateCourse?: { __typename: 'Course', id: string } | null };

export type UpdatePasswordMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updateUser?: { __typename: 'User' } | null };

export type UpdateSettingsMutationVariables = Exact<{
  id: Scalars['ID'];
  value: Scalars['String'];
}>;


export type UpdateSettingsMutation = { __typename?: 'Mutation', updateSetting?: { __typename: 'Setting' } | null };

export type GetUserEmailByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type GetUserEmailByIdQuery = { __typename?: 'Query', user?: { __typename: 'User', email?: string | null, name?: string | null, firstName?: string | null, lastName?: string | null, isAdmin?: boolean | null, isParent?: boolean | null, hasPaidTuition?: boolean | null } | null };

export type CheckLoginQueryVariables = Exact<{ [key: string]: never; }>;


export type CheckLoginQuery = { __typename?: 'Query', authenticatedItem?: { __typename: 'User', id: string, email?: string | null, name?: string | null, firstName?: string | null, lastName?: string | null, isAdmin?: boolean | null, isParent?: boolean | null, hasPaidTuition?: boolean | null } | null };

export type CoursesByStudentQueryVariables = Exact<{
  studentId: Scalars['ID'];
}>;


export type CoursesByStudentQuery = { __typename?: 'Query', courses?: Array<{ __typename: 'Course', name?: string | null, grade?: string | null, feedback?: string | null, id: string, feedbackLength?: string | null, teacher?: { __typename?: 'User', name?: string | null, id: string } | null }> | null };

export type GetCoursesByStudentAndTeacherQueryVariables = Exact<{
  studentId: Scalars['ID'];
  teacherId: Scalars['ID'];
}>;


export type GetCoursesByStudentAndTeacherQuery = { __typename?: 'Query', courses?: Array<{ __typename: 'Course', name?: string | null, grade?: string | null, feedback?: string | null, id: string }> | null };

export type FetchSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchSettingsQuery = { __typename?: 'Query', settings?: Array<{ __typename?: 'Setting', id: string, name?: string | null, value?: string | null }> | null };

export type GetAllParentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllParentsQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', name?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, phoneMother?: string | null, phoneFather?: string | null, street?: string | null, city?: string | null, state?: string | null, zipcode?: string | null, hasPaidTuition?: boolean | null, id: string, portalId?: string | null, student?: Array<{ __typename?: 'Student', firstName?: string | null, id: string, portalId?: string | null }> | null }> | null };

export type GetAllStudentsQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}>;


export type GetAllStudentsQuery = { __typename?: 'Query', students?: Array<{ __typename: 'Student', id: string, name?: string | null, firstName?: string | null, lastName?: string | null, portalId?: string | null }> | null };

export type GetAllTeachersQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}>;


export type GetAllTeachersQuery = { __typename?: 'Query', users?: Array<{ __typename: 'User', id: string, name?: string | null, email?: string | null, isAdmin?: boolean | null, isParent?: boolean | null }> | null };

export type GetMyCoursesCountByTeacherQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetMyCoursesCountByTeacherQuery = { __typename?: 'Query', coursesCount?: number | null };

export type GetMyProfileQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetMyProfileQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name?: string | null, firstName?: string | null, lastName?: string | null, street?: string | null, city?: string | null, state?: string | null, zipcode?: string | null, phoneMother?: string | null, phoneFather?: string | null } | null };

export type GetMyStudentsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetMyStudentsQuery = { __typename?: 'Query', user?: { __typename: 'User', name?: string | null, students?: string | null, id: string, portalId?: string | null } | null };

export type GetStudentQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetStudentQuery = { __typename?: 'Query', student?: { __typename: 'Student', id: string, firstName?: string | null, lastName?: string | null, portalId?: string | null } | null };

export type GetStudentsByParentQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type GetStudentsByParentQuery = { __typename?: 'Query', students?: Array<{ __typename?: 'Student', name?: string | null, firstName?: string | null, lastName?: string | null, id: string, portalId?: string | null, courses?: Array<{ __typename?: 'Course', name?: string | null, grade?: string | null, feedback?: string | null }> | null }> | null };

export type TotalCourseCountQueryVariables = Exact<{ [key: string]: never; }>;


export type TotalCourseCountQuery = { __typename?: 'Query', coursesCount?: number | null };

export type GetUsersByRoleQueryVariables = Exact<{
  tag: Scalars['String'];
}>;


export type GetUsersByRoleQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id: string, name?: string | null, firstName?: string | null, lastName?: string | null, role?: Array<{ __typename?: 'Role', name?: string | null }> | null }> | null };

export type SearchStudentsByNamePaginatedQueryVariables = Exact<{
  search: Scalars['String'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}>;


export type SearchStudentsByNamePaginatedQuery = { __typename?: 'Query', students?: Array<{ __typename: 'Student', id: string, firstName?: string | null, lastName?: string | null, name?: string | null }> | null };

export type SearchStudentsByNameCountQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type SearchStudentsByNameCountQuery = { __typename?: 'Query', studentsCount?: number | null };

export type StudentsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type StudentsCountQuery = { __typename?: 'Query', studentsCount?: number | null };


export const CreateStudentDocument = gql`
    mutation CreateStudent($firstName: String!, $lastName: String!) {
  createStudent(data: {firstName: $firstName, lastName: $lastName}) {
    id
    __typename
  }
}
    `;

export function useCreateStudentMutation() {
  return Urql.useMutation<CreateStudentMutation, CreateStudentMutationVariables>(CreateStudentDocument);
};
export const CreateTeacherDocument = gql`
    mutation CreateTeacher($name: String!, $password: String!, $email: String!, $admin: Boolean!) {
  createUser(
    data: {name: $name, password: $password, email: $email, isAdmin: $admin}
  ) {
    id
    __typename
  }
}
    `;

export function useCreateTeacherMutation() {
  return Urql.useMutation<CreateTeacherMutation, CreateTeacherMutationVariables>(CreateTeacherDocument);
};
export const BulkAddStudentsDocument = gql`
    mutation BulkAddStudents($data: [StudentCreateInput!]!) {
  createStudents(data: $data) {
    id
    __typename
  }
}
    `;

export function useBulkAddStudentsMutation() {
  return Urql.useMutation<BulkAddStudentsMutation, BulkAddStudentsMutationVariables>(BulkAddStudentsDocument);
};
export const CreateCourseDocument = gql`
    mutation CreateCourse($grade: String!, $name: String!, $feedback: String!, $student: ID, $teacher: ID) {
  createCourse(
    data: {grade: $grade, name: $name, feedback: $feedback, student: {connect: {id: $student}}, teacher: {connect: {id: $teacher}}}
  ) {
    id
    __typename
  }
}
    `;

export function useCreateCourseMutation() {
  return Urql.useMutation<CreateCourseMutation, CreateCourseMutationVariables>(CreateCourseDocument);
};
export const DeleteCourseDocument = gql`
    mutation DeleteCourse($id: ID!) {
  deleteCourse(where: {id: $id}) {
    __typename
  }
}
    `;

export function useDeleteCourseMutation() {
  return Urql.useMutation<DeleteCourseMutation, DeleteCourseMutationVariables>(DeleteCourseDocument);
};
export const DeleteStudentDocument = gql`
    mutation DeleteStudent($id: ID!) {
  deleteStudent(where: {id: $id}) {
    __typename
  }
}
    `;

export function useDeleteStudentMutation() {
  return Urql.useMutation<DeleteStudentMutation, DeleteStudentMutationVariables>(DeleteStudentDocument);
};
export const DeleteTeacherDocument = gql`
    mutation DeleteTeacher($id: ID!) {
  deleteUser(where: {id: $id}) {
    __typename
  }
}
    `;

export function useDeleteTeacherMutation() {
  return Urql.useMutation<DeleteTeacherMutation, DeleteTeacherMutationVariables>(DeleteTeacherDocument);
};
export const UpdateStudentInfoDocument = gql`
    mutation UpdateStudentInfo($id: ID!, $firstName: String!, $lastName: String!) {
  updateStudent(
    where: {id: $id}
    data: {firstName: $firstName, lastName: $lastName}
  ) {
    __typename
    id
  }
}
    `;

export function useUpdateStudentInfoMutation() {
  return Urql.useMutation<UpdateStudentInfoMutation, UpdateStudentInfoMutationVariables>(UpdateStudentInfoDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  authenticateUserWithPassword(email: $email, password: $password) {
    ... on UserAuthenticationWithPasswordSuccess {
      __typename
      item {
        email
        isAdmin
      }
    }
    ... on UserAuthenticationWithPasswordFailure {
      __typename
      message
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  endSession
  __typename
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation>(LogoutDocument);
};
export const RedeemMagicAuthTokenDocument = gql`
    mutation RedeemMagicAuthToken($email: String!, $token: String!) {
  redeemUserMagicAuthToken(email: $email, token: $token) {
    __typename
    ... on RedeemUserMagicAuthTokenSuccess {
      item {
        id
        isParent
        isAdmin
        firstName
      }
    }
    ... on RedeemUserMagicAuthTokenFailure {
      code
      message
    }
  }
}
    `;

export function useRedeemMagicAuthTokenMutation() {
  return Urql.useMutation<RedeemMagicAuthTokenMutation, RedeemMagicAuthTokenMutationVariables>(RedeemMagicAuthTokenDocument);
};
export const RedeemPasswordResetTokenDocument = gql`
    mutation RedeemPasswordResetToken($email: String!, $token: String!, $password: String!) {
  redeemUserPasswordResetToken(email: $email, token: $token, password: $password) {
    __typename
    message
    code
  }
}
    `;

export function useRedeemPasswordResetTokenMutation() {
  return Urql.useMutation<RedeemPasswordResetTokenMutation, RedeemPasswordResetTokenMutationVariables>(RedeemPasswordResetTokenDocument);
};
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $name: String!) {
  createUser(data: {email: $email, password: $password, name: $name}) {
    ... on User {
      __typename
      id
      email
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  sendUserPasswordResetLink(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const ToggleAdminDocument = gql`
    mutation ToggleAdmin($id: ID, $isAdmin: Boolean!) {
  updateUser(where: {id: $id}, data: {isAdmin: $isAdmin}) {
    id
    __typename
  }
}
    `;

export function useToggleAdminMutation() {
  return Urql.useMutation<ToggleAdminMutation, ToggleAdminMutationVariables>(ToggleAdminDocument);
};
export const TogglePaidTuitionDocument = gql`
    mutation TogglePaidTuition($id: ID!, $hasPaid: Boolean!) {
  updateUser(where: {id: $id}, data: {hasPaidTuition: $hasPaid}) {
    id
    __typename
  }
}
    `;

export function useTogglePaidTuitionMutation() {
  return Urql.useMutation<TogglePaidTuitionMutation, TogglePaidTuitionMutationVariables>(TogglePaidTuitionDocument);
};
export const UpdateCourseDocument = gql`
    mutation UpdateCourse($name: String!, $grade: String!, $id: ID, $feedback: String!) {
  updateCourse(
    where: {id: $id}
    data: {name: $name, grade: $grade, feedback: $feedback}
  ) {
    id
    __typename
  }
}
    `;

export function useUpdateCourseMutation() {
  return Urql.useMutation<UpdateCourseMutation, UpdateCourseMutationVariables>(UpdateCourseDocument);
};
export const UpdatePasswordDocument = gql`
    mutation UpdatePassword($email: String!, $password: String!) {
  updateUser(where: {email: $email}, data: {password: $password}) {
    __typename
  }
}
    `;

export function useUpdatePasswordMutation() {
  return Urql.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument);
};
export const UpdateSettingsDocument = gql`
    mutation UpdateSettings($id: ID!, $value: String!) {
  updateSetting(where: {id: $id}, data: {value: $value}) {
    __typename
  }
}
    `;

export function useUpdateSettingsMutation() {
  return Urql.useMutation<UpdateSettingsMutation, UpdateSettingsMutationVariables>(UpdateSettingsDocument);
};
export const GetUserEmailByIdDocument = gql`
    query GetUserEmailById($id: ID) {
  user(where: {id: $id}) {
    __typename
    email
    name
    firstName
    lastName
    isAdmin
    isParent
    hasPaidTuition
  }
}
    `;

export function useGetUserEmailByIdQuery(options?: Omit<Urql.UseQueryArgs<GetUserEmailByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserEmailByIdQuery, GetUserEmailByIdQueryVariables>({ query: GetUserEmailByIdDocument, ...options });
};
export const CheckLoginDocument = gql`
    query CheckLogin {
  authenticatedItem {
    __typename
    ... on User {
      id
      email
      name
      firstName
      lastName
      isAdmin
      isParent
      hasPaidTuition
    }
  }
}
    `;

export function useCheckLoginQuery(options?: Omit<Urql.UseQueryArgs<CheckLoginQueryVariables>, 'query'>) {
  return Urql.useQuery<CheckLoginQuery, CheckLoginQueryVariables>({ query: CheckLoginDocument, ...options });
};
export const CoursesByStudentDocument = gql`
    query CoursesByStudent($studentId: ID!) {
  courses(where: {student: {id: {equals: $studentId}}}, orderBy: {name: asc}) {
    __typename
    name
    grade
    feedback
    id
    feedbackLength
    teacher {
      name
      id
    }
  }
}
    `;

export function useCoursesByStudentQuery(options: Omit<Urql.UseQueryArgs<CoursesByStudentQueryVariables>, 'query'>) {
  return Urql.useQuery<CoursesByStudentQuery, CoursesByStudentQueryVariables>({ query: CoursesByStudentDocument, ...options });
};
export const GetCoursesByStudentAndTeacherDocument = gql`
    query GetCoursesByStudentAndTeacher($studentId: ID!, $teacherId: ID!) {
  courses(
    where: {student: {id: {equals: $studentId}}, teacher: {id: {equals: $teacherId}}}
  ) {
    __typename
    name
    grade
    feedback
    id
  }
}
    `;

export function useGetCoursesByStudentAndTeacherQuery(options: Omit<Urql.UseQueryArgs<GetCoursesByStudentAndTeacherQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCoursesByStudentAndTeacherQuery, GetCoursesByStudentAndTeacherQueryVariables>({ query: GetCoursesByStudentAndTeacherDocument, ...options });
};
export const FetchSettingsDocument = gql`
    query FetchSettings {
  settings {
    id
    name
    value
  }
}
    `;

export function useFetchSettingsQuery(options?: Omit<Urql.UseQueryArgs<FetchSettingsQueryVariables>, 'query'>) {
  return Urql.useQuery<FetchSettingsQuery, FetchSettingsQueryVariables>({ query: FetchSettingsDocument, ...options });
};
export const GetAllParentsDocument = gql`
    query GetAllParents {
  users(where: {isParent: {equals: true}}, orderBy: {lastName: asc}) {
    name
    firstName
    lastName
    email
    phoneMother
    phoneFather
    street
    city
    state
    zipcode
    hasPaidTuition
    id
    portalId
    student {
      firstName
      id
      portalId
    }
  }
}
    `;

export function useGetAllParentsQuery(options?: Omit<Urql.UseQueryArgs<GetAllParentsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllParentsQuery, GetAllParentsQueryVariables>({ query: GetAllParentsDocument, ...options });
};
export const GetAllStudentsDocument = gql`
    query GetAllStudents($limit: Int!, $offset: Int!) {
  students(take: $limit, skip: $offset, orderBy: {firstName: asc}) {
    __typename
    id
    name
    firstName
    lastName
    portalId
  }
}
    `;

export function useGetAllStudentsQuery(options: Omit<Urql.UseQueryArgs<GetAllStudentsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllStudentsQuery, GetAllStudentsQueryVariables>({ query: GetAllStudentsDocument, ...options });
};
export const GetAllTeachersDocument = gql`
    query GetAllTeachers($limit: Int!, $offset: Int!) {
  users(
    take: $limit
    skip: $offset
    orderBy: {name: asc}
    where: {NOT: {isParent: {equals: true}}}
  ) {
    __typename
    id
    name
    email
    isAdmin
    isParent
  }
}
    `;

export function useGetAllTeachersQuery(options: Omit<Urql.UseQueryArgs<GetAllTeachersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllTeachersQuery, GetAllTeachersQueryVariables>({ query: GetAllTeachersDocument, ...options });
};
export const GetMyCoursesCountByTeacherDocument = gql`
    query GetMyCoursesCountByTeacher($id: ID!) {
  coursesCount(where: {teacher: {id: {equals: $id}}})
}
    `;

export function useGetMyCoursesCountByTeacherQuery(options: Omit<Urql.UseQueryArgs<GetMyCoursesCountByTeacherQueryVariables>, 'query'>) {
  return Urql.useQuery<GetMyCoursesCountByTeacherQuery, GetMyCoursesCountByTeacherQueryVariables>({ query: GetMyCoursesCountByTeacherDocument, ...options });
};
export const GetMyProfileDocument = gql`
    query GetMyProfile($id: ID!) {
  user(where: {id: $id}) {
    id
    name
    firstName
    lastName
    street
    city
    state
    zipcode
    phoneMother
    phoneFather
  }
}
    `;

export function useGetMyProfileQuery(options: Omit<Urql.UseQueryArgs<GetMyProfileQueryVariables>, 'query'>) {
  return Urql.useQuery<GetMyProfileQuery, GetMyProfileQueryVariables>({ query: GetMyProfileDocument, ...options });
};
export const GetMyStudentsDocument = gql`
    query GetMyStudents($id: ID!) {
  user(where: {id: $id}) {
    __typename
    name
    students
    id
    portalId
  }
}
    `;

export function useGetMyStudentsQuery(options: Omit<Urql.UseQueryArgs<GetMyStudentsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetMyStudentsQuery, GetMyStudentsQueryVariables>({ query: GetMyStudentsDocument, ...options });
};
export const GetStudentDocument = gql`
    query GetStudent($id: ID!) {
  student(where: {id: $id}) {
    __typename
    id
    firstName
    lastName
    portalId
  }
}
    `;

export function useGetStudentQuery(options: Omit<Urql.UseQueryArgs<GetStudentQueryVariables>, 'query'>) {
  return Urql.useQuery<GetStudentQuery, GetStudentQueryVariables>({ query: GetStudentDocument, ...options });
};
export const GetStudentsByParentDocument = gql`
    query GetStudentsByParent($email: String!) {
  students(where: {parent: {email: {equals: $email}}}) {
    name
    firstName
    lastName
    id
    portalId
    courses {
      name
      grade
      feedback
    }
  }
}
    `;

export function useGetStudentsByParentQuery(options: Omit<Urql.UseQueryArgs<GetStudentsByParentQueryVariables>, 'query'>) {
  return Urql.useQuery<GetStudentsByParentQuery, GetStudentsByParentQueryVariables>({ query: GetStudentsByParentDocument, ...options });
};
export const TotalCourseCountDocument = gql`
    query TotalCourseCount {
  coursesCount(where: {teacher: {id: {not: {lt: 0}}}})
}
    `;

export function useTotalCourseCountQuery(options?: Omit<Urql.UseQueryArgs<TotalCourseCountQueryVariables>, 'query'>) {
  return Urql.useQuery<TotalCourseCountQuery, TotalCourseCountQueryVariables>({ query: TotalCourseCountDocument, ...options });
};
export const GetUsersByRoleDocument = gql`
    query GetUsersByRole($tag: String!) {
  users(where: {role: {some: {name: {equals: $tag}}}}) {
    id
    name
    firstName
    lastName
    role {
      name
    }
  }
}
    `;

export function useGetUsersByRoleQuery(options: Omit<Urql.UseQueryArgs<GetUsersByRoleQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUsersByRoleQuery, GetUsersByRoleQueryVariables>({ query: GetUsersByRoleDocument, ...options });
};
export const SearchStudentsByNamePaginatedDocument = gql`
    query SearchStudentsByNamePaginated($search: String!, $limit: Int!, $offset: Int!) {
  students(
    where: {OR: [{firstName: {contains: $search, mode: insensitive}}, {lastName: {contains: $search, mode: insensitive}}]}
    take: $limit
    skip: $offset
  ) {
    __typename
    id
    firstName
    lastName
    name
  }
}
    `;

export function useSearchStudentsByNamePaginatedQuery(options: Omit<Urql.UseQueryArgs<SearchStudentsByNamePaginatedQueryVariables>, 'query'>) {
  return Urql.useQuery<SearchStudentsByNamePaginatedQuery, SearchStudentsByNamePaginatedQueryVariables>({ query: SearchStudentsByNamePaginatedDocument, ...options });
};
export const SearchStudentsByNameCountDocument = gql`
    query SearchStudentsByNameCount($search: String!) {
  studentsCount(
    where: {OR: [{firstName: {contains: $search, mode: insensitive}}, {lastName: {contains: $search, mode: insensitive}}]}
  )
}
    `;

export function useSearchStudentsByNameCountQuery(options: Omit<Urql.UseQueryArgs<SearchStudentsByNameCountQueryVariables>, 'query'>) {
  return Urql.useQuery<SearchStudentsByNameCountQuery, SearchStudentsByNameCountQueryVariables>({ query: SearchStudentsByNameCountDocument, ...options });
};
export const StudentsCountDocument = gql`
    query StudentsCount {
  studentsCount
}
    `;

export function useStudentsCountQuery(options?: Omit<Urql.UseQueryArgs<StudentsCountQueryVariables>, 'query'>) {
  return Urql.useQuery<StudentsCountQuery, StudentsCountQueryVariables>({ query: StudentsCountDocument, ...options });
};