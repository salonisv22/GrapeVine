

const Time = ({ date }) => {
    console.log(date)
    return (
      <>
        {new Date(date).toLocaleString([], {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </>
    );
}

export const OnlyDate = ({date}) => {
    return (
      <>
        {new Date(date).toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </>
    );
    
}

export default Time;

