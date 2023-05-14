export default function CreatePostRequest(data: Object) {
    // JSONとしてテキスト化
    const json_str = JSON.stringify(data);

    // 送信するリクエスト内容を作成
    return {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: json_str
    }
}