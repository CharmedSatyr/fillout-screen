// Input types
export type FilterClauseType = {
  id: string;
  condition: "equals" | "does_not_equal" | "greater_than" | "less_than";
  value: number | string;
};

export type ResponseFilters = FilterClauseType[];

// Response types
type QuestionType =
  | "Address"
  | "AudioRecording"
  | "Calcom"
  | "Calendly"
  | "Captcha"
  | "Checkbox"
  | "Checkboxes"
  | "ColorPicker"
  | "CurrencyInput"
  | "DatePicker"
  | "DateRange"
  | "DateTimePicker"
  | "Dropdown"
  | "EmailInput"
  | "FileUpload"
  | "ImagePicker"
  | "LocationCoordinates"
  | "LongAnswer"
  | "Matrix"
  | "MultiSelect"
  | "MultipleChoice"
  | "NumberInput"
  | "OpinionScale"
  | "Password"
  | "Payment"
  | "PhoneNumber"
  | "Ranking"
  | "RecordPicker"
  | "ShortAnswer"
  | "Signature"
  | "Slider"
  | "StarRating"
  | "Switch"
  | "TimePicker"
  | "URLInput";

export interface Question {
  id: string;
  name: string;
  type: QuestionType;
  value: string;
}

type CalculationType = "number" | "text";

interface Calculation {
  id: string;
  name: string;
  type: CalculationType;
  value: string;
}

interface UrlParameter {
  id: string;
  name: string;
  value: string;
}

export interface FormResponse {
  questions: Question[];
  calculations: Calculation[];
  urlParameters: UrlParameter[];
  quiz?: {
    score: number;
    maxScore: number;
  };
  submissionId: string;
  submissionTime: string;
}

export interface FormResponses {
  responses: FormResponse[];
  totalResponses: number;
  pageCount: number;
}
