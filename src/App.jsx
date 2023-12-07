import React, {useEffect, useState} from "react";
import axios from "axios";

import {CardAria} from "./componemts/CardAria";
import {CardHeader} from "./componemts/CardHeader";
import {TextAria} from "./componemts/TextAria";
import {TextHeader} from "./componemts/TextHeader";
import "./App.css";

function App() {
  const DEPROY_PORT = process.env.REACT_APP_HEROKU_PORT;
  const LOCAL_PORT = "http://localhost:5000/api/cards/";

  const [cards, setCards] = useState([]);

  //カード全体を取得ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  const getCards = async () => {
    try {
      const response = await axios.get(DEPROY_PORT || LOCAL_PORT);
      setCards(response.data);
      setSerchInput("");
    } catch (err) {
      console.log(err);
    }
  };

  //初回の表示
  useEffect(() => {
    getCards();
  }, []); // eslint-disable-line

  //検索ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  const [serchInput, setSerchInput] = useState("");
  const onChangeSerch = async (value) => {
    setSerchInput(value);
    const response = await axios.get(
      DEPROY_PORT || LOCAL_PORT + `search/query?q=${value}`
    );
    setCards(response.data);

    setActiveCardId(); //アクティブカード初期化
    updateWorkspace();
  };

  //カードを追加ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  const onClickAdd = async () => {
    clearTimer();
    try {
      await savePreviousCard();

      const response = await axios.post(DEPROY_PORT || LOCAL_PORT);
      setActiveCardId(response.data._id);
      updateWorkspace(); //ワークスペース初期化
      getCards();
    } catch (err) {
      console.log(err);
    }
  };

  //カードを１つ取得ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  const [activeCardId, setActiveCardId] = useState(false);

  const onClickCard = async (cardId, deleteFlag) => {
    if (activeCardId === cardId) return; //連続で押せない
    clearTimer();

    try {
      !deleteFlag && (await savePreviousCard());

      const response = await axios.get((DEPROY_PORT || LOCAL_PORT) + cardId);
      setActiveCardId(cardId);
      updateWorkspace(response.data);
      getCards();
    } catch (err) {
      console.log(err);
    }
  };

  //カードを削除ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  const onClickDelete = async () => {
    if (!activeCardId) return; //カードが選択されてない
    clearTimer();

    try {
      await axios.delete((DEPROY_PORT || LOCAL_PORT) + activeCardId);

      const ActiveCardIndex = cards.findIndex(
        (card) => card._id === activeCardId
      );

      if (ActiveCardIndex < cards.length - 1) {
        onClickCard(cards[ActiveCardIndex + 1]._id, true); //次のカードをアクティブ化
      } else {
        setActiveCardId(); //アクティブカード初期化
        updateWorkspace();
        getCards();
      }
    } catch (err) {
      console.log(err);
    }
  };

  //ワークスペース表示ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  const [workspace, setWorkspace] = useState({title: "", content: ""});
  const [inputChange, setInputChange] = useState(false);

  //カードを反映
  const updateWorkspace = (activeCard) => {
    const newWorkspace = {title: "", content: ""};
    if (activeCard) {
      newWorkspace.title = activeCard.title;
      newWorkspace.content = activeCard.content;
    }
    setWorkspace(newWorkspace);
  };

  //テキスト入力
  const onChangeText = (value, key) => {
    if (!activeCardId) return; //カードが選択されてない

    //カード変更
    const newCards = cards.map((card) => {
      if (card._id === activeCardId) {
        const newCard = Object.assign({}, card);
        newCard[key] = value;
        return newCard;
      } else {
        return card;
      }
    });
    setCards(newCards);

    //ワークスペース変更
    const newWorkspace = Object.assign({}, workspace);
    newWorkspace[key] = value;
    setWorkspace(newWorkspace);

    setInputChange(!inputChange);
  };

  //以前のカードを保存ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  const [savedFlag, setSavedFlag] = useState(false);

  const savePreviousCard = async () => {
    if (!activeCardId) return; //以前のカードが無い

    try {
      const previousCard = await axios.get(
        (DEPROY_PORT || LOCAL_PORT) + activeCardId
      );
      //変更があれば、１つ前のアクティブカードをDBに保存
      if (
        previousCard.data.title !== workspace.title ||
        previousCard.data.content !== workspace.content
      ) {
        await saveActiveCard();
      }
    } catch (err) {
      console.log(err);
    }
  };

  //自動保存ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  const [timeoutId, setTimeoutId] = useState(false);
  const autoSaveTime = 5000;

  useEffect(() => {
    if (!activeCardId) return; //初回は行わない

    clearTimer();
    const newTimeoutId = setTimeout(async () => {
      try {
        await saveActiveCard();
        getCards();
      } catch (err) {
        console.log(err);
      }
    }, autoSaveTime);
    setTimeoutId(newTimeoutId);
  }, [inputChange]); // eslint-disable-line

  //アクティブカードを保存
  const saveActiveCard = async () => {
    await axios.put((DEPROY_PORT || LOCAL_PORT) + activeCardId, {
      title: workspace.title,
      content: workspace.content,
    });
    setSavedFlag(true);
  };

  //タイマーをクリア
  const clearTimer = () => {
    clearTimeout(timeoutId);
    setSavedFlag(false);
  };

  //並び替え
  cards.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <>
      <h1>Notes</h1>
      <div id="all-container">
        <div id="card-container">
          <CardHeader
            onClickAdd={onClickAdd}
            onChangeSerch={onChangeSerch}
            serchInput={serchInput}
          />
          <CardAria
            cards={cards}
            onClickCard={onClickCard}
            activeCardId={activeCardId}
          />
        </div>
        <div id="text-container">
          <TextHeader onClickDelete={onClickDelete} savedFlag={savedFlag} />
          <TextAria workspace={workspace} onChangeText={onChangeText} />
        </div>
      </div>
    </>
  );
}

export default App;
