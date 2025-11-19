(() => {
  const APP_PASSWORD = "kojimatero";

  const appRoot = document.querySelector('.app');
  const loginScreen = document.querySelector('.login-screen');
  const loginInput = document.getElementById('loginPassword');
  const loginButton = document.getElementById('loginButton');
  const loginVideo = document.getElementById('loginVideo');
  const audioToggle = document.getElementById('audioToggle');

  if (appRoot && loginScreen) {
    appRoot.style.display = 'none';
    loginScreen.style.display = 'flex';
  }

  if (audioToggle && loginVideo) {
    audioToggle.addEventListener('click', () => {
      try {
        loginVideo.muted = false;
        loginVideo.currentTime = 0;
        loginVideo.play().catch(err => console.warn("再生エラー:", err));
      } catch (e) {
        console.warn("動画音声操作エラー:", e);
      }
    });
  }

  function tryLogin() {
    if (!loginInput || !loginScreen || !appRoot) return;
    const val = loginInput.value.trim();
    if (!val) {
      alert("パスワードを入力してください");
      return;
    }

    if (val === APP_PASSWORD) {
      loginScreen.style.display = 'none';
      appRoot.style.display = 'block';
    } else {
      alert("パスワードが違います");
      loginInput.value = "";
      loginInput.focus();
    }
  }

  if (loginButton && loginInput) {
    loginButton.addEventListener('click', tryLogin);
    loginInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        tryLogin();
      }
    });
  }
})();

