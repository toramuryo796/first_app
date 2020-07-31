function memo(){
  // 投稿ボタンの情報を取得
  const submit = document.getElementById("submit");
  //投稿ボタンクリック時にイベント発火
  submit.addEventListener("click", (e) => {
    //フォームに入力された情報を取得
    const formData = new FormData(document.getElementById("form"))
    // XMLHttpRequestのオブジェクトを生成
    const XHR = new XMLHttpRequest();
    // リクエストの初期化
    XHR.open("POST", "/posts", true );
    // レスポンスとして返却されるデータ形式をjsonとする
    XHR.responseType = "json";
    // フォーム入力情報を非同期通信でリクエストを送る
    XHR.send(formData);

    // レスポンスの受け取り
    XHR.onload = () => {
      // メモのレコードデータを取得
      const item = XHR.response.post;
      // listの要素を取得
      const list = document.getElementById("list");
      // formのコンテントの情報を取得(最後にリセットするため)
      const formText = document.getElementById("content");
      // メモとして描画する部分のHTML
      const HTML =`
      <div class="post"  data-id=$(item.id)>
      <div class="post-date">
      投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
      </div>`;
      // listに対してHTMLを追加
      list.insertAdjacentHTML("afterend", HTML);
      // テキストフォームを空白に戻す
      formText.value = "";
      
      //ステータスが200以外で返却されたときの処理
      if (XHR.status != 200){
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
      }else{
        return null;
      };
    };

    // リクエストに失敗時
    XHR.onerror = function() {
      alert("Request failed");
    };
    // イベント実行後、キャンセル
    e.preventDefault();
  });
};
window.addEventListener("load", memo);