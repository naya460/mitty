// Copyright 2023 naya460
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { useEffect, useReducer, useRef, useState } from "react"

import useWebSocket from 'components/common/useWebSocket'
import mittyFetch from "utils/fetch";

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
  author: { user_id: string, display_name: string },
  files?: { file_id: string }[],
  time: Date,
}

interface Props {
  default_group_id: string,
  // selected_group_idのメッセージが来たときに呼ばれる
  onMessage?: (element: Element[]) => void;
  // メッセージが読み込まれたときに呼ばれる
  onUpdate?: (element: Element[]) => void; 
}

export default function useElementList(props: Props): [ () => Promise<boolean> ] {
  const [group_id,] = useState(props.default_group_id);
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

    // 異なるグループのとき無視
    if (message.group_id !== group_id) return;
    
    // メッセージ要素を追加
    addElement([message]);
    
    // コールバック関数を呼ぶ
    if (props.onMessage != null) {
      props.onMessage(state_ref.current.element_list);
    }
  }, 'message/send');

  // メッセージを取得する
  const getMessages = async (last_message_id?: string) => {
    if (group_id == null) return;

    // メッセージを取得する
    const res = await mittyFetch({
      route: 'message/get',
      post_data: {
        group_id: group_id,
        last_message_id,
      }
    });
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

  // 最初の読み込み
  useEffect(() => {
    (async () => {
      // メッセージを取得
      await getMessages();

      // コールバック関数を呼ぶ
      if (props.onUpdate != null) {
        props.onUpdate(state_ref.current.element_list);
      }
    })();    
  }, []);

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
  ];
}
