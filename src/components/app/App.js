import { useContext, useState } from 'react';
import { ThemeContext } from '../..';
import { Header } from '../header/Header';
import './App.scss';


export const App = () => {

  const { client } = useContext(ThemeContext);

  const [isActualNode, isSetActualNode] = useState('');
  const [isheight, isSetheight] = useState('');

  const GetResult = async () => {
    try {
      const res = await client.GetCurentHight();
      const activeNode = await client.GetActiveNode();

      isSetActualNode(activeNode);
      isSetheight(res);

    } catch (e) {
      console.log(e);
    }
  }
  GetResult();

  return (
    <div className="App">
      <Header
        isActualNode={isActualNode}
        isheight={isheight}
      />
    </div>
  )
}
