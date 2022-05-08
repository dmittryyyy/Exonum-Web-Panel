import { useContext,  useState } from 'react';
import { ThemeContext } from '../..';
import { Header } from '../header/Header';
import { expolorerBlocks } from '../../services/webPanelAPI';
import './App.scss';


export const App = () => {

  const { client } = useContext(ThemeContext);

  const [isheight, isSetheight] = useState('');
  const [isActive, isSetActive] = useState(false);

  const GetResult = async () => {
    try {
      if(client.activeNode === 'Select is node') {
        isSetActive(false);
        isSetheight('');
      }
      const res = await expolorerBlocks(client.activeNode, '1').then((data) => {return data.range.start});
      isSetheight(res);
      isSetActive(true);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="App">
      <Header
        isheight={isheight}
        isActive={isActive}
        GetResult={GetResult}
      />
    </div>
  )
}
