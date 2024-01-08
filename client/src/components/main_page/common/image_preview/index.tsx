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

import { useEffect, useState } from "react";
import styles from "./index.css";
import mittyFetch from "utils/fetch";

type Props = {
  file_id?: string,
  src?: string,
};

export default function ImagePreview(props: Props) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    (async () => {
      if (props.file_id === undefined) return;
      const res = await mittyFetch({
        route: 'file/get',
        post_data: {
          file_id: props.file_id,
        },
      });
      const url = URL.createObjectURL(await res.blob());
      setUrl(url);
    })();    
  }, [props.file_id]);

  return (
    <div>
      <img src={(props.src)? props.src : url} className={styles.image} />
    </div>
  );
}
