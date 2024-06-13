import fetchCorpCode from './fetchCorpCode';
import { useForm } from 'react-hook-form';
import Input from './Components/Input';
import fetchCorpFS from './fetchCorpFS';

interface IData {
  corpName: string;
  targetYear: string;
  targetReport: string;
  targetFS: string;
}

function App() {
  // const [corpCode, setCorpCode] = useState<string | null>("");

  const { register, handleSubmit } = useForm<IData>()
  // const needsArr = ["CORP_CODE", "targetYear", "targetReport", "targetFS",];
  const needsArr = ["corpName", "targetYear", "targetReport", "targetFS",];

  const onSubmit = async (data: IData) => {
    const corpCode = await fetchCorpCode(data.corpName);
    if(corpCode){
    const CorpFs = fetchCorpFS(corpCode);
    console.log(corpCode);
    return corpCode
  }
  }


  return <form onSubmit={handleSubmit(onSubmit)}>
    {needsArr.map((item, index) => <Input key={index} type="text" placeholder={item} register={register(item as keyof IData)} />)}

    <button type="submit">검색</button>
  </form>; // 데이터가 화면에 표시되도록 수정
}

export default App;
