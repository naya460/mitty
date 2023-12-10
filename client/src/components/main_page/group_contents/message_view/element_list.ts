import { useEffect, useReducer, useRef } from "react"

import CreatePostRequest from 'components/common/create_post_request'
import useWebSocket from 'components/common/useWebSocket'

// ===================================

function reducer(
  state: { element_list: Element[] },
  action: { type: 'push', element: Element[], oldest?: boolean }
) {
  switch (action.type) {
    // 要素を追加
    case 'push': {
      // 末尾に追加
      if (action.oldest === true) {
        return { element_list: [ ...state.element_list, ...action.element ] };
      }
      // 先頭に追加
      else {
        return { element_list: [ ...action.element, ...state.element_list ] };
      }
    }
  }
}

// ===================================

export type Element = {
  message_id: string,
  message_text: string,
  author: { display_name: string },
  time: Date,
}

interface Props {
  group_id: string,
  // selected_group_idのメッセージが来たときに呼ばれる
  onMessage?: (element: Element[]) => void;
  // メッセージが読み込まれたときに呼ばれる
  onUpdate?: (element: Element[]) => void; 
}

export default function useElementList(props: Props): [ () => Promise<boolean> ] {
  const [state, dispatch] = useReducer(reducer, { element_list: [] });
  const state_ref = useRef(state);
  state_ref.current = state;

  // 要素を追加する
  const addElement = (
    element: Element[],
    oldest?: boolean,
  ) => {
    dispatch({type: 'push', element, oldest});
    state_ref.current = reducer(state_ref.current, {type: 'push', element, oldest});
  };

  useWebSocket((message) => {
    // グループのメッセージを読み込んでいないとき、無視
    if (state_ref.current.element_list.length === 0) {
      return;
    }
    
    // メッセージ要素を追加
    addElement([message]);
    
    // コールバック関数を呼ぶ
    if (props.onMessage != null) {
      // 選択されているグループのときのみ呼び出す
      props.onMessage(state_ref.current.element_list);
    }
  }, 'message/send');

  // メッセージを取得する
  const getMessages = async (last_message_id?: string) => {
    if (props.group_id == null) return;

    // 送信するリクエストを作成
    const options = CreatePostRequest({
      group_id: props.group_id,
      last_message_id,
    });

    // メッセージを取得する
    const res = await fetch(
      `http://${location.hostname}:9090/message/get`,
      { ...options, mode: 'cors', credentials: 'include' }
    );
    if (!res.ok) {
      return;
    }
    const messages = await res.json();

    // メッセージのリストを作成
    const tmp: Element[] = [];
    for (let i in messages) {
      tmp.push(messages[i]);
    }

    // 新しいElementを追加
    addElement(tmp, true);
    
    if (messages.length == 0) {
      return { length: messages.length };
    }
    
    return { length: messages.length, id: messages[messages.length - 1].message_id };
  }

  // selected_group_idが更新されたとき
  useEffect(() => {
    (async () => {
      // グループが選択されていないとき無視
      if (props.group_id == null) {
        return;
      }

      // まだ読み込んでいないselected_group_idのとき、メッセージを取得する
      if (state_ref.current.element_list.length === 0) {
        await getMessages();
      }

      // コールバック関数を呼ぶ
      if (props.onUpdate != null) {
        props.onUpdate(state_ref.current.element_list);
      }
    })();    
  }, [props.group_id]);

  return [
    async () => {
      // 最後のメッセージを取得する
      const length = state_ref.current.element_list.length;
      if (length === 0) return;
      const last_message = state_ref.current.element_list[length - 1];
      // メッセージを取得して、画面を更新する
      if ((await getMessages(last_message.message_id)).length != 0) {
        props.onUpdate(state_ref.current.element_list);
        return false;
      }
      return true;
    }
  ]
}
