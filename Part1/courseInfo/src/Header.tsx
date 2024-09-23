

interface props {
  course: string;
}

const Header = ({ course }: props) => {
  return <h1>{course}</h1>;
};

export default Header;
