[33mcommit b1c152e41587aabfcd26c84a2ee325caaea42b82[m[33m ([m[1;36mHEAD -> [m[1;32mdevelop[m[33m)[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat Dec 2 16:38:32 2023 +0900

    前のメッセージの読み込みにIntersectionObserverを使用

[33mcommit 8fa84814625fd61ecfc83787715d259ec2807a94[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri Dec 1 23:51:18 2023 +0900

    メッセージの表示が繰り返されるバグを修正

[33mcommit e1cba57828d611b3fe7756f1bcc07970ed04efc9[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri Dec 1 23:35:32 2023 +0900

    メッセージの一覧をグループごとに分ける

[33mcommit 8fc019b7b656b568e7afc5ab5eba91f397602028[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu Nov 30 21:41:02 2023 +0900

    group_contents内の表示を少し整えた

[33mcommit d261b2591a94738c0935ba7e14c9a723024aedff[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu Nov 30 19:25:18 2023 +0900

    group_contentsのheaderとmain_menuの、背景色と影を調整

[33mcommit 9980d271150695dcd16a77f74a2047477690d2a5[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu Nov 30 18:39:10 2023 +0900

    cssの色をグローバル変数で管理

[33mcommit 882787dba074994afa1bb9606b8c113bce4e1251[m[33m ([m[1;31morigin/develop[m[33m)[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed Nov 29 22:42:49 2023 +0900

    グループ未選択時に、グループコンテンツを非表示にする

[33mcommit d2f95d624569ee107bf66f3164d9b1ce982f41bb[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue Nov 28 23:11:14 2023 +0900

    popup_menuの表示を調整

[33mcommit 57a9abae9fdef8592876fe2e50268afad5241f2f[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue Nov 28 19:30:05 2023 +0900

    popupをpopup_menuに名称と表示を変更

[33mcommit 9d49e2eff49f435746a671ff4d8f15cabe963208[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue Nov 28 16:00:59 2023 +0900

    ポップアップにフェードイン・アウトのアニメーションを設定

[33mcommit 0ae259b53bbf0294d4c411618de71b6909bff5b4[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue Nov 28 15:12:38 2023 +0900

    ポップアップを再利用できるように分離

[33mcommit 52b514651401ca07eee8c56b64860adbbd929223[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue Nov 28 12:21:18 2023 +0900

    ユーザー名をクリックしてポップアップを表示する

[33mcommit d3ea2b28b832f8724368ef1a366c1fc3019e58e0[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue Nov 28 11:26:33 2023 +0900

    ユーザー名とサインアウトのリンクを別のコンポーネントに分離

[33mcommit 7cb428837466419a4c7e6959de547f8a55603a7c[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon Nov 27 15:32:17 2023 +0900

    websocketのサーバーからのデータにもrouteを付与

[33mcommit 88b19b8c453e98bee3ae352445fd96b4c445a3dd[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon Nov 27 15:16:33 2023 +0900

    websocketのtypeをrouteに名称変更

[33mcommit e1288c1254c7c61aec6cfbb7fe062c9e9692c1c5[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon Nov 27 15:14:57 2023 +0900

    websocketでも正常にdisplay_nameを返却する

[33mcommit 070133764d1a710a296b67a10e5283919b4140de[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun Nov 26 13:00:32 2023 +0900

    signin以外のとき、名前にdisplay_nameを使用する

[33mcommit 1ed7e78a7c0ceb207d543fc6059fd7e7933eab99[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun Nov 26 12:35:16 2023 +0900

    database処理関数で、user_nameが引数のものの多くはuser_idを引数に設定

[33mcommit 9364c99cf65aa12d346295c127b6416a6a7ebaf7[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun Nov 26 12:04:18 2023 +0900

    user/get_nameでuser_idも返却する

[33mcommit 454995914dde3842e0aa0cf86a9ce1e14e38d4b7[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat Nov 25 22:07:53 2023 +0900

    #11 userテーブルの主キーをString型にしてcuidを設定

[33mcommit 8626afe67574078724318a0c50841812e3112f7c[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat Nov 25 21:51:11 2023 +0900

    databaseのuserからcookie列を削除

[33mcommit f4715125a9147b1927d696835f7d138afdc7cee0[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat Nov 25 21:08:48 2023 +0900

    #5 10回サインインに失敗すると、1時間のサインイン制限を掛ける

[33mcommit 554d93b3672fe06530eb57ec8437e99a72f5172f[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri Nov 24 22:33:04 2023 +0900

    websocketのmessageにあるtypeがsubscribeのときのみsubscribe処理を行う

[33mcommit 1fbb18b2f70f2684109a2145684f253099844dfb[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri Nov 24 22:09:40 2023 +0900

    websocketのopen時に、メッセージのsubscribeを登録する

[33mcommit 6c75e4b17aebedfad526d1c5cd983c2536f2f2ef[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu Nov 23 21:46:16 2023 +0900

    apiのuser/get_nameでユーザーが存在しないときにも200を返す

[33mcommit 9d26d1b532c7874f0c4c1c1cbc7749916be0ed61[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu Nov 23 21:29:49 2023 +0900

    websocketのメッセージ送信処理を別のファイルに分割

[33mcommit df16f31da9dd09eef7e0517eee60925c5328e25c[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon Nov 20 22:54:03 2023 +0900

    websocketのupgrade時に、session_idでユーザーを認証する

[33mcommit a8cd3eedf8a26b7472b45d4753566e75ffb360e5[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon Nov 20 22:01:02 2023 +0900

    wsの認証に独自のidを使用して、複数端末への配信に対応

[33mcommit b7930acda7d356ca7fee419c879dabe84daecba2[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun Nov 19 22:52:07 2023 +0900

    server側のpioredisの初期化処理をlibディレクトリに作成して共通化

[33mcommit e8eaec4e22ce05a5c3e996392eb0dfe564cdc5f0[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun Nov 19 22:46:19 2023 +0900

    server側のPrismaClientの初期化処理をlibディレクトリに作成して共通化

[33mcommit f81255744ad6bf8f3e48dd07d5fd85ec26e79639[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat Nov 18 08:57:42 2023 +0900

    #15 server側でのprismaのmigrateとgenerateに対応

[33mcommit 2718d05e42c6dba174ad358ff4933ea3c7d53c97[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat Nov 18 08:49:06 2023 +0900

    #15 package.jsonを整理

[33mcommit 5b2d25163ef0c8d889dd687da3c5f0818aabc965[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat Nov 18 08:41:10 2023 +0900

    #15 schema.prismaをclientからserverに移動

[33mcommit d0e083f76b06ae083b3f76a17b8ea61cee87edc5[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat Nov 18 08:39:00 2023 +0900

    #15 server側のschema.prismaを一時的に削除(動作不能)

[33mcommit 7fc9848cd5990a70c8a597e07bffbd41777179ba[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat Nov 18 08:35:27 2023 +0900

    #15 不要になったredisのsubscribe処理を削除

[33mcommit 510c80e403eecdd4765ac0a7a614a3b2f60e77f9[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat Nov 18 08:31:50 2023 +0900

    #15 clientのカスタムサーバーを削除

[33mcommit d915d62726c312aeacdba11d1acc7f8f1fd71de4[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat Nov 18 08:24:30 2023 +0900

    server側のdatabase apiを削除

[33mcommit 4eed7b231c8b1f4acd231c1d7bd9911d5314ea39[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat Nov 18 08:21:54 2023 +0900

    #15 server側で、websocketでのメッセージの送信に対応

[33mcommit 12be791833f01408049d997bb48df983b1695cf9[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat Nov 18 07:53:18 2023 +0900

    #15 websocketの処理をファイル分割

[33mcommit 28846103d6aec2c37c6b65f3a53ebea1ac8a89fe[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri Nov 17 20:45:51 2023 +0900

    #15 server側でwebsocketの送受信に対応

[33mcommit 954296ede1c7531f9a90c9db160cdb78eeecc83f[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri Nov 17 18:27:36 2023 +0900

    #15 redisのsubscribeをserver側に移動

[33mcommit 74f7e5a7430a1f56e37a76b478cc587731349fc8[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu Nov 16 23:32:37 2023 +0900

    #15 server側でのuse_wsに対応

[33mcommit 229425f57395742946d7340f5e9fbb4a21741f85[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu Nov 16 23:19:25 2023 +0900

    #15 server側でのaddGroupMemberに対応

[33mcommit 8234305d21010a943df33b4cc8053429a51c40bc[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu Nov 16 23:07:25 2023 +0900

    #15 server側でのgetGroupoMemberに対応

[33mcommit adf184f35bad8caa3e0178b25e3bd7d45b6e589b[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu Nov 16 22:57:52 2023 +0900

    #15 server側でのcreateGroupに対応

[33mcommit 481dcfee8ef8307e8b2ae708429e05372748fc22[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu Nov 16 22:43:13 2023 +0900

    #15 server側でのgetGroupに対応

[33mcommit 9095cde6e75df2e03235848fb30b7234bb6d0062[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu Nov 16 22:23:37 2023 +0900

    #15 server側でのsendMessageに対応

[33mcommit b68decc220af2b3897639292c876cee311e15b69[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu Nov 16 20:34:53 2023 +0900

    #15 server側でのgetMessageに対応

[33mcommit e1fe71ca17c72729df2b06d3ae89170bf6d30476[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed Nov 15 22:12:14 2023 +0900

    ユーザー認証の処理を関数に切り出し

[33mcommit 2d1b22ed46ed34fe30135e8add42e60a79edaf4b[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed Nov 15 11:39:22 2023 +0900

    RouteGenericの無いハンドラの記述を簡略化

[33mcommit 341b3753c776c9b15c42872e41698294c37a63ac[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed Nov 15 11:22:03 2023 +0900

    #15 ユーザー名の取得をserver側に移行

[33mcommit 8e05977d33be6e211468ecd730da94e73a401064[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue Nov 14 21:32:21 2023 +0900

    serverのapiをregisterを用いて階層化

[33mcommit 76861d723d3fd7b0ad8a54e9f811ca1ebc769c78[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon Nov 13 21:19:29 2023 +0900

    Bodyを指定できるRouteHandler型を作成

[33mcommit 0e1a2d35c8c7e17fb1444bc4f3ed570450811cda[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon Nov 13 15:48:35 2023 +0900

    server側で使われていないdatabase apiを削除

[33mcommit bff5d7942af45ee51e46f4f5256ed4668810610d[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon Nov 13 15:40:40 2023 +0900

    #16 signout時にredisからsessionを削除

[33mcommit 3153c2746265bd0131a4da3ea2d838471caf11b9[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon Nov 13 15:37:16 2023 +0900

    #16 server側でのsignupに対応

[33mcommit 28c13b704dd7d271b55615cac21b6d05ee0d5110[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon Nov 13 15:11:23 2023 +0900

    #16 cookieをhttpOnlyで保存

[33mcommit 69c77475d12f69204c42aa73b8a20c0aaa55040a[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun Nov 12 22:08:19 2023 +0900

    #16 server側でのsignoutに対応

[33mcommit 2d4da4380c72da8fcadb4368910f5cfd18d56511[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun Nov 12 12:08:49 2023 +0900

    #15 client側のsignin APIを削除

[33mcommit f25c8601982fdda1b32855e1078acb9332afadaa[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu Nov 9 23:42:25 2023 +0900

    #16 server側でユーザーを認証して、session-idを付与

[33mcommit d3032cf9f380ed3310db27fbe808bcadc87bcea7[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu Nov 9 19:33:55 2023 +0900

    プロジェクトのbase url基準のimportに対応

[33mcommit afe945dbb54f2fd8e920f95d275cdeec57723b20[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed Nov 8 18:57:37 2023 +0900

    #15 addMessageをserver側に移動

[33mcommit 91e8cfa08f19451206421976baa379ea86430f75[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed Nov 8 18:53:24 2023 +0900

    #15 getMessageをserver側に移動

[33mcommit b499f1df8bc52c6831fabc8d5f1fa685fcdde88f[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed Nov 8 18:47:27 2023 +0900

    #15 addGroupMemberをserver側に移動

[33mcommit 601c2729fbccc195ed0598f42a8865ce6d2be871[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed Nov 8 18:38:04 2023 +0900

    #15 getGroupMemberをserver側に移動

[33mcommit 5f0b1ff15fe74cf07da988307a54426174d1f19d[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed Nov 8 18:32:27 2023 +0900

    #15 groupExistsをserver側に移動

[33mcommit 59d4860ffbc12a165fb3c92c6dcdae62b81e62cd[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed Nov 8 18:25:24 2023 +0900

    #15 createGroupをserver側に移動

[33mcommit aa6907519b6f62d73329c1c5685e871aef86f673[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed Nov 8 18:18:01 2023 +0900

    #15 getGroupをserver側に移動

[33mcommit a5ce8a37c072861cac6d339fc0c5ad97766b0d46[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed Nov 8 12:10:00 2023 +0900

    #15 hasMemberをserver側に移動

[33mcommit e44fcaf95fd782fcdfefa21a01dae5a864f9ee98[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed Nov 8 11:36:04 2023 +0900

    #15 serverのデータベース処理を別ファイルに分離

[33mcommit 971518d1e2853bf43a50d6dccb0a859850bd0e1e[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue Nov 7 22:50:16 2023 +0900

    #16 localhost以外へのcookieの設定に対応

[33mcommit 97899d4972ef2c58bf7028cd1e94c544aa352e23[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue Nov 7 13:04:30 2023 +0900

    #16 serverでのcookie設定に対応

[33mcommit 9fdf78f71bad07ff9da6eabcc37d051e6f6e5485[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue Nov 7 12:55:28 2023 +0900

    #15 serverにcorsを設定してクラインアントのメッセージを受け取る

[33mcommit 30c5c2031a6e32d7720f8603a67d29f9dfd5e71d[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed Nov 1 11:45:32 2023 +0900

    #15 setUserCookieをserver側に移動

[33mcommit eeed3a4eac935e2fb0f71f887f46e98d8f8650db[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed Nov 1 11:10:19 2023 +0900

    #15 getUserIdをserver側に移動

[33mcommit 6037ddfbbdb69354ad9ffdfe2ccfa73b5736eae8[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue Oct 31 12:22:46 2023 +0900

    #15 getUserHashをserver側に移動

[33mcommit d1a991659949d841637d39325f7a78242d9add96[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue Oct 31 12:06:46 2023 +0900

    #15 createUserをserver側に移動

[33mcommit e3a55f3b5473569cdcc911f147a84b6b134a6f10[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun Oct 29 14:39:08 2023 +0900

    #16 serverにprismaのスキーマを作成

[33mcommit 53ce7b543d349c17c4307be37a7854a7dcaac0f6[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun Oct 29 14:11:10 2023 +0900

    #15 cookieでのセッション名をsession-idに戻した

[33mcommit e10b8fd7de3e0f2e0033f528b7131bcb9524d3c7[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun Oct 29 12:09:08 2023 +0900

    #15 clientで新しいセッションでの認証に移行

[33mcommit 3b3f8708d2aef694d86b48cd956d90a3506ba9ff[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun Oct 29 11:08:12 2023 +0900

    #15 clientで新しいセッションを保存する

[33mcommit e57d19f916b39e127cfbc4937309551ea8bcf598[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat Oct 28 12:12:45 2023 +0900

    #15 簡易的にwebsocketに新しいsession-idを仕様

[33mcommit f6ff1d5d74ab1fe32168a1042c7fd99ff8819ba8[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri Oct 20 12:07:52 2023 +0900

    #16 サインアウト時にsession-idを削除する

[33mcommit bd3714f8dc8490074ca3aaa380ea881835c5e3a6[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu Oct 19 14:22:55 2023 +0900

    #16 セッションとユーザー名を保存し、セッション名を返却するAPIを作成

[33mcommit 7b599531214f61755ee1c5b4f3497650261dde15[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed Oct 18 12:10:44 2023 +0900

    #16 session-idをhttpOnlyのcookieとして保存する

[33mcommit 29782b8491cbb8af57bc2ca73b50866cd0ae1230[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed Oct 18 11:34:55 2023 +0900

    #16 ランダムに生成したuuid v4を返却する

[33mcommit d8c3bbcc3edcff225eec2dcad940de4405221842[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue Oct 17 21:00:53 2023 +0900

    #15 サーバーを作成

[33mcommit 27f646fadeb1b4c93a0935f4eae7b1a90a5b0d4b[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon Oct 16 21:33:15 2023 +0900

    #15 現行のプログラムをclientディレクトリに移動

[33mcommit eff21604e39f5a77e5b45068af7b6d7b5de28023[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun Oct 15 14:55:00 2023 +0900

    #2 Cookieの保存処理を、databaseディレクトリ内に作成

[33mcommit 23a4798a65363cbf8c314efb94602f4fa5798bc7[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun Oct 15 14:38:19 2023 +0900

    #2 ユーザーの作成処理を、databaseディレクトリ内に作成

[33mcommit 2a76a5a7fd84a7c7f959031025dfa126f4c014da[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun Oct 15 14:22:24 2023 +0900

    #2 ハッシュの取得処理を、databaseディレクトリ内に作成

[33mcommit bf895a38a1430cafac30139988795e541b1ca494[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat Oct 14 19:56:20 2023 +0900

    #2 メッセージの保存処理を、databaseディレクトリ内に作成

[33mcommit cca74d19f47a684442e3b01020d34753c51b7ce1[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat Oct 14 17:52:05 2023 +0900

    #2 メッセージの取得処理を、databaseディレクトリ内に作成

[33mcommit a1c4c8654b7c13aa2c56c105e29f99537c099e66[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri Oct 13 22:05:05 2023 +0900

    #2 グループ一覧の取得処理を、databaseディレクトリ内に作成

[33mcommit 3b973a5c3ef7ea702953f80000d219f431ae907d[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri Oct 13 21:22:28 2023 +0900

    #2 グループの作成処理を、databaseディレクトリ内に作成

[33mcommit 97e11e0617081d2e398286706e93c0ced5195546[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu Oct 12 12:28:29 2023 +0900

    #2 ユーザー名からユーザーIDを取得する関数を作成

[33mcommit 0286183a042968e0ce3ec98040682b49f08e6cd0[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu Oct 12 11:51:43 2023 +0900

    #2 データベースの処理で、 メンバー関係のディレクトリの位置が間違っていたので修正

[33mcommit 6d6df5b09d6106db3a952b261606aa87c85c150c[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu Oct 12 11:48:06 2023 +0900

    #2 グループの存在を確認する関数を作成

[33mcommit b152f7154045a5072b6c0c2e1419d2203cda8c40[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed Oct 11 23:22:57 2023 +0900

    #2 グループメンバーの取得処理を、databaseディレクトリ内に作成

[33mcommit 941387164418ded62dae455cc7b577c89c07bba2[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed Oct 11 21:36:53 2023 +0900

    #2 isBelongGroup関数をhasMember関数に変更

[33mcommit 212d350d2b4d2f21865ef4dec32a671e36af7add[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed Oct 11 21:25:22 2023 +0900

    #2 グループメンバーの追加処理を、databaseディレクトリ内に作成

[33mcommit 77b937b446c0b8e24d8a3912358ff7dd1aebd1fb[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed Oct 11 20:03:47 2023 +0900

    #2 isBelongGroupをdatabaseディレクトリに移動

[33mcommit 659e349cd489bc46d830d64d74d3a9d43e5f8cdc[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue Oct 10 22:59:12 2023 +0900

    #6 components, lib, pages, websocketディレクトリとserver.tsをsrcディレクトリの中に移動

[33mcommit 3f0551c179c94319965ca38d2ee0ba131e94256c[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue Oct 10 22:36:13 2023 +0900

    #1 サインイン時に成功・失敗の情報のみ返す

[33mcommit bdfed4b6c8d472c67646362440183c6132e1069d[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon Oct 9 21:23:38 2023 +0900

    redisを用いて、送信メッセージを保存

[33mcommit bdd2e0d1553c06af933a28bc2762797fa47d4642[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri Aug 18 17:33:47 2023 +0900

    メッセージ一覧の表示を整えた

[33mcommit 6d3010acc70bf3fc92da93e98d3037f5e6b8ae54[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri Aug 18 15:46:51 2023 +0900

    古いメッセージを読み込むときに、スクロール位置が変な位置に勝手に移動する問題を修正

[33mcommit f6d9306d95a76e78c68175c7402c71308e4f40fd[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat Jul 29 16:56:36 2023 +0900

    メッセージ表示欄の上部に来たとき、続きのメッセージを読み込む

[33mcommit 77c63404e60c7c674581cdd0f19b47145f944be0[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat Jul 29 02:02:58 2023 +0900

    メッセージの表示を全て作成しておいて、visibilityを変更して表示を切り替える

[33mcommit aa3b926ce4d58f73abfb03ec92e0307bde1c3413[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat Jul 29 00:32:17 2023 +0900

    グループ切り替え時のスクロールバーの変更を安定させた

[33mcommit 99a4265a22cae1725f050c9a083269618a691a37[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri Jul 28 23:29:20 2023 +0900

    メッセージの最後の日付を表示

[33mcommit 8f19de9db94e5e87a9c82b96e039d7988777a4ee[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu Jul 27 23:26:20 2023 +0900

    ステータスなしのメッセージが連続しているとき、外側を真っ直ぐにする

[33mcommit 4d84697d6236aa0e61d03d7bc1d5c11cf4aebda6[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed Jul 26 15:12:31 2023 +0900

    グループを変えたとき、スクロール位置を保持

[33mcommit 352df6ae99697c59e2496511a5013221cf55d1b8[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed Jul 26 10:34:23 2023 +0900

    message_listが次nのメッセージを読み込む関数を呼び出す

[33mcommit e2034d4c24273b56685e712fdf1d0edd4b6f9a10[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue Jul 25 22:27:31 2023 +0900

    インデックスを用いてメッセージの取得を高速化

[33mcommit 7db4bf4a676ddc6d5119930a696bf22a4b18d933[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue Jul 25 22:10:38 2023 +0900

    日付の線がどこに入るかを描画時に計算

[33mcommit 3fc1a8243d9beeac620ecda6ad06f85cc525e864[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue Jul 25 19:37:27 2023 +0900

    メッセージを分割して読み込み

[33mcommit 587f7e9784580a223001aa14ac075b8ae9d08120[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue Jul 25 12:32:32 2023 +0900

    長いメッセージを画面内に表示

[33mcommit 97b198f03bfb1b0eadcbd4857150eb5fb0387044[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon Jul 24 23:02:50 2023 +0900

    自分のメッセージはユーザー名を表示しない

[33mcommit 1543bea39014e3520b5aaef03b9359be078bc6ad[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon Jul 24 22:48:16 2023 +0900

    投稿時刻を薄灰色で小さく表示

[33mcommit d5396dc5aaf7ecbff723b020043b8472b595fc3e[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun Jul 23 20:08:47 2023 +0900

    グループを作成して最初のメッセージのリアルタイム更新に対応

[33mcommit 268d9b6ccfc8262a964ea309d7b889c528fa81e5[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun Jul 23 00:30:29 2023 +0900

    websocketの受信時に日付をまたいだとき、日付の線を表示する

[33mcommit c6611d73b1eb92f652b4b701e0f52e3e2df656c7[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat Jul 22 23:53:16 2023 +0900

    同じユーザーのメッセージが5分以内に連続しているとき、名前と時間を非表示

[33mcommit d30bd46ff8bcec7f082b978d67db895419694d0c[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat Jul 22 23:02:49 2023 +0900

    メンバーのメッセージの背景色を薄灰色に変更

[33mcommit 8a396293dd7f0898651470f48414effed0f10a3b[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri Jul 21 23:05:29 2023 +0900

    メッセージ要素の管理をカスタムフックで実装し、管理と表示を分離

[33mcommit 35b54fd2cf0aaecdb05f40ed9934fb932e9e23e8[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu Jul 20 22:14:28 2023 +0900

    メッセージと日付の表示をElementとして値を管理し、そのデータから表示を作成する

[33mcommit 37e87e8dddd981238ba8d2230bb485134fd49cc2[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed Jul 19 22:02:52 2023 +0900

    メッセージや日付の表示処理を関数化

[33mcommit 9ff1bef9a69cda5f7eb5556e604df3865553567d[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue Jul 18 22:38:43 2023 +0900

    日付が変わるところに、日付のある水平線を表示する

[33mcommit 5d74ba4f8da57ffc601401775b014598f18abbb9[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon Jul 17 21:39:02 2023 +0900

    認証ページをvanilla-extractで装飾

[33mcommit 2cc42091d5d195c20db0ddebfe9daa31b151e74f[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon Jul 17 21:27:45 2023 +0900

    認証画面の入力欄をvanilla-extractで装飾

[33mcommit 6e964e6cd5c6a7ae62e3eca69b54774da42d3f12[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon Jul 17 21:22:09 2023 +0900

    グループコンテンツをvanilla-extractで装飾

[33mcommit 35a500523fc8f113f355a99dc20261d44a6b5507[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon Jul 17 21:06:01 2023 +0900

    メンバーリストをvanilla-extractで装飾

[33mcommit 128e8332121cdc61edeee374c9feb7b2d15e9be8[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon Jul 17 20:51:40 2023 +0900

    @vanilla-extract/cssをすぐ呼び▽出せるようにインストール

[33mcommit 71f72c3d1c15d056cb35dfd424b1203b90812360[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun Jul 16 23:03:28 2023 +0900

    メッセージリストをvanilla-extractで装飾

[33mcommit d44d1285c50d6d9a52179350d88894c85fd61ec3[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun Jul 16 22:58:55 2023 +0900

    メッセージ入力▽欄をvanilla-extractを用いて装飾

[33mcommit 7b77259b2fb0fcf9e90e880fe75452b14c223e96[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun Jul 16 22:48:46 2023 +0900

    メッセージをvanilla-extractを用いて装飾

[33mcommit eab16c42f731bc679becfd8961bf2dd2216f140c[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun Jul 16 22:39:18 2023 +0900

    メインメニューをvanilla-extractを用いて装飾

[33mcommit 53fc03216a4d46f32e0c4b41f9dfe7e07955ec45[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun Jul 16 22:29:46 2023 +0900

    .css.tsのインデントをスペース2つに統一

[33mcommit 141b57cea150bbac07a2d1120c3b5490181064dd[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun Jul 16 22:24:30 2023 +0900

    グループリストをvanilla-extractを用いて装飾

[33mcommit 29ff90bb2cada8311442dab63447e8a5dc8a47b1[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun Jul 16 22:17:17 2023 +0900

    グループボタンをvanilla-extractで装飾

[33mcommit 5c33f7f44366b594589237d9f7b470ce01db479a[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat Jul 15 22:38:55 2023 +0900

    vanilla-extractを導入し、メインページのindexを書き換えた

[33mcommit 4a126ac223f4a0ed1f8a45ac2310516ff6cd2258[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat Jul 15 22:25:46 2023 +0900

    グループが選択されていないとき、メッセージ入力欄と送信ボタンを無効化

[33mcommit c6df4c3156ad2e0c4365a41af2b569b1b5990fb1[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri Jul 14 22:26:11 2023 +0900

    CtrlまたはShiftまたはAltキーを押しながらEnterを押すと送信

[33mcommit 45a2211b851ba4178ce562dd3e1499feecaf581d[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri Jul 14 21:52:44 2023 +0900

    グループが選択されているときカウントを増やさない

[33mcommit 6fa6c076935f74cc3c35e51413206f806c735dfa[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri Jul 14 21:41:28 2023 +0900

    websocketの接続を最初の1回だけにする

[33mcommit 8f8f576c1b9f8e73d56792aac4fc55382f403317[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu Jul 13 22:24:02 2023 +0900

    新規メッセージの数をグループ名の右に表示

[33mcommit cd92cde7ef45933aafd3789ab96ccd7a867fe582[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed Jul 12 22:42:57 2023 +0900

    最初nの1回のみメッセージを取得する

[33mcommit db4a247913c3261cfe489e0c3268cc0848abf91a[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue Jul 11 21:59:50 2023 +0900

    message_inputでuseWebSocketフックを使用して送信

[33mcommit 6a4f512a9ca0db6dd7ed75a3be8043276ac591e3[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue Jul 11 21:50:49 2023 +0900

    useWebSocket関数を別ファイルに分割

[33mcommit db22b71e5a7361ca271c0e509039be1406ff4fb3[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon Jul 10 22:19:22 2023 +0900

    WebSocketの送受信処理をカスタムフック化

[33mcommit cacda61887fae4240643bf6fc0fff51ed6480b8d[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun Jul 9 23:12:33 2023 +0900

    メッセージの表示をグループごとに管理

[33mcommit d0e37a98ae159fb65288ec367bd753ce2ba09094[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat Jul 8 23:56:42 2023 +0900

    websocketで送られてくるメッセージのユーザー名が異なる問題を修正

[33mcommit 7b44860e8608e2289a149275876d00d58947bc44[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri Jul 7 20:17:19 2023 +0900

    グループのメッセージをリアルタイムで更新

[33mcommit 7baea6a626bc038570d9e9338e44c15ed82532bb[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri Jul 7 19:03:25 2023 +0900

    websocketで送られるメッセージの形式を通常のAPIと統一

[33mcommit c86467721698a2311e3227e4b1daf85148d52fff[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue Jun 20 16:00:44 2023 +0900

    websocket経由で送られたメッセージをメンバーに送る

[33mcommit 2574413098e16b87143ca46226e27000f716a523[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue Jun 20 15:47:14 2023 +0900

    websocketで送ったメッセージをデータベースに書き込み

[33mcommit 09cab50aa4a72a2a9333fe84d9a49b1c7d6b26e5[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue Jun 20 14:08:57 2023 +0900

    接続されたwsをcookieと対応付けて保存

[33mcommit 51cae255497d5f577d1a4ac587532aac1c06fd45[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon Jun 19 18:09:57 2023 +0900

    wsで送られたcookieを元に、ユーザーを特定

[33mcommit 6c29256eb24c1bc1f2cce1baf8e0d6e2b4081169[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun Jun 18 20:52:59 2023 +0900

    apiのuse_wsから現在のcookieを返却

[33mcommit e30388e4113ea4dd8fdecfd88b02d6d86e2f9c41[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon Jun 12 16:51:54 2023 +0900

    websocketでjsonを用いたメッセージの送信を仮実装

[33mcommit 203f76027cb4f9a37c562d879bbd3793f5dd97bf[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon Jun 12 14:01:24 2023 +0900

    ts-node/esmをnodeのローダーとして起動

[33mcommit e4afdc463f41d96477e6cda78cd28bb2bd5ea95f[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri May 26 15:45:55 2023 +0900

    ts-nodeを用いて、サーバーをtypescriptで記述

[33mcommit 8db0fcabea6de3c872231c9572894ed9c35c6122[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri May 26 08:41:13 2023 +0900

    websocketサーバーの起動処理を別ファイルに分離

[33mcommit e2f96b9808fc688c4b2412eff5dc8258c352be10[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed May 24 23:39:35 2023 +0900

    サインイン済みのユーザーのみwebsocketの接続を許可

[33mcommit f0d0605a1f6743be48c0d29b7e47ac3e570e27c7[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue May 23 18:15:55 2023 +0900

    websocketのポート再使用のエラーを解消

[33mcommit 9db54c1bdaf2ed133fe81ac0c34fed3bd4264850[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue May 23 17:55:37 2023 +0900

    websocketの接続URLをlocation.hostnameを用いて生成

[33mcommit 898c64d3177c32b1e72c5a4d701526de1d2e2704[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon May 22 18:18:34 2023 +0900

    8080ポートでwebsocketを送受信

[33mcommit 7cd68f1bcad6e13114ff9f353d56f9c9c68a6ef9[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon May 22 08:19:02 2023 +0900

    カスタムサーバーを用いて、nextを起動

[33mcommit ee9265dc8240a024a90bd4872f850bcd9d564495[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun May 21 23:01:19 2023 +0900

    npm run start時にwebsocket通信を開始

[33mcommit 581235220cf8d76ac8546e4bc3d87e2dd60528ce[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat May 20 20:49:46 2023 +0900

    グループが指定されていないとき、メンバー取得のリクエストを送らない

[33mcommit 10e399053596005644aef2264597f95a9e8b4182[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri May 19 21:17:57 2023 +0900

    メンバーリストの表示の切り替え時のtransitionを作成

[33mcommit 05b1efcdba8af850edd50712471154f85a533f01[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu May 18 23:12:19 2023 +0900

    グループの取得とメンバーの取得のAPIを分離

[33mcommit 7a83c9b38e8b5b4a51c4a611d271394387b6bbbd[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu May 18 22:30:32 2023 +0900

    メンバー追加のAPIのURLを変更

[33mcommit c0dda449690da3015924cb84adb546425812fd49[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu May 18 22:02:16 2023 +0900

    グループにメンバーを追加する機能の作成

[33mcommit 7392751aaed55c583b40b578cff5e16181bf57e1[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu May 18 17:20:41 2023 +0900

    右上のMemberボタンで、右側にメンバーの一覧を表示できるように

[33mcommit d1cd19df70b0207252c0017e6a551aebbdda0640[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed May 17 21:04:34 2023 +0900

    遷移式になる横幅を30remから40remに変更

[33mcommit 87240f2ef70bbf731b7ffd50a041515421b87526[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue May 16 19:24:49 2023 +0900

    URLクエリのgroup_idは最新一件のみを保持

[33mcommit e21a15b4b3cb072a2fc209aaea1760efd33e2b8d[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue May 16 19:15:27 2023 +0900

    グループコンテンツの戻るボタンを押したときに、group_idクエリが更新されない問題を解決

[33mcommit a106fdcaa583dc2482a567ed46ff885228290c79[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue May 16 19:11:34 2023 +0900

    スマホでブラウザバックしたときの、hoverの色残留をなくした

[33mcommit 7dc4ae4bedc491807ad6da953663f07d636450ee[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue May 16 19:02:36 2023 +0900

    グループIDをURLクエリに記述して、疑似遷移

[33mcommit 6de9156ae9202f18a1217025ec7a99567fd649c8[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue May 16 18:01:36 2023 +0900

    メインメニューの幅と見た目を整えた

[33mcommit f0a9f818aeb6d6afe1a375a3e6f89677a841b6a3[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue May 16 16:57:38 2023 +0900

    メッセージ送信時、最新のメッセージまで自動スクロール

[33mcommit bc66b50a634b613c428f83bff9d918fd01cbe536[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue May 16 16:53:34 2023 +0900

    複数行のメッセージを送信したとき、入力欄の高さを戻す

[33mcommit 6717b6ff96a7cdf7de192b1b74f92fe36aedf2c7[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue May 16 15:31:17 2023 +0900

    グループコンテンツのヘッダーの見た目を良くした

[33mcommit 0a46ec4c20f8607812cc7604aebffb55bc51ebb3[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue May 16 10:36:08 2023 +0900

    小さい画面でグループを選択したとき、他のグループのメッセージが最初に表示されないようにした

[33mcommit da33418b86bfdea74c8345666062574a6c214d5d[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon May 15 21:37:37 2023 +0900

    画面の横幅が狭いとき、グループ選択後、メッセージ一覧に画面遷移する

[33mcommit ba0be3e4788903ab7661680b9fef7c865a4795e9[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon May 15 16:43:38 2023 +0900

    グループリストとユーザー名をメインメニューとしてまとめた

[33mcommit 8b043f9e47175301ce1321b9c5c592b32e6e8b33[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon May 15 06:22:23 2023 +0900

    メッセージリストをグループコンテンツでまとめて、グループ名を上部に表示

[33mcommit 8896d7809f9f4385a4d2d25ee02f58673fa9dd27[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun May 14 18:27:01 2023 +0900

    認証関係のPOSTリクエストの作成にCreatePostRequest関数を使用

[33mcommit 96744c03aa08041e07b2c3138356e3175dbc6f27[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun May 14 18:21:55 2023 +0900

    メッセージ送信時、更新処理をメッセージ一覧と入力欄のみに変更

[33mcommit 124cf5737be2b1d56a7c02df22377ef2eb8951a0[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun May 14 18:07:44 2023 +0900

    POSTメッセージのリクエストオプションを作成する処理を関数化

[33mcommit c65aff897696e195df69fc13e610ddf808ccfed3[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun May 14 17:19:41 2023 +0900

    所属しているグループのみ取得

[33mcommit 813b7f65d2fa40f4265b193c8fa6e46554fea91e[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun May 14 16:57:04 2023 +0900

    所属しないグループのメッセージのsendを拒否

[33mcommit f1ca11bad541b77b4d26742d0a59e6b709f88e7a[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun May 14 16:48:17 2023 +0900

    グループに属しているか確認する処理を関数化

[33mcommit e44a915167865a66ded521c749aaaa3163966116[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun May 14 16:12:41 2023 +0900

    所属しないグループのメッセージのgetを拒否

[33mcommit cf91b172c0cde8526555e197005e6b9cfcf70dee[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun May 14 01:45:31 2023 +0900

    グループ選択ボタンの表示を整えた

[33mcommit dfe87675fb5cf5a63de55b52e0a1b5ed8c5e179d[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat May 13 23:31:38 2023 +0900

    グループを指定してメッセージを取得

[33mcommit e10c05a4f5f60eaf23510407782d1e1dfe37cc41[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat May 13 21:17:00 2023 +0900

    ユーザー認証が必要なAPIをwithUserRoute経由に変更

[33mcommit 82771a59e6429262f0c7053280e47df58c9b20f1[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat May 13 20:00:19 2023 +0900

    ユーザー認証済でメソッドが一致するときのみ実行する関数を作成

[33mcommit 32dd4387cb1da05a25d72dfb9824534fe6a8ecfb[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat May 13 10:24:29 2023 +0900

    グループを選択してメッセージを送信

[33mcommit 076474e47e58d735d86afcb487143aaeae894b2d[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri May 12 22:50:23 2023 +0900

    データベースにグループを作成して管理

[33mcommit 506e4e5732b41bc800f7ceb29902a50b1d819362[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu May 11 23:36:34 2023 +0900

    サインアップフォームで入力間違いがあったときポップアップを表示

[33mcommit 6ba5d27b016ced902d9c941dd3a97584ce08756b[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu May 11 22:04:15 2023 +0900

    サインインフォームで入力間違いがあったときポップアップを表示

[33mcommit 63f4b25584976e1661281451f978a20fbaf1ffa7[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu May 11 15:50:15 2023 +0900

    メッセージのユーザー名の右に投稿日時を表示

[33mcommit b875a543278ddb8725bcfe94f0933961d37b5a37[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed May 10 22:13:09 2023 +0900

    Sendボタンの右側とフォームの下側に隙間を用意

[33mcommit 8e4fde15713a883cbd87e30eb1ca3ba036143ffd[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Wed May 10 22:02:42 2023 +0900

    メッセージ入力欄の高さを自動調節

[33mcommit 3242e3fd5445d0fc17106fa10288aa01aaa5d632[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue May 9 23:41:52 2023 +0900

    メッセージが増えても画面に全体が収まるように

[33mcommit 82e1313c07b9146adc3b610bc30209ca1f4ccbe9[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Tue May 9 23:00:11 2023 +0900

    メッセージ欄を画面全体に収めるように

[33mcommit 61893157b49d068da77704c9b1810c3f407c12ee[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon May 8 23:21:47 2023 +0900

    はみ出したメッセージをスクロールで表示

[33mcommit 9a078e7cfd62deaac8d4dec68dc130817c1eaeff[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Mon May 8 22:46:27 2023 +0900

    メッセージ入力欄をメッセージの下に配置して見た目を良くした

[33mcommit 7aa8b9340ab23fa15ff837104d566e2e5da4e409[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun May 7 23:42:27 2023 +0900

    メッセージの体裁を整えた

[33mcommit 21791e286b65e268cae0ee7a7b42e96e63151f9d[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun May 7 22:43:20 2023 +0900

    メッセージの一覧をコンポーネント化

[33mcommit d1d14afbda88e2313ea22423d5fa64356659bda2[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun May 7 22:21:50 2023 +0900

    メッセージを取得

[33mcommit d9b7e5c3712e104c578ee38539f580b21a47e2e9[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun May 7 21:14:39 2023 +0900

    一部のimportを絶対パスに

[33mcommit eb833974ad779a0b0a6e3398c93b04e6c6956e2c[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun May 7 21:04:33 2023 +0900

    apiを機能ごとにディレクトリを分けた

[33mcommit 933f85e45edfa04a7f57c05bba0b31b3dd69c1f4[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun May 7 20:36:58 2023 +0900

    メインページをコンポーネント化

[33mcommit 277b306f82fcbf220b01eb1bf5f8802948270ce1[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun May 7 18:18:11 2023 +0900

    認証関係のコンポーネントをディレクトリにまとめた

[33mcommit 0b01d8f74011a72b1b8a9520c73a68957888dc09[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun May 7 18:14:59 2023 +0900

    サインインとサインアップのページをコンポーネントとして独立

[33mcommit dc02bb8781c2f148e4f9d71ba090faefebb59b13[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun May 7 17:44:05 2023 +0900

    メッセージの送信機能の作成

[33mcommit d0a464e5a7a832438836a8d4eb60f5bfdc6ae73a[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun May 7 15:18:36 2023 +0900

    ユーザーIDを連番で自動生成

[33mcommit 79c8bba2aeda873ec01c436836a70c2df46d679c[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sun May 7 14:32:08 2023 +0900

    短時間で大量に発生していたリクエストを失くした

[33mcommit 96a5e2739077e0d500d35b1ad5061a2551f772df[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat May 6 20:13:00 2023 +0900

    ユーザーページを作成し、インデックスページ内で表示切り替え

[33mcommit 25d5d0d9c8a4a94f37764650b953aeffe08db61e[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat May 6 16:22:46 2023 +0900

    インデックスページの体裁を整えた

[33mcommit 9ed02a0dac9145d97cd9513ccc28d4d8fad2d5db[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Sat May 6 00:28:37 2023 +0900

    サインアップとサインインのフォームをindexページに表示

[33mcommit 782fb6093361620914f629a1e653d16abc4fbeeb[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri May 5 22:53:37 2023 +0900

    ログイン時とサインアップ時にトップページに移動

[33mcommit de569e9365d17693a153060171a16c2b6dfa756e[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri May 5 22:38:16 2023 +0900

    ログアウト機能を作成

[33mcommit 4e9b7bebf38b0c9c2e4f5a1f57bb430665e97ff0[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri May 5 21:57:19 2023 +0900

    ログイン機能を作成

[33mcommit cf628132a70077ed67c2996f2d08fe8c6b744b73[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri May 5 21:15:36 2023 +0900

    セッション管理のラッパーを作成

[33mcommit 30517a23513e78384ca14a859bb15fed04b58158[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri May 5 21:02:21 2023 +0900

    アカウント作成後にセッションを生成

[33mcommit 38b4e1e9631c1d9a2887a36ea000136c623fcf44[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri May 5 20:05:49 2023 +0900

    bcryptを使用してパスワードをハッシュ化

[33mcommit 64ff2a8e409de10cea370f9512bfc46b617259d1[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri May 5 18:38:52 2023 +0900

    ユーザー被りとパスワードの再確認を行ってサインアップ

[33mcommit b703b57f3a745465a1ec0778f0f4958d3d95da27[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri May 5 17:00:32 2023 +0900

    submitの処理を関数化

[33mcommit a504e0c7d53a1e21cdc0970d1da20382264c5d76[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Fri May 5 00:41:48 2023 +0900

    prismaを使用してデータベースを作成

[33mcommit f66ce76201753e3bc03173b4939d3560ec42d21a[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu May 4 02:44:04 2023 +0900

    フォームからユーザー名とパスワードを送信

[33mcommit 78be5f78cfef3583a7a12a226446427df4c774de[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu May 4 01:48:45 2023 +0900

    簡易的なサインイン画面の表示を作成

[33mcommit c7d54d7c69a36fb0a04d15654d1cef3eb88324eb[m
Author: naya460 <76655448+naya460@users.noreply.github.com>
Date:   Thu May 4 00:50:50 2023 +0900

    Initial commit from Create Next App
