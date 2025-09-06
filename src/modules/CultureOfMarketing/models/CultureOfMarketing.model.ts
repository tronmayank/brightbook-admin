export type ArticleListResponseType = {
  _id: string,
  title: string,
  image: string
  head: string
  date: string
  para1: string
  isDeleted: false,
  isActive: true,
  createdAt: string,
  updatedAt: string,
  __v: number
};

export enum UserEnum {
  Admin = "ADMIN",
  Employee = "EMPLOYEE",
  superAdmin = "SUPERADMIN",
}

export interface CultureOfMarketingFormValues {
  title: string;
  head: string;
  para1: string;
  image: string;
  date: string;
}
