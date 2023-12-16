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
