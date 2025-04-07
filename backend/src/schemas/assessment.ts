export const table = "assessments";

type Assessment = {
  id: number;
  userId: string;
  productId: number;
  ppm: number;
  createdAt: string;
  updatedAt: string;
};

export default Assessment;