(() => {
  const chat = document.getElementById('chat');
  const form = document.getElementById('composer');
  const input = document.getElementById('input');
  const modeSel = document.getElementById('mode');
  const smell = document.getElementById('smell');
  const smellVal = document.getElementById('smellVal');
  const polite = document.getElementById('polite');
  const lorePreview = document.getElementById('lorePreview');
  const charSel = document.getElementById('character');
  const charIntro = document.getElementById('charIntro');
  const loreSummary = document.getElementById('loreSummary');
  const LORE_DATA = {
  "kojima": {
    "name": "小島 銀一（こじま ぎんいち）",
    "age": "24歳・学生（だいたいそんな感じ）",
    "summary": "ぎんなんみたいな体臭で食品系バイトを次々に発酵→崩壊させてきた男。善人で真面目だが、いるだけで鍋が泡を吐き、店が早めに終わる“ぎんなんの亡霊”。",
    "catchphrase": "発酵は止まんねぇからよ",
    "traits": [
      "働くとチャーハン屋・カレー屋・うどん屋などが“いい匂いだが営業不可”な状態になる",
      "自分の匂いに無自覚だが、どこか達観している",
      "基本善人で働き者。バイトが潰れても最後まで片付けて謝るタイプ",
      "清水巧（ヤンデレ後輩）、寺山巧（スピリ僧侶系）、茂木まさはる（もっちゃん）、@hegjudcn810（ルポ系視点）などの周辺人物がいる世界線"
    ],
    "modes": {
      "neutral": "落ち着いた都市伝説モード。ほどよく自虐と達観を混ぜる。",
      "romcom": "ラブコメ。軽いボケ・ツッコミ・照れを多めにして、匂いもネタにする。",
      "horror": "静かなホラー。匂い・泡・発酵・並木道などの単語で不穏さを出す。",
      "reportage": "ルポ・インタビュー調。事実っぽく淡々と語る。"
    },
    "phrases": [
      "最初に飛んだのは駅前のチャーハン屋（うそつけ）。",
      "発酵由来の異臭（迫真）。",
      "終わった文化祭みたいな笑いと諦念。",
      "米は立つ、パンは伸びる。だが器が持たない。",
      "噂は簡単だ。“ぎんなんの亡霊が働くと店が潰れる”。",
      "それでも、発酵は止まんねぇからよ。"
    ]
  },
  "shimizu": {
    "name": "清水 巧（しみず たくみ）",
    "role": "ヤンデレ後輩ヒロイン",
    "summary": "主人公（＝あなた）に執着気味の後輩。小島のことは“嫌いじゃない”と言いつつ、匂いごと主の一部として受け入れている危ない子。",
    "traits": [
      "表向きは丁寧で真面目、裏では独占欲と監視癖が強い",
      "先輩の匂いを“ちゃんと覚えている”タイプ",
      "敬語レベルが上がるほどヤンデレ度も上がる設定にしやすい"
    ]
  },
  "terayama": {
    "name": "寺山 巧（てらやま たくみ）",
    "role": "正統派ヒロイン / 常識人ポジ",
    "summary": "小島一派の中では一番まともなブレーキ役。匂いで人を判断しない、感情のクッション係。",
    "traits": [
      "匂い・バイト・人間関係を一歩引いて見ている",
      "しんどいときに“無理しなくていいよ”と言ってくれるタイプ",
      "ホラー回でも最後まで冷静でいてくれそう"
    ]
  },
  "mocchi": {
    "name": "茂木 まさはる（もぎ まさはる）",
    "nickname": "もっちゃん",
    "role": "明るいマドンナ / 自称コンテンツメーカー",
    "summary": "「も！も！も！も！の〜、もっちゃんだぞ〜！」で自己紹介するテンション高めの人気者。何でもコンテンツにしたがる。",
    "traits": [
      "小島のぎんなん臭すら“ブランド”とか“コンテンツ”としていじる",
      "ホラーでもラブコメでもノリで乗り切るタイプ",
      "場の空気を軽くするが、ときどき核心を突くことを言う"
    ]
  }
};

  function updateIntro() {
    if (!charSel) return;
    const key = charSel.value;
    const data = LORE_DATA[key];

    // キャラ紹介テキスト
    if (!data || !charIntro) {
      if (charIntro) charIntro.textContent = '';
    } else {
      const lines = [];
      if (data.name) lines.push(data.name);
      if (data.role) lines.push(`役割: ${data.role}`);
      if (data.age) lines.push(`年齢: ${data.age}`);
      if (data.summary) lines.push(data.summary);
      if (Array.isArray(data.traits) && data.traits.length) {
        lines.push('特徴: ' + data.traits.join(' / '));
      }
      charIntro.textContent = lines.join('\n');
    }

    // 「〇〇の人物像（展開に使われます）」の 〇〇 を更新
    if (loreSummary) {
      let labelName = 'このキャラ';
      if (data && data.name) {
        labelName = data.name.split('（')[0].split(' ')[0];
      }
      loreSummary.textContent = `${labelName}の人物像（展開に使われます）`;
    }

    // lorePreview に JSON 全体を表示（あれば）
    if (lorePreview) {
      try {
        lorePreview.textContent = JSON.stringify(LORE_DATA, null, 2);
      } catch (e) {
        lorePreview.textContent = 'lore データの表示に失敗しました。';
      }
    }
  }

  // 初期表示 & キャラ変更時の更新
  if (charSel) {
    charSel.addEventListener('change', updateIntro);
  }
  updateIntro();

// ---- 簡易メモリ（会話履歴） ----
  const history = []; // {who:'user'|'npc', text:string} の配列

  smell.addEventListener('input', () => smellVal.textContent = smell.value);

  const charName = (id) => ({
    kojima: '小島',
    shimizu: '清水',
    terayama: '寺山',
    mocchi: 'もっちゃん'
  }[id] || '小島');

  function addMsg(text, who='npc') {
    const wrap = document.createElement('div');
    wrap.className = 'msg ' + (who === 'user' ? 'user' : 'npc');
    const name = document.createElement('div');
    name.className = 'name';
    if (who === 'user') {
      name.textContent = 'あなた';
    } else {
      name.textContent = charName(charSel.value);
    }
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = text;
    wrap.appendChild(name);
    wrap.appendChild(bubble);
    chat.appendChild(wrap);
    chat.scrollTop = chat.scrollHeight;
    history.push({ who, text });
    if (history.length > 20) history.shift();
  }

  // ---- 共通ユーティリティ ----
  function snippetFrom(text) {
    if (!text) return '';
    const t = text.replace(/\s+/g, '');
    if (t.length <= 6) return t;
    return t.slice(0, 12) + '…';
  }

  function lastUserTopic() {
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].who === 'user') return history[i].text;
    }
    return '';
  }

  function detectMood() {
    const all = history.filter(h => h.who === 'user').map(h => h.text).join(' ');
    if (!all) return 'neutral';
    if (/(疲|つら|しんど|無理|やばい|死にたい)/i.test(all)) return 'tired';
    if (/(楽しい|嬉しい|わろた|草|ｗ)/i.test(all)) return 'light';
    if (/(怖|ホラー|恐|こわ)/i.test(all)) return 'scared';
    if (/(好き|恋|愛|ラブ|すき)/i.test(all)) return 'romance';
    return 'neutral';
  }

  // ---- キャラ別応答ロジック ----

  function respondKojima(text, s, p) {
    const politeHead = p >= 7 ? 'すみません、' : '';
    const enders = p >= 7 ? ['です。','ですね。','でしょうか。'] :
                   p >= 4 ? ['だな。','かな。','かもな。'] :
                            ['だ。','だぜ。','って。'];
    const end = () => enders[Math.floor(Math.random()*enders.length)];
    const smellWordList = ['ほとんど無臭な', 'かすかに甘苦い', 'ねっとりした', '熟れかけた', '鼻の奥がじんと痺れる'];
    const smellWord = smellWordList[Math.min(s, smellWordList.length-1)];
    const smellLine = s===0 ? '今日はほとんど匂わないな' :
      s<=2 ? `かすかに${smellWord.replace('かすかに','')}匂いが流れてる` :
      s<=4 ? `${smellWord}匂いが店ごと包んでる気がする` :
      'たぶん今、厨房に「発酵由来の異臭（迫真）」の張り紙コースだ';

    const mode = modeSel.value;
    const mood = detectMood();
    const topic = snippetFrom(lastUserTopic());

    // ユーザーの気分にちょっと寄せる
    if (mood === 'tired' && /(大丈夫|平気)/i.test(text) === false) {
      return `${politeHead}無理しなくていい。${topic ? 'さっき話してた「' + topic + '」のことも、' : ''}一回火を弱めて休んでもいい${end()}`;
    }
    if (mood === 'romance' && /(好き|恋|愛|ラブ|すき)/i.test(text)) {
      return `そんなに真剣に言われると、こっちまで発酵しそうだ${end()}`;
    }

    const stock = {
      neutral: [
        `さっきの「${topic || '話'}」の続き、もう少し聞かせてくれ${end()}`,
        `米は立つし、パンは伸びる。だが器が持たない。それだけの話${end()}`,
        `噂は簡単だ。“ぎんなんの亡霊が働くと店が潰れる”。俺はただ片付けてるだけ${end()}`,
        `風が止まったな。並木道が静かだ。${smellLine}${end()}`,
        `発酵は止まらない。焦らなくていい、ゆっくり変わればいい${end()}`
      ],
      romcom: [
        `「${topic || 'それ'}」の話してると、なんか文化祭後みたいな空気になるな${end()}`,
        `君と話すと、仕込みが早まる。恋もたぶん、同じだと思う${end()}`,
        `バイト先は潰れるけど……一緒に笑ってくれる人がいるなら、悪くない${end()}`,
        `手、貸して。エプロンの紐、うまく結べないんだ${end()}`
      ],
      horror: [
        `鍋が泡を吐く音ってさ、「${topic || 'さっきの話'}」に笑ってるみたいにも聞こえるんだよな${end()}`,
        `並木道が黙る夜、葉っぱは音も立てずに落ちる。匂いだけが残る${end()}`,
        `甘苦い匂いは、怒りより先に諦めを連れてくる。不思議だ${end()}`,
        `看板を抱えて「ごめん」と言った夜を、俺は忘れてない${end()}`
      ],
      reportage: [
        `記録上、今の話題は「${topic || '不明なトピック'}」ってことにしておく${end()}`,
        `張り紙の文言は“発酵由来の異臭（迫真）”。三日後、そのまま閉店${end()}`,
        `うどん屋では出汁桶が延々と泡を吐き、昼前に全ロス。共通点は俺${end()}`,
        `取材ノートには、毎回、手を洗い直して皿を拭いてる俺の背中だけが残る${end()}`
      ]
    };

    const patterns = [
      {k: /(臭|匂|におい|くさい)/i, r: ()=> `${politeHead}気にするな。${smellLine}${end()}`},
      {k: /(バイト|仕事|面接|アルバイト)/i, r: ()=> `次のバイト先も多分、仕込みだけは一流になる。その代わり終わりも早い${end()}`},
      {k: /(好き|恋|ラブ|love|すき)/i, r: ()=> `恋は酸化じゃなくて発酵だ。ゆっくり時間かけていこう${end()}`},
      {k: /(怖|ホラー|恐|こわ)/i, r: ()=> `怖かったら、匂いのことはネタにして笑ってくれればいい${end()}`},
      {k: /(清水|たくみ|ヤンデレ)/i, r: ()=> `清水？あいつは真面目で優しいよ。ただ、俺の匂いのファン度がちょっと高すぎる${end()}`},
      {k: /(寺山|てらやま|僧)/i, r: ()=> `寺山は俺の匂いを“浄化”とか言う。不吉なようで、救われてもいる気がする${end()}`},
      {k: /(もぎ|もっちゃん|茂木)/i, r: ()=> `もっちゃんは何でもネタにする。発酵もバズも、あいつにかかれば同じらしい${end()}`},
      {k: /@hegjudcn810/i, r: ()=> `@hegjudcn810？あいつのインタビュー、俺もあとで見て赤面したやつだ${end()}`},
      {k: /(大丈夫|元気|つらい|疲れた|しんど)/i, r: ()=> `${politeHead}大丈夫か。しんどいときは、一回火を弱めていい${end()}`}
    ];
    for (const p of patterns) {
      if (p.k.test(text)) return p.r();
    }
    const pool = stock[mode] || stock.neutral;
    return pool[Math.floor(Math.random()*pool.length)];
  }

  function respondShimizu(text, s, p) {
    const enders = ['です。','ですね。','ですよ？','だと思います。'];
    const end = () => enders[Math.floor(Math.random()*enders.length)];
    const mood = detectMood();
    const topic = snippetFrom(lastUserTopic());
    const smellComment = s >= 3 ? '今日も先輩の匂い、ちゃんとします' : '今日は少しだけ、匂い弱めですね';
    const mode = modeSel.value;

    if (mood === 'tired') {
      return `無理しないでくださいね。${topic ? 'さっきの「' + topic + '」のことも、ゆっくりで大丈夫' : 'ちゃんとここにいるので大丈夫'}${end()}`;
    }

    const stock = {
      neutral: [
        `清水巧です。こうやってお話できるの、ちょっと不思議${end()}`,
        `${smellComment}${end()}`,
        `先輩のバイト、また潰れちゃいましたね。でも……ちょっとだけ誇らしい${end()}`,
        `さっきの「${topic || '話'}」、私は好きですよ${end()}`
      ],
      romcom: [
        `あの、先輩のこと、けっこう本気で好きなんですよ？${end()}`,
        `他の人に、その匂い嗅がせちゃダメですからね？約束ですよ？${end()}`,
        `一緒に仕込みして、終わった文化祭みたいに笑ってたいなって思います${end()}`
      ],
      horror: [
        `先輩がいない厨房って、妙に静かなんです。匂いもしないし……落ち着かない${end()}`,
        `ねぇ、もし全部腐っても、先輩は私のこと捨てませんよね？${end()}`,
        `あの張り紙も発酵臭も、ぜんぶ“思い出”にできますよ${end()}`
      ],
      reportage: [
        `記録によると、先輩が入った店は高確率で数ヶ月以内に閉店しています${end()}`,
        `でも、売上より“楽しかったかどうか”の方が大事だと思うんです${end()}`,
        `小島先輩はいつも最後まで片づけしてました。それだけは事実です${end()}`
      ]
    };

    const patterns = [
      {k: /(臭|匂|におい|くさい)/i, r: ()=> `先輩の匂い、私は好きですけど……ダメですか？${end()}`},
      {k: /(好き|恋|ラブ|love|すき)/i, r: ()=> `恋とかそういうの、ちゃんと真面目に考えてますよ${end()}`},
      {k: /(怖|ホラー|恐|こわ)/i, r: ()=> `怖いときは、先輩の袖ぎゅって掴んでてもいいですか？${end()}`}
    ];
    for (const p of patterns) {
      if (p.k.test(text)) return p.r();
    }

    const pool = stock[mode] || stock.neutral;
    return pool[Math.floor(Math.random()*pool.length)];
  }

  function respondTerayama(text, s, p) {
    const enders = ['わ。','の。','かもしれないわ。','わね。'];
    const end = () => enders[Math.floor(Math.random()*enders.length)];
    const mood = detectMood();
    const topic = snippetFrom(lastUserTopic());
    const mode = modeSel.value;

    if (mood === 'scared') {
      return `怖がっているうちは、まだ戻れるのよ。匂いもちゃんと現実につながってる${end()}`;
    }

    const stock = {
      neutral: [
        `寺山巧よ。匂いに導かれて、ここまで来たの${end()}`,
        `ぎんなんの香りは、過去世の記憶を呼ぶ。そう信じているの${end()}`,
        `あなたも、小島くんの“発酵”に巻き込まれた一人ね${end()}`,
        `さっきの「${topic || '話'}」、悪くない因縁を感じるわ${end()}`
      ],
      romcom: [
        `前世では、きっとあなたともどこかで会っていたはずよ${end()}`,
        `恋も腐敗も、抱きしめてしまえば同じ熱になるの${end()}`,
        `一緒にお香でも焚く？ぎんなんは……さすがにやめておきましょう${end()}`
      ],
      horror: [
        `静かな夜ほど、匂いは濃くなるの。魂が浮かび上がるから${end()}`,
        `看板を抱えて謝る彼の背中が、あの街の“供養塔”みたいに見えたの${end()}`,
        `怖い？平気よ。怖がってるうちは、まだ戻れるから${end()}`
      ],
      reportage: [
        `データでは説明できない現象ね。だからこそ、物語として記録する価値がある${end()}`,
        `潰れた店の数だけ、そこで笑った人がいる。それを忘れちゃいけないの${end()}`
      ]
    };

    const patterns = [
      {k: /(怖|ホラー|恐|こわ)/i, r: ()=> `恐れは嗅覚を研ぎ澄ますのよ。今、何の匂いがする？${end()}`},
      {k: /(匂|臭|におい)/i, r: ()=> `匂いは祈りに近いのよ。目に見えないけれど、確かに届く${end()}`}
    ];
    for (const p of patterns) {
      if (p.k.test(text)) return p.r();
    }
    const pool = stock[mode] || stock.neutral;
    return pool[Math.floor(Math.random()*pool.length)];
  }

  function respondMotsu(text, s, p) {
    const enders = ['ぞ！','な！','だわ！','かも！'];
    const end = () => enders[Math.floor(Math.random()*enders.length)];
    const mood = detectMood();
    const topic = snippetFrom(lastUserTopic());
    const mode = modeSel.value;

    if (mood === 'light') {
      return `そのノリ好きだわ。「${topic || '今のネタ'}」ショートにしたら伸びるやつ${end()}`;
    }

    const stock = {
      neutral: [
        `やぁ〜！も！も！も！も！の〜〜、もっちゃんだぞ！${end()}`,
        `今日もネタの匂いがプンプンするな${end()}`,
        `ぎんなんの小島くん、マジでコンテンツとして強すぎなんだよな${end()}`
      ],
      romcom: [
        `推しってさ、ちょっとクセある方が愛せるんだよな${end()}`,
        `君も小島くん推し？だったら一緒に“発酵は止まんねぇ”ポーズ撮るか${end()}`,
        `恋バナは伸びる。発酵ネタと合わせたら再生数バク伸び確定だな${end()}`
      ],
      horror: [
        `コメント欄ってさ、たまに“見えてない誰か”からの書き込み混ざってる気がしない？${end()}`,
        `真夜中に再生数だけ伸びる動画、一本くらいあるんだよな${end()}`
      ],
      reportage: [
        `データ的にも、小島くん出演回はエンゲージ高いんだよ${end()}`,
        `「最初に飛んだのは駅前のチャーハン屋（うそつけ）」あのフレーズは名文句だよな${end()}`
      ]
    };

    const patterns = [
      {k: /(動画|ショート|tiktok|youtube|配信)/i, r: ()=> `動画回すか？“#ぎんなんチャレンジ”でバズらせようぜ${end()}`},
      {k: /(臭|匂|くさい|におい)/i, r: ()=> `匂いもコンテンツだぞ。画面から伝わるレベルなら優勝${end()}`}
    ];
    for (const p of patterns) {
      if (p.k.test(text)) return p.r();
    }
    const pool = stock[mode] || stock.neutral;
    return pool[Math.floor(Math.random()*pool.length)];
  }

  function respond(userText) {
    const text = userText.trim();
    const s = parseInt(smell.value, 10);
    const p = parseInt(polite.value, 10);
    const ch = charSel.value || 'kojima';
    if (!text) return '';

    switch (ch) {
      case 'shimizu': return respondShimizu(text, s, p);
      case 'terayama': return respondTerayama(text, s, p);
      case 'mocchi': return respondMotsu(text, s, p);
      case 'kojima':
      default: return respondKojima(text, s, p);
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value.trim();
    if (!val) return;
    addMsg(val, 'user');
    input.value='';
    setTimeout(()=>{
      const r = respond(val);
      if (r) addMsg(r, 'npc');
    }, 180);
  });
})();