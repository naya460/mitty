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

export class mittyCacheManager<IdT, DataT> {
  // キャッシュされたデータ
  private cache = new Map<IdT, DataT>;

  // データをfetchする関数
  private fetcher: (id: IdT) => Promise<DataT>;

  // コンストラクタ
  constructor(option: {
    initialize?: () => Promise<{id: IdT, data: DataT}[]>,
    fetcher: (id: IdT) => Promise<DataT>,
  }) {
    // 関数を設定
    this.fetcher = option.fetcher;

    // 初期化を行う
    if (option.initialize === undefined) return;
    (async () => {
      return (await option.initialize()).forEach(value => {
        this.cache.set(value.id, value.data);
      });
    })();
  }

  // データを取得する関数
  async getData(id: IdT): Promise<DataT> {
    // 存在する場合、そのまま返す
    if (this.cache.has(id)) {
      return this.cache.get(id);
    }
    // 存在しない場合、データを取得する
    else {
      const data = await this.fetcher(id);
      this.cache.set(id, data);
      return data;
    }
  }

  // データの一覧を返却する関数
  getDataList(): {id: IdT, data: DataT}[] {
    return Array.from(this.cache).map(value => {
      return { id: value[0], data: value[1]};
    });
  }
  
  // データを更新する関数
  updateData(id: IdT, data: DataT) {
    if (this.cache.has(id) === false) return;
    this.cache.set(id, data);
  }
}
