const Course = ({ course }) => {
  const total = course.parts.reduce((acc, current) => acc + current.exercises, 0)
  
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </>
  )
}

const Header = (props) => <h1>{props.course}</h1>

const Content = ({ parts }) => (
  <div>
    {parts.map(part => 
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    )}
  </div>
)

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
)

const Total = (props) => <p><strong>Number of exercises {props.total}</strong></p>

export default Course