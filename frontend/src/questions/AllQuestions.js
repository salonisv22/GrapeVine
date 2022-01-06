import { useQuestionListQuery } from "../services/QuestionsService";
import QuestionList from "./components/questionList";
const AllQuestions = () => {
  const { data } = useQuestionListQuery();
  return <QuestionList questions={data} />;
};

export default AllQuestions;
