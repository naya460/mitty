import { useEffect, useRef } from "react"

import CreatePostRequest from 'components/common/create_post_request'
import useWebSocket from 'components/common/useWebSocket'

export type MessageElement = {
  message_text: string,
  author: { user_name: string },
  time: Date,
}

export type DateElement = {
  date: Date,
}

export type Element = MessageElement | DateElement;

interface Props {
  selected_group_id: string,
  // selected_group_idのメッセージが来たときに呼ばれる
  onMessage?: (element: Element[]) => void;
  // selected_group_idが更新されたときに呼ばれる
  onUpdate?: (element: Element[]) => void; 
}

export default function useElementList(props: Props): void {
  const element_list = useRef(new Map<String, Element[]>());
  const selected_group_id = useRef<string>(null);
  const onMessage = useRef<(element: Element[]) => void>(null);

  selected_group_id.current = props.selected_group_id;
  onMessage.current = props.onMessage;

  // 要素を追加する
  const addElement = (
    group_id: string,
    element: Element,
  ) => {
    // グループを読み込んでいないとき作成
    if (!element_list.current.has(group_id)) {
      element_list.current.set(group_id, []);
    }

    // 要素を追加
    element_list.current.set(
      group_id,
      [element, ...element_list.current.get(group_id)]
    );
  };

  useWebSocket((message) => {
    // グループのメッセージを読み込んでいないとき、無視
    if (!element_list.current.has(message.group_id)) {
      return;
    }
    
    // 要素を追加
    addElement(message.group_id, message);
    
    // コールバック関数を呼ぶ
    if (onMessage.current != null) {
      // 選択されているグループのときのみ呼び出す
      if (selected_group_id.current === message.group_id) {
        onMessage.current(element_list.current.get(selected_group_id.current));
      }
    }
  });

  const getMessages = async () => {
    if (props.selected_group_id == null) return;

    // 送信するリクエストを作成
    const options = CreatePostRequest({
      group_id: props.selected_group_id
    });

    // メッセージを取得する
    const res = await fetch('api/message/get', options);
    if (!res.ok) {
      const resText = await res.text();
      console.log(resText);
      return;
    }
    const messages = await res.json();

    // メッセージの表示を作成
    let before_date = null;
    for (let i in messages) {
      const date = new Date(messages[i].time);
      // 日付が変わったとき
      if (before_date != null) {
        if (before_date != date.toLocaleDateString()) {
          addElement(props.selected_group_id, {date});
        }
      } else {
        addElement(props.selected_group_id, {date});
      }
      before_date = date.toLocaleDateString();

      // メッセージを追加
      addElement(props.selected_group_id, messages[i]);
    }
  }

  // selected_group_idが更新されたとき
  useEffect(() => {
    (async () => {
      // まだ読み込んでいないselected_group_idのとき、メッセージを取得する
      if (!element_list.current.has(props.selected_group_id)) {
        await getMessages();
      }

      // コールバック関数を呼ぶ
      if (props.onUpdate != null) {
      props.onUpdate(element_list.current.get(props.selected_group_id));
      }
    })();    
  }, [props.selected_group_id]);
}