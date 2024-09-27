

interface props {
  parts: {
    id: number
    name: string;
    exercises: number;
  }[];
}
const Total = ({ parts }: props) => {
  return (
    <p>
      Number of exercises{" "} {parts.reduce((acc, curr) => acc + curr.exercises,0)}
    </p>
  );
};

export default Total;
