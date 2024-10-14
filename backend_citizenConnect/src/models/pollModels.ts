export interface Poll {
    PollID: string;
    OfficialID: string;
    Question: string;
    Option1: string;
    Option2: string;
    CreatedAt: Date;
}

export interface PollResponse {
    ResponseID: string;
    PollID: string;
    UserID: string;
    SelectedOption: string;
    CreatedAt: Date;
}

export interface PollCreateModel {
    OfficialID: string;
    Question: string;
    Option1: string;
    Option2: string;
}

export interface PollResponseCreateModel {
    PollID: string;
    UserID: string;
    SelectedOption: string;
}

