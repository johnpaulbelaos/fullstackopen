interface CoursePartBase {
  name: string;
  exerciseCount: number;
};

interface CoursePartDescription extends CoursePartBase {
  description: string;
};

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
};

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
};

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
};

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

interface HeaderProps {
  name: string;
};

interface ContentProps {
  name: string;
  exerciseCount: number;
  part: CoursePart;
};

interface TotalProps {
  total: number;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Total = (props: TotalProps) => {
  return <p>{props.total}</p>;
};

const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>;
};

const Content = (props: ContentProps) => {
  return (
    <div>
      <p>
        <strong>{props.name} {props.exerciseCount}</strong><br/>
        <Part {...props.part} />
      </p>
    </div>
  );
};

const Part = (props: CoursePart) => {
  switch (props.kind) {
    case 'basic':
      return <em>{props.description}</em>
    case 'group':
      return <>project exercises {props.groupProjectCount}</>
    case 'background':
      return (
        <>
          <em>{props.description}</em> <br/>
          {props.backgroundMaterial}
        </>
      )
    default:
      return assertNever(props);
  }
};


const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      {courseParts.map(course => 
        <Content name={course.name} exerciseCount={course.exerciseCount} part={course} />
      )}
      <Total total={totalExercises} />
    </div>
  );
};

export default App;