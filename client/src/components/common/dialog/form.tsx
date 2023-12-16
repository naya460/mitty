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

import Dialog from "./base";

import styles from "./form.css";

import Button from "../button";

type Props = {
  title: string,
  children?: React.ReactNode,
  display?: boolean,
  setHidden?: () => void,
  onSubmit?: React.FormEventHandler
  accept_text?: string,
  reject_text?: string,
};

export default function FormDialog(props: Props) {
  const handleSubmit = (event) => {
    props.onSubmit(event);
    props.setHidden();
  }

  return (
    <Dialog
      title={props.title}
      display={props.display}
      setHidden={props.setHidden}
    >
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <div>{props.children}</div>
        <div className={styles.buttons}>
          <Button
            onClick={props.setHidden}
          >{props.reject_text || 'Cancel'}</Button>
          <Button
            type='submit'
            accent={true}
          >{props.accept_text || 'OK'}</Button>
        </div>
      </form>
    </Dialog>
  );
}
