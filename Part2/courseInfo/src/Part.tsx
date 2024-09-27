interface props {
  name: string;
  exercises: number;
}
const Part = ({ name, exercises }: props) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

export default Part;
