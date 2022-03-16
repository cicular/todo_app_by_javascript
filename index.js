// アロー関数
const onClickAdd = () => {
    // form部品の文章を扱うときはvalueが鉄則
    const inputText = document.getElementById("add-text").value;
    // 値を初期化
    document.getElementById("add-text").value = "";

    createIncompleteList(inputText)
}

// 未完了リストから指定の要素を削除
const deleteFromImcompleteList = (target) => {
    // 子要素を削除
    document.getElementById("incomplete-ul").removeChild(target);
}

// 未完了リストに追加する関数
const createIncompleteList = (text) => {
    // divを生成
    const div = document.createElement("div");
    // クラス名を付与
    div.className = "list-row";

    // liタグを生成
    const li = document.createElement("li");
    li.innerText = text;

    // buttonタグ生成
    const complete_button = document.createElement("button");
    const delete_button = document.createElement("button");

    // https://note.affi-sapo-sv.com/js-innerhtml-innertext.php
    // textContentもあるが、こちらはwhite-space属性の影響を受けないという違いがある。
    // white-spaceとはソース中のテキストについて、自動改行するか複数の空白を一つの空白にするか、
    // 改行を空白にするかなど、改行やスペース、タブの扱いを指定するプロパティ。
    complete_button.innerText = "完了";
    delete_button.innerText = "削除";

    // 削除ボタンのイベント作成
    delete_button.addEventListener("click", () => {
        // 押された削除ボタンの親タグ（div）を未完了リスト（ul）から削除
        // 親ノードを取得
        // https://into-the-program.com/get-parent-element/
        const delete_target = delete_button.parentNode;
        deleteFromImcompleteList(delete_target);
    });

    // 完了ボタンのイベント作成
    complete_button.addEventListener("click", () => {
        // 初期化の後でこれを実行しようとするとエラーになる（けど一応動く）。
        deleteFromImcompleteList(complete_button.parentNode);

        // 完了ボタンの親要素を取得
        const done_target = complete_button.parentNode;
        // 最初の子要素（li）の文字を取得
        const text = done_target.firstElementChild.innerText;
        
        // 初期化
        done_target.textContent = null;
        // 【開発中メモ】
        // alertだと、[object HTMLDivElement]と表示されて、確認できない模様。
        // alert(done_target);
        // console.logだと、<div class="list-row"></div>と表示されて確認ができる。
        // console.log(done_target);

        // liタグを生成
        const li = document.createElement("li");
        li.innerText = text;

        // 戻すボタンを生成
        const back_button = document.createElement("button");
        back_button.innerText = "戻す";

        // 戻すボタンのイベント作成
        back_button.addEventListener("click", () => {
            // 押された戻すボタンの親タグ（div）を完了リスト（ul）から削除
            const back_target = back_button.parentNode;
            document.getElementById("complete-ul").removeChild(back_target);

            // 最初の子要素（li）の文字を取得
            // ※firstElementChild().innerTextとすると、firstElementChild is not a functionエラーになる。
            const text = back_target.firstElementChild.innerText;
            createIncompleteList(text)
        });

        done_target.appendChild(li);
        done_target.appendChild(back_button);

        document.getElementById("complete-ul").appendChild(done_target);
    });

    // divタグの子要素に各要素を設定
    // 順番に下に追加される。
    div.appendChild(li);
    div.appendChild(complete_button);
    div.appendChild(delete_button);

    // 未完了リスト（ulタグ）に追加
    document.getElementById("incomplete-ul").appendChild(div);
}

// イベントリスナー
// 【主なイベントリスナー】
// click	　　マウスボタンをクリックした時に発動
// mousedown	マウスボタンを押している時に発動
// mouseup	　　マウスボタンを離したときに発動
// submmit	　　フォームのsubmitボタンを押したときに発動
// scroll	　　画面がスクロールした時に発動
// change	　　フォーム部品の状態が変更（ラジオボタンへのチェックや文字列入力）された時に発動
document.getElementById("add-button").addEventListener("click", () => onClickAdd());
