
function check() 
{
  const posts = document.getElementsByClassName("post");
  // ※postsはHTMLcollectionのため、配列ではない
  postsA = Array.from(posts); //postsを配列に変換する
  postsA.forEach(function(post){
    if (post.getAttribute("data-load") != null){
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", (e) => {
      const postId = post.getAttribute("data-id");
      const XHR = new XMLHttpRequest();
      // どんなリクエストにするかを指定（リクエストの初期化）
      XHR.open("GET", `/posts/${postId}`, true);
      //レスポンスの形式を"json"に指定
      XHR.responseType = "json";
      // sendメソッドリクエストを送信する
      XHR.send();
      
      XHR.onload = () => {
        const item = XHR.response.post;
        if (item.checked === true ){
          post.setAttribute("data-check", "true");
        }else if(item.checked === false) {
          post.removeAttribute("data-check");
        }
        if (XHR.status != 200){
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
        }else{
          return null;
        }
      }
      XHR.onerror = () =>{
        alert("Request failed");
      }
      
      e.preventDefault();
    });
  });
}

setInterval(check, 1000);
