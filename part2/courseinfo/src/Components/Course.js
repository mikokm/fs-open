const Header = ({name}) => {
    return <h1>{name}</h1>
  }
  
  const Part = ({name, exercises}) => {
    return <p>{name} {exercises}</p>
  }
  
  const Content = ({parts}) => {
    return parts.map(part => {
      return <Part key={part.id} name={part.name} exercises={part.exercises} />
    })
  }
  
  const Total = ({parts}) => {
    const exercises = parts.map(part => part.exercises).reduce((a,b) => a + b, 0)
    return <p><b>total of {exercises} exercises</b></p>
  }

  const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

  export default Course
  