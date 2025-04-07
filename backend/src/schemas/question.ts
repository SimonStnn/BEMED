export const table = "questions";

type Question = {
  id: number;
  question: string;
  description: string;
  type: string;
  required: boolean;
  def: string;
  options: string;
};

export default Question;
