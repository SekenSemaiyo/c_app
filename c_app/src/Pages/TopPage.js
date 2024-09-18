import '../App.css';
import Icon from '../Components/Icon';
import Username from '../Components/Username';
import Yokin from '../Components/Yokin';
import AccountNumber from '../Components/AccountNumber';
import NavigateButton from '../Components/NavigateButton'; // NavigateButton コンポーネントをインポート

function TopPage() {
  return (
    <div className="App">
      <Icon />
      <Username />
      <AccountNumber />
      <Yokin /> {/* 預金残高を表示 */}
      <NavigateButton label="Go to About Page" path="/about" /> {/* アバウトページへナビゲートボタン */}
    </div>
  );
}

export default TopPage;
