export const table = "answers";

type Answer = {
  id: number;
  questionId: number;
  treatmentId: number;
  answer: string;
};

export default Answer;
