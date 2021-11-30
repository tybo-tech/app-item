
export interface User {
  UserId?: string;
  Email: string;
  Name: string;
  UserType?: string;
  Surname: string;
  Address?: string;
  Password: string;
  CompanyId?: string;
  CompanyName?: string;
  CompanyDp?: string;
  Slug?: string;
  RoleId?: number;
  CreateDate?: string;
  CreateUserId?: string;
  ModifyDate?: string;
  ModifyUserId?: string;
  NewPassword?: string;
  ConfirmPassword?: string;
  StatusId: any;
  UserToken?: any;
  Dp?: any;
  AddressLineHome: string;
  AddressUrlHome: string;
  AddressLineWork: string;
  AddressUrlWork: string;
  SystemRole?: string;
  SecurityToken?: string;
  Viewing?: boolean;
  PhoneNumber: any;
  ReferralCode?: string;
  ParentReferralCode?: string;
  Latitude?: number;
  Longitude?: number;
  CarReg?: string;
  CarType?: string;
  Gender?: string;
}
