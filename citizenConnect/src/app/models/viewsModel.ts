export interface View {
  ViewID: string;
  UserID: string;
  Title: string;
  Description: string;
}

export interface ViewCreateModel {
  UserID: string;
  Title: string;
  Description: string;
}

export interface ViewUpdateModel {
  Title: string;
  Description: string;
}

