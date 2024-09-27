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
      {parts.map((p,i) => 
      <div key={i}>
        <Part name={p.name} exercises={p.exercises} />
      </div>)}
    </div>
  );
};

export default Content;
