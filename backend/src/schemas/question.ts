export const table = "questions";

type Question = {
  id: number;
  question: string;
  description: string;
  type: string;
  required: boolean;
  default: string;
  options: string;
};

export default Question;
