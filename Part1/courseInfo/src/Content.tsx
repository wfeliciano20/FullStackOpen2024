import Part from "./Part";

interface props {
  parts: {
    name: string;
    exercises: number;
  }[];
}

const Content = ({ parts }: props) => {
  return (
    <div>
      <Part name={parts[0].name} exercises={parts[0].exercises} />
      <Part name={parts[1].name} exercises={parts[1].exercises} />
      <Part name={parts[2].name} exercises={parts[2].exercises} />
    </div>
  );
};

export default Content;
