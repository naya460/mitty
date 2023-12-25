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

import prisma from "lib/prisma";

export default async function getFile(
  file_id: string,
): Promise<{file_type: string, file_data: Buffer} | null> {
  // ファイルを読み込み
  const file = await prisma.file.findUnique({
    select: {
      file_type: true,
      file_data: true,
    },
    where: {
      file_id: file_id,
    },
  });
  if (file === null) return null;
  return file;
}
