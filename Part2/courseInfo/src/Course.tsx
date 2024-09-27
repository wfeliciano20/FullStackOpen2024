
import Header from './Header';
import Content from './Content';
import Total from './Total';

interface props {
    course: {
        id: number;
        name: string;
        parts: {
            name: string;
            exercises: number;
            id: number;
        }[];
    }
}
const Course = (props: props) => {
    const {course} = props;
  return (
    <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
  )
}

export default Course