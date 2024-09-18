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
      <NavigateButton label="送金画面へ" path="/list" /> {/* 送金先一覧へのナビゲートボタン */}
      <NavigateButton label="請求画面へ" path="/request" /> {/* 請求ページへのナビゲートボタン */}
      <NavigateButton label="請求確認画面へ" path="/history" /> {/* 請求確認ページへのナビゲートボタン */}
    </div>
  );
}

export default TopPage;
